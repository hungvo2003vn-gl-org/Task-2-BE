import createToken from "./createToken.ts"
import getInfo from "./getInfo.ts"
import getUsers from "./getUsers.ts"
import login from "./login.ts"
import refresh from "./refresh.ts"
import register from "./register.ts"
import updateUsers from "./updateUsers.ts"


export class UserService {
    login = login
    register = register
    refresh = refresh
    getInfo = getInfo
    createToken = createToken
    getUsers = getUsers
    updateUsers = updateUsers
}