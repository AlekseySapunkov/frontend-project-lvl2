import fs from 'fs';
import path from 'path';
import findDiff from './generateDiff.js';
import parse from './parser.js';
import formatData from './formaters/index.js';

const getFileFormat = (filepath) => path.extname(filepath).slice(1);
const getFixturePath = (filepath) => path.resolve(process.cwd(), filepath).trim();
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const dataFromFilepath1 = readFile(filepath1);
  const dataFromFilepath2 = readFile(filepath2);
  const file1obj = parse(dataFromFilepath1, getFileFormat(filepath1));
  const file2obj = parse(dataFromFilepath2, getFileFormat(filepath2));
  const diff = findDiff(file1obj, file2obj);
  return formatData(diff, format);
};

export default genDiff;
