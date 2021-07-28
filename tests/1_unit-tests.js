const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");

let translator = new Translator();

suite("Unit Tests", () => {
  test("Translate Mangoes are my favorite fruit. to British English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "Mangoes are my favorite fruit.",
        locale: "american-to-british",
      }),
      { translation: "Mangoes are my favourite fruit." }
    );

    done();
  });

  test("Translate I ate yogurt for breakfast. to British English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "I ate yogurt for breakfast.",
        locale: "american-to-british",
      }),
      { translation: "I ate yoghurt for breakfast." }
    );
    done();
  });

  test("Translate We had a party at my friend's condo. to British English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "We had a party at my friend's condo.",
        locale: "american-to-british",
      }),
      { translation: "We had a party at my friend's flat." }
    );
    done();
  });

  test("Translate Can you toss this in the trashcan for me? to British English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "Can you toss this in the trashcan for me?",
        locale: "american-to-british",
      }),
      { translation: "Can you toss this in the bin for me?" }
    );

    done();
  });

  test("Translate The parking lot was full. to British English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "The parking lot was full.",
        locale: "american-to-british",
      }),
      { translation: "The car park was full." }
    );
    done();
  });

  test("Translate Like a high tech Rube Goldberg machine. to British English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "Like a high tech Rube Goldberg machine.",
        locale: "american-to-british",
      }),
      { translation: "Like a high tech Heath Robinson device." }
    );
    done();
  });

  test("Translate To play hooky means to skip class or work. to British English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "To play hooky means to skip class or work.",
        locale: "american-to-british",
      }),
      { translation: "To bunk off means to skip class or work." }
    );
    done();
  });

  test("Translate No Mr. Bond, I expect you to die. to British English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "No Mr. Bond, I expect you to die.",
        locale: "american-to-british",
      }),
      { translation: "No Mr Bond, I expect you to die." }
    );
    done();
  });

  test("Translate Dr. Grosh will see you now. to British English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "Dr. Grosh will see you now.",
        locale: "american-to-british",
      }),
      { translation: "Dr Grosh will see you now." }
    );
    done();
  });

  test("Translate Lunch is at 12:15 today. to British English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "Lunch is at 12:15 today.",
        locale: "american-to-british",
      }),
      { translation: "Lunch is at 12.15 today." }
    );
    done();
  });

  test("Translate We watched the footie match for a while. to American English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "We watched the footie match for a while.",
        locale: "british-to-american",
      }),
      { translation: "We watched the soccer match for a while." }
    );
    done();
  });

  test("Translate Paracetamol takes up to an hour to work. to American English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "Paracetamol takes up to an hour to work.",
        locale: "british-to-american",
      }),
      { translation: "Tylenol takes up to an hour to work." }
    );
    done();
  });

  test("Translate First, caramelise the onions. to American English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "First, caramelise the onions.",
        locale: "british-to-american",
      }),
      { translation: "First, caramelize the onions." }
    );
    done();
  });

  test("Translate I spent the bank holiday at the funfair. to American English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "I spent the bank holiday at the funfair.",
        locale: "british-to-american",
      }),
      { translation: "I spent the public holiday at the carnival." }
    );
    done();
  });

  test("Translate I had a bicky then went to the chippy. to American English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "I had a bicky then went to the chippy.",
        locale: "british-to-american",
      }),
      { translation: "I had a cookie then went to the fish-and-chip shop." }
    );
    done();
  });

  test("Translate I've just got bits and bobs in my bum bag. to American English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "I've just got bits and bobs in my bum bag.",
        locale: "british-to-american",
      }),
      { translation: "I've just got odds and ends in my fanny pack." }
    );
    done();
  });

  test("Translate The car boot sale at Boxted Airfield was called off. to American English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "The car boot sale at Boxted Airfield was called off.",
        locale: "british-to-american",
      }),
      { translation: "The swap meet at Boxted Airfield was called off." }
    );
    done();
  });

  test("Translate Have you met Mrs Kalyani? to American English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "Have you met Mrs Kalyani?",
        locale: "british-to-american",
      }),
      { translation: "Have you met Mrs. Kalyani?" }
    );
    done();
  });

  test("Translate Prof Joyner of King's College, London. to American English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "Prof Joyner of King's College, London.",
        locale: "british-to-american",
      }),
      { translation: "Prof. Joyner of King's College, London." }
    );
    done();
  });

  test("Translate Tea time is usually around 4 or 4.30. to American English", function (done) {
    assert.deepEqual(
      translator.translate({
        text: "Tea time is usually around 4 or 4.30.",
        locale: "british-to-american",
      }),
      { translation: "Tea time is usually around 4 or 4:30." }
    );
    done();
  });

  test("Highlight translation in Mangoes are my favorite fruit.", function (done) {
    assert.deepEqual(
      translator.highlight({
        translation: "Mangoes are my favourite fruit.",
        highlight: ["favourite"],
      }),
      {
        highlighted: `Mangoes are my <span class="highlight">favourite</span> fruit.`,
      }
    );
    done();
  });

  test("Highlight translation in I ate yogurt for breakfast.", function (done) {
    assert.deepEqual(
      translator.highlight({
        translation: "I ate yoghurt for breakfast.",
        highlight: ["yoghurt"],
      }),
      {
        highlighted: `I ate <span class="highlight">yoghurt</span> for breakfast.`,
      }
    );
    done();
  });

  test("Highlight translation in We watched the footie match for a while.", function (done) {
    assert.deepEqual(
      translator.highlight({
        translation: "We watched the soccer match for a while.",
        highlight: ["soccer"],
      }),
      {
        highlighted: `We watched the <span class="highlight">soccer</span> match for a while.`,
      }
    );
    done();
  });

  test("Highlight translation in Paracetamol takes up to an hour to work.", function (done) {
    assert.deepEqual(
      translator.highlight({
        translation: "Tylenol takes up to an hour to work.",
        highlight: ["Tylenol"],
      }),
      {
        highlighted: `<span class="highlight">Tylenol</span> takes up to an hour to work.`,
      }
    );
    done();
  });
});
