import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { resolve } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');
test.each([
  { a: '__fixtures__/file1.json', b: '__fixtures__/file2.json', c: 'stylish', expected: 'flatFileOutput.txt' },
  { a: '__fixtures__/file1Recurse.json', b: '__fixtures__/file2Recurse.yaml', c: 'json', expected: 'jsonOutput.txt' },
  { a: '__fixtures__/file1Recurse.json', b: '__fixtures__/file2Recurse.yaml', c: 'plain', expected: 'plainOutput.txt' },
  { a: '__fixtures__/file1Recurse.json', b: '__fixtures__/file2Recurse.json', c: 'stylish', expected: 'stylishOutput.txt' }])('genDiffTest', ({a, b, c, expected}) => {
  const dif = genDiff(a, b, c);
  const expectedResult = readFile(expected);
  expect(dif).toEqual(expectedResult);
});
