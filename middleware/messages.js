// const User = require("../models/user");

function message(req) {
  return (msg, type) => {
    type = type || "info";
    let sess = req.session;
    sess.messages = sess.messages || [];
    sess.messages.push({ type: type, string: msg });
  };
}

module.exports = function (req, res, next) {
  res.message = message(req, "error");
  res.error = (msg) => {
    return res.message(msg);
  };
  res.locals.message = req.session.messages || [];
  res.locals.removeMessage = function () {
    res.session.message;
  };

  next();
};
