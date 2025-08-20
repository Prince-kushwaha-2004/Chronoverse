const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors');
const ExpressError = require("./utils/ExpressError")

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');


const userRouter = require("./routes/userRoute")
const productRouter = require("./routes/productRoute")
const orderRouter = require("./routes/orderRoute")
const cartsRouter = require("./routes/cartsRouter")
const port = process.env.PORT || 8000

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://localhost:5173'] }))
app.use("/media", express.static('media'))



// Swagger 
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Chronoverse API",
    version: "1.0.0",
    description: "Auto-generated API for frontend codegen",
  },
  servers: [{ url: `http://localhost:${port}` }],
  tags: [
    {
      name: "Auth",
      description: "Authentication and session management",
    },
    {
      name: "Products",
      description: "Product management",
    },
    {
      name: "Orders",
      description: "Order management",
    },
    {
      name: "Carts",
      description: "Carts management"
    }
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/openapi.yaml', (req, res) => {
  res.setHeader('Content-Type', 'application/x-yaml');
  res.send(yaml.dump(swaggerSpec));
});






app.get("/", (req, res) => {
  res.send(`welcome to Chronoverse website `)
})
app.use("/", userRouter)
app.use("/products", productRouter)
app.use("/orders", orderRouter)
app.use("/carts", cartsRouter)





// error route
app.all('/{*any}', (req, res, next) => {
  next(new ExpressError(404, "Invalid Url!!"));
})


// //error handling middleware 
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Some thing went wrong!" } = err;
  res.status(statusCode).json({ "error": message });
})

app.listen(port, () => {
  console.log(`server listining on port ${port}`)
})




