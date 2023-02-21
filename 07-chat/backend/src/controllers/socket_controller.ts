/**
 * Socket Controller
 */
import Debug from 'debug'
import { Socket } from 'socket.io'

// Create a new debug instance
const debug = Debug('chat:socket_controller')

// Handle the user connecting and disconnecting
export const handleConnection = (socket: Socket) => {
	// Handle user connecting
	debug('User connected with ID:', socket.id)

	// Handle user disconnecting
	socket.on('disconnect', () => {
		debug('User disconnected with ID:', socket.id)
	})
}
