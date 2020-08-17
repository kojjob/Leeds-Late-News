const request = require('supertest')
const app = require('../app')
const connection = require("../db/connection");


describe("/api tests", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  test("DELETE:405 /api, returns an error message if a request to use an invalid method is sent", () => {
    const invalidMethods = ["delete"];
    const methodPromises = invalidMethods.map((method) => {
      return request(app)[method]("/api")
        .expect(405)
        .then(({body: { msg }}) => {
          expect(msg).to.equal("Error 405, method not allowed");
        });
    });
  });

  describe("/topics tests", () => {
    test("GET:200 /api/topics - responds with a status of 200", () => {
      return request(app).get("/api/topics").expect(200);
    });
    it("GET:200 /api/topics - responds with an object with a key of topics, which has a value of an array", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body}) => {
          expect(body.topics).to.be.an("array");
          expect(body.topics[0]).to.be.an("object");
        });
    });
    test("GET:200 /api/topics - responds with an array of topic objects containing the keys: slug and description and the corresponding values", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({
          body
        }) => {
          expect(body.topics[0]).to.have.keys(["slug", "description"]);
          expect(body.topics[0]).to.eql({
            slug: "mitch",
            description: "The man, the Mitch, the legend",
          });
        });
    });
    test("GET:405 /api/topics - responds with an error mesage if a request to use an invalid method is submitted", () => {
      const invalidMethods = ["patch", "put", "post", "delete"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)[method]("/api/topics")
          .expect(405)
          .then(({ body: { msg }}) => {
            expect(msg).to.equal("Error 405, method not allowed");
          });
      });
    });
  });
  describe("/users tests", () => {
    test("GET:200 /api/users/all - responds with a status of 200", () => {
      return request(app).get("/api/users/all").expect(200);
    });
    test("GET:200 /api/users/all - responds with an array of user objects", () => {
      return request(app)
        .get("/api/users/all")
        .expect(200)
        .then(({body }) => {
          expect(body).to.be.an("array");
        });
    });
    test("GET:200 /api/users/:username - responds with a status of 200", () => {
      return request(app).get("/api/users/lurker").expect(200);
    });
    test("GET:200 /api/users/:username - responds with an object with a key of users, which has a value of an object", () => {
      return request(app)
        .get("/api/users/lurker")
        .expect(200)
        .then(({body}) => {
          expect(body).to.be.an("object");
          expect(body.user).to.be.an("object");
        });
    });

    test("GET:200 /api/users/:username - responds with a user object containing the keys: username, avatar_url and name", () => {
      return request(app)
        .get("/api/users/lurker")
        .expect(200)
        .then(({
          body
        }) => {
          expect(body.user).toEqual(["username", "avatar_url", "name"]);
        });
    });
    test("GET:404 /api/users/:username - responds with an error if passed a valid type of id but that does not exist", () => {
      return request(app)
        .get("/api/users/kojo")
        .expect(404)
        .then(({
          body
        }) => {
          expect(body.msg).to.equal(
            "Error status 404, username kojo not found"
          );
        });
    });
    test("GET:405 /api/users/:username - responds with an error message if a request to use an invalid method is submitted", () => {
      const invalidMethods = ["patch", "put", "post", "delete"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)[method]("/api/users/lurker")
          .expect(405)
          .then(({
            body: {
              msg
            }
          }) => {
            expect(msg).to.equal("Error 405, method not allowed");
          });
      });
    });
  });
  describe("/articles tests", () => {
    test("GET:200 /api/articles/:article_id - responds with a status of 200", () => {
      return request(app).get("/api/articles/1").expect(200);
    });
    test("GET:200 /api/articles/:article_id - responds with an object with a key of articles", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({
          body
        }) => {
          expect(body.article).to.be.an("object");
        });
    });
    test("GET:200 /api/articles/:article_id - responds with an article object containing the keys: article_id, title, body, votes, topic, author and created_at and the corresponding values", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({
          body
        }) => {
          expect(body.article).to.have.keys([
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count",
            "imgUrl",
          ]);
          expect(body.article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 100,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z",
            comment_count: "13",
            imgUrl: "/Jose.jpg",
          });
        });
    });
    test("GET:400 /api/articles/:article_id - responds with an error if passed an invalid type of id", () => {
      return request(app)
        .get("/api/articles/banana")
        .expect(400)
        .then(({
          body
        }) => {
          expect(body.msg).toEqua(
            ' invalid input syntax for integer: "banana"'
          );
        });
    });
    test("GET:404 /api/articles/:article_id - responds with an error if passed an valid type of id but that doesn't exist", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(({
          body
        }) => {
          expect(body.msg).toEqua(
            "Error status 404, article id 9999 not found"
          );
        });
    });
    test("GET:405 /api/articles/:article_id - responds with an error message if a request to use an invalid method is submitted", () => {
      const invalidMethods = ["post", "delete"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)[method]("/api/articles/1")
          .expect(405)
          .then(({
            body: {
              msg
            }
          }) => {
            expect(msg).to.equal("Error 405, method not allowed");
          });
      });
    });
   