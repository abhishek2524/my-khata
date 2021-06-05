const { Router } = require("express");
const { getUser, addUser } = require("./../controllers/user/userCtrl");
const { createBank } = require("./../controllers/bank/bankCtrl");
const { checkIsSalary } = require("../controllers/company/companyCtrl");

const userRoute = Router();
userRoute
  .route("/")
  .get(getUser)
  .post(createBank, checkIsSalary, addUser)
  .put((req, res) => {
    res.send("Updated user");
  })
  .delete((req, res) => {
    res.send("deleted user");
  });

module.exports = userRoute;
