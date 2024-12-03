"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/orderRoutes.ts
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
router.post('/', orderController_1.createOrder);
router.get('/', orderController_1.getOrders);
router.get('/recent', orderController_1.getRecentOrders);
router.get('/user/:userId', orderController_1.getOrdersByUser);
router.get('/product/:productId', orderController_1.getUsersByProduct);
exports.default = router;
