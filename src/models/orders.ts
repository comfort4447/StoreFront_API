
import client from "../database";

export type Order = {
  id?: string,
  status: string,
  user_id: number
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const { rows } = await conn.query(sql);

      conn.release();
      return rows;
    } 
    catch(error:any) {
      throw new Error(`Can not get orders ${error.toString()}`)
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async create(o: Order): Promise<Order> {
    console.log(o, 'o');
    try {
      const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      
      const conn = await client.connect();
      const result = await conn
        .query(sql, [o.status, o.user_id]);

      const product = result.rows[0];
      conn.release()
      return product

    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`)
    }
  }

  async update(o: Order): Promise<Order> {
    try {
      const sql = 'UPDATE orders set status = $2, user_id = $3 WHERE id = $1';

      
      const conn = await client.connect()

      const result =
        await conn.query(sql, [o.id, o.status, o.user_id]);

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not update order ${o.id}. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)'
      
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
  }

  async addProduct(quantity: number, orderId: string, productId: string)
    : Promise<Order> {
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)'
     
      const conn = await client.connect()

      const result = await conn.query(ordersql, [orderId])

      const order = result.rows[0]

      if (order.status !== "open") {
        throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
      }

      conn.release()
    } catch (err) {
      throw new Error(`${err}`)
    }
    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) ' +
        'VALUES($1, $2, $3)';

     
      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);
      const { rows } = result;

      return rows[0];
    } catch (err) {
      throw new Error(`could not add order_products ${productId} to order 
      ${orderId} : ${err}`);
    }
  }
}