"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../orders");
const users_1 = require("../users");
const store = new orders_1.OrderStore();
describe('Order Model', () => {
    beforeAll(async () => {
        const user = {
            first_name: "seb",
            last_name: "bod",
            password: "lolito"
        };
        const userStore = new users_1.UserStore();
        await userStore.create(user);
    });
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(store.show).toBeDefined();
    });
    it("should have a create method", () => {
        expect(store.create).toBeDefined();
    });
    it("index method should return a list of orders", async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
    it('create method should add an order', async () => {
        // @ts-ignore
        const result = await store.create({
            status: 'Pending',
            user_id: 1,
        });
        expect(result).toEqual({
            // @ts-ignore
            id: 1,
            status: 'Pending',
            user_id: 1,
        });
    });
    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                // @ts-ignore
                id: 1,
                status: 'Pending',
                user_id: 1,
            }]);
    });
    it('show method should return the correct order', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            // @ts-ignore
            id: 1,
            status: 'Pending',
            user_id: 1,
        });
    });
});
