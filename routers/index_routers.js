const express = require("express");
const router = express.Router();
const register = require("../controllers/register");
const login = require("../controllers/login");
const entries = require("../controllers/entries");
const validation = require("../middleware/validate_form");
const validate = require("../middleware/validate");
const logger = require("../logger");
const passport = require("passport");
router.get("/", (req, res) => {
  logger.info("Пользователь зашёл на главную страницу");
  res.render("main", {
    title: "Главная",
  });
});
router.get("/posts", entries.list);
router.get("/post", entries.form);

router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  validate.required("[entry[title]]"),
  validate.required("entry[[content]]"),
  validate.lengthAbove("[entry[title]]", 4),
  entries.submit
);

router.get("/update/:id", entries.updateForm);
router.post("/update/:id", entries.updateSubmit);

router.get("/delete/:id", entries.delete);

router.get("/register", register.form);
router.post("/register", register.submit);

router.get("/login", login.form);
router.post("/login", login.submit);
router.get("/logout", login.logout);

router.get(
  "/auth/yandex",
  passport.authenticate("yandex"),
  function (req, res) {
    // The request will be redirected to Yandex for authentication, so this
    // function will not be called
  }
);

// GET /auth/yandex/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  "/auth/yandex/callback",
  passport.authenticate("yandex", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

module.exports = router;
