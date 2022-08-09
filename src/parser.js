import yaml from 'js-yaml';

const parse = (data, filetype) => {
  switch (filetype) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file type: ${filetype}!`);
  }
};

export default parse;
