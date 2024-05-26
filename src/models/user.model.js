const mongoose = require("mongoose");
// const slug = require("mongoose-slug-generator");
// const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    staff_id: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      max: 11,
    },
    birthday: {
      type: Date,
    },
    position: {
      type: String,
    },
    fcm_token: {
      type: String,
    },
    group: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
