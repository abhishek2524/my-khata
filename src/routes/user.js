const { Router } = require("express");
const {
  getAllUser,
  addUser,
  editUser,
} = require("./../controllers/user/userCtrl");
const { createBank } = require("./../controllers/bank/bankCtrl");
const { checkIsSalary } = require("../controllers/company/companyCtrl");
const {
  addCompany,
  updateCompany,
} = require("./../handlemodel/handleCompanyModel");
const { updateBankModel } = require("./../handlemodel/handleBankModel");

const userRoute = Router();
const validateAddUser = (req, res, next) => {
  const { bankID, accountHolder, accountType, companyname } = req.body;
  if (bankID != "" && accountHolder != "" && accountType != "") {
    if (accountType === "Salary" && companyname === "") {
      return res.status(500).json({
        err: "company is missing",
        msg: "Failed to create Account",
      });
    }
    next();
  } else {
    return res.status(500).json({
      err: "Some field are missing in body",
      msg: "Failed to create Account",
    });
  }
};
const checkCompanyUpdate = async (req, res, next) => {
  try {
    const data = req.body;
    if (data.accountType !== "Salary") return next();
    if (data.companyID == null) {
      const companyDetail = await addCompany(data.companyname);
      if (companyDetail !== null) {
        req.body = { ...req.body, companyID: `${companyDetail._id}` };
        next();
      } else {
        res.status(500).json({
          err: "Error in addCompany",
          msg: "Failed to update",
        });
      }
    } else {
      const companyDetail = await updateCompany(data.companyID, {
        companyname: data.companyname,
      });
      console.log("companyDetail>>>>", companyDetail);
      if (companyDetail !== null) {
        next();
      } else {
        res.status(500).json({
          err: "Error in updateCompany",
          msg: "Failed to update",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err: "Error in checkCompanyUpdate", msg: "Failed to update" });
  }
};

const checkBankOnUpdate = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await updateBankModel(data.bankID, {
      bankID: data.bank_obj_id,
    });
    if (response === null)
      return res
        .status(500)
        .json({ err: "Error in checkCompanyUpdate", msg: "Failed to update" });
    return next();
  } catch (error) {
    res
      .status(500)
      .json({ err: "Error in checkCompanyUpdate", msg: "Failed to update" });
  }
};
userRoute
  .route("/")
  .get(getAllUser)
  .post(validateAddUser, createBank, checkIsSalary, addUser)
  .delete((req, res) => {
    res.send("deleted user");
  });
userRoute.route("/:_id").put(checkCompanyUpdate, checkBankOnUpdate, editUser);

module.exports = userRoute;
