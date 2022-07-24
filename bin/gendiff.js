#!/usr/bin/env node
import { program } from 'commander';

program
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0', '-V, --version')
  .argument('<filepath1> <filepath2>')
  .option('-f, --format <type>')

program.parse();
