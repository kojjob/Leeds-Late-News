const request = require('supertest');
const app = require('../app');
const knex = require('../db/connection');

// beforeEach(() => connection.seed.run());
// afterAll(() => connection.destroy());


describe('/api', () => {
  describe('/users', () => {
    describe('/username', () => {
      test('GET 200: returns a user object with the right properties and status code ', () => {
        return request(app)
        .get('/api/users/lurker')
         expect(200)
         .then((res) => {
           expect(res.body.user).toEqual(
             expect.objectContaining({
               username: expect.any(String),
               avatar_url: expect.any(String),
               name: expect.any(String)
             })
           )
         })
      })
      test('GET: 404 - responds with the right error msg if the user does not exist', () => {
        return request(app)
        .get('/api/users/koj321')
        expect(404)
        .then((res) => {
          expect(res.body.msg).toBe('User not Found')
        })
      })
    })
  })
})