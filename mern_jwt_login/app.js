const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const router = require("./routes/user_route");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(morgan());
app.use(cors({ origin: "*"}));

const URL = process.env.MONGODB_URL;

mongoose
  .connect(URL)
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`Error in MongoDB: ${err}`);
  });

app.use("/v1", router);

app.listen(process.env.PORT, function () {
  console.log(`server listening on port ${process.env.PORT}`);
});
