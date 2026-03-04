
import express from 'express';
import { createProductByVendor, deleteProductByVendor, getProductsByVendorV, updateStockQuantity } from '../controller/vendorController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';


const vendorRoutes=express.Router();

//vendorRoutes.get('/pending',getNotVeriedVendors);
vendorRoutes.get('/prodbyvendor',authMiddleware, authorize("vendor"),getProductsByVendorV);
vendorRoutes.post('/createproduct',authMiddleware,authorize("vendor"),createProductByVendor);
vendorRoutes.put('/deleteprod/:productId',authMiddleware,authorize("vendor","admin"),deleteProductByVendor);
vendorRoutes.put('/updatequantity/:productId',authMiddleware,authorize("vendor"),updateStockQuantity);
export default vendorRoutes;