function Auth(req, res, next) {
  const { email, password } = req.body;

  if (email && password) {
    next();
  } else {
    return res.json({
      msg: "Refresh the page or trying filling all the fields again",
    });
  }
}

module.exports = { Auth };
