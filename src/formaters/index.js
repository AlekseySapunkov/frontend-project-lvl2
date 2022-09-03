import formatAsStylish from './stylish.js';
import formatAsStylish from './plain.js';
import formatAsPlain from './plain.js';

const formatData = (data, format) => {
  switch (format) {
    case 'stylish':
      return formatAsStylish(data);
    case 'plain':
      return formatAsPlain(data);
    case 'json':
      return JSON.stringify([data], null);
    default:
      throw new Error(`Unknown format: ${format}!`);
  }
};

export default formatData;
