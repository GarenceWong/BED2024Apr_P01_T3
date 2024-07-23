const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json";
const routes = ["./app.js"]; 

const doc = {
  info: {
    title: "My API",
    description: "Description of Zehao Healthcare API",
  },
  host: "localhost:3003",
};

swaggerAutogen(outputFile, routes, doc);