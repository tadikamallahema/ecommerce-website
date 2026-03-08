import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import cookieParser from 'cookie-parser';
import imageUpload from './routes/imageUpload.js';
import userRouter from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import { searchInput } from './controller/productController.js';
import { verifyEmail } from './controller/emailController.js';
import addressRoute from './routes/addressRoute.js';
import { logout } from './controller/authController.js';

//import { logout } from './controller/authController.js';
/* import { alterUserTable, createUserTable } from './models/userModel.js';
import { alterUserTable2, createUserTable } from './models/userModel.js';
import createPaymentTable from './models/paymentModel.js';
import { alterVendorTable, createVendorTable } from './models/vendorModel.js';
import createAdminTable from './models/adminModel.js';
import createCategoryTable from './models/categoryModel.js';
import createProductTable from './models/productModel.js';
import createCartTable from './models/cartModel.js';
import createCartItemTable from './models/cartItemsModel.js';
import { createOrderTable } from './models/orderModel.js';
import { createOrderItemsTable } from './models/orderItemsModel.js';
 */
dotenv.config();

const app=express();
const port=2007;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
 //await createUserTable();
/*await createVendorTable();
//await alterUserTable();
//await alterVendorTable();
await createAdminTable();
await createCategoryTable();
await createProductTable();
await createCartTable();
await createCartItemTable();
await createOrderTable();
await createOrderItemsTable(); */
//await createPaymentTable();
/* await alterUserTable2(); */
//await createAddressTable();
app.use('/api',authRoutes);
app.use('/api/img',imageUpload);
app.use('/api/admin',adminRoutes);
app.use('/api/vendor',vendorRoutes);
app.use('/api/user',userRouter);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/pay',paymentRouter);
app.use('/api/address',addressRoute);
app.get('/api/search',searchInput);
app.post('/api/logout',logout);
app.get('/api/verifyemail/:token',verifyEmail);
app.listen(port ,()=>{
    console.log(`Server is runnin on ${port}`);
})