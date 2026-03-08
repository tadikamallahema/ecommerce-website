
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { deleteAddress, getMyAddress, insertAddress, updateAddress } from '../controller/addressController.js';
const addressRoute=express.Router();

addressRoute.use(authMiddleware);
addressRoute.post('/addaddress',insertAddress);
addressRoute.get('/my',getMyAddress);
addressRoute.put('/:id',updateAddress);
addressRoute.delete('/:id',deleteAddress);

export default addressRoute;