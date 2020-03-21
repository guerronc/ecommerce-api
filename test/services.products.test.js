const assert = require("assert");
const proxyquire = require("proxyquire");
const {
  getAllStub,
  createStub,
  MongoLibMock
} = require("../utils/mocks/mongoLib");
const {
  productsMock,
  ProductServiceMock,
  filteredProductMocks
} = require("../utils/mocks/products");

describe("Services - products", () => {
  const ProductService = proxyquire("../services/products.js", {
    "../lib/mongo": MongoLibMock
  });

  const productService = new ProductService();

  describe("when getProducts method is called", async () => {
    //Test 1
    it("should call getAll MongoLib method", async () => {
      await productService.getProducts({});
      assert.strictEqual(getAllStub.called, true);
    });
    //Test 2
    it("should return array of products", async () => {
      const result = await productService.getProducts({});
      const expected = productsMock;
      assert.deepEqual(result, expected);
    });
  });

  describe("When getProducts is called with tags", async () => {
    it("should all the getAll MongoLib method with tags args", async () => {
      await productService.getProducts({ tags: ["expensive"] });
      const tagQuery = { tags: { $in: ["expensive"] } };
      assert.strictEqual(getAllStub.calledWith("products", tagQuery), true);
    });

    it("should return array of products filtered by the tags", async () => {
      const result = await productService.getProducts({ tags: ["expensive"] });
      const expected = filteredProductMocks("expensive");
      assert.deepEqual(result, expected);
    });
  });
});
