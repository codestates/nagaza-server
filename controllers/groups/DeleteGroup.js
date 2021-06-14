const { group, group_user } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const { groupId, userId } = req.body
    await group.destroy({
      where: {
        id: groupId,
        admin: userId
      }
    })
    .then(result => {
      group_user.destroy({
        where: {
          group_id: groupId
        }
      })
    })
    .then(result => res.status(200).send({ message: "성공적으로 그룹을 삭제했습니다."}))
    .catch(err => res.status(401).send({ message: "그룹 삭제 권한이 없습니다."}))
  }
};
