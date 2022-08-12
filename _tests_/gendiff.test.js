import { genDiff } from '../src/index.js';
import { test, expect } from '@jest/globals';

test('genDiff', () => {
  expect(genDiff(__fixtures__/file1.json, __fixtures__/file2.json)).toBe(3);
});
if (capitalize('hello') !== 'Hello') {
  throw new Error('Функция работает неверно!');
}

if (capitalize('') !== '') {
  throw new Error('Функция работает неверно!');
}

console.log('Все тесты пройдены!');