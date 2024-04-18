import { UserData } from "#~/dro/user.interface";
import user from '#~/model/user.schema.ts'


async function getUsers({
    name,
    email
} : any) : Promise<UserData[]> {

    const query: any = {};
    if (name) {
        query['username'] = { $regex: name.toLowerCase(), $options: 'i' };
    }
    if (email) {
        query['email'] = { $regex: email.toLowerCase(), $options: 'i' };
    }

    const userRecords = await user
    .find(query)
    .select(`
        _id
        email
        username
        birthdate
    `)

    const userDataArray: UserData[] = userRecords.map((record: any) => {
        return {
            id: record._id.toString(),
            username: record.username,
            email: record.email,
            birthdate: record.birthdate,
        }
    })

    return userDataArray
}

export default getUsers