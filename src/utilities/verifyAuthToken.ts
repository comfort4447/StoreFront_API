import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const verifyAuthToken = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  try {
    const { headers: { authorization } } = req;
    const { TOKEN_SECRET } = process.env;
    const token = authorization && authorization.split(' ')[1]
    // @ts-ignore
    jwt.verify(token, TOKEN_SECRET)
    next();
  } catch (err) {
    res.status(401);
    res.send(err);
    return;
  }
}

export default verifyAuthToken;