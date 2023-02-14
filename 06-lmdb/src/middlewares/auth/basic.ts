/**
 * HTTP Basic Authentication Middleware
 */
import bcrypt from 'bcrypt'
import Debug from 'debug'
import { Request, Response, NextFunction } from 'express'

const debug = Debug('prisma-books:basic')

