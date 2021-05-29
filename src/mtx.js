import {readFile} from "./_index";
import DiGraph from "./DiGraph";




export function readMtxTo(a, pth) {
  var d  = readFile(pth);
  var ls = d.split('\n'), l = 0;

  // read header
  while (true) {
    var ln = ls[l++];
    if (!ln.startsWith("%")) break;
    if (!ln.startsWith("%%")) continue;
    var [h0, h1, h2, h3, h4] = ln.split(/\s+/g);
  }
  if (h1!="matrix" || h2!="coordinate") return;
  var sym = h4=="symmetric" || h4=="skew-symmetric";

  // read rows, cols, size
  var [r, c, sz] = ln.split(/\s+/g).map(parseFloat);
  var n = Math.max(r, c);
  for (var u=1; u<=n; u++)
    a.addVertex(u);

  // read edges (from, to)
  while (l < ls.length) {
    ln = ls[l++];
    var [u, v] = ln.split(/\s+/g).map(parseFloat);
    if (isNaN(u) || isNaN(v)) break;
    a.addEdge(u, v);
    if (sym) a.addEdge(v, u);
  }
}

export function readMtx(pth) {
  var a = new DiGraph(); readMtxTo(a, pth);
  return a;
}
