const { group } = require('../../models');
const { Op } = require('sequelize');
const moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); //현지 시간 서울 기준

module.exports = {
    post: async (req, res) => {
        //req에서 nowDate를 안 받아도 될 것 같습니다 (확인 필요)
        const now = moment();
        console.log(now)

        await group.findAll({
            where: {
                date: {
                    [Op.and]: [
                        {[Op.gte]: now.toDate()},
                        {[Op.lte]: now.add(1, 'days').toDate()}
                    ]
                    //[Op.between]: [now.clone().toDate(), now.clone().add(1, 'days').toDate()] 
                }
            }
        })
        .then(imminentGroupInfos => res.status(200).send({ message: "ok", groupInfo: imminentGroupInfos }))
        .catch(err => res.status(404).send({ message: "error" }))
    }
};