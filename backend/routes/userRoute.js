const express = require('express');
const router = express.Router();
const { register, login, logout, authenticate, getProductStats } = require('../controllers/userController');
const { isLogin } = require('../utils/middleware');
const wrapAsync = require('../utils/wrapAsync');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         confirmPassword:
 *           type: string
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     UserResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists or validation failed
 */
router.post("/register", wrapAsync(register));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user_data:
 *                   $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", wrapAsync(login));

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Check if user is authenticated (requires cookie)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Authenticated user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user_data:
 *                   $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/login", isLogin, authenticate);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.post("/logout", logout);

/**
 * @swagger
 * /getStats:
 *   get:
 *     summary: Total Products Statics
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Product Stats
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                productLeft:
 *                  type: number
 *                soldProducts:
 *                  type: number
 *                totalOrders:
 *                  type: number
 *                totalProducts:
 *                  type: number
 */
router.get("/getStats", wrapAsync(getProductStats))

module.exports = router;
