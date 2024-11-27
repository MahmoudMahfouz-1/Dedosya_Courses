/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Fetches a list of all users with pagination. Returns only basic user information (excludes password and _id).
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         description: The number of users to return per page
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number to return
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "SUCCESS"
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *             example:
 *               status: "SUCCESS"
 *               data:
 *                 users:
 *                   - firstName: "John"
 *                     lastName: "Doe"
 *                     email: "john.doe@example.com"
 *                     role: "USER"
 *                     avatar: "uploads/johndoe.png"
 *                   - firstName: "Jane"
 *                     lastName: "Smith"
 *                     email: "jane.smith@example.com"
 *                     role: "ADMIN"
 *                     avatar: "uploads/janesmith.png"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with the provided details (e.g., firstName, lastName, email, password). If the user already exists, it returns an error.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN, MANAGER]
 *                 example: "USER"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "SUCCESS"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *             example:
 *               status: "SUCCESS"
 *               data:
 *                 user:
 *                   _id: "641b2d4f4bdf4d86e6e3f3ab"
 *                   firstName: "John"
 *                   lastName: "Doe"
 *                   email: "john.doe@example.com"
 *                   role: "USER"
 *                   avatar: "uploads/johndoe.png"
 *                   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWQiOiI2NDFiMmQ0ZjRiZGY0ZDg2ZTZlM2YzYWYiLCJyb2xlIjoiVVNFUiJ9.3yEJhYX4Wf8g66Fw6aFwS8P_WMjB_hm4ME9epz-LWyM"
 *       400:
 *         description: User already exists or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "User already exists"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: Logs in the user with email and password and returns a JWT token upon successful authentication.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "SUCCESS"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWQiOiI2NDFiMmQ0ZjRiZGY0ZDg2ZTZlM2YzYWYiLCJyb2xlIjoiVVNFUiJ9.3yEJhYX4Wf8g66Fw6aFwS8P_WMjB_hm4ME9epz-LWyM"
 *       400:
 *         description: Bad request (missing email or password, user not found, incorrect password)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Email or password is missing"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
