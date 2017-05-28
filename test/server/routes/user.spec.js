const request = require('supertest');
const expect = require('expect');
const { app } = require('../../../src/server/server');
const User = require('../../../src/server/models/user');

const users = [
  {
    email: 'test@test.com',
    password: '123abc'
  },
  {
    email: 'test1@test.com',
    password: 'abc123'
  }
];

describe('Test POST /users', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => {
        const promises = users.map(user => new User(user));

        return Promise.all(promises.map(p => p.save()));
      })
      .then(() => {
        done();
      })
      .catch(done);
  });

  it('should create a user', done => {
    const body = {
      email: 'test2@test.com',
      password: '123'
    };

    request(app)
      .post('/users')
      .send(body)
      .expect(200)
      .expect(res => {
        expect(res.body.token).toExist();
        expect(res.body.email).toBe('test2@test.com');
      })
      .end(done);
  });

  it('should signin a user POST /users/signin', done => {
    request(app)
      .post('/users/signin')
      .send(users[0])
      .expect(200)
      .expect(res => {
        expect(res.body.token).toExist();
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });
});