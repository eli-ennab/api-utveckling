import express from "express"
import prisma from "./prisma" 	// importing the prisma instance we created
import morgan from "morgan"

const app = express()
app.use(express.json())			// middleware
app.use(morgan('dev'))			// middleware

// GET /
app.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

// GET /authors
app.get('/authors', async (req, res) => {
	try {
		const authors = await prisma.author.findMany({
			include: {
				books: true,
			}
		})
		res.send(authors)
	} catch {
		res.status(500).send({ message: "Something went wrong." })
	}
})

// POST /authors
app.post('/authors', async (req, res) => {
	try {
		const author = await prisma.author.create({
			data: {
				name: req.body.name,
				birthdate: req.body.birthdate,
			}
		})
		res.send(author)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong." })
	}
})

app.post('/authors/:authorId/books', async (req, res) => {
	try {
		const result = await prisma.author.update({
			where: {
				id: Number(req.params.authorId)
			},
			data: {
				books: {
					connect: {
						id: req.body.bookId,
					}
				}
			}
		})
		res.send(result)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong." })
	}
})

// GET /books
app.get('/books', async (req, res) => {
	try {
		const books = await prisma.book.findMany()
		res.send(books)
	} catch {
		res.status(500).send({ message: "Something went wrong." })
	}
})

// POST /books
app.post('/books', async (req, res) => {
	try {
		const book = await prisma.book.create({
			data: {
				title: req.body.title,
				pages: req.body.pages,
				isbn: req.body.isbn,
				publisherId: req.body.publisherId,
			}
		})
		res.send(book)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong." })
	}
})

export default app
