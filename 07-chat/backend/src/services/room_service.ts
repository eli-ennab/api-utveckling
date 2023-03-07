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
	const now = Date.now()
	const past = now - (10 * 60 * 1000) // 10 minutes ago

	return prisma.room.findUnique({
		where: {
			id: roomId,
		},
		include: {
			messages: {
				where: {
					timestamp: {
						gte: past,	// greater than or equal, WHERE timestamp >= past
					}
				},
				take: -5,
			}
		}
	})
}
