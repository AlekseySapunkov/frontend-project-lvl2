import yaml from 'js-yaml';

const parse = (data, parser) => {
  switch (parser) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown parser: ${parser}!`);
  }
};

export default parse;
