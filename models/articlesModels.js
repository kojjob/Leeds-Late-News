const knex = require('../db/connection');

exports.getArticles = ( sort_by = "created_at", order = "asc", author, topic) => {
  if (order !== "asc" && order !== "desc") {
    return Promise.reject({
      status: 400,
      msg: "Sorry invalid query order!",
    });
  } else if (author) {
    return knex
      .select(
        "articles.article_id",
        "articles.title",
        "articles.votes",
        "articles.topic",
        "articles.created_at",
        "articles.author"
      )
      .count("comments.comment_id", {
        as: "comment_count"
      })
      .from("articles")
      .where("articles.author", "=", author)
      .leftJoin("comments", "articles.article_id", "comments.article_id")
      .groupBy("articles.article_id")
      .orderBy(sort_by, order)
      .then((articles) => {
        const formattedArticles = [];
        articles.forEach((article) => {
          const newArticle = {
            ...article
          };
          newArticle.comment_count = parseInt(article.comment_count);
          formattedArticles.push(newArticle);
        });
        if (formattedArticles.length > 0) {
          return formattedArticles;
        } else {
          return knex
            .select("username")
            .from("users")
            .then((users) => {
              const validAuthor = users.filter((user) => {
                return user.username === author;
              });
              if (validAuthor.length > 0) {
                return Promise.reject({
                  status: 442,
                  msg: "Sorry the author you are looking for, has not created any articles!",
                });
              } else {
                return Promise.reject({
                  status: 404,
                  msg: "Sorry author not found!",
                });
              }
            });
        }
      });
  } else {
    return knex
      .select(
        "articles.article_id",
        "articles.title",
        "articles.votes",
        "articles.topic",
        "articles.created_at",
        "articles.author"
      )
      .count("comments.comment_id", {
        as: "comment_count"
      })
      .from("articles")
      .leftJoin("comments", "articles.article_id", "comments.article_id")
      .groupBy("articles.article_id")
      .orderBy(sort_by, order)
      .then((articles) => {
        const formattedArticles = [];
        articles.forEach((article) => {
          const newArticle = {
            ...article
          };
          newArticle.comment_count = parseInt(article.comment_count);
          formattedArticles.push(newArticle);
        });
        return formattedArticles;
      });
  }
};

exports.fetchArticleById = ({
  article_id
}) => {
  return knex
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .where("articles.article_id", "=", article_id)
    .groupBy("articles.article_id")
    .count("comments.article_id", {
      as: "comments_count"
    })
    .returning("*")
    .then((result) => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Article id ${article_id} not found!`,
        });
      }
      return {
        ...result[0],
        comments_count: parseInt(result[0].comments_count, 10),
      };
    });
};

exports.updateArticle = (article_id, inc_votes) => {
  return knex
    .select("articles.*")
    .count("comments.comment_id", {
      as: "comment_count"
    })
    .from("articles")
    .where("articles.article_id", article_id)
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .then((articleArr) => {
      const article = articleArr[0];
      if (!inc_votes) {
        article.comment_count = parseInt(article.comment_count);
        return article;
      } else if (typeof inc_votes === "number") {
        const votes = article.votes;
        article.votes = votes + inc_votes;
        article.comment_count = parseInt(article.comment_count);
        return article;
      } else {
        return Promise.reject({
          status: 400,
          msg: "Please specify an integer value for your requests inc_votes key!",
        });
      }
    });
};
