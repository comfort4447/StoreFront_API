import supertest from 'supertest';
import { app } from '../../server';
import { OrderStore } from '../../models/orders';

const request = supertest(app);

describe('Test orders endpoint', () => {
  beforeAll(() => {
    spyOn(OrderStore.prototype, 'create').and.returnValue(
      // @ts-ignore
      Promise.resolve({
        id: 2,
        status: 'complete',
        user_id: '14',
      })
    );
  });
  it('get the /orders GET endpoint', async (done) => {
    const response = await request.get('/orders');
    expect(response.status).toBe(200);
    done();
  });
  it('get the /orders/:id GET endpoint', async (done) => {
    const response = await request.get('/orders/1');
    expect(response.status).toBe(200);
    done();
  });
  it('get the /orders POST endpoint', async (done) => {
    const response = await request.post('/orders');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 2,
      status: 'complete',
      user_id: '14',
    });
    done();
  });
});