const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    description: 'API documentation for courses and users',
    version: '1.0.0',
  },
  components: {
    schemas: {
      // Common schemas for response, request bodies etc. (if needed)
    },
  },
  servers: [
    {
      url: 'http://localhost:3000', // or wherever your server is hosted
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ['./swagger/swaggerCourses.js'], // Adjust the path to point to your documentation files
};

module.exports = { options, swaggerDefinition };
