const path = require('path');
const babel = require('rollup-plugin-babel');
const npm = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');

module.exports = {
  entry: './src/index.js',
  dest: './lib/index.js',
  format: 'cjs',
  plugins: [
    npm(),
    cjs({
      include: 'node_modules/**'
    }),
    babel()
  ]
};
