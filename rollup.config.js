import image from '@rollup/plugin-image';

export default {
  input: './main.js',
  output: {
    dir: 'output',
  },
  plugins: [image()]
};