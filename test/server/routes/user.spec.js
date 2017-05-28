const request = require('supertest');
const expect = require('expect');
const { app } = require('../../../src/server/server');
const User = require('../../../src/server/models/user');

describe('Test POST /users', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => done());
  });

  it('should create a user', done => {
    const body = {
      email: 'test@test.com',
      password: '123'
    };

    request(app)
      .post('/users')
      .send(body)
      .expect(200)
      .expect(res => {
        expect(res.body.token).toExist();
        expect(res.body.email).toBe('test@test.com');
      })
      .end(done);
  });
});