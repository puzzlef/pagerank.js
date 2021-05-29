import DiGraph from "./DiGraph";




export function copyTo(a, x) {
  for (var u of x.vertices())
    a.addVertex(u, x.vertexData(u));
  for (var u of x.vertices()) {
    for (var v of x.edges(u))
      a.addEdge(u, v, x.edgeData(u, v));
  }
}

export function copy(x) {
  var a = new DiGraph(); copyTo(a, x);
  return a;
}
