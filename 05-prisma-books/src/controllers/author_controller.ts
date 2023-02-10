/**
 * Author template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getAuthors, getAuthor, createAuthor } from '../services/author_service'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('prisma-books:author_controller')

/**
 * Get all authors
 */
export const index = async (req: Request, res: Response) => {
	try {
		const authors = await getAuthors()
		res.send({
			status: "success",
			data: authors,
		})
	} catch (err) {
		res.status(500).send({ message: "Something went wrong" })
	}
}

/**
 * Get a single author
 */
export const show = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId)

	try {
		const author = await getAuthor(authorId)
		res.send({
			status: "success",
			data: author,
		})

	} catch (err) {
		debug("Error thrown when finding book with id %o: %o", req.params.authorId, err)
		return res.status(404).send({ status: "error", message: "Not found" })
	}
}

/**
 * Create an author
 */
export const store = async (req: Request, res: Response) => {
	// Check for any validation errors
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	try {
		const author = await createAuthor( {
			name: req.body.name,
		})
		res.send({
			status: "success",
			data: author,
		})
	} catch (err) {
		res.status(500).send({ message: "Something went wrong" })
	}
}

/**
 * Update an author
 */
export const update = async (req: Request, res: Response) => {
}

/**
 * Delete an author
 */
export const destroy = async (req: Request, res: Response) => {
}

/**
 * Link a book to an author
*/
export const addBook = async (req: Request, res: Response) => {

	const bookIds = req.body.bookIds.map ( (bookId: number) => {
		return {
			id: bookId,
		}
	})
	console.log("Books after map:", bookIds)

	try {
		const result = await prisma.author.update({
			where: {
				id: Number(req.params.authorId),
			},
			data: {
				books: {
					connect: bookIds,
				}
			},
			include: {
				books: true,
			}
		})
		res.status(201).send(result)
	} catch (err) {
		debug("Error thrown when adding book %o to an author %o: %o", bookIds, req.params.authorId, err)
		res.status(500).send({ message: "Something went wrong" })
	}
}

/**
 * Remove book from author
 */
export const removeBook = async (req: Request, res: Response) => {
	try {
		await prisma.author.update({
			where: {
				id: Number(req.params.authorId),
			},
			data: {
				books: {
					disconnect: {
						id: Number(req.params.authorId),
					}
				}
			}
		})
	} catch (err) {
		debug("Error thrown when removing book %o from author %o: %o", req.body.bookId, req.params.authorId, err)
		res.status(500).send({ message: "Something went wrong" })
	}
}
