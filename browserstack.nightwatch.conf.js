/* global require, module */
const package = require('./package.json')
const extend = require('util')._extend;
const base = require('./base.nightwatch.conf')
const launchers = require('./browserstack.launchers.conf')
const testDate = (new Date()).toISOString()

const base_desired_capabilities = {
  'build': `rendering-test-${testDate}`,
  'project': package.name,
  'browserstack.user': process.env.BROWSER_STACK_USERNAME || 'BROWSERSTACK_USERNAME',
  'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  'browserstack.debug': true,
  'browserstack.local': true,
  'resolution': '1280x1024'
}

const nightwatch_config = extend(base, {
  selenium: {
    "start_process": false,
    "host": "hub-cloud.browserstack.com",
    "port": 80
  },

  test_settings: {
    default: {}
  }
});

Object.keys(launchers).forEach(function (key) {
  nightwatch_config.test_settings[key] = {
    'desiredCapabilities': extend(launchers[key], {})
  }
});

// Code to copy seleniumhost/port into test settings
for (let i in nightwatch_config.test_settings) {
  let config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
  config['desiredCapabilities'] = config['desiredCapabilities'] || {};

  for (let j in base_desired_capabilities) {
    config['desiredCapabilities'][j] = config['desiredCapabilities'][j] || base_desired_capabilities[j];
  }
}

module.exports = nightwatch_config;
