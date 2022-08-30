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
        return `Property '${currentPathStr}' was added with value: ${stringify(node.file1Key)}`;
      case 'removed':
        return `Property '${currentPathStr}' was removed`;
      case 'changed':
        return `Property '${currentPathStr}' was updated. From ${stringify(node.file2Key)} to ${stringify(node.file1Key)}`;
      default:
        return null;
    }
  });

  return iter(diff, []).filter((element) => element !== null).join('\n');
};

export default plain;
