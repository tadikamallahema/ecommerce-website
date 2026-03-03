import express from 'express';
import { createPaymentOrder, getMyPayments, handlePaymentFailure, verifyPayment } from '../controller/paymentController';

const paymentRouter=express.Router();

paymentRouter.post('/createPayment',createPaymentOrder);
paymentRouter.post('/verify',verifyPayment);
paymentRouter.post('/failure',handlePaymentFailure);
paymentRouter.get('/mypayments/:user_id',getMyPayments);

export default paymentRouter;