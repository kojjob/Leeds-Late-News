const { fetchArticles, fetchArticleById, updateArticle } = require('../models/articlesModels')


exports.sendArticles = (req, res, next) => {
  const {sort_by, order, author, topic } = req.query;
  fetchArticles(sort_by, order, author, topic)
    .then((articles) => {
      res.status(200).send({
        articles
      });
    })
    .catch((err) => {
      next(err);
    });
};


exports.sendArticle = (req, res, next) => {
  const {article_id}  = req.params
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200)
      .send({article})
  })
  .catch(next)
};

exports.sendUpdatedArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticle(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({
        article
      });
    })
    .catch((err) => {
      next(err);
    });
};