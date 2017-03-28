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

describe('Test GET /check-list', () => {
  beforeEach((done) => {
    CheckList.remove({}).then(() => {
      CheckList.insertMany(list).then(() => done());
    });
  });

  it('should return the list with two documents', (done) => {
    request(app)
      .get('/check-list')
      .expect(200)
      .expect((res) => {
        expect(res.body.data.length).toBe(2);
        expect(res.body.data[0].name).toBe('First test checklist');
      })
      .end(done);
  });

  it('should get the Second test checklist', (done) => {
    const _id = list[1]._id;
    
    request(app)
      .get(`/check-list/${_id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.name).toBe(list[1].name);
      })
      .end(done);
  })
});
