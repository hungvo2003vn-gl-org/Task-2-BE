import {Router} from 'express'
import user_router from './user/index.ts'

const ver1_router = Router()
ver1_router.use('/users', user_router)

export default ver1_router