import { createUser, getUserByEmail } from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createVendor, getVByEmail } from "../models/vendorModel.js";
import { createAdmin, getAdminByEmail } from "../models/adminModel.js";
import crypto from "crypto";
import { sendEmail } from "../config/email.js";
import db from "../config/db.js";

export const userRegister=async(req,res)=>{
    try{
    const {name,phone_number,email,password}=req.body;
    if(!name || !phone_number|| !email||!password){
        return res.status(400).json({success:false,message:"Few details are missing"});
    }
    const existingUser=await getUserByEmail(email);
    if(existingUser){
        return res.status(409).json({success:true,message:"User already exists"});
    }
    const hashed=await bcrypt.hash(password,10);
    // code to send email 
    const token=crypto.randomBytes(32).toString("hex");
    const expiry= new Date(Date.now()+24*60*60*1000);


    await createUser(name,phone_number,email,hashed,token,expiry);

    const verifyLink=`http://localhost:5173/verifyemail/${token}`;
    const emailHTML = `
      <h2>Verify Your Account</h2>
      <p>Please click the button below to verify your email.</p>

      <a href="${verifyLink}" 
         style="padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px;">
         Verify Email
      </a>

      <p>If the button doesn't work, copy this link:</p>
      <p>${verifyLink}</p>
    `;
    try{
    await sendEmail(email,"Verify your account ",emailHTML);
    }catch(err){ console.log("Email sending failed",err.message);}
    return res.status(201).json({message:"User registered,.Please verify your email"}, );
    }catch(err){
        //console.log(err);
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
        return res.status(200).json({message:"User LoggedIn successfully and token is stored in cookies"});
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

export const logout=async(req,res)=>{
    res.clearCookie("token",{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    res.clearCookie("refreshToken",{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    return res.status(200).json({message:"Logged out successfully"})
}

export const verifyEmail=async(req,res)=>{
    const {email}=req.body;
    //console.log(email);
    const user=await getUserByEmail(email);
    //console.log(user);
    if(user.length===0){
        return res.status(404).json({ message: "Email not found" });
    }
    res.json({ message: "Email exists" });
}

export const resetPassword=async(req,res)=>{
    const {email,password}=req.body;
    const hash=await bcrypt.hash(password,10);
    await db.execute(
        `update users set password=? where email=?`,
        [hash,email]
    );
    res.json({message:"Password updated successfully"})
}