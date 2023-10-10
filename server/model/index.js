const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const { Schema } = mongoose

// // Step 1 : Create Schema

const userSchema = new Schema(require('./user'), { timestamps: true })
const orderSchema = new Schema(require('./order'), { timestamps: true })
const categorySchema = new Schema(require('./category'), { timestamps: true })
const careerSchema = new Schema(require('./career'), { timestamps: true })
const productSchema = new Schema(require('./product'), { timestamps: true })
const settingSchema = new Schema(require('./setting'), { timestamps: true })
const logSchema = new Schema(require('./log'), { timestamps: true })
const careerCategorySchema = new Schema(require('./careerCategory'), { timestamps: true })

const templateSchema = new Schema(require('./template'), {
  timestamps: true,
  collation: { locale: 'en_US', strength: 1 },
})

const otpSchema = new Schema(require('./otp'), { timestamps: true })

const transactionSchema = new Schema(require('./transaction'), { timestamps: true })

const fileSchema = new Schema(require('./file'), { timestamps: true })

// // Step 2 : Create Methods - Function

userSchema.method({
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password)
  },
})

// // Step 3: Create Models

const User = mongoose.model('User', userSchema)
const Order = mongoose.model('Order', orderSchema)
const Category = mongoose.model('Category', categorySchema)
const Career = mongoose.model('Career', careerSchema)
const Product = mongoose.model('Product', productSchema)
const TemplateMail = mongoose.model('TemplateMail', templateSchema)
const Setting = mongoose.model('Setting', settingSchema)
const Log = mongoose.model('Log', logSchema)
const CareerCategory = mongoose.model('careerCategory', careerCategorySchema)
const OTP = mongoose.model('OTP', otpSchema)
const Transaction = mongoose.model('Transaction', transactionSchema)
const File = mongoose.model('File', fileSchema)

// // Step 4 : Create Virtual Field - Reference

orderSchema.virtual('main_career', {
  ref: 'Career',
  localField: 'data.create_company.approve.company_main_career.value',
  foreignField: '_id',
})

orderSchema.virtual('opt_career', {
  ref: 'Career',
  localField: 'data.create_company.approve.company_opt_career',
  foreignField: '_id',
})

orderSchema.virtual('data.create_company.approve.main_career', {
  ref: 'Career',
  localField: 'data.create_company.approve.company_main_career',
  foreignField: 'name',
})

orderSchema.virtual('data.create_company.opt_career', {
  ref: 'Career',
  localField: 'data.create_company.company_opt_career',
  foreignField: '_id',
})

orderSchema.set('toObject', { virtuals: true })

orderSchema.set('toJSON', { virtuals: true })

module.exports = {
  User,
  Career,
  Order,
  Category,
  TemplateMail,
  Setting,
  Log,
  Product,
  CareerCategory,
  OTP,
  Transaction,
  File,
}
