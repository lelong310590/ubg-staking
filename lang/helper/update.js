const fs = require('fs');

function getIn(obj, path, def, convertValue) {
    try {
        /**
    * If the path is a string, convert it to an array
    * @param  {String|Array} path The path
    * @return {Array}             The path array
    */
        var stringToPath = function (path) {
            // If the path isn't a string, return it
            if (typeof path !== 'string') return path;
            // Create new array
            var output = [];
            // Split to an array with dot notation
            path.split('.').forEach(function (item) {

                // Split to an array with bracket notation
                item.split(/\[([^}]+)\]/g).forEach(function (key) {

                    // Push to the new array
                    if (key.length > 0) {
                        output.push(key);
                    }

                });
            });
            return output;
        };

        // Get the path as an array
        path = stringToPath(path);
        // Cache the current object
        var current = obj || {};

        // For each item in the path, dig into the object
        for (var i = 0; i < path.length; i++) {
            // If the item isn't found, return the default (or null)
            if (typeof current[path[i]] === 'undefined') return def;
            // Otherwise, update the current  value
            current = current[path[i]];
        }

        if (current && convertValue) return convertValue(current);
        return current;
    } catch (error) {
        return def;
    }
};
 
// Merge translated to dictionary
function updateDictionary() {
    const main = require('../lang/dictionary.json');
    const translated = require('./translated.json');

    const temp = Object.keys(main).reduce((output, id) => {
        output[id] = Object.keys(main[id]).reduce((outputLocales, localeKey) => {
            outputLocales[localeKey] = getIn(translated, `${id}.${localeKey}`, main[id][localeKey]);
            return outputLocales
        }, {})

        return output
    }, {});

    console.info(temp);

    fs.writeFile((`./helper/temp.json`), JSON.stringify(temp, null, 4), function (err) {
        if (err) console.error(err)

        console.info('••••• Fetch dictionary successful.')
    });
}

updateDictionary()