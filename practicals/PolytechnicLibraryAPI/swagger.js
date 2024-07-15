const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json";
const routes = ["./app.js"]; // Correct relative path

const doc = {
  info: {
    title: "Polytechnic Library API",
    description: "API documentation for the Polytechnic Library system",
  },
  host: "localhost:3000",
};

swaggerAutogen(outputFile, routes, doc);


