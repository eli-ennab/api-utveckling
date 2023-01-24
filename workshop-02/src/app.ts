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

// GET /phones, all phones
app.get('/phones', async (req, res) => {
	const phones = await prisma.phones.findMany()
	res.send(phones)
})

// // GET one user
// app.get('/users/:id', async (req, res) => {
// 	const users = await prisma.users.findMany()
// 	res.send(users)
// })

// // GET one phone
// app.get('/phones/:id', async (req, res) => {
// 	const phones = await prisma.phones.findMany()
// 	res.send(phones)
// })

export default app
