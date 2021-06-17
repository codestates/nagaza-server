const { group, group_user } = require('../../models');

module.exports = {
    post: async (req, res) => {
        const { groupId, userId } = req.body;

        if(groupId && userId) {
            const isParticipate = await group_user.findOne({ where: { group_id: groupId, user_id: userId }})
            const groupCount = await group_user.count({ where: { group_id: groupId } })

            if(!isParticipate) { //참가하려는 회원이 이미 참가중이 아닐 경우
                if(groupCount < 4) { //그룹 정원(1~4명)
                    await group_user
                    .create({ group_id: groupId, user_id: userId })
                    .then((groupId) => {
                        console.log(groupId)
                        return group.findOne({
                            where: {
                                id: groupId.dataValues.group_id
                            }
                        })
                    })
                    .then(result => res.status(200).send({ message: "ok", groupInfo: result, groupId: groupId }))
                    .catch(err => res.status(404).send({ message: "error" }))
                } else {
                    res.status(409).send({ message: "그룹의 정원이 초과되었습니다"});
                }
            } else {
                res.status(409).send({ message: "이미 그룹에 참가중입니다"});
            };   
        } else {
            res.status(422).send({ message: "그룹에 참가하기 위해 필요한 정보가 부족합니다"});

        }
    }
};