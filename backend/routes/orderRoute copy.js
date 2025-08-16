const express = require('express');
const router = express.Router();
const { createOrder, updateOrder, getOrders } = require('../controllers/orderController');
const { isLogin } = require('../utils/middleware');
const wrapAsync = require('../utils/wrapAsync');



/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders
 *       404:
 *         description: Orders not found
 */

router.get("/", isLogin, wrapAsync(getOrders));


/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNo:
 *                 type: string
 *               address:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid request
 */

router.post("/", wrapAsync(createOrder));



/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 enum: [PENDING,ACCEPTED,REJECTED,CANCELLED]
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 *       400:
 *         description: Invalid request
 */
router.patch("/:id", isLogin, wrapAsync(updateOrder));


module.exports = router;
