const fs = require('fs');
const main = require('../dictionary.json');

async function compress() {
  return new Promise((resolve, reject) => {
    const temp = Object.keys(main).reduce((output, id) => {
      output[id] = main[id]
      return output
    }, {});

    fs.writeFile((`./lang/dictionary.min.json`), JSON.stringify(temp), function (err) {
      if (err) {
        console.error('[ERROR][LANGUAGE_HEPLER]: ', err);
        reject(process.exit(1))
      }

      resolve(console.info('[INFO][LANGUAGE_HEPLER]: Compress dictionary successful.'))
    });
  })
}

compress();