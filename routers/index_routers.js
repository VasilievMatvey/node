const express = require("express");
const router = express.Router();
const register = require("../controllers/register");
const login = require("../controllers/login");
const entries = require("../controllers/entries");
const brandController = require("../controllers/brandController");
const productController = require("../controllers/product");
const ordersContreoller = require("../controllers/orders");
const validation = require("../middleware/validate_form");
const validate = require("../middleware/validate");
const logger = require("../logger");
const passport = require("passport");
const ensureAuthenticated = require("../middleware/isAuthenticated");
router.get("/", (req, res) => {
  logger.info("Пользователь зашёл на главную страницу");
  res.render("main", {
    title: "Главная",
  });
});

router.get("/catalog", brandController.list);

router.get("/admin", (req, res) => {
  res.render("admin", { title: "Админ панель" });
});
router.get("/admin/orders", (req, res) => {
  res.render("adminOrders", {
    title: "Управление заказами",
    orders: [ordersContreoller.list],
  });
});
router.get("/admin/brands", brandController.adminList);
router.get("/admin/brands/create", brandController.form);
router.post("/admin/brands/create", brandController.submit);
router.get("/admin/update/brand/:id", brandController.updateForm);
router.post("/admin/update/brand/:id", brandController.update);
router.get("/admin/delete/brand/:id", brandController.delete);

router.get("/admin/products", productController.adminList);
router.get("/admin/products/create", productController.productForm);
router.post("/admin/products/create", productController.submit);
router.get("/admin/update/product/:id", productController.updateProductForm);
router.post("/admin/update/product/:id", productController.updateProduct);
router.get("/admin/delete/product/:id", productController.delete);

router.get("/product/:id", productController.oneProduct);

router.get("/orders", ordersContreoller.list);
router.get("/order/:id", ordersContreoller.createOrder);
router.get("/posts", entries.list);
router.get("/post", entries.form);

router.post(
  "/post",
  ensureAuthenticated,
  validate.required("[entry[title]]"),
  validate.required("entry[[content]]"),
  validate.lengthAbove("[entry[title]]", 4),
  entries.submit
);
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

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.get("/auth/vkontakte", passport.authenticate("vkontakte"));

router.get(
  "/auth/vkontakte/callback",
  passport.authenticate("vkontakte", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = router;
