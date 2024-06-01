import { Request, Response, Router } from 'express';
import { UserRepository } from '../Services/_user/repository/User.repository';
import UserModel from '../Services/_user/repository/models/User.model';
import { PaymentService } from '../Services/payment/Payment.service';
import bodyParser from 'body-parser';

const paymentController = Router();
const userRepository: UserRepository = new UserRepository(UserModel);
const paymentService: PaymentService = new PaymentService(userRepository);

paymentController.post(
    '/stripe-create-checkout-session/:userId', 
    bodyParser.raw({type: 'application/json'}), 
    (req: Request, res: Response) => paymentService.stripeCheckout(req, res));
paymentController.post('/stripe-webhook-confirm', (req: Request, res: Response) => paymentService.confirmStrip(req, res))

export default paymentController;
