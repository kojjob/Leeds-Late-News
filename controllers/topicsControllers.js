const { fetchTopics } = require('../models/topicsModels');

exports.sendTopics = (req, res, next) => {
  fetchTopics()
  .then((topics) => {
    res.status(200).send({ topics })
  })
  .catch((error) => {
    next(error);
  })
}