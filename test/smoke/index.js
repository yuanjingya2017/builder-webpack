const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');
const mocha = new Mocha({
  timeout: '10000ms'
})
process.chdir(path.join(__dirname, 'template'));

const prodConfig = require('../../lib/webpack.prod.js');
rimraf('./dist', () => {
  webpack(prodConfig, (err, stats) => {
    if (err || stats?.hasErrors()) {
      console.error(err, stats?.hasErrors());
      const info = stats?.toJson();

      if (stats?.hasErrors()) {
        console.error(info.errors);
      }

      if (stats?.hasWarnings()) {
        console.warn(info.warnings);
      }
      process.exit(2);
    }
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false
    }));
    console.log('webpack build success, begin run test.');
    mocha.addFile(path.join(__dirname, 'html-test.js'));
    mocha.addFile(path.join(__dirname, 'css-js-test.js'));
    mocha.run();
  })
});
