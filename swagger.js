const swaggerJSDoc = require("swagger-jsdoc");
const port = process.env.PORT || 3000;
const serverUrl = process.env.OPENAPI_SERVER_URL || `http://localhost:${port}`;

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
        url: serverUrl
      }
    ]
  },
  apis: ["./server.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
