var express = require('express');
var router = express.Router();

const { groupsController } = require('../controllers');

router.get("/groupinfo", groupsController.groupInfo.get);
router.post("/creategroup", groupsController.createGroup.post);
router.post("/deletegroup", groupsController.deleteGroup.post);
router.post("/joingroup", groupsController.joinGroup.post);
router.post("/unjoingroup", groupsController.unjoinGroup.post);
router.post("/updategroupinfo", groupsController.updateGroupInfo.post);
router.post("/imminentgroupinfo", groupsController.imminentGroupInfo.post);

module.exports = router;