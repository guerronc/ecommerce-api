const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const boom = require("@hapi/boom");

const productRouter = require("./routes/views/products");
const productApiRouter = require("./routes/api/products");
const config = require("./config");
const {
  logErrors,
  wrapError,
  clientErrorHandlers,
  errorHandler
} = require("./utils/middleware/errorsHandlers");

const isRequestAjaxOrApi = require("./utils/isRequestAjaxOrApi");

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

app.use(function(req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload }
    } = boom.notFound();
    res.status(statusCode).json(payload);
    next(boom.notFound());
  }
  res.status(404).render("404");
});

//error handlers
app.use(logErrors);
app.use(wrapError);
app.use(clientErrorHandlers);
app.use(errorHandler);

//server
const server = app.listen(config.port, function() {
  console.log(`Listen http://localhost:${server.address().port}`);
});
