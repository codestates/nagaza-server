const { user, group, group_user, category_user, category, Sequelize } = require("../../models");
const { Op } = require('sequelize');

module.exports = {
  post: async (req, res) => {
    await user
      .findOne({
        where: {
          email: req.body.email,
          password: req.body.password,
        },
      })
      .then((userInfo) => {
        if (!userInfo) {
          // 해당 email과 pw가 일치하는 정보가 DB에 없음 -> 둘 중에 하나는 틀림
          res
            .status(401)
            .send({ message: "유효하지 않은 이메일 또는 비밀번호입니다." });
        } else {
          req.session.save(async() => {
            req.session.userId = userInfo.id;

            // 참가중인 그룹 찾기
            await group_user.findAll({
              where: { user_id: userInfo.dataValues.id}
            })
            .then(result => { //참가중인 그룹의 아이디
              return result.map(el => el.dataValues.group_id)
            })
            .then(groupIds => { //참가중인 그룹 정보 조회
              return group.findAll({
                where: { id: {
                  [Op.or]: groupIds
                }}
              })
            })
            .then((groupInfos) => {
                category_user.findOne({
                  where: { user_id: userInfo.dataValues.id}
                })
                .then((category_user) => {
                  // console.log(category_user)
                   return category.findOne({
                    where: {
                      id: category_user.dataValues.category_id
                    }
                  })
                })
                .then((userPreference) => {
                  delete userInfo.dataValues.password;
                  return res
                    .status(200)
                    .send({
                      userInfo: userInfo,
                      groupInfo: groupInfos,
                      categoryInfo: userPreference,
                      message: "ok",
                    });
                });
          });
        })
        }
      });
  },
};
