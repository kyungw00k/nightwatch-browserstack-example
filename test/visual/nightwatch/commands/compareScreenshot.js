/* global require */

let path = require('path')

// commands/compareScreenshot.js
exports.command = function(filename, expected, callback) {
  let assertionId = uniqueId(10) // for use concurrent test
  let self = this
  let screenshotPath = path.join(__dirname, '../../../', './visual/screenshots/')
  let resultPath = screenshotPath + 'results/' + filename.replace('.png', `_${assertionId}.png`)

  self.saveScreenshot(resultPath, function(response) {
    self.assert.compareScreenshot({filename: filename, prefix: assertionId}, expected, function(result) {
      if (typeof callback === 'function') {
        callback.call(self, result)
      }
    })
  })

  return this // allows the command to be chained.
};

function uniqueId (length) {
  let alphanumeric = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  return new Array(+length || 6)
    .fill('_')
    .map((v) => alphanumeric[Math.floor(Math.random() * alphanumeric.length)])
    .join('')
}
