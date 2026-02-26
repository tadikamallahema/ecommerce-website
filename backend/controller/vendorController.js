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
//vendor - see all productsby vendor , update stock quantity , delete product ,create & update product 
