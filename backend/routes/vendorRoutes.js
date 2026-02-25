
import express from 'express';
import { getAllVendors, getNotVeriedVendors } from '../controller/vendorController.js';
//import { getNVerified } from '../models/vendorModel.js';

const vendorRoutes=express.Router();

//vendorRoutes.get('/pending',getAllVendors);
vendorRoutes.get('/pending',getNotVeriedVendors);

export default vendorRoutes;