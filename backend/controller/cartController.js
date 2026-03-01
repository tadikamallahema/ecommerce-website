import { addItemToCart, getCartItems, removeCartItems } from "../models/cartItemsModel.js";
import { createCartforUser, getCartByUser } from "../models/cartModel.js";


export const getCart=async(req,res)=>{
    const userId=req.user.id;
    let cart=await getCartByUser(userId);
    if(!cart){
        await createCartforUser(userId);
        cart=await getCartByUser(userId);
    }
    const items=await getCartItems(cart.id);
    return res.status(200).json({success:true, message:"Item added to cart",items});
}

export const addToCart=async(req,res)=>{
    const userId=req.user.id;
    const {productId,quantity,price}=req.body;
    let cart=await getCartByUser(userId);
    if(!cart){
        await createCartforUser(userId);
        cart=await getCartByUser(userId);
    }
    await addItemToCart(cart.id,productId,quantity,price);
    return res.status(200).json({success:true,message:"Items added to cart"});
}

export const updateCart=async(req,res)=>{
    const userId=req.user.id;
    const {productId,quantity}=req.body;

    const cart=await getCartByUser(userId);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    if (quantity <= 0) {
        await removeCartItems(cart.id, productId);
    } else {
        await updateQuantity(cart.id, productId, quantity);
    }

    return res.status(200).json({ message: 'Cart updated' });
}

export const removeCartItem = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await getCartByUser(userId);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    await removeCartItems(cart.id, productId);

    return res.status(200).json({ message: 'Item removed from cart' });
};
export const clearUserCart = async (req, res) => {
    const userId = req.user.id;

    const cart = await getCartByUser(userId);
    if (!cart) return res.json({ message: 'Cart already empty' });

    await clearCartItems(cart.id);

    return res.status(200).json({ message: 'Cart cleared' });
};