const articlesRouter = require('express').Router();
const {
  sendArticle,
  updateArticle
} = require('../controllers/articlesControllers');

const {
  handle405s
} = require('../errors');


articlesRouter
  .route('/:article_id')
  .get(sendArticle)
  .all(handle405s);

articlesRouter
  .route("/:article_id/comments")
  .post(sendNewComment)
  .get(sendComments);



module.exports = articlesRouter