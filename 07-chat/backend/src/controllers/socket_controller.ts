/**
 * Socket Controller
 */
import Debug from 'debug'
import prisma from '../prisma'
import { Socket } from 'socket.io'
import { ClientToServerEvents, NoticeData, UserJoinResult, ServerToClientEvents } from '../types/shared/SocketTypes'
import { getUsersInRoom } from '../services/user_service'

// Create a new debug instance
const debug = Debug('chat:socket_controller')

// Handle the user connecting
export const handleConnection = (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
	debug('A user connected', socket.id)

	// Say hello to the user
	debug('Said hello to the user')
	socket.emit('hello')

	// Listen for get room list request
	socket.on('getRoomList', async (callback) => {
		// Query database for list of rooms
		const rooms = await prisma.room.findMany()

		debug('Got request for rooms, sending room list %o', rooms)

		// Send room list
		callback(rooms)
	})

	// Listen for incoming chat messages
	socket.on('sendChatMessage', (message) => {
		debug('New chat message', socket.id, message)
		socket.broadcast.to(message.roomId).emit('chatMessage', message)
	})

	// Listen for a user join request
	socket.on('userJoin', async (username, roomId, callback) => {
		debug('User %s wants to join the chat room %s', username, roomId)

		// Get room from database
		const room = await prisma.room.findUnique({
			where: {
				id: roomId,
			}
		})

		if (!room) {
			return callback({
				success: false,
				data: null,
			})
		}

		const notice: NoticeData = {
			timestamp: Date.now(),
			username,
		}

		// Add user to room `roomId`
		socket.join(roomId)

		// Create a User in the database and set roomId, if they do not already exist,
		// otherwise update the User with the roomId
		// upsert = update or insert
		const user = await prisma.user.upsert({
			where: {
				id: socket.id,
			},
			create: {
				id: socket.id,
				name: username,
			  	roomId,
			},
			update: {
				name: username,
				roomId,
			}
		})

		// Retrieve a list of Users for the room
		const usersInRoom = await getUsersInRoom(roomId)
		// debug("List of users in room %s: %O", roomId, usersInRoom)

		// Let everyone know a new user has joined
		socket.broadcast.to(roomId).emit('userJoined', notice)

		// Broadcast an updated userlist to everyone (else) in the room
		socket.broadcast.to(roomId).emit('onlineUsers', usersInRoom)

		// Let user know they're welcome
		callback({
			success: true,
			data: {
				id: room.id,
				name: room.name,
				users: usersInRoom,	// Send the user the list of users in the room
			}
		})
	})

	// Handle user disconnecting
	socket.on('disconnect', async () => {
		debug('A user disconnected', socket.id)

		// Find room user was in (if any)
		const user = await prisma.user.findUnique({
			where: {
				id: socket.id,
			}
		})

		// If user was not in a room, just do nothing
		if (!user) {
			return
		}

		// Remove user from any room when they disconnect
		await prisma.user.delete({
			where: {
				id: socket.id,
			}
		})

		// Broadcast new list (without the disconnected user) of online users to the room
		const users = await getUsersInRoom(user.roomId)
		socket.broadcast.emit('onlineUsers', users)
	})
}
