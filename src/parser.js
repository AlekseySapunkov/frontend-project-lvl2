import fs from 'fs';

const parse = (directory) => {
  const content = fs.readFileSync(`${directory}`, 'utf-8');
  const data = JSON.parse(content);
  return data;
};
export default parse;
