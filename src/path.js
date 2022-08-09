import { readFileSync } from 'fs';
import path from 'path';

const readFile = (filepath) => {
    const data = readFileSync(path.resolve(process.cwd(), filepath));
    const ext = path.extname(filepath).slice(1);
    return data
};

export default readFile;