import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (diff) => {
  const iter = (tree, path) => tree.flatMap((node) => {
    const currentPath = [...path, node.name];
    const currentPathStr = currentPath.join('.');

    switch (node.status) {
      case 'nested':
        return iter(node.children, currentPath);
      case 'added':
        return `Property '${currentPathStr}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${currentPathStr}' was removed`;
      case 'changed':
        return `Property '${currentPathStr}' was updated. From ${stringify(node.addedValue)} to ${stringify(node.value)}`;
      case 'unchanged':
        return `Property '${currentPathStr}' was not changed.`;
      default:
        return null;
    }
  });

  return iter(diff, []).filter((element) => element !== null).join('\n');
};

export default plain;
