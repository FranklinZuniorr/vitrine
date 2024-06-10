import { NextFunction, Request, Response, Router } from 'express';
import { ProductsRepository } from '../Services/products/repository/Products.repository';
import { ProductsService } from '../Services/products/Products.service';
import ProductsModel from '../Services/products/repository/models/Products.model';
import { UserRepository } from '../Services/_user/repository/User.repository';
import { ValidateToken } from '../middlewares/ValidateToken.middleware';
import UserModel from '../Services/_user/repository/models/User.model';

const productsController = Router();
const productsRepository: ProductsRepository = new ProductsRepository(ProductsModel);
const productsService: ProductsService = new ProductsService(productsRepository);
const userRepository: UserRepository = new UserRepository(UserModel);
const validateToken: ValidateToken = new ValidateToken(userRepository);

productsController.post('/new', 
(req: Request, res: Response, next: NextFunction) => validateToken.verify(req, res, next),
(req: Request, res: Response) => productsService.newProduct(req, res)
);

export default productsController;
