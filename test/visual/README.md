## `test/visual`

### Directory
```
visual
├── README.md
├── html/         # Rendering Test HTML
├── nightwatch/   # Custom commands for Nightwatchjs
├── reports/      # Test Report
├── screenshots/  # Test Resource
│   ├── baseline  # Expect
│   ├── diffs     # Diff
│   └── results   # Actual
└── spec/         # Test Case
```

### Internal Test Procedure
1. Open each HTML file in `test\visual\html`
2. Take page screenshot
3. Compare to `baseline`
4. Pass if the mismatch ratio is under 10%

### Resources
- [Nightwatch.js | Node.js powered End-to-End testing framework](http://nightwatchjs.org/)
