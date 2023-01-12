// Require Express
const express = require('express')
const oneliners = require('./data/oneliners.json')
const _ = require('lodash')
const PORT = 3000

// Create a new Express app
const app = express()

// Log information about all incoming requests
app.use( (req, res, next) => {
	console.log("Someone requested something.")
	console.log(`Method: ${req.method}`)
	console.log(`Path: ${req.path}`)
	const now = new Date()
	console.log(`Time: ${now.toLocaleString()}`)
	next()
})

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

// Catch requests where a route does not exist
app.use((req, res) => {
	res.send({
		message: "Sorry, no such route exists",
	})
})

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	console.log(`🥳 Yay, server started on localhost:${PORT}`)
})
