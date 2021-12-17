import { ProductStore } from "../products";

const store = new ProductStore();

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  
  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("index method should return a list of products",
    async() => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it('create method should add a product', async () => {
    // @ts-ignore
    const result = await store.create({
      name: 'Big yacht',
      price: 10,
      category: 'boat'
    });
    expect(result).toEqual({
      // @ts-ignore
      id: 1,
      name: 'Big yacht',
      price: 10,
      category: 'boat',
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      // @ts-ignore
      id: 1,
      name: 'Big yacht',
      price: 10,
      category: 'boat',
    }]);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      // @ts-ignore
      id: 1,
      name: 'Big yacht',
      price: 10,
      category: 'boat',
    });
  });
})