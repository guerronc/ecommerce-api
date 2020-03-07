const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const productRouter = require("./routes/views/products");
const productApiRouter = require("./routes/api/products");
const config = require('./config');

//app
const app = express();

//middlewares
app.use(bodyParser.json());

// static files
app.use("/static", express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//routes (Controller)
app.use("/products", productRouter);
app.use("/api/products", productApiRouter);

//Redirect routes
app.get("/", (req, res) => {
  res.redirect("/products");
});

//server
const server = app.listen(config.port, function() {
  console.log(`Listen http://localhost:${server.address().port}`);
});
