//usercontroller -get allproducts ,  get products by id 
// , sort ,getProductsByCategory

import { filterProduct, getAllProducts, getProductByIdAcc, getProductsByCategory, sortProducts } from "../models/productModel.js";
import { getUserById } from "../models/userModel.js";

export const getUserByUserId=async(req,res)=>{
  const userId=req.user.id;
  try{
    const user=await getUserById(userId);
    if(!user){
      return res.status(400).json({success:false,message:"No user found"})
    }
    return res.status(200).json({success:true,message:"user details are",user})
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }
}
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
        const product=await getProductByIdAcc(productId);
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

export const userSortProducts=async(req,res)=>{
    const{sortBy,order}=req.query;
    try{
      const products =await sortProducts(sortBy,order);
      if(!products ||products.length===0){
        return res.status(404).json({ success: false, message: "No products found" });
      }
      return res.status(200).json({ success: true, products });
    }catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
export const getAllProductsByCategory=async(req,res)=>{
  const {categoryId}=req.params;
  if(!categoryId){
    return res.status(400).json({success:false,message:"No product is found "});
  }
  try{
    const products=await getProductsByCategory(categoryId);
    return res.status(200).json({success:true,message:`List of products of category ${categoryId}`,count:products.length,"products":products})
  }catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
export const getProductById=async(req,res)=>{
  try{
    const {productId}=req.params;
    if(!productId){
    return res.status(400).json({success:false,message:"No product is found "});
  }
  const product=await getProductByIdAcc(productId);
  return res.status(200).json({success:true,message:"product found","product":product})
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }
}