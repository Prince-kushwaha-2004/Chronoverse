const express = require('express');
const router = express.Router();
const { createProduct, getProductById, updateProduct, deleteProduct, getAllProducts } = require('../controllers/productController');
const { isLogin } = require('../utils/middleware');
const wrapAsync = require('../utils/wrapAsync');
const { upload } = require("../utils/middleware");



/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         model:
 *           type: string
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         price:
 *           type: number
 *         quantity:
 *           type: integer
 *         category:
 *           type: string
 *           enum: [ROLEX,OMEGA,ZENITH]
 *
 *     ProductInput:
 *       type: object
 *       required:
 *         - name
 *         - model
 *         - description
 *         - price
 *         - quantity
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         image:
 *           type: string
 *           format: binary
 *         model:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         quantity:
 *           type: integer
 *         category:
 *           type: string
 *           enum: [ROLEX,OMEGA,ZENITH]
 */

/**
 * @swagger 
 * /products:
 *   get:
 *     summary: Get all active products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", wrapAsync(getAllProducts));


/**
 * @swagger
 *  /products:
 *    post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *        description: Invalid input or file format
 */
router.post("/", isLogin, upload.single("image"), wrapAsync(createProduct));


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid product ID
 */
router.get("/:id", wrapAsync(getProductById));



/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *              $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid product ID
 */
router.patch("/:id", isLogin, upload.single("image"), wrapAsync(updateProduct));


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid product ID
 */
router.delete("/:id", isLogin, wrapAsync(deleteProduct));



module.exports = router;