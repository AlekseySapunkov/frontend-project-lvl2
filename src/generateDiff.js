import _ from 'lodash';

const generateDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const difference = keys.map((key) => {
    if (!Object.hasOwn(data2, key)) {
      return { name: key, value: data1[key], status: 'removed' };
    }
    if (!Object.hasOwn(data1, key)) {
      return { name: key, value: data2[key], status: 'added' };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { name: key, status: 'nested', children: generateDiff(data1[key],data2[key]) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        name: key, value: data2[key], status: 'changed', removedValue: data1[key],
      };
    }

    return { name: key, value: data1[key], status: 'unchanged' };
  }, []);

  return difference;
};

export default generateDiff;
