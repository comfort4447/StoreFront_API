"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../dashboard");
const store = new dashboard_1.DashboardQueries();
describe('Dashboard service', () => {
    it("should have an currentOrderByUser method", () => {
        expect(store.currentOrderByUser).toBeDefined();
    });
    it("currentOrderByUser method should return a list of orders and users", async () => {
        const result = await store.currentOrderByUser("1");
        expect(result).toEqual([
            // @ts-ignore
            { id: 1, first_name: 'seb', last_name: 'bod', status: 'Pending' }
        ]);
    });
});
