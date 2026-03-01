import express from 'express';
import { getAllProductsByCategory, getUserByUserId } from '../controller/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter=express.Router();

userRouter.get('/productsByCategory/:categoryId',getAllProductsByCategory);
userRouter.get('/profile',authMiddleware,getUserByUserId);
export default userRouter;