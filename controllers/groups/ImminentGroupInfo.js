const { group } = require('../../models/group');
const { Op } = require('sequelize');

module.exports = {
    post: async (req, res) => {
        //req에서 nowDate를 안 받아도 될 것 같습니다 (확인 필요)
        await group.findAll({
            where: {
                date: {
                    [Op.and]: [
                        {[Op.gte]: moment().toDate()},
                        {[Op.lte]: moment().add(1, 'days').toDate()}
                    ]
                    //[Op.between]: [moment().toDate(), moment().add(1, 'days').toDate()] 
                }
            }
        })
        .then(imminentGroupInfos => res.status(200).send({ message: "ok", groupInfo: imminentGroupInfos }))
        .catch(err => res.status(404).send({ message: "error" }))
    }
};