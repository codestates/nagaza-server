const { group } = require('../../models/group');
const { Op } = require('sequelize');
const moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

module.exports = {
    post: async (req, res) => {
        //req에서 nowDate를 안 받아도 될 것 같습니다 (확인 필요)
        const now = moment().format('YYYY-MM-DD');

        await group.findAll({
            where: {
                date: {
                    [Op.and]: [
                        {[Op.gte]: now.clone().toDate()},
                        {[Op.lte]: now.clone().add(1, 'days').toDate()}
                    ]
                    //[Op.between]: [now.clone().toDate(), now.clone().add(1, 'days').toDate()] 
                }
            }
        })
        .then(imminentGroupInfos => res.status(200).send({ message: "ok", groupInfo: imminentGroupInfos }))
        .catch(err => res.status(404).send({ message: "error" }))
    }
};