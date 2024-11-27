const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// Path to the API specs
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Courses API',
      version: '1.0.0',
      description: 'API documentation for the Courses application',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api', // Base URL for your API
      description: 'Local API server for development',
    },
    {
      url: 'dedosyacourses-production.up.railway.app', // Base URL for your API
      description: 'Global API Server for production',
    },
  ],
  apis: [
    path.join(__dirname, '/schemas/courses.js'), // Path to courses schema
    path.join(__dirname, '/schemas/users.js'), // Path to users schema
    path.join(__dirname, '/docs/coursesDocs.js'), // You can add your route files here to auto-generate docs
    path.join(__dirname, '/docs/userDocs.js'), // You can add your route files here to auto-generate docs
  ],
};
// Initialize swagger-jsdoc
const specs = swaggerJsdoc(options);

const swaggerSetup = (app) => {
  // Setup Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = swaggerSetup;
