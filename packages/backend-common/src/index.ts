import dotenv from 'dotenv'
import redisrepository from './utils/roommanager'

dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET || '123456'



