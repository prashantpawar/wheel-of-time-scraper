#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander'),
    glob = require('glob'),
    options,
    re = /ch(\d*).html/g; 
    

program
  .version('0.0.1')
  .option('-b --bookfolder [path]', 'Path to the book folder', '.')
  .parse(process.argv);

options = {
    cwd: program.bookfolder,
    nosort: true
};
glob('**/ch*.html', options, function (er, files) {
    files.map(function (current, index) {
        console.log(current, index);
    });
});
