import { Request, Response, Application } from 'express';
import dotenv from "dotenv";
import { Order, OrderStore } from "../models/orders";

dotenv.config()

const store = new OrderStore();

const index = async(req:Request, res: Response) => {
  try {
    const order = await store.index();
    return res.json(order)
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const show = async(req: Request, res: Response) => {
  const { params: { id }} = req;
  try {
    const order = await store.show(id);
    return res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const create = async(req: Request, res: Response) => {
  const { body: { status, user_id } } = req;
  const order: Order = {
    status,
    user_id,
  }
  try {
    const returnOrder = await store.create(order);
    res.json(returnOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
    return;
  }
}

const orders_routes = (app: Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
}


export default orders_routes;