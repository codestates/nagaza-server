module.exports = {
    post: (req, res) => {
        console.log(req)
        console.log(req.session)
        if(req.session) {
            req.session.destroy();
            console.log('after:', req.session)
            res.status(200).send({ message: "ok"})
        } else {
            res.status(400).send({ message: 'error'})
        }
    }
}