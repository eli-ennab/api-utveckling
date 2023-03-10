// Require Express
const express = require('express')
const oneliners = require('./data/oneliners.json')
const users = require('./data/users.json')
const _ = require('lodash')
const morgan = require('morgan')
const PORT = 3000

// Create a new Express app
const app = express()

// // Log information about all incoming requests
// app.use( (req, res, next) => {
// 	console.log("Someone requested something.")
// 	console.log(`Method: ${req.method}`)
// 	console.log(`Path: ${req.path}`)
// 	const now = new Date()
// 	console.log(`Time: ${now.toLocaleString()}`)
// 	next()
// })

// Parse any incoming JSON
app.use( express.json() )

// Log information about all incoming requests using morgan
app.use( morgan('dev') )
// app.use( morgan('tiny') )
// app.use( morgan('combined') )

// GET /
app.get('/', (req, res) => {
	// res.send("Oh, hi there ☺️")
	res.send({
		message: "Oh, hi there ☺️",
		lolcats: "Are funny",
		reactions_on_isaks_memes: [
			"rotflol",
			"yolo"
		],
	})
})

// POST /
app.post('/', (req, res) => {
	res.send("I'm no mailbox 😡")
})

// GET /coffee
app.get('/coffee', (req, res) => {
	res.send("Is good for you!")
})

// GET /joke
app.get('/joke', (req, res) => {
	// Get a random item from the array `oneliners`
	const joke = _.sample(oneliners)

	// Respond with a object containing the oneliner in the `joke` attribute
	res.send({
		joke,	// joke: joke
	})
})

// GET /users
// List all users
app.get('/users', (req, res) => {
	console.log("query-string:", req.query)	// { search: 'kalle' }
	res.send(users)
})

// POST /users
// Create a new user
app.post('/users', (req, res) => {
	console.log("Create user?")

	console.log("Body?", req.body)

	res.send({})
})

// GET /users/:userId
// Get the user with the id of userId
app.get('/users/:userId', (req, res) => {
	// Cast userId parameter into a Number
	// console.log("Params:", req.params)
	// const { userId } = req.params
	const userId = Number(req.params.userId)

	// Find user in users array
	const user = users.find(user => user.id === userId)

	// if (!user) {
	// 	res.status(404).send({
	// 		message: ` ${req.params.userId} is not a valid user.`,
	// 	})
	// }

	res.send(user)
})

// Catch requests where a route does not exist
app.use((req, res) => {
	res.status(404).send({
		message: `Sorry, no route exists for ${req.method} ${req.path}`,
	})
})

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	console.log(`🥳 Yay, server started on localhost:${PORT}`)
})
