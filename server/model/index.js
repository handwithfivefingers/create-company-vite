const user = require("./user");
// const company = require("./company");
const order = require("./order");
const category = require("./category");
const career = require("./career");
const product = require("./product");
const template = require("./template");
const setting = require("./setting");
const log = require("./log");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

// // Step 1 : Create Schema

const userSchema = new Schema({ ...user }, { timestamps: true });
// const companySchema = new Schema({ ...company }, { timestamps: true });
const orderSchema = new Schema({ ...order }, { timestamps: true });
const categorySchema = new Schema({ ...category }, { timestamps: true });
const careerSchema = new Schema({ ...career }, { timestamps: true });
const productSchema = new Schema({ ...product }, { timestamps: true });
const settingSchema = new Schema({ ...setting }, { timestamps: true });
const logSchema = new Schema({ ...log }, { timestamps: true });
const templateSchema = new Schema({ ...template }, { timestamps: true, collation: { locale: "en_US", strength: 1 } });

// // Step 2 : Create Methods - Function

userSchema.method({
  authenticate: async function (password) {
    // console.log(this);
    return await bcrypt.compare(password, this.hash_password);
  },
});

// // Step 3: Create Models

const User = mongoose.model("User", userSchema);

// const Company = mongoose.model("Company", companySchema);
const Order = mongoose.model("Order", orderSchema);
const Category = mongoose.model("Category", categorySchema);
const Career = mongoose.model("Career", careerSchema);
const Product = mongoose.model("Product", productSchema);
const TemplateMail = mongoose.model("TemplateMail", templateSchema);
const Setting = mongoose.model("Setting", settingSchema);
const Log = mongoose.model("Log", logSchema);

// // Step 4 : Create Virtual Field - Reference

// orderSchema.virtual("products", {
//   ref: "Product",
//   localField: "data.create_company.approve.company_main_career.value",
//   foreignField: "_id",
// });

orderSchema.virtual("main_career", {
  ref: "Career",
  localField: "data.create_company.approve.company_main_career.value",
  foreignField: "_id",
});

orderSchema.virtual("opt_career", {
  ref: "Career",
  localField: "data.create_company.approve.company_opt_career",
  foreignField: "_id",
});

orderSchema.virtual("data.create_company.approve.main_career", {
  ref: "Career",
  localField: "data.create_company.approve.company_main_career",
  foreignField: "name",
});

orderSchema.virtual("data.create_company.opt_career", {
  ref: "Career",
  localField: "data.create_company.company_opt_career",
  foreignField: "_id",
});

orderSchema.set("toObject", { virtuals: true });
orderSchema.set("toJSON", { virtuals: true });

module.exports = { User, Career, Order, Category, TemplateMail, Setting, Log, Product };
