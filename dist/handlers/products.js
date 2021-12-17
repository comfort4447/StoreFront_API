"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const products_1 = require("../models/products");
const verifyAuthToken_1 = __importDefault(require("../utilities/verifyAuthToken"));
dotenv_1.default.config();
const store = new products_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        return res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    const { params: { id } } = req;
    const product = await store.show(id);
    return res.json(product);
};
const create = async (req, res) => {
    const { body: { name, price, category } } = req;
    const product = {
        name: name,
        price: price,
        category: category
    };
    try {
        const returnProduct = await store.create(product);
        res.json(returnProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
        return;
    }
};
const products_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken_1.default, create);
};
exports.default = products_routes;
