const mongoose = require("mongoose");

// const schema = mongoose.Schema;
// const objectID = new schema().ObjectID;
const schema = mongoose.Schema,
  ObjectId = schema.ObjectId;

const accountSchema = new schema({
  accountHolder: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
    enum: ["Savings", "Salary"],
    default: "Savings",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  bankID: {
    type: ObjectId,
  },
  companyID: {
    type: ObjectId,
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

module.exports = new mongoose.model("Account", accountSchema);
