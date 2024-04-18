import { UserData } from "#~/dro/user.interface.ts";
import user from "#~/model/user.schema.ts"

async function getInfo(user_id: string) : Promise<UserData> {

    const userRecord = await user.findById(user_id)

    //Not found
    if(!userRecord) {
        return Promise.reject({
            status: 404,
            message: "User not found!"
        })
    }

    const {_id, username, email, birthdate} = userRecord

    return {
        id: _id.toString(), 
        username, 
        email, 
        birthdate
    }
	
}

export default getInfo