const { Router } = require("express");
const { createTrasaction } = require("./../controllers/bank/bankCtrl");

const bankRoute = Router();

bankRoute.route("/:bankid").post(createTrasaction);

module.exports = bankRoute;
