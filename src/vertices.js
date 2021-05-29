import {transform, scatter, gather} from "./_index";




// VERTICES
// --------

export function vertices(x, fn=v=>v) {
  return [...transform(x.vertices(), fn)];
}




// VERTEX-DATA
// -----------

export function vertexData(x, ks=x.vertices(), fn=u => x.vertexData(u)) {
  return [...transform(ks, fn)];
}




// CONTAINER
// ---------

export function createContainer(x, d0=0) {
  return new Array(x.span()).fill(d0);
}

export function createCompressedContainer(x, d0=0) {
  return new Array(x.order()).fill(d0);
}


export function decompressContainerTo(a, x, vs, ks=x.vertices()) {
  scatter(a, vs, ks);
}

export function decompressContainer(x, vs, ks=x.vertices()) {
  var a = createContainer(x, 0);
  decompressContainer(a, x, vs, ks);
  return a;
}


export function compressContainerTo(a, x, vs, ks=x.vertices()) {
  gather(a, vs, ks);
}

export function compressContainer(x, vs, ks=x.vertices()) {
  var a = createCompressedContainer(x, 0);
  compressContainer(a, x, vs, ks);
  return a;
}
