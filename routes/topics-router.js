const topicsRouter = require("express").Router();
const {
  sendTopics
} = require("../controllers/topics-controllers");
const {
  handle405Errors
} = require("../error handling/error-handlers");


topicsRouter.route("/").get(sendTopics).all(handle405Errors);

module.exports = topicsRouter;
