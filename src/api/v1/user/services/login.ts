import bcrypt from 'bcrypt'
import user from '#~/model/user.schema.ts'
import { LoginUserDto } from '../dto/index.ts'
import { TokenData } from '#~/dro/token.interface.ts'

async function login({
    email, 
    password
} : LoginUserDto) : Promise<TokenData> {

    const userRecord = await user.findOne({email})

    if (!userRecord) {
		return Promise.reject({
			status: 404,
			message: 'Email not exist',
		})
	} 
    
    
    const isPasswordRight= await bcrypt.compare(password, userRecord.password)

    if(isPasswordRight) {
        return await this.createToken(userRecord._id) //Context of UserService
    }

    else{
        return Promise.reject({
            status: 401,
            message: 'Password is not correct',
        })
    }
    
}

export default login