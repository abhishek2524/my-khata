const {
  addBank,
  addTransaction,
  fetchTransaction,
  updateTransaction,
  deleteTransactionByUpdate,
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

const getTransactions = async (req, res) => {
  try {
    const { bankid } = req.params;
    console.log(req.params);
    const transactionDetails = await fetchTransaction(bankid);
    console.log(transactionDetails);
    let response = [];
    if (!transactionDetails)
      return res.status(200).json({
        status: true,
        length: response.length,
        data: response,
      });
    response = transactionDetails[0];
    return res.status(200).json({
      status: true,
      length: response.length,
      data: response.transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Failed to fetch", msg: "Server Down" });
  }
};

const editTransaction = async (req, res) => {
  try {
    const data = req.body;
    const { bankid } = req.params;
    const response = await updateTransaction(bankid, data);
    if (response)
      return res
        .status(200)
        .json({ status: true, msg: "Successfully Updated!" });
    if (response === false)
      return res.status(500).json({ err: "No data", msg: "No data found." });
    if (response === null)
      return res.status(500).json({
        err: "Error in updateTransaction",
        msg: "Something went wrong!",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: "Error in editTransaction",
      msg: "Something went wrong",
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.body;
    const { bankid } = req.params;
    const response = await deleteTransactionByUpdate(bankid, transactionId);
    if (response)
      return res
        .status(200)
        .json({ status: true, msg: "Successfully Delete!" });
    if (response === false)
      return res.status(500).json({ err: "No data", msg: "No data found." });
    if (response === null)
      return res.status(500).json({
        err: "Error in deleteTransaction",
        msg: "Something went wrong!",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: "Error in deleteTransaction",
      msg: "Something went wrong",
    });
  }
};
module.exports = {
  createBank,
  createTrasaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
};
