/**
 * Socket Controller
 */
import Debug from 'debug'
import prisma from '../prisma'
import { Socket } from 'socket.io'
import { ClientToServerEvents, NoticeData, ServerToClientEvents } from '../types/shared/SocketTypes'

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
		socket.broadcast.emit('chatMessage', message)
	})

	// Listen for a user join request
	socket.on('userJoin', (username, roomId, callback) => {
		debug('User %s wants to join the chat room %s', username, roomId)

		const notice: NoticeData = {
			timestamp: Date.now(),
			username,
		}

		// Add user to room `roomId`
		socket.join(roomId)

		// Let everyone know a new user has joined
		socket.broadcast.to(roomId).emit('userJoined', notice)

		// Let user know they're welcome
		callback(true)
	})

	// Handle user disconnecting
	socket.on('disconnect', () => {
		debug('A user disconnected', socket.id)
	})
}
