const { user } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const userInfo = await user.findAll();

    for (let i = 0; i < userInfo.length; i++) {
      if (req.body.email === userInfo[i].dataValues.email) {
        res.status(409).send("이미 존재하는 이메일입니다.");
      }
    }
    res.status(200).send({ message: "ok" }, req.body.email);
  },
};
