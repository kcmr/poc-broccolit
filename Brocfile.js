'use strict';

const funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const Rollup = require('broccoli-rollup');
const BroccoliStyleImporter = require('./lib/broccoli-styles');

const srcDir = 'src';
const demoDir = 'demo';

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

module.exports = mergeTrees([scripts, demo]);
