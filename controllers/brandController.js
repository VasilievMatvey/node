const { json } = require("express");
const { Brand, Product } = require("../models/db");
const productController = require("./product");
exports.list = async (req, res, next) => {
  const brands = await Brand.findAll();
  const products = await Product.findAll();
  res.render("catalog", {
    title: "Каталог",
    brands: brands,
    products,
  });
};

exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll();
    return [brands];
  } catch (error) {
    throw new Error("Error fetching brands: " + error.message);
  }
};

exports.adminList = async (req, res, next) => {
  const brands = await Brand.findAll();
  res.render("adminBrands", { title: "Бренды", brands: brands });
};

exports.form = (req, res) => {
  res.render("brand", { title: "Создание бренда" });
};

exports.submit = async (req, res, next) => {
  try {
    const data = req.body.brand;
    await Brand.create(data);
    res.redirect("/catalog");
  } catch (error) {
    return next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const brandId = req.params.id;
    const data = req.body.brand;
    await Brand.update(data, { where: { id: brandId } });
    res.redirect("/catalog");
  } catch (error) {
    return next(err);
  }
};
exports.updateForm = async (req, res, next) => {
  try {
    const brandId = req.params.id;
    const brand = await Brand.findOne({ where: { id: brandId } });
    await res.render("updateBrand", {
      title: "Изменение бренда",
      brand: brand,
    });
  } catch (error) {
    logger.error(`Произошла ошибка: ${error}`);
    return next(error);
  }
};
exports.delete = async (req, res, next) => {
  try {
    const brandId = req.params.id;
    await Brand.destroy({
      where: {
        id: brandId,
      },
    });
    await res.redirect("/catalog");
  } catch (error) {
    logger.error(`Произошла ошибка: ${err}`);
    return next(err);
  }
};
