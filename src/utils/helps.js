const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const UserModel = require("../models/user.model");
const getAuthorizationToken = (req) => {
  const header = req.header("Authorization");
  if (header) return header.split("Bearer ")[1];
  return null;
};
const getUserByToken = async (token) => {
  const verify = jwt.verify(token, SECRET_KEY);
  console.log("🚀 ~ getUserByToken ~ verify:", verify.id);
  const user = await UserModel.findOne({ _id: "66056cea54861ef1cafdd465" });
  return user;
};
module.exports = { getAuthorizationToken, getUserByToken };
