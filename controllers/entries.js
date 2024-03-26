const { Entry } = require("../models/db");
const logger = require("../logger/index");
const { where } = require("sequelize");

exports.list = async (req, res, next) => {
  const entries = await Entry.findAll();
  const userData = req.user;
  res.render("entries", { title: "Посты", entries: entries, user: userData });
};

exports.form = (req, res) => {
  res.render("post", { title: "Создание поста" });
};

exports.submit = async (req, res, next) => {
  try {
    const username = req.user ? req.user.name : null;
    const data = req.body.entry;

    const entry = {
      username: username,
      title: data.title,
      content: data.content,
    };

    await Entry.create(entry);
    logger.info("Пользователь создал новый пост");
    res.redirect("/posts");
  } catch (err) {
    logger.error(`Произошла ошибка: ${err}`);
    return next(err);
  }
};

exports.delete = async (req, res, next) => {
  const entryId = req.params.id;
  await Entry.destroy({
    where: {
      id: entryId,
    },
  });
  logger.info("Пользователь удалил пост");
  await res.redirect("/posts");
};

exports.updateForm = async (req, res) => {
  const entryId = req.params.id;
  const entry = await Entry.findAll({ where: { id: entryId } });
  // Entry.getEntryById(entryId, async (err, entry) => {
  //   if (err) {
  //     logger.error(`Произошла ошибка: ${err}`);
  //     return res.redirect("posts");
  //   }
  // });
  await res.render("update", { title: "Изменение поста", entry: entry });
};

exports.updateSubmit = async (req, res, next) => {
  const entryId = req.params.id;
  const newData = {
    title: req.body.entry.title,
    content: req.body.entry.content,
  };
  await Entry.update(
    { ...newData },
    {
      where: {
        id: entryId,
      },
    }
  );
  // Entry.update(entryId, newData, (err) => {
  //   if (err) {
  //     logger.error(`Произошла ошибка: ${err}`);
  //     return next(err);
  //   }
  // });
  logger.info("Пользователь изменил пост");
  await res.redirect("/posts");
};
