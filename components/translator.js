const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  translate(input, options) {
    let { text, locale } = input;
    let foundWord = [];
    // American to British translation logic below

    if (locale === "american-to-british") {
      Object.keys(americanToBritishSpelling).map((word) => {
        for (let i = 0; i < text.split(" ").length; i++) {
          let regex = new RegExp("\\b" + word + "\\b", "i");
          let matchedWord = text.match(regex);
          if (matchedWord) {
            let textArray0 = text.slice(0, matchedWord.index);
            let textArray1 = text.slice(
              matchedWord.index + matchedWord[0].length,
              text.length
            );
            let replacedText = [textArray0, textArray1].join(
              americanToBritishSpelling[word]
            );
            text = replacedText;
            foundWord.push(americanToBritishSpelling[word]);
          }
        }
      });

      Object.keys(americanToBritishTitles).map((word) => {
        for (let i = 0; i < text.split(" ").length; i++) {
          let regex = new RegExp("\\b" + word.replace(".", "") + "\\b\\.", "i");

          let matchedWord = text.match(regex);
          if (matchedWord) {
            let textArray0 = text.slice(0, matchedWord.index);
            let textArray1 = text.slice(
              matchedWord.index + matchedWord[0].length,
              text.length
            );
            let replacedText = [textArray0, textArray1].join(
              americanToBritishTitles[word][0].toUpperCase() +
                americanToBritishTitles[word].substring(1)
            );

            text = replacedText;
            foundWord.push(
              americanToBritishTitles[word][0].toUpperCase() +
                americanToBritishTitles[word].substring(1)
            );
          }
        }
      });

      Object.keys(americanOnly).map((word) => {
        for (let i = 0; i < text.split(" ").length; i++) {
          let regex = new RegExp("\\b" + word + "\\b", "i");
          let matchedWord = text.match(regex);
          if (matchedWord) {
            let textArray0 = text.slice(0, matchedWord.index);
            let textArray1 = text.slice(
              matchedWord.index + matchedWord[0].length,
              text.length
            );
            let replacedText = [textArray0, textArray1].join(
              americanOnly[word]
            );
            text = replacedText;
            foundWord.push(americanOnly[word]);
          }
        }
      });

      let regex = new RegExp("\\d*\\d:\\d\\d");
      for (let i = 0; i < text.split(" ").length; i++) {
        let matchedTime = text.match(regex);
        if (matchedTime) {
          let textArray0 = text.slice(0, matchedTime.index);
          let textArray1 = text.slice(
            matchedTime.index + matchedTime[0].length,
            text.length
          );
          let replacedText = [textArray0, textArray1].join(
            matchedTime[0].replace(":", ".")
          );

          text = replacedText;
          foundWord.push(matchedTime[0].replace(":", "."));
        }
      }
    }

    // British to American translation logic below
    if (locale === "british-to-american") {
      for (let key in americanToBritishSpelling) {
        for (let i = 0; i < text.split(" ").length; i++) {
          let regex = new RegExp(
            "\\b" + americanToBritishSpelling[key] + "\\b",
            "i"
          );
          let matchedWord = text.match(regex);
          if (matchedWord) {
            let textArray0 = text.slice(0, matchedWord.index);
            let textArray1 = text.slice(
              matchedWord.index + matchedWord[0].length,
              text.length
            );
            let replacedText = [textArray0, textArray1].join(key);
            text = replacedText;

            foundWord.push(key);
          }
        }
      }

      for (let key in americanToBritishTitles) {
        for (let i = 0; i < text.split(" ").length; i++) {
          let regex = new RegExp(
            "\\b" + americanToBritishTitles[key] + "\\b(?!\\.)",
            "i"
          );
          let matchedWord = text.match(regex);
          if (matchedWord) {
            let textArray0 = text.slice(0, matchedWord.index);
            let textArray1 = text.slice(
              matchedWord.index + matchedWord[0].length,
              text.length
            );
            let replacedText = [textArray0, textArray1].join(
              key[0].toUpperCase() + key.substring(1)
            );

            text = replacedText;
            foundWord.push(key[0].toUpperCase() + key.substring(1));
          }
        }
      }

      Object.keys(britishOnly).map((word) => {
        for (let i = 0; i < text.split(" ").length; i++) {
          let regex = new RegExp("\\b(?<!-)" + word + "(?!-)\\b", "i");
          let matchedWord = text.match(regex);
          if (matchedWord) {
            let textArray0 = text.slice(0, matchedWord.index);
            let textArray1 = text.slice(
              matchedWord.index + matchedWord[0].length,
              text.length
            );
            let replacedText = [textArray0, textArray1].join(britishOnly[word]);

            text = replacedText;
            foundWord.push(britishOnly[word]);
          }
        }
      });

      for (let i = 0; i < text.split(" ").length; i++) {
        let regex = new RegExp("\\d*\\d\\.\\d\\d");
        let matchedTime = text.match(regex);
        if (matchedTime) {
          let textArray0 = text.slice(0, matchedTime.index);
          let textArray1 = text.slice(
            matchedTime.index + matchedTime[0].length,
            text.length
          );
          let replacedText = [textArray0, textArray1].join(
            matchedTime[0].replace(".", ":")
          );

          text = replacedText;
          foundWord.push(matchedTime[0].replace(".", ":"));
        }
      }
    }
    text = text[0].toUpperCase() + text.substring(1);

    if (foundWord.length === 0) {
      return { translation: "Everything looks good to me!", foundWord: [] };
    }
    if (!options) {
      return { translation: text };
    }

    if (options.foundWord) {
      return { translation: text, foundWord: foundWord };
    }

    // if no locale is set, then return error
    return { error: "Required field(s) missing" };
  }

  highlight(input) {
    let { translation, highlight } = input;

    if (!highlight) {
      return { translation: "Everything looks good to me!" };
    }

    let result = [];
    console.log(highlight);

    for (let i = 0; i < highlight.length; i++) {
      let regex = new RegExp("\\b" + highlight[i].replace(".", "\\."), "i");
      let matchedWord = translation.match(regex);
      console.log(matchedWord);
      console.log(translation, regex);
      if (matchedWord) {
        if (matchedWord.index > 0) {
          let textBefore = translation.slice(0, matchedWord.index);
          result.push(textBefore);
        }
        let highlightText = translation.slice(
          matchedWord.index,
          matchedWord.index + matchedWord[0].length
        );

        result.push(`<span class="highlight">${highlightText}</span>`);

        translation = translation.slice(
          matchedWord.index + matchedWord[0].length,
          translation.length
        );
      }
      // arrayToTag.push()
    }
    result.push(translation);
    console.log(`${result.join("")}`);
    return { highlighted: `${result.join("")}` };
  }
}

module.exports = Translator;
