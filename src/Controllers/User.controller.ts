import { NextFunction, Request, Response, Router } from 'express';
import { UserService } from '../Services/_user/User.service';
import { UserRepository } from '../Services/_user/repository/User.repository';
import UserModel from '../Services/_user/repository/models/User.model';
import { ValidateToken } from '../middlewares/ValidateToken.middleware';
import { Cloudinary } from '../middlewares/Cloudinary.middleware';

const userController = Router();
const userRepository: UserRepository = new UserRepository(UserModel);
const userService: UserService = new UserService(userRepository);
const validateToken: ValidateToken = new ValidateToken(userRepository);
const cloudinary: Cloudinary = new Cloudinary();

userController.post('/',
(req: Request, res: Response, next: NextFunction) => cloudinary.filterImage(req, res, next),  
(req: Request, res: Response) => userService.newUser(req, res));
userController.post('/login', (req: Request, res: Response) => userService.login(req, res));
userController.post('/logout/:userId', 
(req: Request, res: Response, next: NextFunction) => validateToken.verify(req, res, next),
(req: Request, res: Response) => userService.logout(req, res)
);
userController.post('/new-token', (req: Request, res: Response) => userService.newToken(req, res));
userController.post('/new-password/:userEmail', (req: Request, res: Response) => userService.newPassword(req, res));
userController.delete('/delete/:userId', 
(req: Request, res: Response, next: NextFunction) => validateToken.verify(req, res, next), 
(req: Request, res: Response) => userService.delete(req, res));
userController.put('/edit/:userEmail', 
(req: Request, res: Response, next: NextFunction) => validateToken.verify(req, res, next), 
(req: Request, res: Response, next: NextFunction) => cloudinary.filterImage(req, res, next), 
(req: Request, res: Response) => userService.edit(req, res));
userController.post('/check-token', 
(req: Request, res: Response, next: NextFunction) => validateToken.verify(req, res, next, true), 
(req: Request, res: Response) => userService.checkToken(req, res));

export default userController;
