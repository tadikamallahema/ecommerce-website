import express from 'express';
import { getAllProductsByCategory, getUserByUserId } from '../controller/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';
import { allCategories } from '../controller/adminController.js';

const userRouter=express.Router();
userRouter.use(authMiddleware);
userRouter.get('/productsByCategory/:categoryId',authorize("user"),getAllProductsByCategory);
userRouter.get('/profile',authorize("user"),getUserByUserId);
userRouter.get('/getallcategories' ,allCategories);
export default userRouter;