const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
describe("Test user!", () => {
  it("Test users", done => {
    chai
      .request(app)
      .get("/users/all")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});