import {performance} from "perf_hooks";




// MEASURE
// -------

export function measureDuration(fn, N=1) {
  var start = performance.now();
  for (var i=0; i<N; i++)
    fn();
  var stop = performance.now();
  return (stop - start)/N;
}


export function measureDurationMarked(fn, N=1) {
  var duration = 0;
  for (var i=0; i<N; i++)
    fn(fm => { duration += measureDuration(fm); });
  return duration/N;
}




// RETRY
// -----

export function retry(fn, N=2) {
  for (var i=0; i<N; i++)
    if (fn()) return true;
  return false;
}
