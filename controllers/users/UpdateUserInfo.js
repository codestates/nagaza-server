const { user, category_user } = require("../../models");

module.exports = {
    post: async (req, res) => {
        const { userId, newUserName, newEmail, newAge, newPreference, newLocation } = req.body;

        if(userId) {
            await user.update({
                username: newUserName,
                age: newAge,
                email: newEmail,
                location: newLocation
            }, {
                where: { id: userId }
            })
            .then(result => {
                return category_user.update({
                    category_id: newPreference
                }, {
                    where: { user_id: userId }
                })
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