import express from 'express';
import { getAllProductsByCategory } from '../controller/userController.js';

const userRouter=express.Router();

userRouter.get('/productsByCategory/:categoryId',getAllProductsByCategory);
export default userRouter;