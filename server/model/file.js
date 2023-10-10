module.exports = {
  categoryName: {
    type: String,
  },
  files: [
    {
      name: {
        type: String,
      },
      path: {
        type: String,
      },
    },
  ],
  delete_flag: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
}
