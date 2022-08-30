import fs from 'fs';
import path from 'path';
import generateDiff from './generateDiff.js';
import parse from './parser.js';
import formatData from './formaters/index.js';

const getFileFormat = (filepath) => path.extname(filepath).slice(1);
const getFixturePath = (filepath) => path.resolve(process.cwd(), filepath).trim();
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');
const getData = (filepath) => parse(readFile(filepath), getFileFormat(filepath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const diff = generateDiff(getData(filepath1), getData(filepath2));
  return formatData(diff, format);
};

export default genDiff;
