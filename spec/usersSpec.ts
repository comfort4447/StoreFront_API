import supertest from 'supertest';
import dotenv from 'dotenv';
import { app } from '../src/server';
import { UserStore } from '../src/models/users';

const request = supertest(app);

dotenv.config();

const { TEST_TOKEN } = process.env;

describe('Test users endpoint', () => {
  beforeAll(() => {
    spyOn(UserStore.prototype, 'create').and.returnValue(
      // @ts-ignore
      Promise.resolve(TEST_TOKEN)
    );
  });
  it('get the /users GET endpoint', async (done) => {
    const response = await request.get('/users')
      .set('Authorization', 'Bearer ' + TEST_TOKEN);
    expect(response.status).toBe(200);
    done();
  });
  it('get the /users/:id GET endpoint', async (done) => {
    const response = await request.get('/users/1')
      .set('Authorization', 'Bearer ' + TEST_TOKEN);
    expect(response.status).toBe(200);
    done();
  });
  it('get the /users POST endpoint', async (done) => {
    const response = await request.post('/users')
      .set('Authorization', 'Bearer ' + TEST_TOKEN);
    expect(response.status).toBe(200);
    done();
  });
});