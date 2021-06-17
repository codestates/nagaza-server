const { user, category_user, category } = require("../../models");

module.exports = {
  get: async (req, res) => {
    await user
      .findOne({
        where: { id: req.body.userId },
      })
      .then((userInfo) => {
         return category_user.findOne({
          where: {
            user_id: userInfo.id
          }
        })
      .then((category_user) => {
         return category.findOne({
          where: {
            id: category_user.dataValues.category_id
          }
        })
      })
      .then((category) => {
        delete userInfo.dataValues.password;
        res.status(200).send({ userInfo: userInfo, category: category, message: "ok" });
      });
  })
}
}