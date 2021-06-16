const { group, group_user } = require("../../models");

module.exports = {
    post: async (req, res) => {
        console.log(req.body)
        const {
            groupName,
            admin, //생성자 user_id
            categoryId,
            startTime, //날짜정보를 제외한 시작시간
            endTime, //날짜를 제외한 종료시간
            date, //시간을 제외한 년-월-일 정보
            description, //description은 공란일 경우 빈 문자열로 받습니다
            location
        } = req.body;
        
        if(groupName && admin && categoryId && startTime && endTime && date && description && location) {
            const groupInfo = await group.findOne({ where: { name: groupName } })

            if(groupInfo) {
                return res.status(409).send({ message: "동일한 그룹명이 존재합니다" }) //그룹명은 중복될 수 없습니다
            } else {
                await group.create({ //그룹을 추가합니다
                        name: groupName,
                        admin: admin,
                        category_id: categoryId,
                        start_time: startTime,
                        end_time: endTime, 
                        date: date, 
                        description: description,
                        location: location
                    })
                .then(newGroup => {
                    group_user
                    .create({
                        group_id: newGroup.dataValues.id,
                        user_id: admin
                    }) //새로 생성된 그룹의 참여자로 admin을 추가합니다
                    .then(result => res.status(201).send({ message: "ok" })) //201 Created
                    .catch(err => res.status(404).send({ message: "error" }))
                })
                .catch(err => res.status(400).send({ message: "error" }));
            }

        } else {
            res.status(422).send({ message: "그룹생성을 위해 필요한 정보가 충분하지 않습니다" });
        }
    }
};