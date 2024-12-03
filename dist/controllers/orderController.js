"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByProduct = exports.getOrdersByUser = exports.getRecentOrders = exports.getOrders = exports.createOrder = void 0;
const database_1 = require("../database");
const uuid_1 = require("uuid");
const createOrder = (req, res) => {
    const { userId, productId, quantity } = req.body;
    const product = database_1.products.find((p) => p.id === productId);
    const user = database_1.users.find((u) => u.id === userId);
    if (!product || !user) {
        res.status(404).json({ message: 'Invalid user or product' });
        return;
    }
    if (product.stock < quantity) {
        res.status(400).json({ message: 'Not enough stock' });
        return;
    }
    product.stock -= quantity;
    const order = { id: (0, uuid_1.v4)(), userId, productId, quantity, date: new Date() };
    database_1.orders.push(order);
    res.status(201).json(order);
    return;
};
exports.createOrder = createOrder;
const getOrders = (_req, res) => {
    res.status(200).json(database_1.orders);
};
exports.getOrders = getOrders;
const getRecentOrders = (_req, res) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentOrders = database_1.orders.filter((order) => order.date >= sevenDaysAgo);
    res.status(200).json(recentOrders);
};
exports.getRecentOrders = getRecentOrders;
const getOrdersByUser = (req, res) => {
    const { userId } = req.params;
    const userOrders = database_1.orders.filter((order) => order.userId === userId);
    res.status(200).json(userOrders);
};
exports.getOrdersByUser = getOrdersByUser;
const getUsersByProduct = (req, res) => {
    const { productId } = req.params;
    const userIds = database_1.orders
        .filter((order) => order.productId === productId)
        .map((order) => order.userId);
    const uniqueUsers = database_1.users.filter((user) => userIds.includes(user.id));
    res.status(200).json(uniqueUsers);
};
exports.getUsersByProduct = getUsersByProduct;
