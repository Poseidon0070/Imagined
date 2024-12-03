// src/controllers/orderController.ts
import { Request, Response } from 'express';
import { orders, products, users } from '../database';
import { Order } from '../models/orderModel';
import { v4 as uuidv4 } from 'uuid';

export const createOrder = (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;
  const product = products.find((p) => p.id === productId);
  const user = users.find((u) => u.id === userId);

  if (!product || !user) {
    res.status(404).json({ message: 'Invalid user or product' });
    return ;
  }

  if (product.stock < quantity) {
    res.status(400).json({ message: 'Not enough stock' });
    return ;
  }

  product.stock -= quantity;

  const order: Order = { id: uuidv4(), userId, productId, quantity, date: new Date() };
  orders.push(order);
  res.status(201).json(order);
  return ;
};

export const getOrders = (_req: Request, res: Response) => {
  res.status(200).json(orders);
};

export const getRecentOrders = (_req: Request, res: Response) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentOrders = orders.filter((order) => order.date >= sevenDaysAgo);
  res.status(200).json(recentOrders);
};

export const getOrdersByUser = (req: Request, res: Response) => {
  const { userId } = req.params;
  const userOrders = orders.filter((order) => order.userId === userId);
  res.status(200).json(userOrders);
};

export const getUsersByProduct = (req: Request, res: Response) => {
  const { productId } = req.params;
  const userIds = orders
    .filter((order) => order.productId === productId)
    .map((order) => order.userId);

  const uniqueUsers = users.filter((user) => userIds.includes(user.id));
  res.status(200).json(uniqueUsers);
};
