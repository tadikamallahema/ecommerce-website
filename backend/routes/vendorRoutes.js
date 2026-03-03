
import express from 'express';
import { createProductByVendor, deleteProductByVendor, getProductsByVendorV, updateStockQuantity } from '../controller/vendorController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';
//import { getNVerified } from '../models/vendorModel.js';

const vendorRoutes=express.Router();

//vendorRoutes.get('/pending',getNotVeriedVendors);
vendorRoutes.get('/prodbyvendor',authMiddleware, authorize("vendor"),getProductsByVendorV);
vendorRoutes.post('/createproduct',authMiddleware,createProductByVendor);
vendorRoutes.put('/deleteprod/:productId',deleteProductByVendor);
vendorRoutes.put('/updatequantity/:productId',updateStockQuantity);
export default vendorRoutes;