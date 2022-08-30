import _ from 'lodash';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (inputValue, depth) => {
  if (!_.isPlainObject(inputValue)) {
    return inputValue;
  }

  const keys = Object.keys(inputValue);
  const indent = getIndent(depth);
  const braceIndent = getIndent(depth - 1);

  const innerPart = keys.map((key) => {
    const currentValue = inputValue[key];
    if (_.isPlainObject(currentValue)) {
      return `${indent}  ${key}: ${stringify(currentValue, depth + 1)}`;
    }

    return `${indent}  ${key}: ${currentValue}`;
  });

  return `{\n${innerPart.join('\n')}\n${braceIndent}  }`;
};

const stylish = (diff) => {
  const iter = (depth, nodes) => nodes.flatMap((node) => {
    const indent = getIndent(depth);
    const nextLevelDepth = depth + 1;

    switch (node.status) {
      case 'nested':
        return `${indent}  ${node.name}: {\n${iter(nextLevelDepth, node.children)}\n${indent}  }`.split(',');
      case 'changed':
        return `${indent}- ${node.name}: ${stringify(node.removedValue, nextLevelDepth)}\n${indent}+ ${node.name}: ${stringify(node.value, nextLevelDepth)}`;
      case 'added':
        return `${indent}+ ${node.name}: ${stringify(node.value, nextLevelDepth)}`;
      case 'removed':
        return `${indent}- ${node.name}: ${stringify(node.value, nextLevelDepth)}`;
      case 'unchanged':
        return `${indent}  ${node.name}: ${node.value}`;
      default:
        throw new Error(`Unexpected condition ${node.status}. Please check the input data.`);
    }
  });

  const startDepth = 1;
  const innerPart = iter(startDepth, diff);

  return `{\n${innerPart.join('\n')}\n}`;
};

export default stylish;
