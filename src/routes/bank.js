const { Router } = require("express");
const {
  createTrasaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
} = require("./../controllers/bank/bankCtrl");

const bankRoute = Router();

bankRoute
  .route("/:bankid")
  .post(createTrasaction)
  .get(getTransactions)
  .put(editTransaction)
  .delete(deleteTransaction);

module.exports = bankRoute;
