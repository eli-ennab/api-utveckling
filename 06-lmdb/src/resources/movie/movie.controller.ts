import { Request, Response } from 'express'
import Debug from 'debug'
import { Movie } from './movie.model'
import { validationResult } from 'express-validator'

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
		// Find a single movie
		const movie = await Movie.findById(movieId)

		// If no movie was found, report 404
		if (!movie) {
			return res.sendStatus(404)
		}

		// Respond with movie
		res.send({
			status: "success",
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
export const store = async (req: Request, res: Response) => {
	// check for any validation errors
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	try {
		// Find a single movie
		const newMovie = new Movie({
			title: req.body.title,
			runtime: req.body.runtime,
			releaseYear: req.body.releaseYear,
		})

		await newMovie.save()

		// If no movie was found, report 404
		if (!newMovie) {
			return res.sendStatus(404)
		}

		// Respond with movie
		res.send({
			status: "success",
			data: newMovie,
		})

	} catch (err) {
		debug("Error thrown when creating movie", err)
		res.status(500).send({ status: "error", message: "Error thrown when creating movie" })
	}
}
