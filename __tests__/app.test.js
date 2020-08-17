const request = require('supertest');
const app = require('../app')
const connection = require('../db/connection')


describe('API', () => {
  describe('/api', () => {
    describe('/api/topics', () => {
     test('GET 200: returns an array of topics objects',() => {
       return request(app)
       .get('/api/topics')
       .expect(200)
       .then((res)=> {
       expect(res.body.topic).toEqual(
        expect.arrayContaining([
        expect.objectContaining({
         slug: expect.any(String),
         description: expect.any(String)
    })
  ])
)
       })
     })
    })
  })
})