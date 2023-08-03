import { DATA_BY_CATEGORY } from "./emoji";
import * as fs from 'fs'

console.log("DATA_BY_CATEGORY")
var json = JSON.stringify(DATA_BY_CATEGORY)
fs.writeFile("Sources/emojibase-mobile/Resources/emojibase.json", json, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Success.")
    }
});