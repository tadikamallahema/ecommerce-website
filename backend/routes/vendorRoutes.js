
import express from 'express';
import { createProductByVendor, deleteProductByVendor, getOrdersByVendors, getProductsByVendorV, getTProducts, getTSalesByVendors, pendingOrders, topSellingProd, updateStockQuantity } from '../controller/vendorController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';
import { AdminDeleteProduct, changeProductStatus } from '../controller/adminController.js';
import { updateProductController } from '../controller/productController.js';


const vendorRoutes=express.Router();

//vendorRoutes.get('/pending',getNotVeriedVendors);
vendorRoutes.get('/prodbyvendor',authMiddleware, authorize("vendor"),getProductsByVendorV);
vendorRoutes.post('/createproduct',authMiddleware,authorize("vendor"),createProductByVendor);
vendorRoutes.put('/deleteprod/:productId',authMiddleware,authorize("vendor","admin"),deleteProductByVendor);
vendorRoutes.put('/updatequantity/:productId',authMiddleware,authorize("vendor"),updateStockQuantity);
vendorRoutes.delete('/deleteproduct/:productId',AdminDeleteProduct);
vendorRoutes.put('/updateprodstatus/:productId',changeProductStatus);
vendorRoutes.put('/updateprod/:productId',updateProductController);
vendorRoutes.get('/gettprods',authMiddleware,getTProducts);
vendorRoutes.get('/getorderv',authMiddleware,getOrdersByVendors);
vendorRoutes.get('/gettsales',authMiddleware,getTSalesByVendors);
vendorRoutes.get('/toppro',authMiddleware,topSellingProd);
vendorRoutes.get('/pendingprod',authMiddleware,pendingOrders);
export default vendorRoutes;
