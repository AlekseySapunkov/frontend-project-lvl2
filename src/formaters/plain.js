import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (diff) => {
  const iter = (tree, path) => tree.flatMap((node) => {
    const {
      name, value, oldValue, status, children,
    } = node;

    const outputValue = stringify(value);
    const outputOldValue = stringify(oldValue);
    const currentPath = [...path, name];
    const currentPathStr = currentPath.join('.');

    switch (status) {
      case 'nested':
        return iter(children, currentPath);
      case 'added':
        return `Property '${currentPathStr}' was added with value: ${outputValue}`;
      case 'removed':
        return `Property '${currentPathStr}' was removed`;
      case 'updated':
        return `Property '${currentPathStr}' was updated. From ${outputOldValue} to ${outputValue}`;
      default:
        return null;
    }
  });

  return iter(diff, []).filter((element) => element !== null).join('\n');
};

export default plain;
