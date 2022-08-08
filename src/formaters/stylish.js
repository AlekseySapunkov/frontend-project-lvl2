import _ from 'lodash';

const stylish = (tree, replacer = ' ') => {
  const getIndent = (spasesCount) => replacer.repeat((spasesCount * 2));
  const getBracketIndent = (spasesCount) => replacer.repeat((spasesCount * 2) - 2);

  const iter = (node, depth) => {
    const newIndent = getIndent(depth);
    const bracketIndent = getBracketIndent(depth);
    const values = (currentValue, level) => {
      if (!_.isObject(currentValue)) {
        return `${currentValue}`;
      }
      const lines = Object
        .entries(currentValue)
        .map(([key, value]) => `${getIndent(level)}  ${key}: ${values(value, level + 2)}`);
      return ['{', ...lines, `${getBracketIndent(level)}}`].join('\n');
    };

    const stringRepresentation = node.map((item) => {
      if (item.type === 'added') {
        return `${newIndent}+ ${item.key}: ${values(item.value, depth + 2)}`;
      }
      if (item.type === 'deleted') {
        return `${newIndent}- ${item.key}: ${values(item.value, depth + 2)}`;
      }
      if (item.type === 'nested') {
        return `${newIndent}  ${item.key}: ${iter(item.children, depth + 2)}`;
      }
      if (item.type === 'unchanged') {
        return `${newIndent}  ${item.key}: ${values(item.value, depth + 2)}`;
      }
      return `${newIndent}- ${item.key}: ${values(item.firstValue, depth + 2)}\n${newIndent}+ ${item.key}: ${values(item.secondValue, depth + 2)}`;
    });
    return ['{', ...stringRepresentation, `${bracketIndent}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;