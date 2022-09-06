module.exports = {
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
    min: 3,
  },
  price: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
};
