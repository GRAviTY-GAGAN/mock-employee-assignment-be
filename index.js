const express = require("express");
const { connection } = require("./db");
const { AuthRouter } = require("./Routes/AuthRoutes");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/auth", AuthRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log(`DB Connected successfully.`);
    console.log(`Server running at port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
