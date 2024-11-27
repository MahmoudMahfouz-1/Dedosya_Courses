/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     description: Fetches a list of all courses with pagination.
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         description: The number of courses to return per page
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
 *         description: List of courses
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
 *                     courses:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Course'
 *             example:
 *               status: "SUCCESS"
 *               data:
 *                 courses:
 *                   - title: "JavaScript Basics"
 *                     price: 100
 *                   - title: "Advanced Node.js"
 *                     price: 200
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
 * /api/courses/{courseId}:
 *   get:
 *     summary: Get a course by ID
 *     description: Fetches a course based on the provided ID. Returns a single course.
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course to retrieve
 *         schema:
 *           type: string
 *           example: "641b2d4f4bdf4d86e6e3f3ab"
 *     responses:
 *       200:
 *         description: Course retrieved successfully
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
 *                     course:
 *                       $ref: '#/components/schemas/Course'
 *             example:
 *               status: "SUCCESS"
 *               data:
 *                 course:
 *                   _id: "641b2d4f4bdf4d86e6e3f3ab"
 *                   title: "Introduction to Programming"
 *                   price: 99.99
 *       404:
 *         description: Course not found
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
 *                   example: "Course Not Found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Add a new course
 *     description: Creates a new course with the provided title and price.
 *                  If the input is invalid, returns a validation error.
 *     tags:
 *       - Courses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *           example:
 *             title: "Advanced Node.js"
 *             price: 149.99
 *     responses:
 *       200:
 *         description: Course added successfully
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
 *                     newCourse:
 *                       $ref: '#/components/schemas/Course'
 *             example:
 *               status: "SUCCESS"
 *               data:
 *                 newCourse:
 *                   _id: "641b2d4f4bdf4d86e6e3f3ad"
 *                   title: "Advanced Node.js"
 *                   price: 149.99
 *       400:
 *         description: Invalid input data
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
 *                   example: "Validation error - 'title' is required."
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
 * /api/courses/{courseId}:
 *   put:
 *     summary: Edit a course by ID
 *     description: Updates a course based on the provided ID.
 *                  The request body should include the fields to update (e.g., title, price).
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course to update
 *         schema:
 *           type: string
 *           example: "641b2d4f4bdf4d86e6e3f3ab"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *           example:
 *             title: "Updated Course Title"
 *             price: 109.99
 *     responses:
 *       200:
 *         description: Course updated successfully
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
 *                     course:
 *                       $ref: '#/components/schemas/Course'
 *             example:
 *               status: "SUCCESS"
 *               data:
 *                 course:
 *                   _id: "641b2d4f4bdf4d86e6e3f3ab"
 *                   title: "Updated Course Title"
 *                   price: 109.99
 *       404:
 *         description: Course not found
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
 *                   example: "Course Not Found"
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
 * /api/courses/{courseId}:
 *   delete:
 *     summary: Delete a course by ID
 *     description: Deletes a course based on the provided ID. Returns a confirmation message upon successful deletion.
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course to delete
 *         schema:
 *           type: string
 *           example: "641b2d4f4bdf4d86e6e3f3ab"
 *     responses:
 *       200:
 *         description: Course deleted successfully
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
 *                     result:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "641b2d4f4bdf4d86e6e3f3ab"
 *                         title:
 *                           type: string
 *                           example: "Introduction to Programming"
 *                         price:
 *                           type: number
 *                           example: 99.99
 *             example:
 *               status: "SUCCESS"
 *               data:
 *                 result:
 *                   _id: "641b2d4f4bdf4d86e6e3f3ab"
 *                   title: "Introduction to Programming"
 *                   price: 99.99
 *       404:
 *         description: Course not found
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
 *                   example: "Course Not Found"
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
