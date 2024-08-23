const PORT = 8000;

//Initiate Middleware
const express = require('express')
const app = express();
const cors = require(`cors`)
const rateLimit = require('express-rate-limit');
const swaggerSpec = require('./swagger')
const swaggerUi = require('swagger-ui-express');
var bodyParser = require("body-parser");

//Limiter
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 1 menit
  max: 1000, //10 Hit dalam 1 Menit 
  message: "Too many requests from this IP, please try again after 1 minutes."
});

//Call Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())
app.use(limiter);

//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log(swaggerSpec);

//Routes
app.use("/auth", limiter, require("./api/login"));
app.use("/user", limiter, require("./api/user"));
app.use("/cafe", limiter, require("./api/cafe"));
app.use("/menu", limiter, require("./api/menu"));

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
