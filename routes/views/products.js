const express = require("express");
const router = express.Router();

const config = require("../../config");
const ProductService = require("../../services/products");

//DEPENDENCY OF CACHE RESPONSE
const cacheResponse = require("../../utils/cacheResponse");
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require("../../utils/time");

const productService = new ProductService();

router.get("/", async (req, res, next) => {
  cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
  const { tags } = req.query;
  try {
    const products = await productService.getProducts({ tags });
    res.render("products", { products, dev: config.dev });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
