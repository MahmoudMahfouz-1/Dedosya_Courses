const swaggerCourses = {
  '/api/courses': {
    get: {
      summary: 'Retrieve a paginated list of courses',
      description:
        'Fetch a list of all courses with pagination. You can control the number of courses per page and the page number.',
      parameters: [
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'integer',
            default: 10,
          },
          description: 'Number of courses per page',
        },
        {
          in: 'query',
          name: 'page',
          schema: {
            type: 'integer',
            default: 1,
          },
          description: 'Page number to retrieve',
        },
      ],
      responses: {
        200: {
          description: 'A paginated list of courses',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'SUCCESS' },
                  data: {
                    type: 'object',
                    properties: {
                      courses: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                              example: '64e9b3d34bcf7a0012d34567',
                            },
                            title: {
                              type: 'string',
                              example: 'Introduction to Node.js',
                            },
                            description: {
                              type: 'string',
                              example:
                                'Learn the basics of Node.js in this introductory course.',
                            },
                            price: { type: 'number', example: 19.99 },
                            createdAt: {
                              type: 'string',
                              format: 'date-time',
                              example: '2023-09-10T12:34:56.789Z',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      summary: 'Add a new course',
      description: 'Creates a new course with the provided data.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string', example: 'Node.js for Beginners' },
                description: {
                  type: 'string',
                  example: 'Learn Node.js from scratch',
                },
                price: { type: 'number', example: 29.99 },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Course successfully created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'SUCCESS' },
                  data: {
                    type: 'object',
                    properties: {
                      newCourse: {
                        type: 'object',
                        properties: {
                          _id: {
                            type: 'string',
                            example: '64e9b3d34bcf7a0012d34567',
                          },
                          title: {
                            type: 'string',
                            example: 'Node.js for Beginners',
                          },
                          description: {
                            type: 'string',
                            example: 'Learn Node.js from scratch',
                          },
                          price: { type: 'number', example: 29.99 },
                          createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-11-26T14:35:00Z',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description:
            'Validation error if required fields are missing or invalid',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'FAIL' },
                  message: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        msg: { type: 'string' },
                        param: { type: 'string' },
                        location: { type: 'string' },
                        value: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/courses/{courseId}': {
    get: {
      summary: 'Retrieve a single course by its ID',
      description: 'Fetch a specific course by its unique ID.',
      parameters: [
        {
          in: 'path',
          name: 'courseId',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The ID of the course to retrieve',
        },
      ],
      responses: {
        200: {
          description: 'A single course retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'SUCCESS' },
                  data: {
                    type: 'object',
                    properties: {
                      course: {
                        type: 'object',
                        properties: {
                          _id: {
                            type: 'string',
                            example: '64e9b3d34bcf7a0012d34567',
                          },
                          title: {
                            type: 'string',
                            example: 'Advanced Node.js',
                          },
                          description: {
                            type: 'string',
                            example:
                              'Master advanced Node.js concepts in this in-depth course.',
                          },
                          price: { type: 'number', example: 29.99 },
                          createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-09-10T12:34:56.789Z',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Course not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'FAIL' },
                  message: { type: 'string', example: 'Course Not Found' },
                },
              },
            },
          },
        },
      },
    },
    put: {
      summary: 'Edit an existing course by ID',
      description: 'Update the details of a specific course by its unique ID.',
      parameters: [
        {
          in: 'path',
          name: 'courseId',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The ID of the course to update',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string', example: 'Updated Node.js Course' },
                description: {
                  type: 'string',
                  example: 'Learn advanced concepts of Node.js',
                },
                price: { type: 'number', example: 49.99 },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Course successfully updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'SUCCESS' },
                  data: {
                    type: 'object',
                    properties: {
                      course: {
                        type: 'object',
                        properties: {
                          _id: {
                            type: 'string',
                            example: '64e9b3d34bcf7a0012d34567',
                          },
                          title: {
                            type: 'string',
                            example: 'Updated Node.js Course',
                          },
                          description: {
                            type: 'string',
                            example: 'Learn advanced concepts of Node.js',
                          },
                          price: { type: 'number', example: 49.99 },
                          updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-11-26T14:45:00Z',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Course not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'FAIL' },
                  message: { type: 'string', example: 'Course Not Found' },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      summary: 'Delete a course by ID',
      description: 'Deletes a specific course by its unique ID.',
      parameters: [
        {
          in: 'path',
          name: 'courseId',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The ID of the course to delete',
        },
      ],
      responses: {
        200: {
          description: 'Course successfully deleted',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'SUCCESS' },
                  data: {
                    type: 'object',
                    properties: {
                      result: {
                        type: 'object',
                        properties: {
                          acknowledged: { type: 'boolean', example: true },
                          deletedCount: { type: 'number', example: 1 },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Course not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'FAIL' },
                  message: { type: 'string', example: 'Course Not Found' },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerCourses;
