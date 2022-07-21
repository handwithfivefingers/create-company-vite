const mongoose = require("mongoose");

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
// models -> check exists then return else create
// let Dataset =
//   mongoose.models.Category || mongoose.model("Category", categorySchema);
// export default Dataset;
