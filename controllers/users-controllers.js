const {
  getUser
} = require("../models/usersModels");

exports.sendUser = (req, res, next) => {
  const {
    username
  } = req.params;
  getUser(username)
    .then((user) => {
      res.status(200).send({
        user
      });
    })
    .catch((err) => {
      next(err);
    });
};
