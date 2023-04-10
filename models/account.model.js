const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 20
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AccountModel", AccountSchema);
