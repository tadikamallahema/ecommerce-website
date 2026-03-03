import { getCategoryBySlug ,createCategory, getCategoryById, deleteCategory, toggleCategoryStatus, getAllCategories} from "../models/categoryModel.js";
import { approveProduct, createProduct, deleteProduct, getAllProducts, getProductByIdAcc, getProductByIdPen, getProductBySlug, pendingProducts, rejectProduct, toggleProductStatus } from "../models/productModel.js";
import { getVById,approveVendor,rejectVendor, getPendingVendors } from "../models/vendorModel.js";

export const verifyVendor=async(req,res)=>{
    const {vendorId}=req.params;
    const {approve,reason}=req.body;
    if(approve===undefined){
        return res.status(400).json({ message: "Approval decision required" });
    }
    const vendor=await getVById(vendorId);
    if (!vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  if (vendor.is_admin_verified) {
    return res.status(409).json({ message: "Vendor already approved" });
  }
  if(approve){
    await approveVendor(vendorId);
   return res.status(200).json({ message: "Vendor approved successfully" });
  } else {
    if (!reason) {
      return res.status(400).json({ message: "Rejection reason required" });
    }
    await rejectVendor(vendorId, reason);
    return res.status(200).json({ message: "Vendor rejected" });
    }
}

export const getPendingVendorsToApprove=async(req,res)=>{
  try{
    const vendors=await getPendingVendors();
    if(!vendors|| vendors.length===0){
      return res.status(200).json({success:true,vendors,message:"No vendors are pending to approve"})
    }
    
      return res.status(200).json({success:true,vendors})
  
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }
}

/*
usercontroller -get allproducts , get products by id , filter , sort ,getProductsByCategory
vendor - see all productsby vendor , update stock quantity , delete product ,create & update product 
*/

export const createCategoryA=async(req,res)=>{
  const {name,description,slug,image_url}=req.body;
  if(!name || ! description || !slug ||! image_url){
    return res.status(400).json({success:false,message:"Few details are missing "});
  }
  try{
    const category=await getCategoryBySlug(slug);
    if(category){
      return res.status(409).json({success:false,message:"Already category is existing "})
    }
    await createCategory(name,description,slug,image_url);
    return res.status(200).json({success:true,message:"Created category successfully"})
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
    console.log(err);
  }
}
export const AdminDeleteCategory=async(req,res)=>{
  const categoryId=Number(req.params.categoryId);
  try{
    const category=await getCategoryById(categoryId);
    if(!category){
      return res.status(400).json({success:false,message:"No Category is found "});
    }
    //console.log(categoryId);
    await deleteCategory(categoryId);
    //console.log(categoryId);
    return res.status(200).json({success:true,message: "Category deleted successfully" });
  }catch(err){
    console.log(err);
    return res.status(500).json({success:false,message:err.message});
  }
}
/*
export const createProductA=async(req,res)=>{
  const {name,slug,sku,price, discount_price,stock_quantity,description,main_image,vendor_id,category_id}=req.body;
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
  */
export const allCategories=async(req,res)=>{
  try{
    const categories=await getAllCategories();
    if(!categories){
      return res.status(400).json({success:false,message:"No Category is found "});
    }
    return res.status(200).json({success:true,categories});
  }catch(err){
    return res.status(500).json({success:false, message:err.message});
  }
}
export const verifyProduct=async(req,res)=>{
    const {productId}=req.params;
    const {approve}=req.body;
    if(approve===undefined){
      return res.status(400).json({ message: "Approval decision required" });
    }
    const product =await getProductByIdPen(productId);
    if(!product){
      return res.status(404).json({ message: "Product not found" });
    }
    if(product.is_admin_verified){
      return res.status(409).json({ message: "Product already approved" });
    }
    if(approve){
      await approveProduct(productId);
      return res.status(200).json({ message: "Product approved successfully" });
    }
    else{
      await rejectProduct(productId);
      return res.status(200).json({ message: "Product is rejected" });
    }
}

export const getPendingProductsToApprove=async(req,res)=>{
  try{
    const products=await pendingProducts();
    if(!products || products.length===0){
      return res.status(200).json({success:true,products:[],message:"No products are pending to approve"})
    }
      return res.status(200).json({success:true,products})
  
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }
}

export const getAllProductsBA=async(req,res)=>{
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

export const AdminDeleteProduct=async(req,res)=>{
  const {productId}=req.params;
  try{
    const product=await getProductByIdAcc(productId);
    if(!product){
      return res.status(400).json({success:false,message:"No product is found "});
    }
    await deleteProduct(productId);
    return res.status(200).json({success:true,message: "Product deleted successfully" });
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }
}

export const changeCategoryStatus=async(req,res)=>{
  const {categoryId}=req.params;
  const { is_active } = req.body;
  if (is_active === undefined) return res.status(400).json({ message: "is_active required" });
  try{
    await toggleCategoryStatus(categoryId,is_active);
    return res.status(200).json({ success: true, message: `category ${is_active ? "activated" : "deactivated"} successfully` });

  }catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
export const changeProductStatus=async(req,res)=>{
  const {productId}=req.params;
  const { is_active } = req.body;
  if (is_active === undefined) return res.status(400).json({ message: "is_active required" });
  try{
    await toggleProductStatus(productId,is_active);
    return res.status(200).json({ success: true, message: `Product ${is_active ? "activated" : "deactivated"} successfully` });

  }catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}