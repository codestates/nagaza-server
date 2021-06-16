const { user, category_user, category } = require("../../models");

module.exports = {
  get: async (req, res) => {
    // 이미 login 성공상태 -> 무조건 mypage볼 수 있음
    // if (!req.session.userId) {
    //   res.status(401).send("Unauthorized");
    // }
    await user
      .findOne({
        where: { id: req.body.userId },
      })
      .then((userInfo) => {
        // if (!userInfo) {
        //   res.status(401).send("Unauthorized")
        // } else {
        return category_user.findOne({
          where: {
            user_id: userInfo.id
          }
        })
      // })
      .then((category_user) => {
        // console.log(category_user)
         return category.findOne({
          where: {
            id: category_user.dataValues.category_id
          }
        })
      })
      .then((category) => {
        // console.log(category)
        delete userInfo.dataValues.password;
        res.status(200).send({ userInfo: userInfo, category: category, message: "ok" });
      });
    // }
  })
}
}
