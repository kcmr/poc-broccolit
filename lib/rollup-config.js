'use strict';

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolver = require('rollup-plugin-node-resolve');

module.exports = function({ input, output } = {}) {
  return {
    rollup: {
      input,
      output: {
        file: output,
        format: 'esm',
        sourcemap: true
      },
      plugins: [
        commonjs(),
        resolver(),
        babel({
          babelrc: false,
          plugins: ['@babel/plugin-syntax-import-meta'],
          presets: [
            [
              '@babel/env',
              {
                targets: {
                  esmodules: true
                }
              }
            ]
          ]
        })
      ]
    }
  }
};
