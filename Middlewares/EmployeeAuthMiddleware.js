function EmpAuth(req, res, next) {
  const { firstName, lastName, department, salary, email } = req.body;
  // console.log(req.body);

  if (firstName && lastName && department && salary && email) {
    next();
  } else {
    return res.json({
      msg: "Insufficient details provided",
    });
  }
}

module.exports = { EmpAuth };
