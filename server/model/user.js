const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

module.exports = {
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
};

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//       min: 3,
//     },
//     email: {
//       type: String,
//       required: true,
//       trim: true,
//       unique: true,
//       lowercase: true,
//     },
//     hash_password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },
//     phone: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//   },
//   { timestamps: true }
// );

// userSchema.method({
//   authenticate: async function (password) {
//     return await bcrypt.compare(password, this.hash_password);
//   },
// });

// module.exports = mongoose.model("User", userSchema);
