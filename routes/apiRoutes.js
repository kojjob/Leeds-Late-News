const apiRouter = require("express").Router();

const { sendTopics } = require('../controllers/topicsControllers')

apiRouter.use("/topics", sendTopics)

module.exports = apiRouter;
