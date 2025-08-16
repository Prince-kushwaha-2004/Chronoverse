const express = require('express');
const router = express.Router();
const { getCarts } = require('../controllers/cartsController');
const wrapAsync = require('../utils/wrapAsync');


/**
 * @swagger
 * /carts:
 *    post:
 *      summary: Get carts Items
 *      tags: [Carts]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  productId:
 *                    type: number
 *                  quantity:
 *                    type: integer
 *      responses:
 *        200:
 *          description: Carts item array
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                    name:
 *                      type: string
 *                    image:
 *                      type: string
 *                      format: uri
 *                    model:
 *                      type: string
 *                    description:
 *                      type: string
 *                    price:
 *                      type: number
 *                    quantity:
 *                      type: integer
 *                    category:
 *                      type: string
 *                      enum: ["ROLEX", "OMEGA", "ZENITH"]
 *        404:
 *          description: Product not found
 *        400:
 *          description: Invalid product ID
 *
 */

router.post("/", wrapAsync(getCarts));


module.exports = router;
