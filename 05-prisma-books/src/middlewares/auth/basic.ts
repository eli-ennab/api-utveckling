/**
 * HTTP Basic Authentication Middleware
 */
import bcrypt from 'bcrypt'
import Debug from 'debug'
import { Request, Response, NextFunction } from 'express'
import { getUserByEmail } from '../../services/user_service'

const debug = Debug('prisma-books:basic')

export const basic = async (req: Request, res: Response, next: NextFunction) => {
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
	const user = await getUserByEmail(email)
	if(!user) {
		debug("User %s does not exist", email)

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	debug("incoming email", email)
	debug("incoming password", password)
	debug("user", user)

	// Verify hash against credentails, otherwise bail
	const result = await bcrypt.compare(password, user.password)

	debug("result of bcrypt compare:", result)

	if (!result) {
		debug("Password for user %s did not match", email)

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}
	debug("Password for user %s was correct", email)

	// Attach User to Request with definition merging
	req.user = user

	// All is ok, nothing to see here, move along... index.ts will send you to profile.ts
	next()
}
