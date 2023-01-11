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
//   console.log(joke)

  // Generate a random number between 0 and the last index of the array
	const randomIndex = Math.floor(Math.random() * joke.length);

	// Get the joke at the randomly generated index
	const randomJoke = joke[randomIndex];

	console.log(randomJoke);
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
