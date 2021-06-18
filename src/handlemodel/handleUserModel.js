const AccountModel = require("./../models/AccountModel");
const addAccount = async (data) => {
  try {
    const result = await AccountModel.create(data);
    return result;
  } catch (err) {
    return null;
  }
};

const getAllAccount = async () => {
  try {
    // const result = await AccountModel.find(
    //   {},
    //   { updatedAt: 0, activatedAt: 0, __v: 0 }
    // );
    const result = await AccountModel.aggregate([
      {
        $group: {
          _id: "$_id",
          accountType: { $first: "$accountType" },
          isActive: { $first: "$isActive" },
          accountHolder: { $first: "$accountHolder" },
          bankID: { $first: "$bankID" },
          companyID: { $first: "$companyID" },
        },
      },
      {
        $lookup: {
          from: "banks",
          localField: "bankID",
          foreignField: "_id",
          as: "bankData",
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "companyID",
          foreignField: "_id",
          as: "companyData",
        },
      },
    ]);
    return result;
  } catch (error) {
    return null;
  }
};

const updateUserModel = async (userID, data) => {
  try {
    const qry = { _id: userID };
    const result = await AccountModel.updateOne(qry, { $set: data });
    if (!result.n) return false;
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = { addAccount, getAllAccount, updateUserModel };
