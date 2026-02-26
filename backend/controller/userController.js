//usercontroller -get allproducts ,  get products by id 
//, filter , sort ,getProductsByCategory

import { filterProduct, getAllProducts, getProductById } from "../models/productModel.js";

export const getAllProductsVe=async(req,res)=>{
  try{
    const products= await getAllProducts();
    if(!products){
      return res.status(400).json({success:false,message:"No product is found "});
    }
    return res.status(200).json({success:true,products});
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }
}

export const VenGetProdById=async(req,res)=>{
    const {productId}=req.params;
    if(productId==null){
        return res.status(400).json({success:false,message:"Invalid productId"})
    }
    try{
        const product=await getProductById(productId);
        return res.status(200).json({success:true,product}); 

    }catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
export const filterProducts=async(req,res)=>{
    const {minPrice,maxPrice,categoryId}=req.body;
    if(minPrice==0 ||maxPrice==0|| categoryId==0){
        return res.status(400).json({success:false,message:"Invalid Details"});
    }
    try{
        const product=await filterProduct(minPrice,maxPrice,categoryId);
        return res.status(200).json({success:true,message:"Products are filtered ",product});
    }catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}