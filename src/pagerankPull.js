import {sumAt, multiply, slice, absError} from "./_index";
import {PagerankOptions, PagerankResult} from "./pagerank";




export function pagerankTeleport(r, vfrom, efrom, vdata, u, U, N, p) {
  var a = (1-p)/N;
  for (; u<U; u++)
    if (vdata[u] == 0) a += p*r[u]/N;
  return a;
}

export function pagerankFactor(a, vfrom, efrom, vdata, u, U, N, p) {
  for (; u<U; u++) {
    var d = vdata[u];
    a[u] = d>0? p/d : 0;
  }
}

export function pagerankCalculate(a, c, vfrom, efrom, vdata, v, V, N, c0) {
  for (; v<V; v++)
    a[v] = c0 + sumAt(c, slice(efrom, vfrom[v], vfrom[v+1]));
}

export function pagerankPullLoop(a, r, c, f, vfrom, efrom, vdata, v, V, N, p, E, L) {
  var l = 1;
  for (; l<L; l++) {
    var c0 = pagerankTeleport(r, vfrom, efrom, vdata, v, V, N, p);
    multiply(c, r, f, v, V-v);
    pagerankCalculate(a, c, vfrom, efrom, vdata, v, V, N, c0);
    var el = absError(a, r, v, V-v);
    if (el < E) break;
    swap(a, r);
  }
  return l;
}


// Find pagerank using a single thread (pull, CSR).
// @param xt transpose graph, with vertex-data=out-degree
// @param q initial ranks (optional)
// @param o options {damping=0.85, tolerance=1e-6, maxIterations=500}
// @returns {ranks, iterations, time}
export function pagerankPull(xt, q, o=new PagerankOptions()) {
  var p = o.damping;
  var E = o.tolerance;
  var L = o.maxIterations, l;
  var vfrom = sourceOffsets(xt);
  var efrom = destinationIndices(xt);
  var vdata = vertexData(xt);
  var N     = xt.order();
  var a = new Array(N).fill(0);
  var r = new Array(N).fill(0);
  var c = new Array(N).fill(0);
  var f = new Array(N).fill(0);
  var qc = [];
  if (q) qc = compressContainer(xt, q);
  float t = measureDurationMarked([&](auto mark) {
    fill(a, T());
    if (q) copy(r, qc);
    else fill(r, T(1)/N);
    mark([&] { pagerankFactor(f, vfrom, efrom, vdata, 0, N, N, p); });
    mark([&] { l = pagerankMonolithicLoop(a, r, c, f, vfrom, efrom, vdata, 0, N, N, p, E, L); });
  }, o.repeat);
  return {decompressContainer(xt, a), l, t};
}
