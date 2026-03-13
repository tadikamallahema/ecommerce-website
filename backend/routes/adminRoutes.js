import express from 'express';
import { AdminDeleteCategory, AdminDeleteProduct, changeCategoryStatus, changeProductStatus, createCategoryA, getAllProductsBA, getPendingProductsToApprove, getPendingVendorsToApprove, updateCatName, verifyProduct, verifyVendor } from '../controller/adminController.js';
import { getAllVendors } from '../controller/vendorController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';


const adminRoutes=express.Router();
adminRoutes.use(authMiddleware,authorize("admin"));
adminRoutes.get('/getAll',getAllVendors);
adminRoutes.post('/verifyvendor/:vendorId',verifyVendor);
adminRoutes.post('/verifyprod/:productId',verifyProduct);
adminRoutes.get('/pendingvendors',getPendingVendorsToApprove);
adminRoutes.get('/pendingproducts',getPendingProductsToApprove);
adminRoutes.post('/createcategory',createCategoryA);
adminRoutes.delete('/deletecategory/:categoryId',AdminDeleteCategory);

adminRoutes.get('/getAllproducts',getAllProductsBA);
adminRoutes.put('/updatecatstatus/:categoryId',changeCategoryStatus);
adminRoutes.put('/updateprodstatus/:productId',changeProductStatus);
adminRoutes.put('/updatename/:Id',updateCatName);


export default adminRoutes;
