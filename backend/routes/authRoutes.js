import express from 'express';
import { adminLogin, userLogin, userRegister, vendorLogin, vendorRegistration } from '../controller/authController.js';
import authMiddleware from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/authorize.js';
const authRoutes=express.Router();

authRoutes.post('/register',userRegister);
authRoutes.post('/login',userLogin);

authRoutes.post('/vregister',vendorRegistration);
authRoutes.post('/vlogin',vendorLogin);

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