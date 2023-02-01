import express from 'express'
import { body } from 'express-validator'
import authors from './authors'
import books from './books'
import publishers from './publishers'
import { register } from '../controllers/register_controller'
const router = express.Router()

// GET /
router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

// /authors
router.use('/authors', authors)

// /books
router.use('/books', books)

// /publishers
router.use('/publishers', publishers)

// Register
router.post('/register', [
	// validator rules:

	// name required + at least 3 chars
	body('name').isString().bail().isLength({min: 3}),

	// email required + valid email
	body('email').isEmail(),

	// password required + at least 6 chars
	body('password').isString().bail().isLength({min: 6}),
], register)

export default router
