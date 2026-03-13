import { searchProduct, updateProduct } from "../models/productModel.js";

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

export const updateProductController = async (req, res) => {

  const { productId } = req.params;

  const {name,slug,sku,price,discount_price,stock_quantity,description,main_image,category_id} = req.body;
  try {
    const result = await updateProduct(productId,name,slug,sku,price,discount_price,stock_quantity,description,main_image,category_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({success: false,message: "Product not found or inactive"});
    }
    return res.status(200).json({success: true,message: "Product updated successfully"});

  } catch (err) {
    console.log(err);
    return res.status(500).json({success: false,message: err.message});
  }
};