import yaml from 'js-yaml';

const parse = (data, filetype) => {
  switch (filetype) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file type: ${filetype}!`);
  }
};

export default parse;
