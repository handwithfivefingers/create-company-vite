const mongoose = require("mongoose");

module.exports = {
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  code: {
    type: String,
    required: true,
    trim: true,
    min: 1,
  },
};
