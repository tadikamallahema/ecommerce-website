import express from 'express';
import { getMyOrder, getOrderDetails, getUserOrderHistory, placeOrder, updateOrderStatus } from '../controller/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/authorize.js';

const orderRoutes=express.Router();

orderRoutes.use(authMiddleware);
orderRoutes.post('/placeorder',authorize("user"),placeOrder);
orderRoutes.get('/myorders',authorize("user"),getMyOrder);
orderRoutes.get('/getbyidhis',getUserOrderHistory);
orderRoutes.get('/:orderId',getOrderDetails);
orderRoutes.put('/:orderId/status',updateOrderStatus);
export default orderRoutes;