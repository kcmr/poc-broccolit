'use strict';

const Filter = require('broccoli-persistent-filter');
const extend = require('deep-extend');
const path = require('path');

class BroccoliStyleImporter extends Filter {
  constructor(inputNodes, options) {
    super(inputNodes, {
      annotation: 'BroccoliStyleImporter',
      persistentOutput: true
    });

    const defaults = {
      extensions: ['css'],
      targetExtension: 'css.js',
      autoprefixer: {}
    };

    this.options = extend(defaults, options);
    this.autoprefixer = this.options.autoprefixer;
  }

  getDestFilePath(relativePath) {
    const { ext } = path.parse(relativePath);
    const { extensions, targetExtension } = this.options;
    const fileExtension = ext.slice(1);

    if (extensions.includes(fileExtension)) {
      return relativePath.replace(fileExtension, targetExtension) ;
    }

    return null;
  }

  processString(content) {
    return 'export default `{{styles}}`;'.replace(/{{styles}}/g, content);
  }
}

module.exports = BroccoliStyleImporter;
