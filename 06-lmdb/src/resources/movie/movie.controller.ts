import { Request, Response } from 'express'
import Debug from 'debug'
import { Movie } from './movie.model'
import mongoose from 'mongoose'

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
		const movie = await Movie.findById(movieId).populate('director', 'name').populate('actors', 'name')

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
	try {
		// Create and save a new Movie
		const movie = await new Movie(req.body).save()

		// Respond with the newly created Movie
		res.status(201).send({
			status: "success",
			data: movie,
		})

	} catch (err) {
		debug("Error thrown when creating movie", err)

		if (err instanceof mongoose.Error.ValidationError) {
			return res.status(400).send({ status: "error", message: err.message })
		}

		res.status(500).send({ status: "error", message: "Error thrown when creating a new movie" })
	}
}

/**
 * Update a movie
 */
export const update = async (req: Request, res: Response) => {
	const movieId = req.params.movieId

	try {
		// Update Movie
		const movie = await Movie.findByIdAndUpdate(movieId, req.body)

		if (!movie) {
			return res.sendStatus(404)
		}

		// Respond with the updated Movie
		res.status(200).send({
			status: "success",
			data: null,
		})

	} catch (err) {
		debug("Error thrown when creating movie", err)

		if (err instanceof mongoose.Error.ValidationError) {
			return res.status(400).send({ status: "error", message: err.message })
		}

		res.status(500).send({ status: "error", message: "Error thrown when updating a movie" })
	}
}
