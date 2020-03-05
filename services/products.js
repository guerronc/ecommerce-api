const productsMocks = require("../utils/mocks/products");
const MongoLib = require("../lib/mongo");

class ProductService {
  constructor() {
    this.collection = "products";
    this.mongoDB = new MongoLib();
  }
  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }

  async getProduct({ productId }) {
    const products = await this.mongoDB.get(this.collection,productId);
    return products || [];
  }

  async createProduct({ product }) {
    const products = await this.mongoDB.create(this.collection,product);
    return products || [];
  }
  updateProduct({ productId, product }) {
    return Promise.resolve(productsMocks[0]);
  }
  deleteProduct({ productId }) {
    return Promise.resolve(productsMocks[0]);
  }
}

module.exports = ProductService;
