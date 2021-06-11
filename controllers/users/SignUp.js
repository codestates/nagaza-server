const { user } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const userInfo = await user.findAll();

    if (
      req.body.gender ||
      req.body.userName ||
      req.body.location ||
      req.body.userId ||
      req.body.password ||
      req.body.email ||
      req.body.age ||
      req.body.preference
    ) {
      for (let i = 0; i < userInfo.length; i++) {
        req.body.id = userInfo[i].dataValues.id;
      }
      res.status(201).send({
        userName: req.body.userName,
        email: req.body.email,
        location: req.body.location,
        userId: req.body.userId,
        // password: req.body.password,
        age: req.body.age,
        gender: req.bdoy.gender,
        preference: req.body.preference,
      });
    }
  },
};
