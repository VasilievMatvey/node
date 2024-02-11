const logger = require("../logger/index");
const User = require("../models/user");

exports.form = (req, res) => {
  res.render("registerForm", { title: "Register" });
};

exports.submit = (req, res, next) => {
  User.findByEmail(req.body.email, (error, user) => {
    if (error) {
      logger.error(`Произошла ошибка: ${error}`);
      return next(error);
    }
    if (user) {
      logger.error("Такой пользователь в базе уже существует");
      res.error("Такой пользователь в базе уже существует");
      res.redirect("/");
    } else {
      User.create(req.body, (err) => {
        if (err) return next(err);
        req.session.userEmail = req.body.email;
        req.session.userName = req.body.name;
        res.redirect("/");
      });
    }
  });
};
