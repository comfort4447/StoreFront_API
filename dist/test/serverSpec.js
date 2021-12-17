"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
const request = (0, supertest_1.default)(server_1.app);
describe('Test server endpoint', () => {
    it('get the server endpoint', async (done) => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        done();
    });
});
