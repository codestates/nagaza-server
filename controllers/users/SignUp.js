const { user } = require("../../models");

module.exports = {
  post: async (req, res) => {
    // const userInfo = await user.findAll();

    // general
    if (
      !req.body.gender ||
      !req.body.userName ||
      !req.body.location ||
      !req.body.userId ||
      !req.body.password ||
      !req.body.email ||
      !req.body.age ||
      !req.body.preference
    ) {
      res.status(422).send("가입정보가 충분하지 않습니다.");
    }

    // for (let i = 0; i < userInfo.length; i++) {
    //   req.body.id = userInfo[i].dataValues.id;
    // }
    // 해당 req가 들어오면 DB에 저장해야함
    delete req.body.password;
    res.status(201).send({ userInfo: req.body, message: "ok" });
  },
};
