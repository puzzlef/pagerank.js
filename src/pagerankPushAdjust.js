const array = require('./array');

const OPTIONS = {
  damping:       () => 0.85,
  tolerance:     () => 1e-5,
  maxIterations: () => 500
};




function pagerankPushAdjustLoop(x, r0, r1, N, p, E, L) {
  var c = 0;
  for (var l=0; l<L(l); l++) {
    var pc = p(c, l), Ec = E(c, l);
    array.fillAt(r1, x.vertices(), (1-pc)/N);
    for (var u of x.vertices()) {
      var d = x.degree(u);
      var vs = d? x.edges(u) : x.vertices();
      var D = d||N;
      for (var v of vs)
        r1[v] += pc*r0[u]/D;
    }
    var e = array.absError(r0, r1);
    if (e < Ec) c++;
    if (e < Ec && pc === p(L, L)) break;
    [r0, r1] = [r1, r0];
  }
  return {ranks: r1, iterations: l};
}


function pagerankPushAdjust(x, init=null, o=null) {
  var o = Object.assign({}, OPTIONS, o);
  var N = x.order();
  var p = o.damping;
  var E = o.tolerance;
  var L = o.maxIterations;
  var r0 = x.vertexContainer(0);
  var r1 = x.vertexContainer(0);
  if (init) array.copyTo(r0, init);
  else array.fillAt(r0, x.vertices(), 1/N);
  return pagerankPushAdjustLoop(x, r0, r1, N, p, E, L);
}
module.exports = pagerankPushAdjust;
