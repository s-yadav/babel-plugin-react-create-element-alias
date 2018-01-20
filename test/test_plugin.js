import { transform } from 'babel-core';

export default function testPlugin(code) {
  const result = transform(code, {
    presets: ['react', 'es2015'],
    plugins: ['syntax-dynamic-import', './src/index.js'],
  });

  return result.code;
}
