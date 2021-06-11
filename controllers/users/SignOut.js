module.exports = {
    post: (req, res) => {
        if(req.session) {
            req.session.destroy();
            res.status(200).send({ message: "ok"})
        } else {
            res.status(400).send({ message: 'error'})
        }
    }
}