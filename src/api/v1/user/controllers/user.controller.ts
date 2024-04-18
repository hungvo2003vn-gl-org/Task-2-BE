import { NextFunction, Request, Response, Router } from "express";
import { UserService } from "../services/index.ts";
import { RequestWithUser, UserRO } from "#~/dro/user.interface.ts";
import { TokenRO } from "#~/dro/token.interface.ts";
import Controller from "#~/dro/controller.interface.ts";
import { authenticate } from "#~/middleware/auth.middleware.ts";
import validatorMiddleware from "#~/middleware/validator.middleware.ts";
import { LoginUserDto } from "../dto/loginUser.dto.ts";
import { CreateUserDto } from "../dto/createUser.dto.ts";

export class UserController implements Controller {

    public path = '/users'
    public router = Router();
    private userService : UserService

    constructor(otherUserService: UserService) {
        this.userService = otherUserService
        this.bindingContext()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post('/login', validatorMiddleware(LoginUserDto, false),this.login)
        this.router.post('/register', validatorMiddleware(CreateUserDto, false),this.register)
        this.router.post('/refresh', authenticate, this.refresh)
        this.router.get('/info', authenticate, this.getInfo)
        this.router.get('', authenticate, this.getUsers)
        this.router.post('/update', authenticate, this.updateUsers)
    }

    private bindingContext() {
        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
        this.refresh = this.refresh.bind(this)
        this.getInfo = this.getInfo.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.updateUsers = this.updateUsers.bind(this)
    }

    // Register
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password, username, birthdate} = req.body
            const data = await this.userService.register({
                email,
                password,
                username,
                birthdate
            })

            res.status(200).json({data})

        } catch (error) {
            next(error)
        }
    }
    
    // Login
    async login(req: Request, res: Response, next: NextFunction) {
        try {

            const {email, password} = req.body
            const data = await this.userService.login({ email, password })

            res.status(200).json({data})

        } catch (error) {
            next(error)
        }
    }

    // Refresh
    async refresh(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.body
            const data = await this.userService.refresh({refreshToken})

            res.status(200).json({data})
        } catch (error) {
            next(error)
        }
    }

    // Get Info
    async getInfo(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const data = req.userInfo
            res.status(200).json({data})
        } catch (error) {
            next(error)
        }
    }

    // Get Users
    async getUsers(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { name, email } = req.query
            const data = await this.userService.getUsers({ name, email })

            res.status(200).json({data})
        } catch (error) {
            next(error)
        }
    }

    // Update Users
    async updateUsers(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const payloads = req.body.data
            const data = await this.userService.updateUsers(payloads)

            res.status(200).json({data})
        } catch (error) {
            next(error)
        }
    }

}