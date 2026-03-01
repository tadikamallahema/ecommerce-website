import express from 'express';
import { addToCart, checkout, clearUserCart, getCart, removeCartItem, updateCart } from '../controller/cartController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const cartRoutes=express.Router();

cartRoutes.use(authMiddleware);
cartRoutes.get('/getcart',getCart);
cartRoutes.post('/add',addToCart);
cartRoutes.put('/update',updateCart);
cartRoutes.delete('/item/:productId',removeCartItem);
cartRoutes.delete('/clear',clearUserCart);
cartRoutes.get('/checkout',checkout);

export default cartRoutes;