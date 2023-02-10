/**
 * Validation rules for User resource
 */
import { body } from 'express-validator'
import { getUserByEmail } from '../services/user_service'

/**
 * Create validator rules
 */
export const createUserRules = [
	// name required + at least 3 chars
	body('name').isString().bail().isLength({min: 3}),
	// email required + valid email
	body('email').isEmail().custom(async value => {
		// check if a User with that email already exists
		const user = await getUserByEmail(value)

		if (user) {
			// User already exists, throw a hissy-fit
			return Promise.reject("Email already exists")
		}
	}),
	// password required + at least 6 chars
	body('password').isString().bail().isLength({min: 6}),
]

/**
 * Update information about user
 *
 * Optional because you should be able to change only one rule,
 * and then check if it is a valid format
 */
export const updateUserRules = [
	body('name').optional().isString().bail().isLength({ min: 3 }),
	body('email').optional().isEmail().custom(async value => {
		const user = await getUserByEmail(value)
		if (user) {
			return Promise.reject("Email already exists")
		}
	}),
	body('password').optional().isString().bail().isLength({ min: 6 }),
]
