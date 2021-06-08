const { addCompany } = require("../../handlemodel/handleCompanyModel");
const CompanyModel = require("./../../models/CompanyModel");
const checkIsSalary = async (req, res, next) => {
  try {
    if (req.body.accountType && req.body.accountType === "Salary") {
      const result = await addCompany(req.body.companyname);
      if (!result)
        return res.status(500).json({
          err: "Failed to addCompany",
          msg: "Failed to add Account",
          data: result,
        });
      req.body["companyID"] = result._id;
      next();
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      err: "Error in checkIsSalary",
      msg: "Failed to add Account",
    });
  }
};

module.exports = { checkIsSalary };
