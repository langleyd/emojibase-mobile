"use strict";
/*
Copyright 2019 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMOJI = exports.DATA_BY_CATEGORY = exports.getEmojiFromUnicode = exports.EMOTICON_TO_EMOJI = void 0;
var compact_json_1 = require("emojibase-data/en/compact.json");
var iamcal_json_1 = require("emojibase-data/en/shortcodes/iamcal.json");
// The unicode is stored without the variant selector
var UNICODE_TO_EMOJI = new Map(); // not exported as gets for it are handled by getEmojiFromUnicode
exports.EMOTICON_TO_EMOJI = new Map();
var getEmojiFromUnicode = function (unicode) {
    return UNICODE_TO_EMOJI.get(stripVariation(unicode));
};
exports.getEmojiFromUnicode = getEmojiFromUnicode;
var isRegionalIndicator = function (x) {
    // First verify that the string is a single character. We use Array.from
    // to make sure we count by characters, not UTF-8 code units.
    return (Array.from(x).length === 1 &&
        // Next verify that the character is within the code point range for
        // regional indicators.
        // http://unicode.org/charts/PDF/Unicode-6.0/U60-1F100.pdf
        x >= "\uD83C\uDDE6" &&
        x <= "\uD83C\uDDFF");
};
var EMOJIBASE_GROUP_ID_TO_CATEGORY = [
    "people",
    "people",
    "control",
    "nature",
    "foods",
    "places",
    "activity",
    "objects",
    "symbols",
    "flags",
];
exports.DATA_BY_CATEGORY = {
    people: [],
    nature: [],
    foods: [],
    places: [],
    activity: [],
    objects: [],
    symbols: [],
    flags: [],
};
// Store various mappings from unicode/emoticon/shortcode to the Emoji objects
exports.EMOJI = compact_json_1.default.map(function (emojiData) {
    var _a, _b;
    // If there's ever a gap in shortcode coverage, we fudge it by
    // filling it in with the emoji's CLDR annotation
    var shortcodeData = (_a = iamcal_json_1.default[emojiData.hexcode]) !== null && _a !== void 0 ? _a : [emojiData.label.toLowerCase().replace(/\W+/g, "_")];
    var emoji = __assign(__assign({}, emojiData), { 
        // Homogenize shortcodes by ensuring that everything is an array
        shortcodes: typeof shortcodeData === "string" ? [shortcodeData] : shortcodeData });
    // We manually include regional indicators in the symbols group, since
    // Emojibase intentionally leaves them uncategorized
    var categoryId = (_b = EMOJIBASE_GROUP_ID_TO_CATEGORY[emoji.group]) !== null && _b !== void 0 ? _b : (isRegionalIndicator(emoji.unicode) ? "symbols" : null);
    if (exports.DATA_BY_CATEGORY.hasOwnProperty(categoryId)) {
        exports.DATA_BY_CATEGORY[categoryId].push(emoji);
    }
    // Add mapping from unicode to Emoji object
    // The 'unicode' field that we use in emojibase has either
    // VS15 or VS16 appended to any characters that can take
    // variation selectors. Which one it appends depends
    // on whether emojibase considers their type to be 'text' or
    // 'emoji'. We therefore strip any variation chars from strings
    // both when building the map and when looking up.
    UNICODE_TO_EMOJI.set(stripVariation(emoji.unicode), emoji);
    if (emoji.emoticon) {
        // Add mapping from emoticon to Emoji object
        Array.isArray(emoji.emoticon)
            ? emoji.emoticon.forEach(function (x) { return exports.EMOTICON_TO_EMOJI.set(x, emoji); })
            : exports.EMOTICON_TO_EMOJI.set(emoji.emoticon, emoji);
    }
    return emoji;
});
/**
 * Strips variation selectors from the end of given string
 * NB. Skin tone modifiers are not variation selectors:
 * this function does not touch them. (Should it?)
 *
 * @param {string} str string to strip
 * @returns {string} stripped string
 */
function stripVariation(str) {
    return str.replace(/[\uFE00-\uFE0F]$/, "");
}
