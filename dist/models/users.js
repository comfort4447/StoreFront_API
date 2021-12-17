"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
class UserStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const { rows } = await conn.query(sql);
            conn.release();
            return rows;
        }
        catch (error) {
            throw new Error(`Can not get users ${error.toString()}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            //console.log(result);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const sql = 'INSERT INTO users (first_name, last_name, password_digest, token) VALUES($1, $2, $3, $4) RETURNING token';
            const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds, TOKEN_SECRET } = process.env;
            const hash = bcrypt_1.default.hashSync(u.password + pepper, 
            // @ts-ignore
            parseInt(saltRounds));
            // @ts-ignore
            const token = jsonwebtoken_1.default.sign({ user: u }, TOKEN_SECRET);
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [u.first_name, u.last_name, hash, token]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
