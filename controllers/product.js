const { Product, Brand } = require("../models/db");
const uuid = require("uuid");
const path = require("path");

const FileService = require("../services/Files.js");
exports.list = async (req, res, next) => {
  const { brandId } = req.query;

  if (brandId) {
    const products = await Product.findAll({
      where: {
        brandId: brandId,
      },
    });
    res.render("products", { title: "Каталог", products: products });
    return;
  }
  const products = await Product.findAll();
  res.render("products", { title: "Каталог", products: products });
};

exports.oneProduct = async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findOne({ where: { id: productId } });
  res.render("productPage", { title: "Товар", product: product });
};

exports.adminList = async (req, res, next) => {
  const products = await Product.findAll();
  res.render("adminProducts", {
    title: "Товары",
    products: products,
  });
};

exports.productForm = async (req, res) => {
  try {
    const brands = await Brand.findAll(); // Получение списка брендов из базы данных

    res.render("productForm", { title: "Создание товара", brands: brands }); // Передача списка брендов в шаблон
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.delete = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ where: { id: productId } });
    if (product.image) {
      // удаляем изображение товара
      FileService.delete(product.image);
    }
    await Product.destroy({
      where: {
        id: productId,
      },
    });
    await res.redirect("/catalog");
  } catch (error) {
    logger.error(`Произошла ошибка: ${err}`);
    return next(err);
  }
};

exports.form = async (req, res, next) => {
  res.render("productForm", { title: "Создание товара" });
};

exports.submit = async (req, res, next) => {
  const { name, price, brandId } = req.body;
  const image = FileService.save(req.files?.img) ?? "";

  const product = await Product.create({
    name: name,
    price: price,
    brandId: brandId,
    img: image,
  });

  res.redirect("/catalog");
};

exports.updateProductForm = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ where: { id: productId } });
    await res.render("updateProduct", {
      title: "Изменение продукта",
      product: product,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const newData = {
      name: req.body.name,

      price: req.body.price,
    };
    await Product.update(newData, {
      where: {
        id: productId,
      },
    });
    res.redirect("/catalog");
  } catch {
    return next(error);
  }
};
