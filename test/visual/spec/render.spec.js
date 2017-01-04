const fs = require('fs')
const path = require("path")
const StaticServer = require('static-server')
const staticServerInstance = new StaticServer({
  rootPath: '.',
  port: parseInt(Math.random() * 10000, 10) + 50000
});

//
// Configure Test Environment
//

var testSuite = {
  before: function (browser, done) {
    console.log('Setting up...');
    staticServerInstance.start(function () {
      done()
    });
  },
  beforeEach: function(browser) {
    browser.resizeWindow(1024, 768);
  },
  after: function (browser, done) {
    staticServerInstance.stop();
    browser.end()
    done()
  }
};

//
// Build Test Suite
//

let basePath = path.join(__dirname, '../html')

fs.readdirSync(basePath)
  .filter(function (file) {
    return fs.statSync(path.join(basePath, file)).isFile();
  })
  .filter(function (file) {
    return path.extname(file).toLowerCase() === '.html'
  })
  .forEach(function (file) {
    let key = file.split(path.extname(file))[0]

    testSuite[key] = function (browser) {
      let firstUrl = `http://localhost:${staticServerInstance.port}/test/visual/html/${key}.html`
      "use strict";
      browser
        .url(firstUrl)
        .waitForElementPresent('iframe', 3000)
        .assert.title('')
        .pause(5000)
        .compareScreenshot(`${key}.png`, 10)

      browser
        .expect
        .element('#nightwatch')
        .to.be.present.before(1000)

      browser.end()
    }
  })

module.exports = testSuite
