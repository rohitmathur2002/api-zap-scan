const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Demo API",
      version: "1.0.0",
      description: "A normal Swagger demo API"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./server.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
