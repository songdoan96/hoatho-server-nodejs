const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Support = new Schema(
  {
    help: {
      type: String,
      required: true,
    },
    line: {
      type: Number,
      required: true,
    },
    group: {
      type: Number,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Support", Support);
