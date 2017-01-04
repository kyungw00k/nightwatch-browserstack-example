/* global require */

const BlinkDiff = require('blink-diff');
const fs = require('fs');
const PNG = require('pngjs').PNG

exports.assertion = function (metadata, expected) {
  let filename = metadata.filename
  let prefix = metadata.prefix
  let screenshotPath = 'test/visual/screenshots/'
  let baselinePath = screenshotPath + 'baseline/' + filename
  let resultPath = screenshotPath + 'results/' + filename.replace('.png', `_${prefix}.png`)
  let diffPath = screenshotPath + 'diffs/' + filename.replace('.png', `_${prefix}.png`)

  this.message = 'Unexpected compareScreenshot error.';
  expected = this.expected = expected || 0.01;   // threshold tolerance default 0.01%

  this.command = function (callback) {
    // create new baseline photo if none exists
    if (!fs.existsSync(baselinePath)) {
      console.log('WARNING: Baseline Photo does NOT exist.');
      console.log('Creating Baseline Photo from Result: ' + baselinePath);
      fs.writeFileSync(baselinePath, fs.readFileSync(resultPath));
    }

    let imageData1 = PNG.sync.read(fs.readFileSync(baselinePath));
    let imageData2 = PNG.sync.read(fs.readFileSync(resultPath));

    let diff = new BlinkDiff({
      imageAPath: baselinePath,
      imageBPath: resultPath,

      delta: 50,

      thresholdType: BlinkDiff.THRESHOLD_PERCENT,
      threshold: expected,
      hShift: Math.abs(imageData1.width - imageData2.width),
      vShift: Math.abs(imageData1.height - imageData2.height),

      imageOutputPath: diffPath
    });

    diff.run(function (error, result) {
      if (error) {
        throw error;
      } else {
        typeof callback === 'function' && callback.call(null, result)
      }
    });

    return this;
  };

  this.value = function (result) {
    return parseFloat(result.differences);  // value this.pass is called with
  };

  this.pass = function (value) {
    let pass = value <= this.expected;
    if (pass) {
      this.message = `Screenshots Matched for ${filename} with a tolerance of ${this.expected}%.`
    } else {
      this.message = 'Screenshots Match Failed for ' + filename +
        ' with a tolerance of ' + this.expected + '%.\n' +
        '   Screenshots at:\n' +
        '    Baseline: ' + baselinePath + '\n' +
        '    Result: ' + resultPath + '\n' +
        '    Diff: ' + diffPath + '\n' +
        '   Open ' + diffPath + ' to see how the screenshot has changed.\n' +
        '   If the Result Screenshot is correct you can use it to update the Baseline Screenshot and re-run your test:\n' +
        '    cp ' + resultPath + ' ' + baselinePath;
    }
    return pass;
  };
};
