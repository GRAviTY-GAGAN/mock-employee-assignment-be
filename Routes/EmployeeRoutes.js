const express = require("express");
const { EmployeeModel } = require("../Models/EmployeeModel");
const { EmpAuth } = require("../Middlewares/EmployeeAuthMiddleware");

const EmployeeRouter = express.Router();

EmployeeRouter.post("/", EmpAuth, async (req, res) => {
  try {
    const newEmployee = new EmployeeModel({ ...req.body });
    newEmployee.save();

    const employees = await EmployeeModel.find();
    res.json({ msg: "Success", employees });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

EmployeeRouter.get("/", async (req, res) => {
  try {
    let users = await EmployeeModel.find();

    res.json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { EmployeeRouter };
