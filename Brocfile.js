import funnel from 'broccoli-funnel';
import mergeTrees from 'broccoli-merge-trees';
import BroccoliStyleImporter from './lib/broccoli-styles';
import Rollup from 'broccoli-rollup';
import rollupConfig from './lib/rollup-config';
import BrowserSync from 'broccoli-bs';

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
export default mergeTrees([devBundle, devServer]);
