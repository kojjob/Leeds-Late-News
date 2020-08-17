const {
  getTopics
} = require("../models/topicsModels");

exports.sendTopics = (req, res, next) => {
  getTopics()
    .then((topics) => {
      res.status(200).send({
        topics
      });
    })
    .catch((err) => {
      next(err);
    });
};
