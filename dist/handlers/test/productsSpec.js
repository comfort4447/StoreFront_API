"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("../../server");
const products_1 = require("../../models/products");
const request = (0, supertest_1.default)(server_1.app);
dotenv_1.default.config();
const { TEST_TOKEN } = process.env;
describe('Test products endpoint', () => {
    beforeAll(() => {
        spyOn(products_1.ProductStore.prototype, 'create').and.returnValue(
        // @ts-ignore
        Promise.resolve({
            id: 3,
            name: 'La méthode',
            price: '14',
            category: 'book'
        }));
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
        });
        done();
    });
});
