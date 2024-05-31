import { Router } from 'express';
import userController from './User.controller';

const controllers = Router();

controllers.use('/user', userController);

export default controllers;
