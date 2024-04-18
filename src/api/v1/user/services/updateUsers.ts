import { UserData } from "#~/dro/user.interface.ts"
import user from '#~/model/user.schema.ts'

async function updateUsers( data: UserData[]) : Promise<UserData[]> {

    const updatePromises = data.map(async (userRecord: UserData): Promise<UserData> => {

        const { id, email, username, birthdate} = userRecord

        const updatedUser = await user.findByIdAndUpdate(
            id, 
            {
                email,
                username,
                birthdate: new Date(birthdate)
            }, 
            { new: true }
        )

        if(!updatedUser) return null;

        return {
            id: updatedUser._id.toString(),
            email: updatedUser.email,
            username: updatedUser.username,
            birthdate: updatedUser.birthdate 
        }
    })

    const updatedUsers: UserData[] = await Promise.all(updatePromises);
    const filteredUsers: UserData[] = updatedUsers.filter(userRecord => userRecord !== null && userRecord !== undefined);

    return filteredUsers

}

export default updateUsers