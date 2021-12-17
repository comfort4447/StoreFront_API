"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const { rows } = await conn.query(sql);
            conn.release();
            return rows;
        }
        catch (error) {
            throw new Error(`Can not get orders ${error.toString()}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }
    async create(o) {
        console.log(o, 'o');
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [o.status, o.user_id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }
    async update(o) {
        try {
            const sql = 'UPDATE orders set status = $2, user_id = $3 WHERE id = $1';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [o.id, o.status, o.user_id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not update order ${o.id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
    async addProduct(quantity, orderId, productId) {
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)';
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(ordersql, [orderId]);
            const order = result.rows[0];
            if (order.status !== "open") {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`);
            }
            conn.release();
        }
        catch (err) {
            throw new Error(`${err}`);
        }
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) ' +
                'VALUES($1, $2, $3)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [quantity, orderId, productId]);
            const { rows } = result;
            return rows[0];
        }
        catch (err) {
            throw new Error(`could not add order_products ${productId} to order 
      ${orderId} : ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
