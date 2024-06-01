import { Request, Response, Router } from 'express';
import { UserService } from '../Services/_user/User.service';
import { UserRepository } from '../Services/_user/repository/User.repository';
import UserModel from '../Services/_user/repository/models/User.model';

const userController = Router();
const userRepository: UserRepository = new UserRepository(UserModel);
const userService: UserService = new UserService(userRepository);

userController.post('/', (req: Request, res: Response) => userService.newUser(req, res));
userController.post('/login', (req: Request, res: Response) => userService.login(req, res));
userController.post('/new-token', (req: Request, res: Response) => userService.newToken(req, res));
userController.post('/new-password/:userEmail', (req: Request, res: Response) => userService.newPassword(req, res));

export default userController;
