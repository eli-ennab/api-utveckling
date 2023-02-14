import { Request, Response } from 'express'
import Debug from 'debug'
import { Movie } from './movie.model'

const debug = Debug('lmdb:movie.controller')

/**
 * Get all movies
 */
export const index = async (req: Request, res: Response) => {
	try {
		// find all movies
		const movies = await Movie.find()

		res.send({
			status:"success",
			data: movies,
		})

	} catch (err) {
		debug("Error thrown when finding movies", err)
		res.status(500).send({ status: "error", message: "Error thrown when finding movies" })
	}
}

/**
 * Get a single movie
 *
 * GET /movies/:movieId
 */
export const show = async (req: Request, res: Response) => {
	const movieId = req.params.movieId

	try {
		// find a single movie
		const movie = await Movie.findById(movieId)

		res.send({
			status:"success",
			data: movie,
		})

	} catch (err) {
		debug("Error thrown when finding movie '%s': %o", movieId, err)
		res.status(500).send({ status: "error", message: "Error thrown when finding movie" })
	}
}

/**
 * Create a movie
 */
