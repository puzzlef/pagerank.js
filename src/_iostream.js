import {readFileSync} from "fs";




// READ-FILE
// ---------

export function readFile(pth) {
  var d = readFileSync(pth, "utf8");
  return d.replace(/\r?\n/g, "\n");
}
