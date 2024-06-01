import { Router } from 'express';
import userController from './User.controller';
import paymentController from './Payment.controller';

const controllers = Router();

controllers.use('/user', userController);
controllers.use('/payment', paymentController);

export default controllers;
