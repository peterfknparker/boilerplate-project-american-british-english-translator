"use strict";

const { text } = require("express");
const Translator = require("../components/translator.js");

module.exports = function (app) {
	const translator = new Translator();

	app.route("/api/translate").post((req, res) => {
		let { text, locale } = req.body;

		if (!text) {
			return res.json({ error: "Required field(s) missing" });
		}
		if (!locale) {
			return res.json({ error: "Required field(s) missing" });
		}
		if (locale !== "british-to-american" && locale !== "american-to-british") {
			return res.json({ error: "Invalid value for locale field" });
		}

		let result = translator.translate({ text, locale }, { foundWord: true });

		let { translation, foundWord } = result;

		let highlight = translator.highlight({
			translation: translation,
			highlight: foundWord,
		});

		return res.json({ text: text, translation: highlight.highlighted });
	});
};
