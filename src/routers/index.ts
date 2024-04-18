import { Router } from 'express'
import ver1_router from '../api/v1/index.ts'
const router = Router()

router.use('/v1', ver1_router)

export default router