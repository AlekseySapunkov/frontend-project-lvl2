import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { resolve } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');
test('genDiffFlatFile', () => {
  const dif = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  const expectedResult = readFile('flatFileOutput.txt');
  expect(dif).toEqual(expectedResult);
});
