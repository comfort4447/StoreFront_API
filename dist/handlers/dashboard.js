"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyAuthToken_1 = __importDefault(require("../utilities/verifyAuthToken"));
const dashboard_1 = require("../services/dashboard");
const dashboardRoutes = (app) => {
    app.get('/current_orders_by_user/:id', verifyAuthToken_1.default, currentOrderByUser);
};
const dashboard = new dashboard_1.DashboardQueries();
const currentOrderByUser = async (req, res) => {
    const { params: { id } } = req;
    const users = await dashboard.currentOrderByUser(id);
    res.json(users);
};
exports.default = dashboardRoutes;
