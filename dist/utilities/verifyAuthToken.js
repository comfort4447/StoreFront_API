"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyAuthToken = (req, res, next) => {
    try {
        const { headers: { authorization } } = req;
        const { TOKEN_SECRET } = process.env;
        const token = authorization && authorization.split(' ')[1];
        // @ts-ignore
        jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        res.send(err);
        return;
    }
};
exports.default = verifyAuthToken;
