import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { resolve } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');
test.each([
  {
    file1: 'file1Recurse.json', file2: 'file2Recurse.yaml', format: 'json', expected: 'jsonOutput.txt',
  },
  {
    file1: 'file1Recurse.json', file2: 'file2Recurse.yaml', format: 'plain', expected: 'plainOutput.txt',
  },
  {
    file1: 'file1Recurse.json', file2: 'file2Recurse.json', expected: 'stylishOutput.txt',
  }])('genDiffTest', ({
    file1, file2, format, expected,
}) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const dif = genDiff(filepath1, filepath2, format);
  const expectedResult = readFile(expected);
  expect(dif).toEqual(expectedResult);
});
