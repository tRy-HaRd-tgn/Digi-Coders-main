const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DB_URL;

mongoose
  .connect(url)
  .then((result) => {})
  .catch((err) => {
    console.error(err);
  });

module.exports = mongoose;
