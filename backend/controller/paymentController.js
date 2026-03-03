import crypto from "crypto";
import razorpay from "../config/razorPay.js";
import { getOrderById, updateOrderStatusById } from "../models/orderModel.js";
import { createPayment, getUserPayments, markPaymentFailure, markPaymentSuccess, updateToVerify } from "../models/paymentModel.js";

export const createPaymentOrder=async(req,res)=>{
    try{
        const {orderId}=req.body;
        const order=await getOrderById(orderId);

        if(!order) return res.status(404).json({ message: "Order not found" });
        if(order.status!=='pending')  return res.status(400).json({ message: "Order already paid or invalid" });

        const razorpayOrder= await razorpay.orders.create({
            amount :order.total_amount*100,
            currency:"INR"
        });
        await createPayment(orderId,order.user_id,razorpayOrder.id,order.total_amount,
            "online","RAZORPAY"
        );
        res.status(200).json({success: true,    razorpayOrder});

    }catch(err){
        return res.status(500).json({success:false, message:err.message});
    }
}

export const verifyPayment=async(req,res)=>{
    try{
        const {order_id,razorpay_payment_id,razorpay_signature,razorpay_order_id}=req.body;

        const generated_signature=crypto.createHmac("sha256",process.env.RAZORPAY_TEST_SECRET_KEY)
        .update(razorpay_order_id+"|"+razorpay_payment_id)
        .digest("hex");
        await updateToVerify(order_id,razorpay_payment_id,razorpay_signature);

        if (generated_signature === razorpay_signature) {
            const order=await getOrderById(order_id);
            await markPaymentSuccess(order_id);
            await updateOrderStatusById(order_id,order.user_id, "paid");

            return res.status(200).json({success: true,message: "Payment successful"});
        } else {

            await markPaymentFailure(order_id, "Signature mismatch");

            return res.status(400).json({success: false,message: "Payment verification failed"});
        }
    }catch(err){
       return res.status(500).json({success:false, message:err.message}); 
    }
}

export const handlePaymentFailure = async (req, res) => {
    const { order_id, reason } = req.body;

    await markPaymentFailure(order_id, reason);

    return res.status(400).json({success: false,message: "Payment failed"});
};

export const getMyPayments=async(req,res)=>{
    try{
        const user_id=req.params.user_id;
        const payments =await getUserPayments(user_id);
        return res .status(200).json({success:true,payments})
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}