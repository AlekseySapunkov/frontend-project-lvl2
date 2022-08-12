import fs from 'fs';
import path from 'path';
import diffTree from './generateDiff.js';
import parse from './parser.js';
import selectFormat from './formaters/index.js';

const getFileFormat = (filepath) => path.extname(filepath).slice(1);
const getFixturePath = (filepath) => path.join(process.cwd(), filepath).trim();
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const dataFromFilepath1 = readFile(filepath1);
  const dataFromFilepath2 = readFile(filepath2);
  const file1obj = parse(dataFromFilepath1, getFileFormat(filepath1));
  const file2obj = parse(dataFromFilepath2, getFileFormat(filepath2));
  const diff = diffTree(file1obj, file2obj);
  return selectFormat(diff, format);
};

export default genDiff;