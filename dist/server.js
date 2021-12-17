"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = __importDefault(require("./utilities/logger"));
const products_1 = __importDefault(require("./handlers/products"));
const users_1 = __importDefault(require("./handlers/users"));
const orders_1 = __importDefault(require("./handlers/orders"));
const dashboard_1 = __importDefault(require("./handlers/dashboard"));
exports.app = (0, express_1.default)();
const port = 3000;
exports.app.use(body_parser_1.default.json());
exports.app.use(logger_1.default);
exports.app.get('/', function (req, res) {
    res.send('Store home');
});
(0, products_1.default)(exports.app);
(0, users_1.default)(exports.app);
(0, orders_1.default)(exports.app);
(0, dashboard_1.default)(exports.app);
exports.app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
