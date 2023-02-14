import express from 'express'
const router = express.Router()
import { index, show } from './movie.controller'
/**
 * GET /movies
 */
router.get('/', index)

/**
 * GET /movies/:movieId
 */
router.get('/:movieId', show)

/**
 * POST /movies
 */
router.post('/', async (req, res) => {})

export default router
