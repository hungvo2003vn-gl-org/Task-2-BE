import { UserController } from "./controllers/user.controller.ts"
import { UserService } from "./services/index.ts"

const userService = new UserService()
const userController = new UserController(userService)

const user_router = userController.router

export default user_router