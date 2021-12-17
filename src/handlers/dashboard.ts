import express, { Request, Response } from 'express';
import verifyAuthToken from '../utilities/verifyAuthToken';

import { DashboardQueries } from '../services/dashboard';

const dashboardRoutes = (app: express.Application) => {
  app.get('/current_orders_by_user/:id', verifyAuthToken, currentOrderByUser);
}

const dashboard = new DashboardQueries()

const currentOrderByUser = async (req: Request, res: Response) => {
  const { params: { id } } = req;
  const users = await dashboard.currentOrderByUser(id)
  res.json(users)
}

export default dashboardRoutes;