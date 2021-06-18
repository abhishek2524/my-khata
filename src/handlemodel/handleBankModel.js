const BankModel = require("./../models/BankModel");
const addBank = async (data) => {
  try {
    const result = await BankModel.create(data);
    return result;
  } catch (err) {
    return null;
  }
};

const getBankId = async (idlist) => {
  try {
    const result = await BankModel.find(
      { _id: { $in: idlist } },
      { __v: 0, activatedAt: 0, updatedAt: 0 }
    );
    return result;
  } catch (error) {
    return null;
  }
};

const addTransaction = async (query, data) => {
  try {
    console.log("addd", query, data);
    const result = await BankModel.updateOne(query, data);
    if (result.nModified === 0) return null;
    return true;
  } catch (error) {
    return null;
  }
};

const updateBankModel = async (_id, data) => {
  try {
    const qry = { _id };
    const result = await BankModel.updateOne(qry, { $set: data });
    if (!result.n) return false;
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const fetchTransaction = async (_id) => {
  try {
    console.log("fetching>>>>>>>", _id);
    const result = await BankModel.find({ _id }, { transactions: 1 });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateTransaction = async (_id, data) => {
  try {
    const qry = { _id, "transactions._id": data._id };
    let dataToUpdate = {};
    for (let [key, value] of Object.entries(data)) {
      if (key === "_id") continue;
      const keyList = `transactions.$.${key}`;
      if (key === "date") dataToUpdate[keyList] = new Date(value);
      else dataToUpdate[keyList] = value;
    }
    const result = await BankModel.updateOne(qry, { $set: dataToUpdate });
    if (!result.n) return false;
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteTransactionByUpdate = async (bankid, transactionId) => {
  try {
    const result = await BankModel.updateOne(
      { _id: bankid },
      { $pull: { transactions: { _id: transactionId } } }
    );
    console.log("delete>>>>>>>>>>>>>>>", result);
    if (!result.n) return false;
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = {
  addBank,
  getBankId,
  addTransaction,
  updateBankModel,
  fetchTransaction,
  updateTransaction,
  deleteTransactionByUpdate,
};
