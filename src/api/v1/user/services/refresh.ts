import jwt from 'jsonwebtoken'
import 'dotenv/config'
import token from '#~/model/token.schema.ts'
import { TokenData } from '#~/dro/token.interface.ts'

const access_token_key = process.env.ACCESS_TOKEN_KEY
const access_token_expires_time = process.env.ACCESS_TOKEN_EXPIRES_TIME
const refresh_token_key = process.env.REFRESH_TOKEN_KEY
const refresh_token_expires_time = process.env.REFRESH_TOKEN_EXPIRES_TIME

async function refresh({refreshToken} : any) : Promise<TokenData> {
	try{

		const decodedToken = jwt.verify(refreshToken, refresh_token_key) as { user_id: string; session_id: string };
        const {user_id, session_id} = decodedToken

		const accessToken = jwt.sign(
			{
				user_id,
				session_id
			},
			access_token_key,
			{
				expiresIn: access_token_expires_time,
			}
		)

        // Update accessToken
		await token.updateOne(
            {user_id, session_id},
            {$set:{accessToken}}
        )
		return	{
            accessToken, 
            refreshToken
        }
	}
	catch (err) {
		return Promise.reject({status: 401, message: 'Unauthorized'})
	}

}

export default refresh