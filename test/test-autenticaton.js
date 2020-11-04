const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
  it("Test Profile", done => {
    chai
      .request(app)
      .get("/restaurant/profile/5f9f79d45e15af072a9972b7")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});