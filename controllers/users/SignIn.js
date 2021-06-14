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
    
    if (!userInfo) {
      // 해당 email과 pw가 일치하는 정보가 DB에 없음 -> 둘 중에 하나는 틀림
      res.status(401).send({ message: "유효하지 않은 이메일 또는 비밀번호입니다." });
    }

    req.session.save(() => {
      req.session.userId = userInfo.id;

      // 어떤 group에 속해있는지, 또 해당 그룹의 참가자인지 관리자인지
      const groupInfo = await group.findOne({
        where: {
          admin: req.body.id,
        },
      });

      res.status(200).send({ userInfo: userInfo, groupInfo: groupInfo, message: "ok" });
    });
  },
};
