const { group } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const groupInfo = await group.findAll();

    if (req.body.id !== groupInfo.admin) {
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
    req.body.newDate = groupInfo.date;
    req.body.newEndTime = groupInfo.end_time;
    req.body.newStartTime = groupInfo.start_time;
    req.body.newLocationId = groupInfo.location_id;
    req.body.newCatogoryId = groupInfo.category_id;
    req.bdoy.newDescription = groupInfo.description;
    req.body.newAdmin = groupInfo.admin;
    req.body.newName = groupInfo.name;

    res.status(200).send({ groupInfo: groupInfo, message: "ok" });
  },
};
