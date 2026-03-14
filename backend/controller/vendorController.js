import { createProduct, deleteProduct, getProductByIdAcc, getProductBySlug, getProductsByVendor, updateStock } from "../models/productModel.js";
import {  getOrderByV, getTotalProducts, getTotalSales, getVendors, pendOrders, topProd } from "../models/vendorModel.js";


export const getAllVendors=async(req,res)=>{
    try{
        const vendors= await getVendors();
        return res.status(200).json({success:true,message:"List of vendors are",vendors});
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

//vendor - see all productsby vendor ,  update stock quantity ,
// delete product ,create & update product 

/* export const createProductByVendor=async(req,res)=>{
  const {name,slug,sku,price, discount_price,stock_quantity,description,main_image,category_id}=req.body;
  const vendorId=req.user.id;
  if(!name ||!sku ||!price ||!discount_price|| stock_quantity===undefined ||stock_quantity===null || ! description || !slug ||! main_image||  !category_id){
    return res.status(400).json({success:false,message:"Few details are missing "});
  }
  try{
    const existingProduct = await getProductBySlug(slug);
if (existingProduct && existingProduct.length > 0) {   // ← if found → conflict
    return res.status(409).json({ success: false, message: "A product with this slug already exists" });
}
  await createProduct(name, slug, sku, price, discount_price, stock_quantity, description, main_image, vendorId, category_id);
    return res.status(200).json({success:true,message:"Created Product successfully"})
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }
} */

export const createProductByVendor = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const vendorId = req.user.id;

    const {
      name,
      slug,
      sku,
      price,
      discount_price,
      stock_quantity,
      description,
      main_image,
      category_id,
    } = req.body;

    if (
      !name ||
      !slug ||
      !price ||
      stock_quantity === undefined ||
      !description ||
      !main_image ||
      !category_id
    ) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await createProduct(
      name,
      slug,
      sku || null,
      price,
      discount_price ?? null,
      stock_quantity,
      description,
      main_image,
      vendorId,
      category_id
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
export const deleteProductByVendor=async(req,res)=>{
  const {productId}=req.params;
  const vendorId=req.user.id; // from JWT 
  try{
    const product=await getProductByIdAcc(productId);
    if(!product || product.vendorId!==vendorId){
      return res.status(403).json({success:false,message:"Not allowed or  product not found "});
    }
    await deleteProduct(productId);
    return res.status(200).json({success:true,message: "Product deleted successfully" });
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }
}
export const getProductsByVendorV=async(req,res)=>{
    const vendorId=req.user.id;
    if(!vendorId){
       return res.status(400).json({success:false,message:"No Vendor is found "}); 
    }
    try{
        const products =await getProductsByVendor(vendorId);
        if(!products|| products.length==0){
           return res.status(404).json({ success: false, message: "No products found" }); 
        }
        return res.status(200).json({ success: true, products});
    }catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export const updateStockQuantity=async(req,res)=>{
    const {productId}=req.params;
    const {quantity}=req.body;
    if(!productId || quantity<=0|| quantity===undefined){
        return res.status(400).json({success:false, message:"No product is found or quantity is wrong"});
    }
    try{
        const result=await updateStock(productId,quantity);
        if(!result.is_admin_verified){
          return res.status(404).json({success:false,message:"Product is not verified by the admin"})
        }
        if (result.affectedRows === 0) {
        return res.status(404).json({success: false,message: "Insufficient stock or product not found",
      });
    }
        return res.status(200).json({ success: true, message:"Stock updated successfully"});
    }catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}


//vendor dashboard related analytics 

export const getTProducts=async(req,res)=>{
  const vendorId=req.user.id;
  if(!vendorId){
    return res.status(404).json({success:false,message:"No vendor is found"});
  }
  try{
    const products=await getTotalProducts(vendorId);
    return res.status(200).json({success:true,message:`Products of vendor:${vendorId}`,products});
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }
}
export const getOrdersByVendors=async(req,res)=>{
  const vendorId=req.user.id;
  if(!vendorId){
    return res.status(404).json({success:false,message:"No vendor is found"});
  }
  try{
    const orders=await getOrderByV(vendorId);
    return res.status(200).json({success:true,message:`Orders of vendor:${vendorId}`,orders});
  }catch(err){
    console.log(err);
    return res.status(500).json({success:false,message:err.message});
  }
}
export const getTSalesByVendors=async(req,res)=>{
  const vendorId=req.user.id;
  if(!vendorId){
    return res.status(404).json({success:false,message:"No vendor is found"});
  }
  try{
    const sales=await getTotalSales(vendorId);
    return res.status(200).json({success:true,message:`Sales of vendor:${vendorId}`,sales});
  }catch(err){
    console.log(err);
    return res.status(500).json({success:false,message:err.message});
  }
}

export const topSellingProd=async(req,res)=>{
    const vendorId=req.user.id;
    try{
      const products= await topProd(vendorId);
      return res.status(200).json({success:true,message:`Top selling Products of vendor:${vendorId}`,products});
    }catch(err){
      return res.status(500).json({success:false,message:err.message});
    }
}

export const pendingOrders=async(req,res)=>{
  const vendorId=req.user.id;
  try{
    const pending= await pendOrders(vendorId);
      return res.status(200).json({success:true,message:`Pending orders of vendor:${vendorId}`,pending});
  }catch(err){
    console.log(err);
      return res.status(500).json({success:false,message:err.message});
    }
}