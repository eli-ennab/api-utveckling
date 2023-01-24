import express from "express"
import prisma from "./prisma" // importing the prisma instance we created
import morgan from "morgan"

const app = express()
app.use(express.json())
app.use(morgan('dev'))

/**
 * GET /
 */

// app.get('/', (req, res) => {
// 	res.send({
// 		message: "I AM API, BEEP BOOP",
// 	})
// })

// GET /phones, all phones
app.get('/phones', async (req, res) => {
	try {
		const phones = await prisma.phones.findMany()
		res.send(phones)
	} catch (err) {
		console.error(err)
		res.status(500).send ( { message: "Something went wrong querying the database. Internal server error."})
	}
})

// GET /phones/:phoneId, one phone and the user of that specific phone
// n:1
app.get('/phones/:phoneId', async (req, res) => {
	const phoneId = Number(req.params.phoneId)

	try {
		const phone = await prisma.phones.findUniqueOrThrow({
			where: {
				id: phoneId,
			},
			include: {
				user: true,
			}
		})

		res.send(phone)

	} catch (err){
		console.error(err)
		res.status(404).send ({
			message: "Not found.",
		})
	}
})

// GET /users, all users
app.get('/users', async (req, res) => {
	try {
		const users = await prisma.users.findMany()
		res.send(users)
	} catch (err) {
		console.error(err)
		res.status(500).send ( { message: "Something went wrong querying the database. Internal server error."})
	}
})

// GET /users/:userId, one user and that specific person's phone(s)
// 1:n
app.get('/users/:userId', async (req, res) => {
	const userId = Number(req.params.userId)

	try {
		const user = await prisma.users.findUniqueOrThrow({
			where: {
				id: userId,
			},
			include: {
				phones: true,
			}
		})

		res.send(user)

	} catch (err){
		console.error(err)
		res.status(404).send ({
			message: "Not found.",
		})
	}
})

export default app
