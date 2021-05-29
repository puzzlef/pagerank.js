import {transform} from "./_index";




// EDGES
// -----

export function edges(x, u, fn=v=>v) {
  return [...x.edges(u)];
}


export function inEdges(x, v, fn=v=>v) {
  return [...transform(x.inEdges(v), fn)];
}




// EDGE-DATA
// ---------

export function edgeData(x, ks=x.vertices(), fn=(u, v) => x.edgeData(u, v)) {
  var a = [];
  for (var u of ks) {
    for (var v of x.edges(u))
      a.push(fn(u, v));
  }
  return a;
}
