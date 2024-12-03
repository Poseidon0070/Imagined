"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalStock = exports.getProducts = exports.updateProduct = exports.createProduct = void 0;
const database_1 = require("../database");
const uuid_1 = require("uuid");
const createProduct = (req, res) => {
    const { name, category, price, stock } = req.body;
    const product = { id: (0, uuid_1.v4)(), name, category, price, stock };
    database_1.products.push(product);
    res.status(201).json(product);
};
exports.createProduct = createProduct;
const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, category, price, stock } = req.body;
    const product = database_1.products.find((p) => p.id === id);
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    Object.assign(product, { name, category, price, stock });
    res.status(200).json(product);
    return;
};
exports.updateProduct = updateProduct;
const getProducts = (_req, res) => {
    res.status(200).json(database_1.products);
};
exports.getProducts = getProducts;
const getTotalStock = (_req, res) => {
    const totalStock = database_1.products.reduce((acc, product) => acc + product.stock, 0);
    res.status(200).json({ totalStock });
};
exports.getTotalStock = getTotalStock;
