import path from 'path';
import parse from './parser.js';
import generateDiff from './generateDiff.js';
import fs from 'fs';

const getExtension = (filepath) => path.extname(filepath).slice(1);
const getPathFile = (filepath) => path.resolve(process.cwd(), filepath).trim();
const readFile = (filepath) => fs.readFileSync(getPathFile(filepath), 'utf-8');

const genDiff = (filepath1, filepath2) => {
    const data1 = readFile(filepath1);
    const data2 = readFile(filepath2);
    const parsedData1 = parse(data1, getExtension(filepath1));
    const parsedData2 = parse(data2, getExtension(filepath2));
    const difference = generateDiff(parsedData1, parsedData2);
    return difference;
};

export default genDiff;