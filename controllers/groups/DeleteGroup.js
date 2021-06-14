const { group, group_user } = require("../../models");

module.exports = {
  post: async (req, res) => {
    // 1. if group_user.group_id === groups.id
    // 2. then if groups.admin === req.body.userId
    // 200: 일치하면 관리자 인증 -> 그룹 삭제 가능
    // 401: 일치하지 않으면 관리자 자격이 없음 -> 삭제 불가능
    const isMatch = await group_user.findOne({
      where: {
        group_id: req.body.groupId,
        user_id: req.body.userId,
      },
    });

    const groupInfo = await group.findAll();

    if (isMatch.group_id === groupInfo.id) {
      if (groupInfo.admin !== req.body.id) {
        res.status(401).send("그룹 삭제 권한이 없습니다.");
      }

      req.session.destroy();
      res.status(200).send("성공적으로 그룹을 삭제했습니다.");
    }
  },
};
