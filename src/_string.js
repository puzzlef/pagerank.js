// COUNT-LINES
// -----------

export function countLines(x) {
  return (x.match(/\r?\n/g)||[]).length;
}
