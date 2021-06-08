const {
  addBank,
  addTransaction,
} = require("./../../handlemodel/handleBankModel");

const createBank = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const data = { bankID: bodyData.bankID };
    const result = await addBank(data);
    if (!result)
      return res.status(500).json({
        err: "Failed to add Bank",
        msg: "Failed to add account",
        data: result,
      });
    const bankID = result._id;
    req.body["bankID"] = bankID;
    next();
  } catch (error) {
    res.status(500).json({
      error: "error while adding bank",
      msg: "Failed to create Account",
    });
  }
};

const createTrasaction = async (req, res) => {
  try {
    const { bankid } = req.params;
    const data = req.body;
    console.log("11111111", data, bankid);
    const query = { _id: bankid };
    const dataToPush = { $push: { transactions: data } };
    const result = await addTransaction(query, dataToPush);
    if (!result)
      return res.status(500).json({
        err: "null while adding",
        msg: "Failed to add trasaction",
      });
    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: "error in addTransaction",
      msg: "Failed to add trasaction",
    });
  }
};

module.exports = { createBank, createTrasaction };
