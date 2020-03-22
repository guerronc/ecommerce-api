const express = require("express");
const router = express.Router();

const config = require("../../config");
const ProductService = require("../../services/products");

const productService = new ProductService();

router.get("/", async (req, res, next) => {
  const { tags } = req.query;
  try {
    const products = await productService.getProducts({ tags });
    res.render("products", { products, dev: config.dev });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
