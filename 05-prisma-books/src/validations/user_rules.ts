// Validation rules for User resource
import { body } from 'express-validator'
import prisma from '../prisma'

// 	// validator rules:alidator rules:
export const createUserRules = [
	// name required + at least 3 chars
	body('name').isString().bail().isLength({min: 3}),
	// email required + valid email
	body('email').isEmail().custom(async value => {
		// check if a User with that email already exists
		const user = await prisma.user.findUnique({
			where: {
				email: value,
			}
		})

		if (user) {
			// User already exists, throw a hissy-fit
			return Promise.reject("Email already exists")
		}
	}),
	// password required + at least 6 chars
	body('password').isString().bail().isLength({min: 6}),
]
