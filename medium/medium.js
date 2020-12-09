var fs = require('fs');
var readMe = fs.readFileSync('planet.txt','utf8');
console.log(readMe);