const fs = require('fs');
const os = require('os');
const path = require('path');

const RGRAPH = /^Loading graph .*\/(.*?)\.mtx \.\.\./m;
const RORDER = /^order: (\d+) size: (\d+) \{\}/m;
const RFIXED = /^With fixed damping:/m;
const RSINGL = /^With single step damping adjust:/m;
const RMULTI = /^With (\d+)-steps damping adjust:/m;
const RRESLT = /^\[(\d+) iters\.\] pagerankPushAdjust {dam=(.+?), tol=(.+?)}/m;




// *-FILE
// ------

function readFile(pth) {
  var d = fs.readFileSync(pth, 'utf8');
  return d.replace(/\r?\n/g, '\n');
}

function writeFile(pth, d) {
  d = d.replace(/\r?\n/g, os.EOL);
  fs.writeFileSync(pth, d);
}




// *-CSV
// -----

function writeCsv(pth, rows) {
  var cols = Object.keys(rows[0]);
  var a = cols.join()+'\n';
  for (var r of rows)
    a += [...Object.values(r)].map(v => `"${v}"`).join()+'\n';
  writeFile(pth, a);
}




// *-LOG
// -----

function readLogLine(ln, data, state) {
  if (RGRAPH.test(ln)) {
    var [, graph] = RGRAPH.exec(ln);
    if (!data.has(graph)) data.set(graph, []);
    state = {graph};
  }
  else if (RORDER.test(ln)) {
    var [, order, size] = RORDER.exec(ln);
    state.order = parseFloat(order);
    state.size  = parseFloat(size);
  }
  else if (RFIXED.test(ln)) {
    state.steps = 0;
  }
  else if (RSINGL.test(ln)) {
    state.steps = 1;
  }
  else if (RMULTI.test(ln)) {
    var [, steps] = RMULTI.exec(ln);
    state.steps = parseFloat(steps);
  }
  else if (RRESLT.test(ln)) {
    const RRESLT = /^\[(\d+) iters\.\] pagerankPushAdjust {dam=(.+?), tol=(.+?)}/m;
    var [, iterations, damping, tolerance] = RRESLT.exec(ln);
    data.get(state.graph).push(Object.assign({}, state, {
      iterations:    parseFloat(iterations),
      damping,
      damping_start: damping.split(',')[0],
      tolerance:     parseFloat(tolerance)
    }));
  }
  return state;
}

function readLog(pth) {
  var text  = readFile(pth);
  var lines = text.split('\n');
  var data  = new Map();
  var state = null;
  for (var ln of lines)
    state = readLogLine(ln, data, state);
  return data;
}




// PROCESS-*
// ---------


function processCsv(data) {
  var a = [];
  for (var rows of data.values())
    a.push(...rows);
  return a;
}




// MAIN
// ----

function main(cmd, log, out) {
  var data = readLog(log);
  if (path.extname(out)==='') cmd += '-dir';
  switch (cmd) {
    case 'csv':
      var rows = processCsv(data);
      writeCsv(out, rows);
      break;
    case 'csv-dir':
      for (var [graph, rows] of data)
        writeCsv(path.join(out, graph+'.csv'), rows);
      break;
    default:
      console.error(`error: "${cmd}"?`);
      break;
  }
}
main(...process.argv.slice(2));
