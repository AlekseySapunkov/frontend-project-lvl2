import yaml from 'js-yaml';

const parse = (data, parserType) => {
  switch (parserType) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown parser: ${parserType}!`);
  }
};

export default parse;
