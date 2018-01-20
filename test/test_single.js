import { transform } from 'babel-core';
import fs from 'fs';

function testPlugin(code) {
  const result = transform(code, {
    presets: ['react', 'es2015'],
    plugins: ['syntax-dynamic-import', './src/index.js'],
  });

  return result.code;
}

const code = fs.readFileSync('./test/fixtures/rename_alias_variable/actual.js', "utf8");

console.log(testPlugin(code));
