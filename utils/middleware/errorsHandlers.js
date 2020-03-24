const Sentry = require("@sentry/node");
const boom = require("@hapi/boom");
const debug = require("debug")("app:error");

const config = require("../../config");
const isRequestAjaxOrApi = require("../../utils/isRequestAjaxOrApi");

Sentry.init({
  dsn: `https://${config.sentryDns}/${config.sentryId}`
});

function withErrorStacks(err, stack) {
  if (config.dev) {
    return { ...err, stack };
  }
}

function logErrors(err, req, res, next) {
  !config.dev && Sentry.captureException(err);
  debug(err.stack);
  next(err);
}

function wrapError(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function clientErrorHandlers(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err;

  //catch error for AJAX request or if an error occurs while streaming
  if (isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(statusCode).json(withErrorStacks(payload, err.stack));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err;
  res.status(statusCode);
  res.render(withErrorStacks(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapError,
  clientErrorHandlers,
  errorHandler
};
