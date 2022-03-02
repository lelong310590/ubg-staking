const { DefaultEnvs } = require('./default.env')

console.log(`\n------- Environment Variables ------ \ `)
const publicRuntimeConfig = Object.keys(DefaultEnvs).reduce((output, key) => {
  output[key] = process.env[key] || DefaultEnvs[key];
  console.info(`- ${key}: ${output[key]}`)
  return output;
}, {})
console.log('\n');

module.exports = {
  publicRuntimeConfig,
}