import path from 'path';
import parse from './parser.js';
import generateDiff from './generateDiff.js';
import readFileData from './readFile.js';

const getExtension = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2) => {
    const data1 = readFileData(filepath1);
    const data2 = readFileData(filepath2);
    const parsedData1 = parse(data1, getExtension(filepath1));
    const parsedData2 = parse(data2, getExtension(filepath2));
    const difference = generateDiff(parsedData1, parsedData2);
    return difference;
};

export default genDiff;