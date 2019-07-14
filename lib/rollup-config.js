import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolver from 'rollup-plugin-node-resolve';

export default function({ input, output } = {}) {
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
  };
}
