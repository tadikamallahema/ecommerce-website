import { addItemToCart, getCartItems, removeCartItems,removeSingleCartItem, updateQuantity } from "../models/cartItemsModel.js";
import { createCartforUser, getCartByUser } from "../models/cartModel.js";
import { getProductByIdAcc } from "../models/productModel.js";


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
/*
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
    */
   export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body; 

        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).json({ success: false, message: "Invalid product or quantity" });
        }
        const product = await getProductByIdAcc(productId);
        if (!product) {
          return res.status(404).json({ success: false, message: "Product not found or unavailable" });
        }
        //console.log(product);
        //console.log(product.stock_quantity);
        if(product.stock_quantity === 0){
          return res.status(400).json({message:"Product out of stock"})
        }
        const price = product.discount_price ?? product.price;

        let cart = await getCartByUser(userId);
        if (!cart) {
            await createCartforUser(userId);
            cart = await getCartByUser(userId);
        }

        await addItemToCart(cart.id, productId, quantity, price);
        return res.status(200).json({ success: true, message: "Item added to cart" ,product:{ id:product.id,
          name:product.name,
          price:product.price,
          stock:product.stock
        }});

    } catch (err) {
      //console.log(err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, action } = req.body;

    const cart = await getCartByUser(userId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const items = await getCartItems(cart.id);
    const item = items.find(i => i.product_id === productId);

    if (!item) return res.status(404).json({ message: "Item not found" });

    let newQty =
      action === "increase"
        ? item.quantity + 1
        : item.quantity - 1;

    if (newQty <= 0) {
      await removeSingleCartItem(cart.id, productId);
    } else {
      await updateQuantity(cart.id, productId, newQty);
    }

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeCartItem = async (req, res) => {
    const userId = req.user.id;
    const productId = parseInt(req.params.productId);

    const cart = await getCartByUser(userId);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    await removeSingleCartItem(cart.id, productId);

    return res.status(200).json({ message: 'Item removed from cart' });
};

export const clearUserCart = async (req, res) => {
    const userId = req.user.id;

    const cart = await getCartByUser(userId);
    if (!cart) return res.json({ message: 'Cart already empty' });

    await removeCartItems(cart.id);

    return res.status(200).json({ message: 'Cart cleared' });
};


export const checkout = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await getCartByUser(userId);
    if (!cart) {
      return res.json({ items: [], total: 0 });
    }

    const items = await getCartItems(cart.id);

    let total = 0;
    for (const item of items) {
      total += item.price_at_time * item.quantity;
    }

    return res.json({
      success: true,
      items,
      total
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
