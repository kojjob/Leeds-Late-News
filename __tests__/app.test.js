const request = require("supertest");
const connection = require('../db/connection')
const app = require("../app");

// beforeEach(() => connection.seed.run());
// afterAll(() => connection.destroy());

describe('app', () => {
  describe('api', () => {
    describe('articles', () => {
      describe('articles_id', () => {
        test('GET 200: - returns with an article object with the correct properites', () => {
          return request(app)
            .get('/api/articles/1')
          expect(200)
            .then((res) => {
              expect(res.body.arcticle).toEqual(
                expect.objectContaining({
                  author: expect.any(String),
                  title: expect.any(String),
                  article_id: expect.any(Number),
                  body: expect.any(String),
                  topic: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                  comment_count: expect.any(Number),
                })
              )

            })
        })
      });
      test("'GET 400: Wrong data type returns ,invalid_id not found'", () => {
        return request(app)
          .get('/api/articles/kojo')
        expect(400)
          .then((res) => {
            expect(res.body.msg).toEqual("Invalid article id: Id must be a number")
          })
      });
      test("GET 404: responds with article_id is not found and 404 code", () => {
        return request(app)
          .get("/api/articles/9090")
        expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Article id 4689 not found!");
          });
      });
    });
    test("GET: 200 -  Default sort order - date asc", () => {
      return request(app)
        .get("/api/articles")
        expect(200)
        .then(({ body: { articles} }) => {
          expect(articles).toBeSortedBy("created_at");
        });
    });
    test("GET: 200 - accepts a sort_by query", () => {
      return request(app)
        .get("/api/articles?sort_by=comment_count")
        .expect(200)
        .then(({ body: { articles }}) => {
          expect(articles).toBeSortedBy("comment_count");
        });
    });
  })
})
test('Unauthorised 405: returns "Method not Allowed', () => {
  const invalidMethods = ["put", "del"];
  const output = invalidMethods.map((method) => {
    return request(app)[method]("/api/article/1")
    expect(405)
      .then((res) => {
        expect(res.body.msg).toBe("Method not allowed!")
      })
  })
  return Promise.all(output)
});
test('ALL 404 return "Path not Found", when a user enters an invalid url', () => {
  return request(app)
    .get('/ipa/topics')
    .expect(404)
    .then((res) => {
      expect(res.body.msg).toBe('Path not Found')
    });
});
