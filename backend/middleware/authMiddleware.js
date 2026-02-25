import jwt from 'jsonwebtoken';

 const authMiddleware=(req,res,next)=>{
    const token=req.cookies?.token;// This is safe and recommended else it will consider as unauthorized 

    if(!token){
        return res.status(401).json({success:false,message:"unauthorized"});
    }
    //console.log(token);//to verify its incoming 
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode; //{id,role} - will be getting
        next();
        console.log(req.user);
    }catch(err){
        return res.status(401).json({success:false,message:"Invalid or expired token"});
    }
}
export default authMiddleware;
