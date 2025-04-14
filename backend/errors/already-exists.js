const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");
class AlreadyExistsError extends CustomAPIError {
  constructor(message) {
    super(message);
    console.log(message);
    this.StatusCodes = StatusCodes.CONFLICT;
  }
}

module.exports = AlreadyExistsError;
