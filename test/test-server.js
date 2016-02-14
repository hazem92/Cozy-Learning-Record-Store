var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

/*
describe('Blobs', function() {
  it('should list ALL blobs on /blobs GET', function(done) {
  chai.request(server)
    .get('/blobs')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});

it('should list a SINGLE blob on /blob/<id> GET');
it('should add a SINGLE blob on /blobs POST');
it('should update a SINGLE blob on /blob/<id> PUT');
it('should delete a SINGLE blob on /blob/<id> DELETE');

});
*/

describe('verbs', function(){
  it('should respond to GET',function(done){
    chai.request(server)
      .get('/verbs')
      .end(function(res){
        expect(res.status).to.equal(200);
        done();
    });
  });
});
