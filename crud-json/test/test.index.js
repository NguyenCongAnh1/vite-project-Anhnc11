const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // adjust the path based on your project structure

const expect = chai.expect;

chai.use(chaiHttp);

describe('Index', () => {
  it('should return "[]" on / GET', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal([]);
        done();
      });
  });
});
