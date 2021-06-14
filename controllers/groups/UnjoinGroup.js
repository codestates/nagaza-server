const { group_user } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const isMatch = await group_user.findOne({
      where: {
        group_id: req.body.groupId,
        user_id: req.body.userId,
      },
    });

    if (isMatch.user_id !== req.body.id) {
      res.status(401).send("유효한 사용자가 아닙니다.");
    }

    req.session.destroy();
    res.status(200).send("성공적으로 그룹을 탈퇴했습니다.");
  },
};
