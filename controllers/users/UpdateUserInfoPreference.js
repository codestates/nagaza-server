const { category_user } = require("../../models/category_user");

module.exports = {
    post: async (req, res) => {
        const { userId, newPreference } = req.body

        await category_user.update({ preference: newPreference }, {
            where: { id: userId }
        })
        .then(result => res.status(200).send({ message: "ok", preference: newPreference }))
        .catch(err => {
            res.send(400).send("error")
        })
    }
}