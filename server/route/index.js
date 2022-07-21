const express = require("express");

const AppRouter = express();

const AuthRoute = require("./auth");
const ProductRoute = require("./product");
const CategoryRoute = require("./category");
const CareerRoute = require("./career");
const OrderRoute = require("./order");
const ServiceRoute = require("./service");
const UserRoute = require("./user");
const SettingRoute = require("./setting");

// Admin Routes
const LogsRoute = require("./admin/logs");
const AdminOrderRoute = require("./admin/order");
const MailRoute = require("./admin/template");

// Default User
AppRouter.use("/", AuthRoute); // /register
AppRouter.use("/", ProductRoute);
AppRouter.use("/", CategoryRoute);
AppRouter.use("/", CareerRoute);
AppRouter.use("/", OrderRoute);
AppRouter.use("/", ServiceRoute);
AppRouter.use("/", UserRoute);
AppRouter.use("/", MailRoute);




// Admin
AppRouter.use("/admin", LogsRoute);
AppRouter.use("/admin", AdminOrderRoute);
AppRouter.use("/admin", SettingRoute);



module.exports = AppRouter;
