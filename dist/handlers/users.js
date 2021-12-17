"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const verifyAuthToken_1 = __importDefault(require("../utilities/verifyAuthToken"));
const store = new users_1.UserStore();
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
    const { body: { first_name, last_name, password } } = req;
    const user = {
        first_name,
        last_name,
        password,
    };
    try {
        const returnUser = await store.create(user);
        // @ts-ignore
        res.json(returnUser.token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const users_routes = (app) => {
    app.get('/users', verifyAuthToken_1.default, index);
    app.get('/users/:id', verifyAuthToken_1.default, show);
    app.post('/users', create);
};
exports.default = users_routes;
