const { Sequelize, DataTypes } = require("sequelize");
const logger = require("../logger/index.js");

require("dotenv").config();

// Option 3: Passing parameters separately (mysql)
const sequelize = new Sequelize(
  "serverdb",
  process.env.MYSQL_LOGIN,
  process.env.MYSQL_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: (msg) => logger.info(msg),
    define: {
      timestamps: false,
    },
  }
);

// ---------ORM class Entry --------
const Entry = sequelize.define("entries", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.INTEGER,
  },
});

const Brand = sequelize.define("brands", {
  id: {
    type: DataTypes.INTEGER,

    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Product = sequelize.define("products", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  brandId: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Order = sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = { Entry, User, Brand, Product, Order, sequelize };
