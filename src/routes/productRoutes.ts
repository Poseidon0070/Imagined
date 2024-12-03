import express from 'express';
import { createProduct, updateProduct, getProducts, getTotalStock } from '../controllers/productController';

const router = express.Router();

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.get('/', getProducts);
router.get('/stock', getTotalStock);

export default router;
