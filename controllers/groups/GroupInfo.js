const { group } = require('../../models/group');
const { Op } = require('sequelize');

module.exports = {
    get: async (req, res) => {
        const { categoryId, startDate, endDate } = req.body;
        
        if(!(categoryId || startDate || endDate)) {
            res.status(404).send({ message: "error" })
        } else {
            //category는 필수항목이고 startDate와 endDate는 선택사항입니다
            if(!(startDate && endDate)) {
                const groupInfos = await group.findAll({
                    where: { category_id: categoryId }
                })
                res.status(200).send({ message: "ok", groupInfo: groupInfos })
            } else {
                const groupInfos = await group.findAll({
                    where: {
                        category_id: categoryId,
                        date: {
                            [Op.between]: [startDate, endDate]
                        }
                    }
                })
                res.status(200).send({ message: "ok", groupInfo: groupInfos })
            }
        }
    }
};