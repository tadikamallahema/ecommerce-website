
import express from 'express';
import { createProductByVendor, deleteProductByVendor, getProductsByVendorV, updateStockQuantity } from '../controller/vendorController.js';
//import { getNVerified } from '../models/vendorModel.js';

const vendorRoutes=express.Router();

//vendorRoutes.get('/pending',getNotVeriedVendors);
vendorRoutes.get('/prodbyvendor',getProductsByVendorV);
vendorRoutes.post('/createproduct',createProductByVendor);
vendorRoutes.put('/deleteprod/:productId',deleteProductByVendor);
vendorRoutes.put('/updatequantity/:productId',updateStockQuantity);
export default vendorRoutes;