"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const orders_1 = require("../models/orders");
dotenv_1.default.config();
const store = new orders_1.OrderStore();
const index = async (req, res) => {
    try {
        const order = await store.index();
        return res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    const { params: { id } } = req;
    try {
        const order = await store.show(id);
        return res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    const { body: { status, user_id } } = req;
    const order = {
        status,
        user_id,
    };
    try {
        const returnOrder = await store.create(order);
        res.json(returnOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
        return;
    }
};
const orders_routes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
};
exports.default = orders_routes;
