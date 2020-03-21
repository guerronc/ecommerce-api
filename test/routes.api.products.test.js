const assert = require("assert");
const proxyquire = require("proxyquire");
const testServer = require("../utils/testServer");
const { productsMock, ProductServiceMock } = require("../utils/mocks/products");

describe("Routes - Api - products", () => {
  const route = proxyquire("../routes/api/products.js", {
    "../../services/products": ProductServiceMock
  });

  const request = testServer(route);

  describe("GET /products", () => {
    //Test 1
    it("should respond whit status 200", done => {
      request.get("/api/products").expect(200, done);
    });
    //Test 2
    it("should respond whit content type json", done => {
      request.get("/api/products").expect("Content-type", /json/, done);
    });
    //Test 3
    it("should respond whit not error", done => {
      request.get("/api/products").end((err, response) => {
        assert.strictEqual(err, null);
        done();
      });
    });

    //Test 4
    it("should respond whit the list of products", done => {
      request.get("/api/products").end((err, response) => {
        assert.deepEqual(response.body, {
          data: productsMock,
          message: "Product list"
        });
        done();
      });
    });

  });
});
