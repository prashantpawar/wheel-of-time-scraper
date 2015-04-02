#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander'),
    glob = require('glob'),
    fs = require('fs'),
    globOptions,
    fileOrderRe = /ch(\d*).html/g,
    extractionRe = /<p>\n(.*)/,
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
    var extractedSummary;
    files.sort(function (a, b) {
        var tempValueA = a.replace(fileOrderRe, subst),
        tempValueB = b.replace(fileOrderRe, subst);
        return tempValueA - tempValueB;
    });

    console.log('<html>');
    console.log('<body>');
    for(var i = 0; i < files.length; i++) {
        console.log('<h1>' + files[i] + '</h1>');
        extractedSummary = fs.readFileSync(program.bookfolder + '/' + files[i]).toString().match(extractionRe);
        if(!extractedSummary[1]) throw err;
        console.log(extractedSummary[1]);
    }
    console.log('</body>');
    console.log('</html>');
});
