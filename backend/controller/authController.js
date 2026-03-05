import { createUser, getUserByEmail } from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createVendor, getVByEmail } from "../models/vendorModel.js";
import { createAdmin, getAdminByEmail } from "../models/adminModel.js";
export const userRegister=async(req,res)=>{
    try{
    const {name,phone_number,email,password}=req.body;
    if(!name || !phone_number|| !email||!password){
        return res.status(400).json({success:true,message:"Few details are missing"});
    }
    const existingUser=await getUserByEmail(email);
    if(existingUser){
        return res.status(409).json({success:true,message:"User already exists"});
    }
    const hashed=await bcrypt.hash(password,10);
    await createUser(name,phone_number,email,hashed);
    return res.status(201).json({message:"User registered Successfully"}, );
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

export const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    if(!email|| !password){
        return res.status(400).json({success:false,message:"Few details are missing"});
    }
    try{
        const user=await getUserByEmail(email);
        if(!user){
            return res.status(404).json({message:"User doesn't exists"});
        }
        const valid=await bcrypt.compare(password,user.password);
        if(!valid){
            return res.status(401).json({message:"Passowrd is Invalid"});
        }
        const token=jwt.sign({id:user.id, role:user.role},process.env.JWT_SECRET,{expiresIn:'10m'});
        const refreshToken=jwt.sign({id:user.id,role:user.role},process.env.REFRESH_SECRET,{expiresIn:'1d'});
        res.cookie("token",token,
            {
                httpOnly:true,
                secure:false,
                sameSite:"lax",
                maxAge:10*60*1000
            } );
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:1*24*60*60*1000      //1 day
        })
        return res.status(200).json({message:"User LoggedIn successfully and token is stored in cookies",user});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

export const vendorRegistration=async(req,res)=>{
    try{
        const {name,email,phone_number,password,business_name,business_type}=req.body;
        if(!name|| ! email || !phone_number||!password|| !business_name||!business_type){
            return res.status(400).json({success:false,message:"Few details are missing"});
        }
        const existingVendor=await getVByEmail(email);
        if(existingVendor){
            return res.status(409).json({success:false,message:"Vendor already exists"});
        }
        const hashed=await bcrypt.hash(password,10);
        const vendor=await createVendor(name,email,phone_number,hashed,business_name,business_type);
        return res.status(201).json({success:true,message:"Vendor registered successfully , you can login once admin approve your profile",vendor})
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}
export const vendorLogin=async(req,res)=>{
    const {email,password}=req.body;
    if(!email|| !password){
        return res.status(400).json({success:false,message:"Few details are missing"});
    }
    //console.log(email,password);
    try{
        const vendor=await getVByEmail(email);
        
        if(!vendor){
            return res.status(404).json({success:false,message:"Vendor doesnt exists"});
        }
        if (!vendor.is_admin_verified) {
        return res.status(403).json({success: false,message: "Your profile is not approved by admin yet"});
        }
        const valid=await bcrypt.compare(password,vendor.password);
        if(!valid){
            return res.status(401).json({message:"Passowrd is Invalid"});
        }
        const token=jwt.sign({id:vendor.id,role:vendor.role},process.env.JWT_SECRET,{expiresIn:'10m'});
        res.cookie("token",token,
            {
                httpOnly:true,
                secure:false,
                sameSite:"lax",
                maxAge:10*60*1000
            } );
        return res.status(200).json({message:"Vendor LoggedIn successfully and token is stored in cookies",vendor});
        
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
        //console.log(err);
    }
}

// this need to be used once so , comment this after done with registering a user 
/*
export const adminRegister=async(req,res)=>{
    const{name,email,password}=req.body;
    if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const exists = await getAdminByEmail(email);
  if (exists) {
    return res.status(409).json({ message: "Admin already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  await createAdmin(name, email, hashed);

  return res.status(201).json({ message: "Admin created successfully" });
};*/

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  const admin = await getAdminByEmail(email);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: admin.id, role: admin.role },process.env.JWT_SECRET,{ expiresIn: '15m' });

  res.cookie("token", token, {
    httpOnly: true,
    secure:false,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000
  });

  return res.status(200).json({message: "Admin logged in",admin: { id: admin.id, name: admin.name, email: admin.email }});
};
