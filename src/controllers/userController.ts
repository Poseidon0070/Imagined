// src/controllers/userController.ts
import { Request, Response } from 'express';
import { users } from '../database';
import { User } from '../models/userModel';
import { v4 as uuidv4 } from 'uuid';

export const createUser = (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  const user: User = { id: uuidv4(), name, email, phone };
  users.push(user);
  res.status(201).json(user);
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const user = users.find((u) => u.id === id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return ;
  }

  Object.assign(user, { name, email, phone });
  res.status(200).json(user);
};

export const getUsers = (_req: Request, res: Response) => {
  res.status(200).json(users);
};
