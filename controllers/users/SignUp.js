const { user, location, category_user } = require("../../models");

module.exports = {
  post: async (req, res) => {
    if (
      !req.body.gender ||
      !req.body.userName ||
      !req.body.location ||
      !req.body.userId ||
      !req.body.password ||
      !req.body.email ||
      !req.body.age ||
      !req.body.preference
    ) {
      res.status(422).send("가입정보가 충분하지 않습니다.");
    } else {
      const location = await location.create({
        where: {
          latitude: groupLocation[0],
          longitude: groupLocation[1]
        }
      })
      
      await user.create({
        gender: req.body.gender,
        username: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        location_id: location.id
      })
      .then(newUser => {
        await category_user.create({
          user_id: newUser.id,
          category_id: req.body.preference
        })
        res.status(201).send({ userInfo: req.body, message: "ok" });
      })
    }
  },
};
