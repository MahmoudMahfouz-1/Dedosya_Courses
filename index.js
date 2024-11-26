const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); // TO enable the APIs to work from any origin
require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const httpStatusText = require('./utils/httpStatusText');
const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route');

const url = process.env.MONGODB_URL;
mongoose.connect(url).then(() => {
  console.log('mongodb server started');
});

let app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Use OpenAPI 3.0
    info: {
      title: 'Courses Project',
      version: '1.0.0',
      description: 'API Documentation For Courses Project',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Base URL
      },
    ],
  },
  apis: ['./api.js'], // Path to your API documentation comments
};

// Swagger setup
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.all('*', (req, res) => {
  return res.json({
    status: httpStatusText.ERROR,
    message: "This Resource isn't available",
  });
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listing on port ${process.env.PORT}`);
});
