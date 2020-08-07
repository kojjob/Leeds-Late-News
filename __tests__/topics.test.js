const request = require("supertest");
const app = require('../app');
const knex = require('../db/connection');

// beforeEach(() => connection.seed.run());
// afterAll(() => connection.destroy());

describe('/api', () => {
  describe('/topics', () => {
    test('GET: 200 - returns an array of topic objects', () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
      expect((res) => {
        expect(res.body.topics).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String)
            })
          ])
        )
      })
    });
    test("status 200: responds with an array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({
          body
        }) => {
          expect(Array.isArray(body.topics)).toBe(true);
          expect(body.topics.length).toBe(3);
          expect(body.topics.length).toBe(3);
        });
    });
    test('GET: 200 - get default slug sorted in ascending order ', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then((res) => {
          expect(res.body.topics).toBeSorted('slug')
        })
    })
  })
})