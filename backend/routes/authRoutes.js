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

authRoutes.get("/check", authMiddleware,authorize("user"), (req, res) => {
    console.log("You are authenticated")
    return res.status(200).json({
        message: "Auth middleware is working!",
        user: req.user // contains id and role from JWT
    });
});
export default authRoutes;