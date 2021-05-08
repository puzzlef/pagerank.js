const {mtx, pagerankPush, pagerankPushAdjust} = require('./src');




function main(pth) {
  // load graph
  console.log(`Loading graph ${pth} ...`);
  var x = mtx.read(pth);
  console.log(`order: ${x.order()} size: ${x.size()} {}`);

  // expected iterations needed
  var damping = 0.85, tolerance = 1e-5;
  var I = Math.log(tolerance) / Math.log(damping);
  console.log(`Expected iterations: ${Math.floor(I)}`);
  console.log();

  // fixed damping
  console.log('With fixed damping:');
  var {ranks, iterations} = pagerankPush(x);
  console.log(`[${iterations} iters.] pagerankPush {dam=0.85, tol=1e-5}`);
  var {ranks, iterations} = pagerankPushAdjust(x);
  console.log(`[${iterations} iters.] pagerankPushAdjust {dam=0.85, tol=1e-5}`);
  console.log();

  // single-step damping adjust
  console.log('With single step damping adjust:');
  for (var p=84; p>=80; p--) {
    var {ranks, iterations} = pagerankPushAdjust(x, null, {damping: c => c? 0.85 : p/100});
    console.log(`[${iterations} iters.] pagerankPushAdjust {dam=${p/100},0.85, tol=1e-5}`);
  }
  for (var p=70; p>=10; p-=10) {
    var {ranks, iterations} = pagerankPushAdjust(x, null, {damping: c => c? 0.85 : p/100});
    console.log(`[${iterations} iters.] pagerankPushAdjust {dam=${p/100},0.85, tol=1e-5}`);
  }
  console.log();

  // multi-step damping adjust
  for (var steps=2; steps<5; steps++) {
    console.log(`With ${steps}-steps damping adjust:`);
    for (var pb=80; pb>=10; pb-=10) {
      var d = (85-pb)/steps;
      var p = new Array(steps+1).fill(85);
      var p = p.map((v, i) => Math.round(pb + i*d)/100);
      var {ranks, iterations} = pagerankPushAdjust(x, null, {damping: c => c < p.length? p[c] : 0.85});
      console.log(`[${iterations} iters.] pagerankPushAdjust {dam=${p}, tol=1e-5}`);
    }
    console.log();
  }
}
main(process.argv[2]);
