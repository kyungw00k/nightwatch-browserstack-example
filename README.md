# Nightwatch-Browserstack-Example
Just another rendering test example project to run `Nightwatch` test on BrowserStack infrastructure.

## Layout
```
nightwatch-browserstack-example
├── src/
├── test/
├── README.md                        # This file
├── base.nightwatch.conf.js          # base nightwatch configuration
├── local.nightwatch.conf.js         # to run tests on local machine
├── browserstack.nightwatch.conf.js  # to run tests on BrowserStack
├── browserstack.launchers.conf.js   # Browser lists to test
├── webpack.config.js
└── package.json
```

### `test/visual`

#### Layout
```
visual
├── html/         # Rendering Test HTML
├── nightwatch/   # Custom commands for Nightwatchjs
├── reports/      # Test Report
├── screenshots/  # Test Resource
│   ├── baseline  # Expect
│   ├── diffs     # Diff
│   └── results   # Actual
└── spec/         # Test Case
```

#### Internal Test Procedure
0. Boot up static server at port between 50000 and 59999
1. Open each HTML file in `test\visual\html`
2. Take page screenshot
3. Compare to `baseline`
4. Pass if the mismatch ratio is under 10%

## Sample test
- Run test on local: `npm run test:visual:local`
- Run test on BrowserStack: `npm run test:visual:ci`

## Resources
- [Nightwatch.js | Node.js powered End-to-End testing framework](http://nightwatchjs.org/)
