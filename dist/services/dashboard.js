"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    async currentOrderByUser(id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT orders.id, users.first_name, users.last_name, orders.status FROM users INNER JOIN orders ' +
                'ON users.id = orders.user_id WHERE users.id = $1';
            const result = await conn.query(sql, [id]);
            conn.release();
            // Return the last order as the current one
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable get users with orders: ${err}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
