class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    console.log("hewre cerro ", message);
  }
}
module.exports = CustomAPIError;