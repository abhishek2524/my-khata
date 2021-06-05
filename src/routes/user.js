const { Router } = require("express");
const { getUser, getMid } = require("./../controllers/userCtrl");
const userRoute = Router();
userRoute
  .route("/")
  .get(getMid, getUser)
  .post((req, res) => {
    res.send("Added user");
  })
  .put((req, res) => {
    res.send("Updated user");
  })
  .delete((req, res) => {
    res.send("deleted user");
  });

module.exports = userRoute;
