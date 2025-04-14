const {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  expireCookie,
} = require("./jwt");
const {createTokenUser} = require('./createTokenUser')
const checkPermissions = require('./checkPermissions')
const calculateDiscountedAmount = require("./calcualteDiscountedAmount");
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  expireCookie,
  createTokenUser,
  checkPermissions,
  calculateDiscountedAmount,
};