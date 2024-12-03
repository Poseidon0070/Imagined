"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.updateUser = exports.createUser = void 0;
const database_1 = require("../database");
const uuid_1 = require("uuid");
const createUser = (req, res) => {
    const { name, email, phone } = req.body;
    const user = { id: (0, uuid_1.v4)(), name, email, phone };
    database_1.users.push(user);
    res.status(201).json(user);
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const user = database_1.users.find((u) => u.id === id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    Object.assign(user, { name, email, phone });
    res.status(200).json(user);
};
exports.updateUser = updateUser;
const getUsers = (_req, res) => {
    res.status(200).json(database_1.users);
};
exports.getUsers = getUsers;
