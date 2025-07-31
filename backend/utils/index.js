const {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  expireCookie,
} = require("./jwt");
const {createTokenUser} = require('./createTokenUser')
const checkPermissions = require('./checkPermissions')
const calculateDiscountedAmount = require("./calcualteDiscountedAmount");
const calculatePercentageAmount = require('./calculatePercentageAmount');
const calculateTotalOrderCosting = require('./pricing/calculateTotalOrderCosting')
const calculateProductCosting = require('./pricing/calculateProductCosting')
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  expireCookie,
  createTokenUser,
  checkPermissions,
  calculateDiscountedAmount,
  calculatePercentageAmount,
  calculateTotalOrderCosting,
  calculateProductCosting,
};