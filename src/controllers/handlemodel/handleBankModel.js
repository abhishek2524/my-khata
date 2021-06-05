const BankModel = require("./../../models/BankModel");
const addBank = async (data) => {
  try {
    const result = await BankModel.create(data);
    return result;
  } catch (err) {
    return null;
  }
};

module.exports = { addBank };
