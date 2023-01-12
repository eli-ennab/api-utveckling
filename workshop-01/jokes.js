// Require Express
const express = require('express')

// Create a port
const PORT = 3000

// Create a new Express app
const app = express()

// Define filesystem
const fs = require('fs');

// All jokes
let jokes

// A random joke
let randomJoke

// Reading oneliners
fs.readFile('data/oneliners.json', (err, data) => {
	if (err) throw err;
	jokes = JSON.parse(data);
	console.log(jokes)

	// Generate a random number between 0 and the last index of the array
	const randomIndex = Math.floor(Math.random() * jokes.length);

	// Get the jokes at the randomly generated index
	randomJoke = jokes[randomIndex];

	console.log(randomJoke);
});

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
app.get(('/'), (req, res) => {
	res.send({
		"joke": randomJoke,
	})
})

// POST /
app.post(('/'), (req, res) => {
	res.send("I am no mailbox.")
})

// Catch requests where a route does not exist
app.use((req, res) => {
	res.send({
		message: "Sorry, no such route exists",
	})
})

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	console.log(`Server started on localhost: ${PORT}`)
})
