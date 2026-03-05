import { searchProduct } from "../models/productModel.js";

//const imageUrl = req.body.imageUrl;

/* await db.execute(
  "INSERT INTO product (name, price, main_image) VALUES (?, ?, ?)",
  [req.body.name, req.body.price, imageUrl]
);
 */

export const searchInput=async(req,res)=>{
  const {keyword}=req.query;
  try{
    if(!keyword){
      return res.status(400).json({success:false, message:"Search requires keyword"});
    }
    const products=await searchProduct(keyword);
    return res.status(200).json({success:true,message:"Products are",products})

  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }
}