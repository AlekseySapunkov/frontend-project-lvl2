#!/usr/bin/env node
import { program } from 'commander';
import generateDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0', '-V, --version')
  .argument('<filepath1> <filepath2>')
  .option('-f, --format <type>')
  .action((filepath1, filepath2) => console.log(generateDiff(filepath1, filepath2)))
program.parse();
