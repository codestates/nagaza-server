const { user } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const userInfo = await user.findOne({
      where: { username: req.body.userName }
    });
    
    if(userInfo) {
      res.status(409).send("이미 존재하는 유저이름입니다.");
    } else {
      res.status(200).send({ message: "ok" });
    }
  },
}