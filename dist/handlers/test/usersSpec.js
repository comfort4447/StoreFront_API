"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("../../server");
const users_1 = require("../../models/users");
const request = (0, supertest_1.default)(server_1.app);
dotenv_1.default.config();
const { TEST_TOKEN } = process.env;
describe('Test users endpoint', () => {
    beforeAll(() => {
        spyOn(users_1.UserStore.prototype, 'create').and.returnValue(
        // @ts-ignore
        Promise.resolve(TEST_TOKEN));
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
