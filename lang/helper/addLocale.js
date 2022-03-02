const fs = require('fs');

function addLocale(newKey) {
    const main = require('../lang/dictionary.json');

    const temp = Object.keys(main).reduce((output, id) => {
        output[id] = {
            ...main[id],
            [newKey]: ''
        }
        return output
    }, {});

    fs.writeFile((`./lang/dictionary.json`), JSON.stringify(temp, null, 2), function (err) {
        if (err) console.error(err)

        console.info('••••• Add new locale to dictionary successful.')
    });
}

addLocale(process.env.LOCALE);