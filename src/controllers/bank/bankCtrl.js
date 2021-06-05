const { addBank } = require("../handlemodel/handleBankModel");

const createBank = async (req, res, next) => {
  try {
    const data = { bankname: req.body.bankname };
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

module.exports = { createBank };
