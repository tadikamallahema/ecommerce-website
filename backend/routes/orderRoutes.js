import express from 'express';
import { getMyOrder, getOrderDetails, getUserOrderHistory, placeOrder, updateOrderStatus } from '../controller/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const orderRoutes=express.Router();

orderRoutes.use(authMiddleware);
orderRoutes.post('/placeorder',placeOrder);
orderRoutes.get('/myorders',getMyOrder);
orderRoutes.get('/getbyidhis',getUserOrderHistory);
orderRoutes.get('/:orderId',getOrderDetails);
orderRoutes.put('/:orderId/status',updateOrderStatus);
export default orderRoutes;