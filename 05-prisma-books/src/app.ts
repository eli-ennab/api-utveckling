import cors from 'cors'
import express from "express"
import prisma from "./prisma" 	// importing the prisma instance we created
import morgan from "morgan"
import routes from "./routes"

const app = express()
app.use(cors())
app.use(express.json())			// middleware
app.use(morgan('dev'))			// middleware

// Use routes
app.use(routes)

export default app				// used in server.ts
