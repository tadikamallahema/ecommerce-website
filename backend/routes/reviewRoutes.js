import express from 'express';
import { createReview, getReviews } from '../controller/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const reviewRouter=express.Router();

reviewRouter.post('/addreview',authMiddleware,createReview);
reviewRouter.get('/reviews/:productId',getReviews);

export default reviewRouter;