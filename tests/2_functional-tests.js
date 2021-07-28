const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  test("Translation with text and locale fields: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "Prof Joyner of King's College, London.",
        locale: "british-to-american",
      })
      .end(function (err, res) {
        assert.deepEqual(res.body, {
          text: "Prof Joyner of King's College, London.",
          translation: `<span class="highlight">Prof.</span> Joyner of King's College, London.`,
        });
        done();
      });
  });
  test("Translation with text and invalid locale field: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "Prof Joyner of King's College, London.",
        locale: "fgdf",
      })
      .end(function (err, res) {
        assert.deepEqual(res.body, { error: "Invalid value for locale field" });
        done();
      });
  });
  test("Translation with missing text field: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        locale: "british-to-american",
      })
      .end(function (err, res) {
        assert.deepEqual(res.body, { error: "Required field(s) missing" });
        done();
      });
  });
  test("Translation with missing locale field: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "Prof Joyner of King's College, London.",
      })
      .end(function (err, res) {
        assert.deepEqual(res.body, { error: "Required field(s) missing" });
        done();
      });
  });
  test("Translation with empty text: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "",
        locale: "british-to-american",
      })
      .end(function (err, res) {
        assert.deepEqual(res.body, { error: "Required field(s) missing" });
        done();
      });
  });
  test("Translation with text that needs no translation: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "Hello my friend.",
        locale: "british-to-american",
      })
      .end(function (err, res) {
        assert.deepEqual(res.body, {
          text: "Hello my friend.",
          translation: "Everything looks good to me!",
        });

        done();
      });
  });
});
