/* global require, module */

const extend = require('util')._extend;
const base = require('./base.nightwatch.conf')

module.exports = extend(base, {
  "selenium": {
    "start_process": true,
    "server_path": "./bin/selenium-server-standalone-3.0.1.jar",
    "port": 4444,
    "cli_args": {
      "webdriver.chrome.driver": "./bin/chromedriver"
    }
  },

  "test_settings": {
    "default": {
      "selenium_port": 4444,
      "selenium_host": "localhost",
      "silent": true,
      "desiredCapabilities": {
        "browserName": "chrome"
      }
    }
  }
})
