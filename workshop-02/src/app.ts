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

app.get('/users', async (req, res) => {
	const users = await prisma.users.findMany()
	res.send(users)
})

export default app
