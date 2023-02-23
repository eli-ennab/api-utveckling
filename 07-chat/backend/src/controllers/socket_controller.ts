/**
 * Socket Controller
 */
import Debug from 'debug'
import { Socket } from 'socket.io'
import {
	ClientToServerEvents,
	ServerToClientEvents
} from '../types/shared/SocketTypes'

// Create a new debug instance
const debug = Debug('chat:socket_controller')

// Handle the user connecting and disconnecting
export const handleConnection = (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
	// Handle user connecting
	debug('User connected with ID:', socket.id)

	// Welcome the user
	debug('Welcome to the chat')
	socket.emit('hello')

	// Listen for incoming chat messages
	socket.on('sendChatMessage', (message) => {
		debug('New chat message:', socket.id, message)
		socket.broadcast.emit('chatMessage', message)
	})

	// Listen for a user join request (the `userJoin`-event)
	socket.on('userJoin', (username, callback) => {
		debug("User '%s' wants to join the chat:", username)

		// Let user know they are welcome
		callback(true)
	})

	// Handle user disconnecting
	socket.on('disconnect', () => {
		debug('User disconnected with ID:', socket.id)
	})
}
