/*
* Express Server
*/

// Require Express
const express = require('express')

// Create a port
const PORT = 3000

// Create a new Express app
const app = express()

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	console.log(`Server started on localhost: ${PORT}`)
})


