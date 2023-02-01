// Register controller
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import prisma from '../prisma'

// Get all publishers
export const register = async (req: Request, res: Response) => {
	// Check for any validation errors
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	// // Get only the validated data from the request
	// const validatedData = matchedData(req)

	// Calculate a hash and salt for the password

	// Store the user in the database

	// Respond with 201 Created + status success
	res.status(201).send({ "status": "success", "data": req.body })
}
