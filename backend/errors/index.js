const BadRequestError = require("./bad-request");
const NotFoundError =require('./not-found');
const UnauthenticatedError =require('./unauthenticated');
const UnauthorizedError = require("./unauthorized");
const CustomAPIError= require('./custom-api');
const AlreadyExistsError = require('./already-exists')
module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
  CustomAPIError,
  AlreadyExistsError,
};