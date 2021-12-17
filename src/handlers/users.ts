import { Request, Response, Application } from 'express';
import { User, UserStore } from "../models/users";
import verifyAuthToken from '../utilities/verifyAuthToken';

const store = new UserStore();

const index = async(_req: Request, res: Response) => {
  try {
    const products = await store.index();
    return res.json(products);
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const show = async(req: Request, res: Response) => {
  const { params: { id }} = req;
  const product = await store.show(id);
  return res.json(product);
}

const create = async(req: Request, res: Response) => {
  const { body: { first_name, last_name, password }} = req;
  const user: User = {
    first_name,
    last_name,
    password,
  };
  try {
    const returnUser = await store.create(user);
    
    // @ts-ignore
    res.json(returnUser.token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const users_routes = (app: Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
};

export default users_routes;