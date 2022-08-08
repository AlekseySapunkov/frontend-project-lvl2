import _ from 'lodash';

const generateDiff = (data1, data2) => {
  const uniqKey = _.union(Object.keys(data1), Object.keys(data2));
  const difference = _.sortBy(uniqKey).map((key) => {
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if ( data1.key !== data2.key) {
        return `- ${key}: ${data1.key}\n${key}: ${data2.key}`;
      }
      return `${key}: ${data1.key}`;
    }
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      return `- ${key}: ${data1.key}\n${key}: ${data2.key}`;
    };
    return `- ${key}: ${data1.key}\n${key}: ${data2.key}`;
  });
  return difference;
};
export default generateDiff;