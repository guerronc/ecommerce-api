const express = require("express");
const ProductService = require("../../services/products");

const productService = new ProductService();

//Rutas
const router = express.Router();

router.get("/", async (req, res, next) => {
  const { tags } = req.query;
  try {
    throw new Error('this is an error for the api')
    const products = await productService.getProducts({ tags });
    res.status(200).json({ data: products, message: "Product list" });
  } catch (error) {
    next(error);
  }
});
router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await productService.getProduct({ productId });
    res.status(200).json({ data: product, message: "Product retrieve" });
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  const { body: product } = req;
  try {
    const createdProduct = await productService.createProduct({ product });
    res.status(201).json({ data: createdProduct, message: "Product create" });
  } catch (error) {
    next(error);
  }
});
router.put("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { body: product } = req;
  try {
    const updatedProduct = await productService.updateProduct({
      productId,
      product
    });
    res.status(200).json({ data: updatedProduct, message: "Product update" });
  } catch (error) {
    next(error);
  }
});
router.delete("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await productService.deleteProduct({ productId });
    res.status(200).json({ data: deletedProduct, message: "Product delete" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
