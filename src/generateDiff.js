import _ from 'lodash';

const findDiff = (tree1, tree2) => {
  const keys = _.sortBy(_.union(_.keys(tree1), _.keys(tree2)));

  const difference = keys.map((key) => {
    const firstValue = tree1[key];
    const secondValue = tree2[key];
    if (!Object.hasOwn(tree2, key)) {
      return { name: key, value: firstValue, status: 'removed' };
    }
    if (!Object.hasOwn(tree1, key)) {
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
