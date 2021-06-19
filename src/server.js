require("dotenv").config();
require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const { createToken, verifyToken } = require("./helper/jwt");
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

const userRoutes = require("./routes/user");
const bankRoute = require("./routes/bank");
const { verify } = require("jsonwebtoken");
app.use("/login", async (req, res, next) => {
  try {
    const { pwd, user } = req.body;
    bcrypt.compare(pwd, process.env.KEY, function (err, result) {
      if (err) return res.status(500).json({ msg: "Invalid Password" });
      if (!result) return res.status(500).json({ msg: "Invalid Password" });
      if (user === "abhiboss") {
        createToken(user)
          .then((token) =>
            res.status(201).json({ token, msg: "Login Success", ok: true })
          )
          .catch((err) => res.status(500).json({ msg: "Failed to login" }));
      } else {
        return res.status(500).json({ msg: "Failed to login" });
      }
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ msg: "Login Failed" });
  }
});
app.use("/", async (req, res, next) => {
  try {
    const { token } = req.headers;
    const verified = await verifyToken(token);
    if (!verified)
      return res.status(400).json({ msg: "Session Expired", status: "logout" });
    next();
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
app.use("/user", userRoutes);
app.use("/bank", bankRoute);

app.listen(PORT, () => {
  console.log(`Server Running at PORT - ${PORT}`);
});
