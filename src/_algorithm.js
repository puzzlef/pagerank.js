// RESIZE
// ------

export function resize(a, N, d) {
  if (N <= a.length) { a.length = N; return; }
  for (var i=a.length; i<N; i++)
    a.push(d);
}

export function resizeWith(x, N, fd) {
  if (N <= x.length) { x.length = N; return; }
  for (var i=x.length; i<N; i++)
    x.push(fd());
}




// COUNT-*
// -------

export function count(x, v) {
  var a = 0;
  for (var u of x)
    if (u===v) a++;
  return a;
}

export function countIf(x, fn) {
  var a = 0;
  for (var v of x)
    if (fn(v)) a++;
  return a;
}




// INDICES
// -------

export function indices(x) {
  var a = new Map(), i = 0;
  for (var v of x)
    a.set(v, i++);
  return a;
}




// SET-DIFFERENCE
// --------------

export function setDifference(x, y) {
  var a = [];
  for (var v of x)
    if (!y.includes(v)) a.push(v);
  return a;
}




// REORDER
// -------

export function reorder(x, is) {
  var a = [];
  for (var i of is)
    a.push(x[i]);
  return a;
}




// JOIN
// ----

export function joinIf(xs, fn) {
  var a = [];
  for (var x of xs) {
    if (a.length===0 || !fn(a[a.length-1], x)) a.push(x);
    else a[a.length-1].push(...x);
  }
  return a;
}

export function joinUntilSize(xs, N) {
  return joinIf(xs, (b, x) => b.length<N);
}

export function join(xs) {
  var a = [];
  for (var x of xs)
    a.push(...x);
  return a;
}




// COPY
// ----

export function copy(a, x, i=0, N=x.length) {
  for (; i<N; i++)
    a[i] = x[i];
}




// GATHER
// ------

export function gather(a, x, ks) {
  var j = 0;
  for (var k of ks)
    a[j++] = x[k];
}




// SCATTER
// -------

export function scatter(a, x, ks) {
  var j = 0;
  for (var k of ks)
    a[k] = x[j++];
}




// FILL
// ----

export function fill(a, i, N, v) {
  for (; i<N; i++)
    a[i] = v;
}




// FILL-AT
// -------

export function fillAt(a, i, v, ks) {
  for (var k of ks)
    a[i+k] = v;
}




// SUM
// ---

export function sum(x, i=0, N=x.length) {
  var a = 0;
  for (; i<N; i++)
    a += x[i];
  return a;
}




// SUM-AT
// ------

export function sumAt(x, i, ks) {
  var a = 0;
  for (var k of ks)
    a += x[i+k];
  return a;
}




// ADD-VALUE
// ---------

export function addValue(a, i, N, v) {
  for (; i<N; i++)
    a[i] += v;
}




// ADD-VALUE-AT
// ------------

export function addValueAt(a, i, v, ks) {
  for (var k of ks)
    a[i+k] += v;
}




// ABS-ERROR
// ---------

export function absError(x, y, i=0, N=x.length) {
  var a = 0;
  for (; i<N; i++)
    a += Math.abs(x[i] - y[i]);
  return a;
}




// MULTIPLY
// --------

export function multiply(a, x, y, i=0, N=x.length) {
  for (; i<N; i++)
    a[i] = x[i] * y[i];
}
