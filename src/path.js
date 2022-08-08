import { readFileSync } from 'fs';
import path from 'path';

const readFile = (filepath) => {
    const data = readFileSync(path.resolve(process.cwd(), filepath));
    return data
};

export default readFile;