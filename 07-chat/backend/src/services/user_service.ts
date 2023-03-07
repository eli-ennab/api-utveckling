/**
 * User Services
 */
import prisma from '../prisma'

export const getUsersInRoom = (roomId: string) => {
	return prisma.user.findMany({
		where: {
			roomId
		}
	})
}

export const deleteAllUsers = async () => {
	return await prisma.user.deleteMany()
}
