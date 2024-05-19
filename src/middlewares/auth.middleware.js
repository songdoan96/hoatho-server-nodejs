const { SECRET_KEY } = require("../config");
const asyncHandler = require("express-async-handler");
const HttpException = require("../exceptions/HttpException");
const jwt = require("jsonwebtoken");
const { getAuthorizationToken } = require("../utils/helps");

// const getAuthorizationToken = (req) => {
//   //   const coockie = req.cookies["Authorization"];
//   //   if (coockie) return coockie;

//   const header = req.header("Authorization");
//   if (header) return header.split("Bearer ")[1];
//   return null;
// };

const AuthMiddleware = asyncHandler(async (req, res, next) => {
  const token = getAuthorizationToken(req);
  if (!token) {
    throw new HttpException(401, "Un authorization!!");
  } else {
    try {
      const verify = jwt.verify(token, SECRET_KEY);
      if (verify) {
        next();
      }
    } catch (error) {
      throw new HttpException(403, "Access token is not valid!!!");
    }
  }
});
module.exports = AuthMiddleware;
