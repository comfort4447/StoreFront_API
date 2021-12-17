// @ts-ignore
import client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export type User = {
  id?: string,
  first_name: string,
  last_name: string,
  password: string,
  password_digest?: string,
  token?: string,
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const { rows } = await conn.query(sql);

      conn.release();
      return rows;
    } catch(error:any) {
      throw new Error(`Can not get users ${error.toString()}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])
      //console.log(result);
      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<string> {
    try {
      const sql = 'INSERT INTO users (first_name, last_name, password_digest, token) VALUES($1, $2, $3, $4) RETURNING token';

      const {
        BCRYPT_PASSWORD: pepper,
        SALT_ROUNDS: saltRounds,
        TOKEN_SECRET
      } = process.env;

      const hash = bcrypt.hashSync(
        u.password + pepper,
        // @ts-ignore
        parseInt(saltRounds)
      );

      // @ts-ignore
      const token = jwt.sign({ user: u }, TOKEN_SECRET);
      
      // @ts-ignore
      const conn = await client.connect();
      
      const result = await conn.query(sql, [u.first_name, u.last_name, hash, token]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user. Error: ${err}`)
    }
  }
}