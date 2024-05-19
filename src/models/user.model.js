const mongoose = require("mongoose");
// const slug = require("mongoose-slug-generator");
// const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const User = new Schema({
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
  fcmToken: {
    type: String,
  },
  group: {
    type: String,
  },
  //   role: {
  //     type: String,
  //     default: "user",
  //   },
  //   created_at: {
  //     type: Date,
  //     default: Date.now,
  //   },
  //   updated_at: {
  //     type: Date,
  //     default: Date.now,
  //   },
});

// Add plugins
// mongoose.plugin(slug);
// User.plugin(mongooseDelete, {
//   deletedAt: true,
//   overrideMethods: "all",
// });

module.exports = mongoose.model("User", User);
