/**
 * User Services
 */
import prisma from '../prisma'

export const getUsersInRoom = async (roomId: string) => {
	return await prisma.user.findMany({
		where: {
			roomId
		}
	})
}

export const deleteAllUsers = async () => {
	return await prisma.user.deleteMany()
}
