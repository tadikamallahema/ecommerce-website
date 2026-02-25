import express from 'express';
import { verifyVendor } from '../controller/adminController.js';

const adminRoutes=express.Router();

adminRoutes.post('/verifyvendor/:vendorId',verifyVendor);

export default adminRoutes;