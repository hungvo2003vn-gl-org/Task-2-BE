import user from '#~/model/user.schema.ts'
import bcrypt from 'bcrypt'
import { CreateUserDto } from '../dto/index.ts'
import { UserData } from '#~/dro/user.interface.ts'

async function register({
	email,
	password,
    username,
	birthdate
} : CreateUserDto) : Promise<UserData>{

	const userRecord = await user.findOne({email})
	if (userRecord) {
		return Promise.reject({
			status: 403,
			message: 'The email has been registered',
		})
	} 
    
    
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    //Create new user
    const newUser = await user.create({
        email,
        password: hashedPassword,
        username,
	    birthdate
    })

    //Return user
    return {
        id: newUser._id.toString(),
        username,
        email,
        birthdate: newUser.birthdate
    }
	
}
export default register