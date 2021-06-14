const { group } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const isAdmin = await group.findOne({
      where: {
        id: req.body.groupId,
        admin: req.body.userId
      }
    });

    if (isAdmin) {
      const groupInfo = await group.update({
        date: req.body.newDate,
        end_time: req.body.newEndTime,
        start_time: req.body.newStartTime,
        location_id: req.body.newLocationId,
        category_id: req.body.newCatogoryId,
        description: req.body.newDescription,
        admin: req.body.newAdmin,
        name: req.body.newName
      }, {
        id: req.body.groupId
      })
      
      res.status(200).send({ message: "ok", groupInfo: groupInfo })
    } else {
      res.status(401).send("그룹 수정 권한이 없습니다.");
    }
    
    // if (
    //   !req.body.newDate ||
    //   !req.body.newEndTime ||
    //   !req.body.newStartTime ||
    //   !req.body.newLocationId ||
    //   !req.body.newCatogoryId ||
    //   !req.body.newDescription ||
    //   !req.body.newAdmin ||
    //   !req.body.newName
    // ) {
    //   res.status(422).send("정확한 수정정보를 입력해 주세요.");
    // }
  },
};
