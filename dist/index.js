"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// test route
app.get('/check', (req, res) => {
    res.send('Hello World!!');
});
// routes
app.use('/users', userRoutes_1.default);
app.use('/products', productRoutes_1.default);
app.use('/orders', orderRoutes_1.default);
app.listen(8080, () => {
    console.log('Server is running on port 3000');
});
exports.default = app;
