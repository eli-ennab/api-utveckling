// User service
import prisma from '../prisma'

// check if a User with that email already exists
export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email: email,
		}
	})
}
