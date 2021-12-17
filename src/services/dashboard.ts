// @ts-ignore
import client from '../database';

export class DashboardQueries {
  async currentOrderByUser(id: string): Promise<{ first_name: string, last_name: string }[]> {
    try {
      //@ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT orders.id, users.first_name, users.last_name, orders.status FROM users INNER JOIN orders ' +
        'ON users.id = orders.user_id WHERE users.id = $1';

      const result = await conn.query(sql, [id])

      conn.release()

      // Return the last order as the current one
      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`)
    }
  }
}