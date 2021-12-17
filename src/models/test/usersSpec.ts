import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, UserStore } from '../users';

dotenv.config();

const store = new UserStore()

describe("User Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("index method should return a list of users",
    async() => {
      const result = await store.index();
      expect(result).toHaveSize(1);
  });

  it('create method should add a user', async () => {
    const {
      TOKEN_SECRET
    } = process.env;

    const user: User = {
      first_name: 'Jeff',
      last_name: 'Beck',
      password: 'guitare'
    }

    const result = await store.create(user);

    // @ts-ignore
    const token = jwt.sign({ user: user }, TOKEN_SECRET);
    
    // @ts-ignore
    expect(result.token).toEqual(token);
  });

  it("index method should return a list of users",
    async() => {
      const result = await store.index();
      expect(result).toHaveSize(2);
  });
  
  it('show method should return the correct user', async () => {
    const result = await store.show("2");
    // @ts-ignore
    expect(result.id).toEqual(2);
    expect(result.first_name).toEqual("Jeff");
    expect(result.last_name).toEqual("Beck");
  });
});