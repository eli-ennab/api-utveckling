import express from "express"
import movieRouter from './resources/movie/movie.router'
import { Movie } from './resources/movie/movie.model'

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

export default router
