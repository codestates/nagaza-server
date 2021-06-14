const { user } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const userInfo = await user.findAll();

    for (let i = 0; i < userInfo.length; i++) {
      if (req.body.userName === userInfo[i].dataValues.userName) {
        res.status(409).send("이미 존재하는 유저이름입니다.");
      }
    }
    res.status(200).send({ message: "ok" }, req.body.userName);
  },
}