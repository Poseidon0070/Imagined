// src/routes/userRoutes.ts
import express from 'express';
import { createUser, updateUser, getUsers } from '../controllers/userController';

const router = express.Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/', getUsers);

export default router;
