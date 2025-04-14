const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");
class UnAuthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    // unauthorize ke liye FORBIDDEN ....
    this.StatusCodes = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnAuthorizedError;
