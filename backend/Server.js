import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { alterUserTable, createUserTable } from './models/userModel.js';
import dotenv from 'dotenv';
import { alterVendorTable, createVendorTable } from './models/vendorModel.js';
import adminRoutes from './routes/adminRoutes.js';
import createAdminTable from './models/adminModel.js';
import vendorRoutes from './routes/vendorRoutes.js';
import cookieParser from 'cookie-parser';
import createCategoryTable from './models/categoryModel.js';
import createProductTable from './models/productModel.js';

dotenv.config();

const app=express();
const port=2007;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
await createUserTable();
await createVendorTable();
//await alterUserTable();
//await alterVendorTable();
await createAdminTable();
await createCategoryTable();
await createProductTable();
app.use('/api',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/vendor',vendorRoutes);

app.listen(port ,()=>{
    console.log(`Server is runnin on ${port}`);
})