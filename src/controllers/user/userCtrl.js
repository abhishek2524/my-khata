const { getBankId } = require("../../handlemodel/handleBankModel");
const { getCompanyName } = require("../../handlemodel/handleCompanyModel");
const { updateUserModel } = require("./../../handlemodel/handleUserModel");
const {
  addAccount,
  getAllAccount,
} = require("../../handlemodel/handleUserModel");

const getAllUser = async (req, res) => {
  try {
    const accountDetails = await getAllAccount();
    let response = [];
    if (!accountDetails)
      return res.status(200).json({ status: true, length: 0, data: response });
    accountDetails.map((data) => {
      let detail = {};
      let totalAmount = 0;
      let totalWithdrawal = 0;
      let totalDeposit = 0;
      let companyName = "";
      detail["_id"] = data._id;
      detail["accountType"] = data.accountType;
      detail["isActive"] = data.isActive;
      detail["accountHolder"] = data.accountHolder;
      detail["bankID"] = data.bankID;
      const bankData = data.bankData[0];
      detail["bank"] = bankData.bankID;
      bankData.transactions.map((item) => {
        if (item.transactionType === "deposit") {
          totalDeposit += item.amount;
        } else if (item.transactionType === "withdrawal") {
          totalWithdrawal += item.amount;
        }
      });
      totalAmount = Math.abs(totalWithdrawal - totalDeposit);
      detail["totalAmount"] = totalAmount;
      detail["companyID"] = data.companyID;
      data.companyData.map((item) => {
        companyName = item.companyname;
      });
      detail["companyName"] = companyName;
      return response.push(detail);
    });
    return res
      .status(200)
      .json({ status: true, length: response.length, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Failed to fetch", msg: "Server Down" });
  }
};

const addUser = async (req, res) => {
  try {
    const reqData = req.body;
    const data = {
      accountHolder: reqData.accountHolder,
      accountType: reqData.accountType,
      bankID: reqData.bankID,
      companyID: reqData.companyID,
    };
    const result = await addAccount(data);
    if (!result)
      return res.status(500).json({
        data: result,
        err: "Failed to add acount",
        msg: "Failed to add Account",
      });
    return res
      .status(200)
      .json({ status: "ok", length: result.length, data: result });
  } catch (error) {
    return res.status(500).json({
      err: "Error in addUser",
      msg: "Failed To add Account",
    });
  }
};

const editUser = async (req, res) => {
  try {
    const data = req.body;
    const { _id } = req.params;
    console.log(data, _id);
    const response = await updateUserModel(_id, data);
    console.log(">>>>>>>>>>>>>>>.", response);
    if (response)
      return res
        .status(200)
        .json({ status: true, msg: "Successfully Updated!" });
    if (response === false)
      return res.status(500).json({ err: "No data", msg: "No data found." });
    if (response === null)
      return res.status(500).json({
        err: "Error in updateUserModel",
        msg: "Something went wrong!",
      });
  } catch (error) {
    return res.status(500).json({
      err: "Error in edituser",
      msg: "Something went wrong",
    });
  }
};
module.exports = { getAllUser, addUser, editUser };
