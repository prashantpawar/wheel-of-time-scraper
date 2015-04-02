#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander'),
    glob = require('glob'),
    fs = require('fs'),
    globOptions,
    fileOrderRe = /ch(\d*).html/g,
    subst = '$1'; 
    
    

program
  .version('0.0.1')
  .option('-b --bookfolder [path]', 'Path to the book folder', '.')
  .parse(process.argv);

globOptions = {
    cwd: program.bookfolder,
    nosort: true
};
glob('**/ch*.html', globOptions, function (er, files) {
    files.sort(function (a, b) {
        var tempValueA = a.replace(fileOrderRe, subst),
        tempValueB = b.replace(fileOrderRe, subst);
        return tempValueA - tempValueB;
    });

    for(var i = 0; i < files.length; i++) {
        fs.readFile(program.bookfolder + '/' + files[i], function (err, data) {
            if(err) throw err;
            console.log(data.toString());
        });
    }
});
