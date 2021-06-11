const { users } = require("../../models/user");

module.exports = {
    post: async (req, res) => {
        const { userId, newPassword } = req.body

        await users.update({ password: newPassword }, {
            where: { id: userId }
        })
        .then(result => res.status(200).send({ message: "ok" }))
        .catch(err => {
            res.send(400).send("error")
        })
    }
}