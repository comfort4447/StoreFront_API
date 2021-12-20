import { DashboardQueries } from '../dashboard';

const store = new DashboardQueries();

describe('Dashboard service', () => {
  it("should have an currentOrderByUser method", () => {
    expect(store.currentOrderByUser).toBeDefined();
  });
  it("currentOrderByUser method should return a list of orders and users",
    async() => {
      const result = await store.currentOrderByUser("0");
      expect(result).toEqual([
        // @ts-ignore
        { id: 1, first_name: 'Jeff', last_name: 'Beck', status: 'Pending' }
      ]);
    });
});