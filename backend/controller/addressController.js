import { addAddress, addressDelete, getUserAddress, updateAddresses } from "../models/addressModel.js";


export const insertAddress=async(req,res)=>{
    try{
        const userId=req.user.id;
        const {full_name,phone,address_line,city,state,pincode}=req.body;
        if(!full_name || !phone||!address_line||!city||!state||!pincode){
                return res.status(400).json({success:false,message:"Few details are missing"});
        }
        
        await addAddress(userId,full_name,phone,address_line,city,state,pincode);
        return res.status(201).json({success:true,message:"User address added successfully"});
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export const getMyAddress=async(req,res)=>{
    try{
        const userId=req.user.id;
        const address=await getUserAddress(userId);
        return res.status(200).json({success:true,message:"User address",address});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export const updateAddress=async(req,res)=>{
    try{
        const {id}=req.params;
        const userId=req.user.id;
        const {full_name,phone,address_line,city,state,pincode}=req.body;

       const result= await updateAddresses(id,userId,full_name,phone,address_line,city,state,pincode) ;
       if(result.affectedRows === 0){
        return res.status(404).json({success:false,message:"Address not found"});
        }
        return res.status(200).json({success:true,message:"User Address is updated"});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export const deleteAddress=async(req,res)=>{
    try{
        const {id}=req.params;
        const userId=req.user.id;

        const result =await addressDelete(id,userId);
        if(result.affectedRows === 0){
        return res.status(404).json({success:false,message:"Address not found"});
        }
        return res.status(200).json({success:true,message:"User address deleted"});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}