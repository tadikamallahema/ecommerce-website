import { addReview, getReviewByProduct } from "../models/reviewModel.js";

export const createReview=async(req,res)=>{
    try{
        const userId=req.user.id;
        const {productId,rating,comment}=req.body;
        if(rating<0 || rating>5){
         return res.status(400).json({success:false,message:"Please give valid rating (1-5"});   
        }
        if(!productId || !rating||!comment){
            return res.status(400).json({success:false,message:"Every field is required"})
        }
        await addReview(userId,productId,rating,comment);
        return res.status(201).json({success:true,message:"Review added successfully"});

    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:err.message});
    }
}

export const getReviews=async(req,res)=>{
    try{
        const {productId}=req.params;
        const result=await getReviewByProduct(productId);
        
        if(result.length===0){
        return res.status(404).json({success:false,message:"No review is found"});
        }
        return res.status(200).json({success:true,message:`Review of product are`,result});
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}