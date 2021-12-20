"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("../../server");
const request = (0, supertest_1.default)(server_1.app);
dotenv_1.default.config();
const { TEST_TOKEN } = process.env;
describe('Test dashboard endpoint', () => {
    it('get the current_orders_by_user endpoint', async (done) => {
        const response = await request.get('/current_orders_by_user/1')
            .set('Authorization', 'Bearer ' + TEST_TOKEN);
        expect(response.status).toBe(400);
        done();
    });
});
