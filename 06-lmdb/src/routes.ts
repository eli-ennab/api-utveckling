import express from "express"
import movieRouter from './resources/movie/movie.router'
import directorRouter from './resources/director/director.router'
import { Movie } from './resources/movie/movie.model'
import { Director } from './resources/director/director.model'

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', async (req, res) => {
	res.send({
		message: "I AM MOVIE-DB-API, GIVES POPCORN",
	})
})

/**
 * /movies
 */
router.use('/movies', movieRouter)

/**
 * /directors
 */
router.use('/director', directorRouter)

export default router
