import { createProduct, deleteProduct, getProductBySlug, getProductsByVendor, updateStock } from "../models/productModel.js";
import { getNVerified, getVendors } from "../models/vendorModel.js";


export const getAllVendors=async(req,res)=>{
    try{
        const vendors= await getVendors();
        return res.status(200).json({success:true,messaage:"List of vendors are",vendors});
    }catch(err){
        return res.status(500).json({success:false,messaage:err.messaage});
    }
}
export const getNotVeriedVendors=async(req,res)=>{
    try{
        const vendors=await getNVerified();
    return res.status(200).json({success:true,messaage:"List of vendors are",vendors});
    }catch(err){
        return res.status(500).json({success:false,messaage:err.messaage});
    }
}
//vendor - see all productsby vendor ,  update stock quantity ,
// delete product ,create & update product 

export const createProductByVendor=async(req,res)=>{
  const {name,slug,sku,price, discount_price,stock_quantity,description,main_image,category_id}=req.body;
  const vendor_id=req.user.id;
  if(!name ||!sku ||!price ||!discount_price|| stock_quantity===undefined ||stock_quantity===null || ! description || !slug ||! main_image|| !vendor_id|| !category_id){
    return res.status(400).json({success:false,message:"Few details are missing "});
  }
  try{
    const product=await getProductBySlug(slug);
    if(product){
      return res.status(409).json({success:false,message:"Already Product is existing "})
    }
    await createProduct(name,slug,sku,price, discount_price,stock_quantity,description,main_image,vendor_id,category_id);
    return res.status(200).json({success:true,message:"Created Product successfully"})
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }
}
export const deleteProductByVendor=async(req,res)=>{
  const {productId}=req.params;
  const vendorId=req.user.id; // from JWT 
  try{
    const product=await getProductById(productId);
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
        if(!products || products.length==0){
           return res.status(404).json({ success: false, message: "No products found" }); 
        }
        return res.status(200).json({ success: true, products });
    }catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export const updateStockQuantity=async(req,res)=>{
    const {productId}=req.params;
    const {quantity}=req.body;
    if(!productId || quantity<=0|| quantity===undefined){
        return res.status(400).json({success:false, messaage:"No product is found or quantity is wrong"});
    }
    try{
        const result=await updateStock(productId,quantity);
        if (result.affectedRows === 0) {
        return res.status(404).json({success: false,message: "Insufficient stock or product not found",
      });
    }
        return res.status(200).json({ success: true, messaage:"Stock updated successfully"});
    }catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
