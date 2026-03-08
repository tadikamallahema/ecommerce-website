import { getCartItems, removeCartItems } from "../models/cartItemsModel.js";
import { getCartByUser } from "../models/cartModel.js";
import { addOrderItem, getOrderItems } from "../models/orderItemsModel.js";
import { createOrder, getUserOrders,updateOrderStatusById } from "../models/orderModel.js";
import db from '../config/db.js';
/*
export const placeOrder=async(req,res)=>{
    const userId=req.user.id;
    try{
        const cart=await getCartByUser(userId);
        if(!cart) return res.status(400).json({success:false,message:"No item is added to cart"});
        const items=await getCartItems(cart.id);
        if(items.length===0) return res.status(400).json({ message: "Cart empty" });
        let total=0;
        items.forEach(i=> total+=i.price_at_time* i.quantity);

        const orderId=await createOrder(userId,total);
        for(const item of items){
            await addOrderItem(orderId,item);
        }
        await removeCartItems(cart.id);
        return res.status(200).json({success:true,message:"Items added to cart","orderId":orderId})
    }catch(err){
        return res.status(500).json({success:false, message:err.message});
    }
}
*/
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await getCartByUser(userId);
    if (!cart) return res.status(400).json({ message: "Cart not found" });

    const items = await getCartItems(cart.id);
    if (items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const totalAmount = items.reduce((sum, item) => {
      const price = parseFloat(item.price_at_time) || 0;  
      const qty = parseInt(item.quantity) || 0;
      return sum + price * qty;
    }, 0);

    if (!totalAmount || isNaN(totalAmount)) {
      return res.status(400).json({ message: "Invalid cart prices. Please remove and re-add items." });
    }

    const [orderResult] = await db.execute(
      `INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)`,
      [userId, totalAmount, "pending"]   // ← was "PENDING" — not in ENUM
    );
    const orderId = orderResult.insertId;

    for (const item of items) {
      const price = parseFloat(item.price_at_time);
      const qty = parseInt(item.quantity);
      const productId = item.product_id;

      if (!productId || isNaN(price) || isNaN(qty)) {
        await db.execute(`DELETE FROM orders WHERE id = ?`, [orderId]);
        return res.status(400).json({ message: `Bad data for product ${productId}. Order cancelled.` });
      }

      await db.execute(
        `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
        [orderId, productId, qty, price]
      );
    }
    await removeCartItems(cart.id);
    return res.status(201).json({ success: true, message: "Order placed", orderId });
  } catch (err) {
    console.error("placeOrder error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};
export const getMyOrder=async(req,res)=>{
    const orders=await getUserOrders(req.user.id);
    if(!orders) return res.status(404).json({success:false,message:"No order are there for the user"});
    return res.status(200).json({success:true,orders})
};


export const getOrderDetails=async(req,res)=>{
    const items=await getOrderItems(req.params.orderId);
    if(!items) return res.status(404).json({success:false,message:"No Items are there for the order"})
    return res.status(200).json({success:true,items})
}



export const updateOrderStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;
    const { status } = req.body;

    const allowedStatus = ["paid", "cancelled"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status"
      });
    }

    const updated = await updateOrderStatusById(
      orderId,
      userId,
      status
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Order not found or unauthorized"
      });
    }

    return res.json({
      success: true,
      message: "Order status updated successfully"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getUserOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id; 
    const orders = await getUserOrders(userId); 

    const successfulOrders = orders.filter(
      (order) => order.status === "paid" || order.status==='pending'
    );

    return res.status(200).json({success: true,orders: successfulOrders,});
  } catch (err) {
    console.error(err);
    console.log(err);
    return res.status(500).json({success: false,message: err.message,});
  }
};