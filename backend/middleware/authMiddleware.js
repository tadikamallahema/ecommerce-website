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
       // console.log(req.user);
    }catch(err){
        return res.status(401).json({success:false,message:"Invalid or expired token"});
    }
}
export default authMiddleware;


export const refreshAccessToken = (req, res) => {

  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({success: false,message: "Refresh token missing"});
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 10 * 60 * 1000
    });

    return res.status(200).json({success: true,message: "Access token refreshed"});
  } catch (err) {
    return res.status(403).json({success: false,message: "Invalid refresh token"});
  }
};