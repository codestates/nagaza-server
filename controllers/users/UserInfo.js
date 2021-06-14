const { user } = require("../../models");

module.exports = {
  get: async (req, res) => {
    // 이미 login 성공상태 -> 무조건 mypage볼 수 있음
    // if (!req.session.userId) {
    //   res.status(401).send("Unauthorized");
    // }
    const result = await user.findOne({
      where: { id: req.session.userId },
    });
    res.status(200).send({ userInfo: result, message: "ok" });
  },
};
