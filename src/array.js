function absError(x, y) {
  var a = 0;
  for (var i=0, I=x.length; i<I; i++)
    a += Math.abs(x[i] - y[i]);
  return a;
}


function copyTo(a, x, i=0, I=x.length) {
  for (; i<I; i++)
    a[i] = x[i];
}


function fillAt(a, is, v) {
  for (var i of is)
    a[i] = v;
}


function resize(x, N, d) {
  if (N <= x.length) { x.length = N; return; }
  for (var i=x.length; i<N; i++)
    x.push(d);
}

function resizeWith(x, N, fd) {
  if (N <= x.length) { x.length = N; return; }
  for (var i=x.length; i<N; i++)
    x.push(fd());
}


function sum(x) {
  var a = 0;
  for (var i=0, I=x.length; i<I; i++)
    a += x[i];
  return a;
}
module.exports = {absError, copyTo, fillAt, resize, resizeWith, sum};
