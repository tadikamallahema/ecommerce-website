import express from 'express';
import { AdminDeleteCategory, AdminDeleteProduct, changeCategoryStatus, changeProductStatus, createCategoryA, getAllProductsBA, getPendingProductsToApprove, getPendingVendorsToApprove, verifyProduct, verifyVendor } from '../controller/adminController.js';
import { getAllVendors } from '../controller/vendorController.js';


const adminRoutes=express.Router();

adminRoutes.get('/getAll',getAllVendors);
adminRoutes.post('/verifyvendor/:vendorId',verifyVendor);
adminRoutes.post('/verifyprod/:productId',verifyProduct);
adminRoutes.get('/pendingvendors',getPendingVendorsToApprove);
adminRoutes.get('/pendingproducts',getPendingProductsToApprove);
adminRoutes.post('/createcategory',createCategoryA);
adminRoutes.put('/deletecategory/:categoryId',AdminDeleteCategory);
adminRoutes.put('/deleteproduct/:productId',AdminDeleteProduct);
adminRoutes.get('/getAllproducts',getAllProductsBA);
adminRoutes.put('/updatecatstatus/:categoryId',changeCategoryStatus);
adminRoutes.put('/updateprodstatus/:productId',changeProductStatus);
export default adminRoutes;
