const path = require('path');
const babel = require('rollup-plugin-babel');
const npm = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const builtins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');

module.exports = {
  entry: './test/index.js',
  dest: './test/bundle.js',
  format: 'iife',
  plugins: [
    npm({
      browser: true,
      preferBuiltins: true
    }),
    builtins(),
    cjs({
      include: 'node_modules/**',
      exclude: [
        'node_modules/rollup-plugin-node-builtins/**',
        'node_modules/buffer-es6/**',
        'node_modules/process-es6/**'
      ],
      namedExports: {
        'node_modules/assert/assert.js': [
          'deepEqual',
          'deepStrictEqual',
          'notDeepEqual',
          'notEqual',
          'strictEqual'
        ]
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    globals()
  ]
};
