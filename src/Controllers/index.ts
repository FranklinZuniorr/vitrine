import { Router } from 'express';
import userController from './User.controller';
import paymentController from './Payment.controller';
import productsController from './Products.controller';

const controllers = Router();

controllers.use('/user', userController);
controllers.use('/payment', paymentController);
controllers.use('/products', productsController);

export default controllers;
