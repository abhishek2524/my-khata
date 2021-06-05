require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 7000;

require("./db");

const userRoutes = require("./routes/user");
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server Running at PORT - ${PORT}`);
});
