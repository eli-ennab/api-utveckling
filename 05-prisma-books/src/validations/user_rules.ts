// Validation rules for User resource
import { body } from 'express-validator'

// 	// validator rules:alidator rules:
export const createUserRules = [
	// name required + at least 3 chars
	body('name').isString().bail().isLength({min: 3}),
	// email required + valid email
	body('email').isEmail(),
	// password required + at least 6 chars
	body('password').isString().bail().isLength({min: 6}),
]
