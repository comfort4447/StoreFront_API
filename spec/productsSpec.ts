import supertest from 'supertest';
import dotenv from 'dotenv';
import { app } from '../src/server';
import { ProductStore } from '../src/models/products';

const request = supertest(app);

dotenv.config();

const { TEST_TOKEN } = process.env;

describe('Test products endpoint', () => {
  beforeAll(() => {
    spyOn(ProductStore.prototype, 'create').and.returnValue(
      // @ts-ignore
      Promise.resolve({
        id: 3,
        name: 'La méthode',
        price: '14',
        category: 'book'
      })
    );
  });
  it('get the /products GET endpoint', async (done) => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
    done();
  });
  it('get the /products/:id GET endpoint', async (done) => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
    done();
  });
  it('get the /products POST endpoint', async (done) => {
    const response = await request.post('/products')
      .set('Authorization', 'Bearer ' + TEST_TOKEN);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 3,
      name: 'La méthode',
      price: '14',
      category: 'book'
    })
    done();
  });
})