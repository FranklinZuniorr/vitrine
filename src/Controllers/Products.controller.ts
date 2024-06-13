import { NextFunction, Request, Response, Router } from 'express';
import { ProductsRepository } from '../Services/products/repository/Products.repository';
import { ProductsService } from '../Services/products/Products.service';
import ProductsModel from '../Services/products/repository/models/Products.model';
import { UserRepository } from '../Services/_user/repository/User.repository';
import { ValidateToken } from '../middlewares/ValidateToken.middleware';
import UserModel from '../Services/_user/repository/models/User.model';
import { SubtractTicket } from '../middlewares/SubtractTicket.middleware';

const productsController = Router();
const productsRepository: ProductsRepository = new ProductsRepository(ProductsModel);
const productsService: ProductsService = new ProductsService(productsRepository);
const userRepository: UserRepository = new UserRepository(UserModel);
const validateToken: ValidateToken = new ValidateToken(userRepository);
const subtractTicket: SubtractTicket = new SubtractTicket(userRepository);

productsController.post('/new', 
(req: Request, res: Response, next: NextFunction) => validateToken.verify(req, res, next),
(req: Request, res: Response, next: NextFunction) => subtractTicket.subtract(req, res, next, 1),
(req: Request, res: Response) => productsService.newProduct(req, res)
);
productsController.put('/edit/:productId', 
(req: Request, res: Response, next: NextFunction) => validateToken.verify(req, res, next),
(req: Request, res: Response, next: NextFunction) => subtractTicket.subtract(req, res, next, 1),
(req: Request, res: Response) => productsService.editProduct(req, res)
)
productsController.get('/all/:userId', 
(req: Request, res: Response, next: NextFunction) => validateToken.verify(req, res, next),
(req: Request, res: Response) => productsService.getAllByUser(req, res)
)
productsController.get('/one/:productId', 
(req: Request, res: Response, next: NextFunction) => validateToken.verify(req, res, next),
(req: Request, res: Response) => productsService.getById(req, res)
)
productsController.get('/search/:productName', 
(req: Request, res: Response, next: NextFunction) => validateToken.verify(req, res, next),
(req: Request, res: Response) => productsService.getBySearch(req, res)
)
productsController.delete('/one/:productId', 
(req: Request, res: Response, next: NextFunction) => validateToken.verify(req, res, next),
(req: Request, res: Response) => productsService.deleteById(req, res)
)

export default productsController;
