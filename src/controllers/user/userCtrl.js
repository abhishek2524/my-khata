const { addAccount } = require("../handlemodel/handleUserModel");

const getUser = (req, res) => {
  res.send("getUser function");
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
  // console.log(">>>>>>", req.body);
  // res.send("hi");
};
module.exports = { getUser, addUser };
