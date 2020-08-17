const commentsRouter = require("express").Router();
const {
  sendUpdatedComment,
  removeComment,
} = require("../controllers/comments-controllers");
const {
  handle405Errors
} = require("../error handling/error-handlers");

commentsRouter
  .route("/:comment_id")
  .patch(sendUpdatedComment)
  .delete(removeComment)
  .all(handle405Errors);

module.exports = commentsRouter;
