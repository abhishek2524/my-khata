const AccountModel = require("./../../models/AccountModel");
const addAccount = async (data) => {
  try {
    const result = await AccountModel.create(data);
    return result;
  } catch (err) {
    return null;
  }
};
module.exports = { addAccount };
