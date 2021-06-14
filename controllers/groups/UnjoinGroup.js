const { group_user } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const { groupId, userId } = req.body
    await group_user.destroy({
      where: {
        group_id: groupId,
        user_id: userId,
      },
    })
    .then(result => res.status(200).send({ message: "성공적으로 그룹을 탈퇴했습니다"}))
    .catch(err => res.status(401).send({ message: "error"}))
  }
};
