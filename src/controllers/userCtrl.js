const getUser = (req, res) => {
  res.send("getUser function");
};
const getMid = (req, res, next) => {
  console.log("mid");
  next();
};

module.exports = { getUser, getMid };
