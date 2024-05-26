const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const HttpException = require("../exceptions/HttpException");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const getToken = (id) => {
  return jwt.sign({ id }, SECRET_KEY);
};
class AuthController {
  login = asyncHandler(async (req, res, next) => {
    const { staff_id, password, fcm_token } = req.body;
    const existingUser = await UserModel.findOne({
      staff_id,
    });
    if (!existingUser) {
      throw new HttpException(403, { staff_id: "Tài khoản không tồn tại" });
    }
    const isMatchPassword = await bcrypt.compare(password, existingUser.password);
    if (!isMatchPassword) throw new HttpException(401, { password: "Mật khẩu chưa đúng" });
    existingUser.fcm_token = fcm_token ?? "";

    await existingUser.save();
    res.json({
      message: "Đăng nhập thành công",
      data: {
        user: existingUser,
        token: getToken(existingUser),
      },
    });
  });

  register = asyncHandler(async (req, res, next) => {
    const { staff_id, password, birthday, userGroup } = req.body;

    const existingUser = await UserModel.findOne({ staff_id });
    if (existingUser) {
      throw new HttpException(400, { staff_id: "Tài khoản đã tồn tại" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      ...req.body,
      birthday: new Date(birthday),
      password: hashedPassword,
      group: userGroup,
    });

    await newUser.save();

    res.status(200).json({
      message: "Tạo tài khoản thành công, đăng nhập để tiếp tục",
      data: newUser,
    });
  });

  logout = asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const user = await UserModel.findOne({ _id: id });
    user.fcmToken = null;
    user.save();
    res.json({
      message: "Đăng xuất thành công",
      data: user,
    });
  });
}

module.exports = new AuthController();
