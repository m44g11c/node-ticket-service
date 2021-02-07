// process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/app");
let should = chai.should();
let Sequelize = require('sequelize');

chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe("/GET root", () => {
  it("it should GET the root of the API", done => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("/GET root api", () => {
  it("it should GET root api", done => {
    chai
      .request(server)
      .get("/api")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("/POST tickets", () => {
  it("it should POST ticket", done => {
    chai
      .request(server)
      .post("/api/v1/tickets")
      .send({
        "uuid": "5e55df4f-8230-42f1-b55b-44db760d12c7",
        "user_uuid": "96679111-2c5e-4973-9eea-f17c99390803",
        "subject": "Test ticket subject",
        "body": "Test ticket body",
        "status_id": 1,
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});


describe("/GET v1/ticktets", () => {
  it("it should GET all times", done => {
    chai
      .request(server)
      .get("/api/v1/ticktets")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("/GET tickets/:ticketUuid", () => {
  it("it should GET one item by uuid ", done => {
      chai.request(server)
      .get('/api/v1/tickets')
      .end(function(err, res){
        console.log(res.body[0].id);
        chai.request(server)
          .get('/api/v1/tickets/5e55df4f-8230-42f1-b55b-44db760d12c7')
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('uuid');
            response.body.should.have.property('user_uuid');
            response.body.should.have.property('subject');
            response.body.should.have.property('body');
            response.body.should.have.property('status_id');
            done();
        });
      });
  });
});

describe("/DELETE ticket", () => {
  it("it should DELETE the ticket", done => {
      chai.request(server)
      .get('/api/v1/tickets')
      .end(function(err, res){
        chai.request(server)
          .delete('/api/v1/tickets/5e55df4f-8230-42f1-b55b-44db760d12c7')
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            done();
        });
      });
  });
});
