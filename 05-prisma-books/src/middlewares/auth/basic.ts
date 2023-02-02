/**
 * HTTP Basic Authentication Middleware
 */
import Debug from 'debug'
import { BADFAMILY } from 'dns'
import { Request, Response, NextFunction } from 'express'

const debug = Debug('prisma-books:basic')

export const basic = (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/basic!")

	// Make sure Authorization Header exists, otherwise bail
	debug(req.headers)
	if (!req.headers.authorization) {
		debug("Authorization header missing")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	// Split Authorization header on ` `
	debug("Authorization header: %o", req.headers.authorization)
	const [authSchema, base64Payload ] = req.headers.authorization.split(" ")

	// Check that Authorization scheme is "Basic", otherwise bail
	if (authSchema.toLowerCase() !== "basic") {
		debug("Authorization schema is not Basic")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	// Decode credentials from base64 => ascii
	const decodedPayload = Buffer.from(base64Payload, "base64").toString("ascii")
	// debug("decodedPayload:", decodedPayload)

	// Split decodedPayload (credentials) on `:`
	const [email, password] = decodedPayload.split(":")

	// Get user from database, otherwise bail

	// Verify hash against credentails, otherwise bail

	// Attach User to Request

	// All is ok, nothing to see here, move along...
	next()
}
