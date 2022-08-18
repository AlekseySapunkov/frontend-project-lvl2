import _ from 'lodash';

const findDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  const difference = keys.map((key) => {
    const firstValue = obj1[key];
    const secondValue = obj2[key];
    if (!Object.hasOwn(obj2, key)) {
      return { name: key, value: firstValue, status: 'removed' };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { name: key, value: secondValue, status: 'added' };
    }
    if (_.isPlainObject(firstValue) && _.isPlainObject(secondValue)) {
      return { name: key, status: 'nested', children: findDiff(firstValue, secondValue) };
    }
    if (!_.isEqual(firstValue, secondValue)) {
      return {
        name: key, value: secondValue, status: 'updated', oldValue: firstValue,
      };
    }

    return { name: key, value: firstValue, status: 'unchanged' };
  }, []);

  return difference;
};

export default findDiff;
