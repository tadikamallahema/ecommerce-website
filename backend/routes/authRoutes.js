import express from 'express';
import { adminLogin, userLogin, userRegister, vendorLogin, vendorRegistration } from '../controller/authController.js';
import authMiddleware, { refreshAccessToken } from '../middleware/authMiddleware.js'
import rateLimit from 'express-rate-limit';
const authRoutes=express.Router();

const authRateLimiter=rateLimit({
    windowMs:5*60*1000, //5 min 
    max:3,
    message:{
      status:429,
      message:"Too many requests.Please try after 5 min"
    },
    standardHeaders: true,  //-> use modern rate limit headers
  legacyHeaders: false    //-? disable old deprecated headers 
})

authRoutes.post('/register',authRateLimiter,userRegister);
authRoutes.post('/login',authRateLimiter,userLogin);
authRoutes.post('/refresh',refreshAccessToken);
authRoutes.post('/vregister',authRateLimiter,vendorRegistration);
authRoutes.post('/vlogin',authRateLimiter,vendorLogin);

//authRoutes.post('/areg',adminRegister);
authRoutes.post('/alog',adminLogin);

authRoutes.get("/check", authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    role: req.user.role,
    id: req.user.id,
  });
});
export default authRoutes;