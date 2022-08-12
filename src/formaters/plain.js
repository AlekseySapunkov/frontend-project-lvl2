import _ from 'lodash';

const plain = (tree) => {
  const getValidValue = (value) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }
    if (_.isString(value)) {
      return `'${value}'`;
    }
    return value;
  };
  const getPath = (path, key) => [...path, key].join('.');
  const iter = (node, depth) => {
    const plainFormat = node.flatMap((item) => {
      if (item.type === 'deleted') {
        return `Property '${getPath(depth, item.key)}' was removed`;
      }
      if (item.type === 'added') {
        return `Property '${getPath(depth, item.key)}' was added with value: ${getValidValue(item.value)}`;
      }
      if (item.type === 'nested') {
        return iter(item.children, [...depth, item.key]);
      }
      if (item.type === 'changed') {
        return `Property '${getPath(depth, item.key)}' was updated. From ${getValidValue(item.firstValue)} to ${getValidValue(item.secondValue)}`;
      }
      return [];
    });
    return plainFormat.join('\n');
  };
  return iter(tree, []);
};

export default plain;
