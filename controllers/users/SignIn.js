const { user, group } = require("../../models");

module.exports = {
  post: async (req, res) => {
    // console.log(req)
    const userInfo = await user.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (!userInfo) { // 해당 email과 pw가 일치하는 정보가 DB에 없음 -> 둘 중에 하나는 틀림
      res.status(401).send({ message: "Invalid user or Wrong password" });
    } else {
      req.session.save(() => {
        req.session.userId = userInfo.id;

        const groupInfo = group.findAll({
          where: { admin: userInfo.id }
        })
        res.status(200).send({ message: "ok", userInfo: userInfo, groupInfo: groupInfo });
      });
    }
  },
};
