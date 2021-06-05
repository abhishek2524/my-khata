const mongoose = require("mongoose");

const schema = mongoose.Schema;
const ObjectID = schema.ObjectID;

const pfSchema = new schema({
  companyID: {
    type: ObjectID,
  },
  amount: [
    {
      date: {
        type: Date,
        default: new Date().getTime(),
      },
      employee: String,
      employer: String,
      others: {
        comment: String,
        amount: String,
      },
    },
  ],
});

module.exports = new mongoose.model("PF", pfSchema);
