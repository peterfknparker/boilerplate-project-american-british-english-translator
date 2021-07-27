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
				let regex = new RegExp("\\b" + word + "\\b", "i");
				let matchedWord = text.match(regex);
				if (matchedWord) {
					let textArray = text.split(matchedWord[0]);
					textArray.splice(1, 0, americanToBritishSpelling[word]);
					text = textArray.join("");
					foundWord.push(americanToBritishSpelling[word]);
				}
			});

			Object.keys(americanToBritishTitles).map((word) => {
				let regex = new RegExp("\\b" + word.replace(".", "") + "\\b\\.", "i");
				let matchedWord = text.match(regex);
				if (matchedWord) {
					let textArray = text.split(matchedWord[0]);
					textArray.splice(
						1,
						0,
						americanToBritishTitles[word][0].toUpperCase() +
							americanToBritishTitles[word].substring(1)
					);
					text = textArray.join("");
					foundWord.push(
						americanToBritishTitles[word][0].toUpperCase() +
							americanToBritishTitles[word].substring(1)
					);
				}
			});

			Object.keys(americanOnly).map((word) => {
				let regex = new RegExp("\\b" + word + "\\b", "i");
				let matchedWord = text.match(regex);
				if (matchedWord) {
					let textArray = text.split(matchedWord[0]);
					textArray.splice(1, 0, americanOnly[word]);
					text = textArray.join("");
					foundWord.push(americanOnly[word]);
				}
			});

			let regex = new RegExp("\\d*\\d:\\d\\d");
			let matchedTime = text.match(regex);
			if (matchedTime) {
				let textArray = text.split(matchedTime[0]);
				textArray.splice(1, 0, matchedTime[0].replace(":", "."));
				text = textArray.join("");
				foundWord.push(matchedTime[0].replace(":", "."));
			}
		}

		// British to American translation logic below
		if (locale === "british-to-american") {
			for (let key in americanToBritishSpelling) {
				let regex = new RegExp(
					"\\b" + americanToBritishSpelling[key] + "\\b",
					"i"
				);
				let matchedWord = text.match(regex);
				if (matchedWord) {
					let textArray = text.split(matchedWord[0]);
					textArray.splice(1, 0, key);
					text = textArray.join("");
					foundWord.push(key);
				}
			}

			for (let key in americanToBritishTitles) {
				let regex = new RegExp(
					"\\b" + americanToBritishTitles[key] + "\\b",
					"i"
				);
				let matchedWord = text.match(regex);
				if (matchedWord) {
					let textArray = text.split(matchedWord[0]);
					textArray.splice(1, 0, key[0].toUpperCase() + key.substring(1));
					text = textArray.join("");
					foundWord.push(key[0].toUpperCase() + key.substring(1));
				}
			}

			Object.keys(britishOnly).map((word) => {
				let regex = new RegExp("\\b(?<!-)" + word + "(?!-)\\b", "i");
				let matchedWord = text.match(regex);
				if (matchedWord) {
					let textArray = text.split(matchedWord[0]);
					textArray.splice(1, 0, britishOnly[word]);
					text = textArray.join("");
					foundWord.push(britishOnly[word]);
				}
			});

			let regex = new RegExp("\\d*\\d\\.\\d\\d");
			let matchedTime = text.match(regex);
			if (matchedTime) {
				let textArray = text.split(matchedTime[0]);
				textArray.splice(1, 0, matchedTime[0].replace(".", ":"));
				text = textArray.join("");
				foundWord.push(matchedTime[0].replace(":", "."));
			}
		}

		if (foundWord.length === 0) {
			return { translation: "Everything looks good to me!" };
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
		let textArray = translation.split(highlight);
		let highlightedString = textArray.join(
			"<span class='highlight'>" + highlight + "</span>"
		);
		return { highlighted: highlightedString };
	}
}

module.exports = Translator;
