const mongoose = require("mongoose");

const schema = mongoose.Schema;
const transactionSchema = new schema({
  date: {
    type: Date,
    default: new Date().getTime(),
  },
  transactionType: {
    type: String,
    default: "deposit",
    enum: ["withdrawal", "deposit"],
  },
  amount: {
    type: String,
    default: "0",
  },
  isSalary: {
    type: Boolean,
    default: false,
  },
});
const bankSchema = new schema({
  bankname: {
    type: String,
    required: true,
  },
  transactions: {
    type: [transactionSchema],
  },
  activatedAt: {
    type: Date,
    default: new Date().getTime(),
  },
  updatedAt: {
    type: Date,
    default: new Date().getTime(),
  },
});

module.exports = new mongoose.model("Bank", bankSchema);
