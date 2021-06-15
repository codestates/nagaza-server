const { user } = require("../../models");

//bareminimum: 회원정보 중 비밀번호만 변경 가능
module.exports = {
    post: async (req, res) => {
        const { userId, newPassword } = req.body;

        if(newPassword && userId) {
            await user.update({ password: newPassword }, {
                where: { id: userId }
            })
            .then(result => res.status(200).send({ message: "ok" }))
            .catch(err => {
                res.send(404).send({ message: "error" })
            });
        } else {
            //422 Unprocessable Entity
            res.status(422).send({ message: "회원정보 수정을 위해 필요한 정보가 충분하지 않습니다" });
        }
    }
};