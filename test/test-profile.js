const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
  it("Test Single User", done => {
    chai
      .request(app)
      .get("/users/profile/5f9fc8773750ed130d357956")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

});