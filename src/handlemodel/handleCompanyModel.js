const CompanyModel = require("./../models/CompanyModel");

const addCompany = async (name) => {
  try {
    const result = await CompanyModel.create({ companyname: name });
    return result;
  } catch (error) {
    return null;
  }
};

const getCompanyName = async (idlist) => {
  try {
    const result = await CompanyModel.find(
      { _id: { $in: idlist } },
      { __v: 0, activatedAt: 0, updatedAt: 0 }
    );
    return result;
  } catch (error) {
    return null;
  }
};

const updateCompany = async (_id, data) => {
  try {
    const qry = { _id: _id };
    console.log(qry, data);
    const result = await CompanyModel.updateOne(qry, { $set: data });
    console.log(result);
    if (!result.n) return false;
    return true;
  } catch (error) {
    return null;
  }
};

module.exports = { addCompany, getCompanyName, updateCompany };
