const CompanyModel = require("./../../models/CompanyModel");

const addCompany = async (name) => {
  try {
    const result = await CompanyModel.create({ companyname: name });
    return result;
  } catch (error) {
    return null;
  }
};

module.exports = { addCompany };
