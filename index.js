#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander'),
    glob = require('glob');

program
  .version('0.0.1')
  .option('-b --bookfolder [path]', 'Path to the book folder', '.')
  .parse(process.argv);

if (program.bookfolder) {
    console.log(program.bookfolder);
}
