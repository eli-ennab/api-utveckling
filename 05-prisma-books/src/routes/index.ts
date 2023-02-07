import express from 'express'
import authors from './authors'
import books from './books'
import profile from './profile'
import publishers from './publishers'
import { login, register } from '../controllers/user_controller'
import { createUserRules } from '../validations/user_rules'
import { basic } from '../middlewares/auth/basic'

// Instatiate a new router
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

// /profile
router.use('/profile', basic, profile)

// /publishers
router.use('/publishers', publishers)

// POST /login
router.post('/login', login)

// POST /register
router.post('/register', createUserRules, register)

export default router
