const { category_user } = require("../../models/category_user");

module.exports = {
    post: async (req, res) => {
        const { userId, newPreference } = req.body;

        if(newPreference && userId) {
            await category_user.update({ preference: newPreference }, {
                where: { id: userId }
            })
            .then(result => res.status(200).send({ message: "ok", preference: newPreference }))
            .catch(err => {
                res.send(404).send("error")
            });
        } else {
            res.status(422).send({ message: "Preference 수정을 위해 필요한 정보가 충분하지 않습니다" });
        }
    }
};