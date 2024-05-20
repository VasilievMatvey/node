const { Order, Product } = require("../models/db");

exports.list = async (req, res, next) => {
  const orders = await Order.findAll();
  res.render("orders", { title: "Заказы", orders: orders });
};

exports.getOne = async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  res.render("order", { title: "Заказ", order: order });
};

exports.createOrder = async (req, res) => {
  const product = await Product.findOne({ where: { id: req.params.id } });
  const order = await Order.create({
    product_id: product.id,
    user_id: req.user.id,
  });
  res.redirect("/orders");
};
