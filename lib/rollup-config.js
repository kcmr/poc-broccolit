import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolver from 'rollup-plugin-node-resolve';
import { parse } from 'path';

export default function(file) {
  const { name, base } = parse(file);

  return {
    rollup: {
      input: base,
      output: {
        file: `${name}.mjs`,
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
