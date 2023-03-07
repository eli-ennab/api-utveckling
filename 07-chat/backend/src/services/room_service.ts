/**
 * Room service
 */
import prisma from '../prisma'

/**
 * Get all rooms
 */
export const getRooms = () => {
	return prisma.room.findMany()
}

/**
 *
 * @param roomId Get a single room
 * @returns
 */

export const getRoom = (roomId: string) => {
	return prisma.room.findUnique({
		where: {
			id: roomId,
		},
		include: {
			messages: true,
		}
	})
}
