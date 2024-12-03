// src/routes/orderRoutes.ts
import express from 'express';
import { createOrder, getOrders, getRecentOrders, getOrdersByUser, getUsersByProduct } from '../controllers/orderController';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/recent', getRecentOrders);
router.get('/user/:userId', getOrdersByUser);
router.get('/product/:productId', getUsersByProduct);

export default router;
