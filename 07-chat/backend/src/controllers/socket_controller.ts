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

	// Handle user disconnecting
	socket.on('disconnect', () => {
		debug('User disconnected with ID:', socket.id)
	})
}
