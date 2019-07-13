'use strict';

const funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const BroccoliStyleImporter = require('./lib/broccoli-styles');
const Rollup = require('broccoli-rollup');
const rollupConfig = require('./lib/rollup-config');
const BrowserSync = require('broccoli-bs');

const srcDir = 'src';
const srcScripts = funnel(srcDir, {
  include: ['**/*.js'],
  exclude: ['**/*.css']
});
const scrStyles = funnel(srcDir, {
  include: ['**/*.css']
});
const demo = funnel('.', {
  files: ['index.html']
});

const styleScripts = new BroccoliStyleImporter(scrStyles);
const scripts = mergeTrees([styleScripts].concat(srcScripts));
const bundle = new Rollup(
  scripts,
  rollupConfig({
    input: 'component.js',
    output: 'component.mjs'
  })
);

const devBundle = mergeTrees([demo, bundle]);
const devServer = new BrowserSync(devBundle, {
  bs: {
    open: false,
    notify: false
  }
});

// module.exports = devBundle;
module.exports = mergeTrees([devBundle, devServer]);
