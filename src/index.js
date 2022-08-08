import generateDiff from './generateDiff.js';
import _ from 'lodash';
import parse from './parser.js';
import readFile from './path.js';

const genDiff = (filepath1, filepath2) => {
    const data1 = parse(readFile(filepath1));
    const data2 = parse(readFile(filepath2));
    const result = generateDiff(data1, data2);
    return result;
}
export default genDiff;