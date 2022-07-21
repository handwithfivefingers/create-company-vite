const mongoose = require("mongoose");
// const productSchema = new Schema({ ...product }, { timestamps: true });
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
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  parentId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  type: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
};

// models -> check exists then return else create
// let Dataset =
//   mongoose.models.Product || mongoose.model("Product", productSchema);
// export default Dataset;
