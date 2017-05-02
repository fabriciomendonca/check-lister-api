const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');


const { app } = require('../../../src/server/server');
const CheckList = require('../../../src/server/models/check-list');

const date = new Date().getTime();
const list = [
  {
    _id: new ObjectID(),
    name: 'First test check list',
    createdAt: date
  },
  {
    _id: new ObjectID(),
    name: 'Second test check list',
    createdAt: date
  }
];

beforeEach(done => {
  CheckList.remove({})
    .then(() => {
      return CheckList.insertMany(list);
    })
    .then(() => done());
});

describe('Test GET /check-lists', () => {
  it('should return the list with two documents', done => {
    request(app)
      .get('/check-lists')
      .expect(200)
      .expect(res => {
        expect(res.body.data.length).toBe(2);
        expect(res.body.data[0].name).toBe('First test check list');
      })
      .end(done);
  });

  it('should get the Second test check list', done => {
    const _id = list[1]._id;
    
    request(app)
      .get(`/check-lists/${_id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.data.name).toBe(list[1].name);
      })
      .end(done);
  })
});

describe('Test POST /check-lists', () => {
  it('should create a new check list', done => {
    const chk = {
      name: 'New check list'
    };

    request(app)
      .post('/check-lists')
      .send(chk)
      .expect(200)
      .expect(res => {
        expect(res.body.data._id).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        CheckList.find({}).then(res => {
          expect(res.length).toBe(list.length + 1);
          done();
        }).catch(err => done(err));
      });
  });

  it('should create a new child check list', done => {
    const chk = {
      name: 'New child check list',
      parent: list[1]._id
    };

    request(app)
      .post('/check-lists')
      .send(chk)
      .expect(200)
      .expect(res => {
        expect(res.body.data._id).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        CheckList.findById(res.body.data._id).then(item => {
          expect(item.name).toBe(chk.name);
          expect(item._parent).toEqual(list[1]._id);
          done();
        }).catch(err => done(err));
      });
  });
});

describe('Test PATCH /check-lists/:id', () => {
  it('should update the Second test check list item', done => {
    const name = 'Second test edited';
    request(app)
      .patch(`/check-lists/${list[1]._id}`)
      .send({name})
      .expect(200)
      .expect(res => {
        expect(res.body.data.name).toBe(name);
      })
      .end(done);
  });
});

describe('Test DELETE /check-lists/:id', () => {
  it('should delete the First check list test item', done => {
    request(app)
      .delete(`/check-lists/${list[0]._id}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        CheckList.find({})
          .then(data => {
            expect(data.length).toBe(list.length - 1);
            done();
          })
          .catch(err => done(err))
      });
  });
});
