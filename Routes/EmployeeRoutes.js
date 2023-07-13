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

EmployeeRouter.get("/:page", async (req, res) => {
  let { page } = req.params;
  try {
    if (!page) {
      page = 1;
    }

    let users = await EmployeeModel.find().limit(5).skip(page);

    res.json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

EmployeeRouter.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let usersDeleted = await EmployeeModel.findOneAndDelete({ _id: id });

    let users = await EmployeeModel.find();

    res.json({ msg: "Success", users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { EmployeeRouter };
