import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { UserService } from '#~/api/v1/user/services/index.ts'
import { RequestWithUser } from '#~/dro/user.interface.ts'

const access_token_key = process.env.ACCESS_TOKEN_KEY

export const authenticate = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    
    try {
        const accessToken = req.headers.authorization.split(' ')[1]
		const decodedToken  = jwt.verify(accessToken, access_token_key) as {user_id: string, session_id: string}
        const {user_id, session_id} = decodedToken

        const userService = new UserService()
        const userInfo = await userService.getInfo(user_id)

        req.userInfo = userInfo

        next()

    } catch (err) {
        console.log(err)
        next({status: 401, message: 'Unauthorized'})
 
    }
}
