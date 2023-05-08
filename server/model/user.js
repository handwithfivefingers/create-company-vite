const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

module.exports = {
  name: {
    type: String,
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
    enum: ['user', 'admin'],
    default: 'user',
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  delete_flag: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  google: {
    sub: String,
    hd: String,
    email: String,
    email_verified: String,
    name: String,
    picture: String,
    given_name: String,
    family_name: String,
  },
}
