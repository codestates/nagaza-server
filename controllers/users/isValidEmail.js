const { user } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const userInfo = await user.findOne({
      where: { email: req.body.email }
    });

    if(userInfo) {
        res.status(409).send({ message: "이미 존재하는 이메일입니다"});
    } else {
      res.status(200).send({ message: "ok" });
    }
  },
};
