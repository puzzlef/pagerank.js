const fs = require('fs');




function read(pth) {
  var d = fs.readFileSync(pth, 'utf8');
  return d.replace(/\r?\n/g, '\n');
}
module.exports = {read};
