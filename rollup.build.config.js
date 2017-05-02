const path = require('path');
const babel = require('rollup-plugin-babel');

module.exports = {
  entry: './src/index.js',
  dest: './lib/index.js',
  format: 'cjs',
  plugins: [
    babel()
  ]
};
