/**
 * JWT Authentication Middleware
 */

import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import router from '../../routes'
import { JwtPayload } from '../../types'

const debug = Debug('prisma-books:jwt')

/**
 * Validate JWT Access token
 *
 * Authorization Bearer <token>
 */
export const validateToken = (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/jwt!")

	// Make sure Authorization header exists, otherwise bail
	if (!req.headers.authorization) {
		debug("Authorization header missing")
		return res.status(401).send({
			status: "fail",
			message: "Authorization required"
		})
	}

	// Split Authorization header on ` `
	// "Bearer <token>"
	const [authSchema, token] = req.headers.authorization.split(" ")

	// Check that Authorization scheme is "Bearer", otherwise bail
	if(authSchema.toLowerCase() !== "bearer") {
		debug("Authorization schema is not Bearer")
		return res.status(401).send({
			status: "fail",
			message: "Authorization required"
		})
	}

	// Validate token attach payload to request, otherwise bail
	try {
		const payload = (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "") as unknown) as JwtPayload
		debug("Yay, got package: %o", payload)

		// Attach payload to Request
		req.token = payload

	} catch (err) {
		debug("Token failed verification", err)
		return res.status(401).send({
			status: "fail",
			message: "Authorization required"
		})
	}

	// pass request along
	next()
}
