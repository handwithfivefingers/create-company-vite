const mongoose = require("mongoose");

module.exports = {
  mailRegister: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TemplateMail",
  },
  mailPayment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TemplateMail",
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
};
