// src/controllers/productController.ts
import { Request, Response } from 'express';
import { products } from '../database';
import { Product } from '../models/productModel';
import { v4 as uuidv4 } from 'uuid';

export const createProduct = (req: Request, res: Response) => {
  const { name, category, price, stock } = req.body;
  const product: Product = { id: uuidv4(), name, category, price, stock };
  products.push(product);
  res.status(201).json(product);
};

export const updateProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, price, stock } = req.body;
  const product = products.find((p) => p.id === id);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return ;
  }

  Object.assign(product, { name, category, price, stock });
  res.status(200).json(product);
  return ;
};

export const getProducts = (_req: Request, res: Response) => {
  res.status(200).json(products);
};

export const getTotalStock = (_req: Request, res: Response) => {
  const totalStock = products.reduce((acc, product) => acc + product.stock, 0);
  res.status(200).json({ totalStock });
};
