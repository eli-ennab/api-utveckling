/*
* Express Server
*/

// Require Express
const express = require('express')

// Create a port
const PORT = 3000

// Create a new Express app
const app = express()

// GET /
app.get(('/'), (req, res) => {
	// res.send("Hello, world.")
	res.send({
		message: "Hello, world.",
		feeling: "Happy.",
		express: [
			"Yes.",
			"Yas.",
			"Yea."
		]
	})
})

// GET /coffee
app.get(('/coffee'), (req, res) => {
	res.send("is good for you.")
})

// POST /
app.post(('/'), (req, res) => {
	res.send("I am no mailbox.")
})

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	console.log(`Server started on localhost: ${PORT}`)
})


