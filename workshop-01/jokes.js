// Require Express
const express = require('express')

// Create a port
const PORT = 3000

// Create a new Express app
const app = express()

const fs = require('fs');

let joke

fs.readFile('data/oneliners.json', (err, data) => {
  if (err) throw err;
  joke = JSON.parse(data);
});

// GET /
app.get(('/'), (req, res) => {
	res.send({
		"joke": joke,
	})
})

// POST /
app.post(('/'), (req, res) => {
	res.send("I am no mailbox.")
})

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	console.log(`Server started on localhost: ${PORT}`)
})
