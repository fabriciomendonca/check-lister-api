const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');


const { app } = require('../../../src/server/server');
const CheckList = require('../../../src/server/models/check-list');

const date = new Date().getTime();
const list = [
  {
    _id: new ObjectID(),
    name: 'First test checklist',
    createdAt: date
  },
  {
    _id: new ObjectID(),
    name: 'Second test checklist',
    createdAt: date
  }
];

beforeEach(done => {
  CheckList.remove({}).then(() => done());
});

describe('Test GET /check-lists', () => {
  beforeEach((done) => {
    CheckList.insertMany(list).then(() => done());
  });

  it('should return the list with two documents', done => {
    request(app)
      .get('/check-lists')
      .expect(200)
      .expect(res => {
        expect(res.body.data.length).toBe(2);
        expect(res.body.data[0].name).toBe('First test checklist');
      })
      .end(done);
  });

  it('should get the Second test checklist', done => {
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
  it('should create a new check-list', done => {
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
          expect(res.length).toBe(1);
          done();
        }).catch(err => done(err));
      });
  });
});
