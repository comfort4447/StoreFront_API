"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../server");
const orders_1 = require("../../models/orders");
const request = (0, supertest_1.default)(server_1.app);
describe('Test orders endpoint', () => {
    beforeAll(() => {
        spyOn(orders_1.OrderStore.prototype, 'create').and.returnValue(
        // @ts-ignore
        Promise.resolve({
            id: 2,
            status: 'complete',
            user_id: '14',
        }));
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
