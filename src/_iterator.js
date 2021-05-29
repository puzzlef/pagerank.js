// SLICE
// -----

export function* slice(x, i=0, I=x.length) {
  for (; i<I; i++)
    yield x[i];
}




// TRANSFORM
// ---------

export function* transform(x, fn) {
  for (var v of x)
    yield fn(v);
}




// FILTER
// ------

export function* filter(x, fn) {
  for (var v of x)
    if (fn(v)) yield v;
}




// RANGE
// -----

export function* range(v, V, DV=1) {
  for (; v<V; v+=DV)
    yield v;
}
