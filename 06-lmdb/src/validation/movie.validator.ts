import { body } from 'express-validator'

const currentYear = new Date().getFullYear()

export const movieRules = [
	body('title').isString().isLength( { min: 3 } ),
	body('runtime').optional().isInt( { min: 1} ),
	body('releaseYear').optional().isInt( { min: 1887, max: currentYear } )
]
