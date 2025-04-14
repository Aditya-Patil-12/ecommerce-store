const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
const attachCookiesToResponse = ({ payload, res }) => {
  const token = createJWT({ payload: payload });
  const COOKIE_LIFETIME = 1000 * 60 * 10;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + COOKIE_LIFETIME),
    secure:process.env.NODE_ENV === "production",
    signed:true,
  });
};

const expireCookie = ({ res }) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 10*1000),
  });
};
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  expireCookie,
};
