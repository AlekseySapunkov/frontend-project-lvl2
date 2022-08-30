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
    fileName1: 'file1Recurse.json', fileName2: 'file2Recurse.yaml', format: 'json', expectedFileName: 'jsonOutput.txt',
  },
  {
    fileName1: 'file1Recurse.json', fileName2: 'file2Recurse.yaml', format: 'plain', expectedFileName: 'plainOutput.txt',
  },
  {
    fileName1: 'file1Recurse.json', fileName2: 'file2Recurse.json', expectedFileName: 'stylishOutput.txt',
  }])('genDiffTest', ({
  fileName1, fileName2, format, expectedFileName,
}) => {
  const filepath1 = getFixturePath(fileName1);
  const filepath2 = getFixturePath(fileName2);
  const diff = genDiff(filepath1, filepath2, format);
  const expectedResult = readFile(expectedFileName);
  expect(diff).toEqual(expectedResult);
});
