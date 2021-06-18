const mongoose = require("mongoose");

const schema = mongoose.Schema;

const companySchema = new schema({
  companyname: {
    type: String,
  },
});

module.exports = new mongoose.model("Company", companySchema);
