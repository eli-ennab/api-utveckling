import express from 'express'
import { movieRules } from '../../validation/movie.validator'
const router = express.Router()
import { index, show, store } from './movie.controller'

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
router.post('/', movieRules, store)

export default router
