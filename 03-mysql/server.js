/**
 * Express Server
 */

// Require stuff
require('dotenv').config()
const express = require('express')
const _ = require('lodash')
const morgan = require('morgan')
const PORT = 3000

// Get the client
const mysql = require('mysql2/promise')		// importing a version that handles promises

// console.log(process.env.DATABASE_HOST)

// Create the connection to the database
const connection = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME
  });

// Create a new Express app
const app = express()

// Parse any incoming JSON
app.use(express.json())

// Log information about all incoming requests using morgan
app.use(morgan('dev'))

// GET /
app.get('/', (req, res) => {
	res.send({
		message: "Oh, hi there ☺️",
	})
})

/**
 * GET /directors
 *
 * Get all directors
 */
app.get('/directors', async (req, res) => {
	const db = await connection
	const [rows] = await db.query('SELECT * FROM directors')
	res.send(rows)
})

/**
 * GET /directors/:directorId
 *
 * Get a single director
 */
app.get('/directors/:directorId', async (req, res) => {
	const { directorId } = req.params

	const db = await connection
	const [rows] = await db.query('SELECT * FROM directors WHERE id = ?', [ directorId ])

	// guard clause
	if (!rows.length) {
		res.status(404).send({ message: 'No such record exists.' })
		return
	}

	res.send(rows[0])
})

// GET /movies
app.get('/movies', async (req, res) => {
	const db = await connection
	const [rows] = await db.query('SELECT * FROM movies')
	res.send(rows)
})

/*
* 1. Add route and logic for retrieveing just one movie (ex: /movies/2)
* 2. Handle if no movie with the requested id exists
*/

app.get('/movies/:movieId', async (req, res) => {
	const { movieId } = req.params // same as const movieId = req.params.movieId
	const db = await connection
	const [rows] = await db.query(`SELECT * FROM movies WHERE id = ?`, [ movieId ])

	// Guard clause
	if (!rows.length) {
		res.status(404).send({ message: 'No such record exists.' })
		return
	}

	res.send(rows[0])
})

/*
* POST /movie
*
* Create a movie
*/

app.post('/movies', async (req, res) => {
	console.log("Incoming!", req.body)

	const { title, genre, runtime, release_date} = req.body

	// STEP 1: Check that all required data is present, otherwise fail with HTTP 400
	if (typeof genre !== "string" || typeof title !== "string") {
		res.status(400).send({
			message: "Title or genre is missing, or data is not a string."
		})
		return
	}

	// STEP 2: Check that the incoming data is of the correct data type
	if (runtime && typeof runtime !== "number") {
		res.status(400).send({
			message: "runtime has to be a number."
		})
		return
	}

	// ! known bugs !
	const releaseDate = new Date(release_date)
	if (release_date && (!releaseDate instanceof Date || isNaN(releaseDate)) ) {
		res.status(400).send({
			message: "release_date has to be a valid date."
		})
		return
	  }

	const db = await connection
	const [result] = await db.query('INSERT INTO movies SET ?', {
		title,
		genre,
		runtime,
		release_date,
	})

	// Send back the received data and append the id of the newly created record
	res.status(201).send({
		...req.body,
		id: result.insertId,
	})
})

/*
* PATCH /movies/:movieId
*
* Update an existing movie
*/

app.patch('/movies/:movieId', async (req, res) => {
	const db = await connection

	try {
		const result = db.query('UPDATE movies SET ? WHERE id = ?', [req.body, req.params.movieId])
	} catch (err)  {
		res.status(500).send( { message: "Bad data. Try again."})
	}

	res.send(req.body)
})

/**
 * DELETE /movies/:movieId
 *
 * Delete a movie
 */
app.delete('/movies/:movieId', async (req, res) => {
	const db = await connection

	try {
		const result = db.query('DELETE FROM movies WHERE id = ?', [req.params.movieId])

	} catch (err) {
		res.status(500).send({ message: "Y U DELETE ALREADY DELETED MOVIE?!"})
	}

	res.send({ message: "K." })
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
