const usersRouter = require("express").Router();
const {
  sendUser
} = require("../controllers/users-controllers");
const {
  handle405Errors
} = require("../error handling/error-handlers");

usersRouter.route("/:username").get(sendUser).all(handle405Errors);

module.exports = usersRouter;
