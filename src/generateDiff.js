import _ from 'lodash';

const findDiff = (tree1, tree2) => {
  const keys = _.sortBy(_.union(_.keys(tree1), _.keys(tree2)));

  const difference = keys.map((key) => {
    if (!Object.hasOwn(tree2, key)) {
      return { name: key, value: tree1[key], status: 'removed' };
    }
    if (!Object.hasOwn(tree1, key)) {
      return { name: key, value: tree2[key], status: 'added' };
    }
    if (_.isPlainObject(tree1[key]) && _.isPlainObject(tree2[key])) {
      return { name: key, status: 'nested', children: findDiff(tree1[key], tree2[key]) };
    }
    if (!_.isEqual(tree1[key], tree2[key])) {
      return {
        name: key, value: tree2[key], status: 'changed', removedValue: tree1[key],
      };
    }

    return { name: key, value: tree1[key], status: 'unchanged' };
  }, []);

  return difference;
};

export default findDiff;
