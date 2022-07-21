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

// careerSchema.virtual('products', {
//   ref: 'Product',
//   localField: '_id',
//   foreignField: 'nganhnghe'
// });

// models -> check exists then return else create
// let Dataset = mongoose.models.Career || mongoose.model('Career', careerSchema)
// export default Dataset
