const array = require('./array');




class DiGraphInt {
  #vex
  #vto
  #edata
  #vdata
  #N
  #M

  // Cute helpers
  #s()      { return this.#vto.length; }
  #ei(u, v) { return this.#vto[u].indexOf(v); }

  // Read operations
  base()  { return this; }
  span()  { return this.#s(); }
  order() { return this.#N; }
  size()  { return this.#M; }

  hasVertex(u)  { return u < this.#s() && this.#vex[u]; }
  hasEdge(u, v) { return u < this.#s() && this.#ei(u, v) >= 0; }
  edges(u)      { return u < this.#s()? this.#vto[u] : []; }
  degree(u)     { return u < this.#s()? this.#vto[u].length : 0; }
  *vertices()   { for (var u=0, U=this.#s(); u<U; u++) { if (this.#vex[u]) yield u; } }
  *inEdges(v)   { for (var u=0, U=this.#s(); u<U; u++) { if (this.#ei(u, v) >= 0) yield u; } }
  inDegree(v)   { var a = 0; for (var u=0, U=this.#s(); u<U; u++) { if (this.#ei(u, v) >= 0) a++; } return a; }

  vertexData(u)    { return this.hasVertex(u)? this.#vdata[u] : undefined; }
  setVertexData(u, d) { if (this.hasVertex(u)) this.#vdata[u] = d; }
  edgeData(u, v)   { return this.hasEdge(u, v)? this.#edata[u][this.#ei(u, v)] : undefined; }
  setEdgeData(u, v)   { if (this.hasEdge(u, v)) this.#edata[u][this.#ei(u, v)] = d; }

  // Write operations
  addVertex(u, d, d0) {
    if (this.hasVertex(u)) return;
    if (u >= this.#s()) {
      array.resize(this.#vex, u+1, false);
      array.resizeWith(this.#vto, u+1, () => []);
      array.resizeWith(this.#edata, u+1, () => []);
      array.resize(this.#vdata, u+1, d0);
    }
    this.#vex[u] = true;
    this.#vdata[u] = d;
    this.#N++;
  }

  addEdge(u, v, d) {
    if (this.hasEdge(u, v)) return;
    this.addVertex(u);
    this.addVertex(v);
    this.#vto[u].push(v);
    this.#edata[u].push(d);
    this.#M++;
  }

  removeEdge(u, v) {
    if (!this.hasEdge(u, v)) return;
    var o = this.#ei(u, v);
    this.#vto[u].splice(o, 1);
    this.#edata[u].splice(o, 1);
    this.#M--;
  }

  removeEdges(u) {
    if (!this.hasVertex(u)) return;
    this.#M -= this.degree(u);
    this.#vto[u].length = 0;
    this.#edata[u].length = 0;
  }

  removeInEdges(v) {
    if (!this.hasVertex(v)) return;
    for (var u of this.inEdges(v))
      this.removeEdge(u, v);
  }

  removeVertex(u) {
    if (!this.hasVertex(u)) return;
    this.removeEdges(u);
    this.removeInEdges(u);
    this.#vex[u] = false;
    this.#N--;
  }

  // Generate operations
  vertexContainer(d) { return new Array(this.span()).fill(d); }

  // Lifetime operations
  constructor() {
    this.#vex = [];
    this.#vto = [];
    this.#edata = [];
    this.#vdata = [];
    this.#N = 0;
    this.#M = 0;
  }
}
module.exports = DiGraphInt;
