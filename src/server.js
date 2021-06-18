require("dotenv").config();
require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 7000;
const cors = require("cors");

const options = {
};
app.use(cors(options));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

const userRoutes = require("./routes/user");
const bankRoute = require("./routes/bank");
app.use("/user", userRoutes);
app.use("/bank", bankRoute);

app.listen(PORT, () => {
  console.log(`Server Running at PORT - ${PORT}`);
});
