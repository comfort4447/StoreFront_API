import supertest from 'supertest';
import dotenv from 'dotenv';
import { app } from '../src/server';

const request = supertest(app);

dotenv.config();

const { TEST_TOKEN } = process.env;

describe('Test dashboard endpoint', () => {
  it('get the current_orders_by_user endpoint', async (done) => {
    const response = await request.get('/current_orders_by_user/1')
      .set('Authorization', 'Bearer ' + TEST_TOKEN);
    expect(response.status).toBe(200);
    done();
  });
})