import { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { Product, ProductStore } from "../models/products";
import verifyAuthToken from "../utilities/verifyAuthToken";



dotenv.config();

const store = new ProductStore();

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
  const { body: { name, price, category } } = req;
  const product: Product = {
    name: name,
    price: price,
    category: category
  }

  try {
    const returnProduct = await store.create(product);
    res.json(returnProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
    return;
  }
}

const products_routes = (app: Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
}

export default products_routes;