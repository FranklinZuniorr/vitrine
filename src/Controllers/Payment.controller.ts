import { NextFunction, Request, Response, Router } from 'express';
import { UserRepository } from '../Services/_user/repository/User.repository';
import UserModel from '../Services/_user/repository/models/User.model';
import { PaymentService } from '../Services/payment/Payment.service';
import bodyParser from 'body-parser';
import { ValidateToken } from '../middlewares/ValidateToken.middleware';

const paymentController = Router();
const userRepository: UserRepository = new UserRepository(UserModel);
const paymentService: PaymentService = new PaymentService(userRepository);
const validateToken: ValidateToken = new ValidateToken(userRepository);

paymentController.post(
    '/stripe-create-checkout-session/:userId', 
    (req: Request, res: Response, next: NextFunction) => validateToken.verify(req, res, next),
    bodyParser.raw({type: 'application/json'}), 
    (req: Request, res: Response) => paymentService.stripeCheckout(req, res));
paymentController.post('/stripe-webhook-confirm', (req: Request, res: Response) => paymentService.confirmStrip(req, res))

export default paymentController;
