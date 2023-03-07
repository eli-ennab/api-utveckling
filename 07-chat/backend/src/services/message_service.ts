/**
 * Message service
 */
import prisma from '../prisma'
import { ChatMessageData } from '../types/shared/SocketTypes'

/**
 * Save a message
 * @param message Message to save
 */
export const createMessage = (message: ChatMessageData) => {
	return prisma.message.create ({
		data: message,
	})
}
