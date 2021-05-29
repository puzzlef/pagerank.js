import {resize, resizeWith} from "./_index.mjs";




class DiGraph {
  #none
  #vex
  #vdata
  #edata
  #N
  #M

  // Cute helpers
  #s() { return this.#vdata.length; }

  // Read operations
  span()  { return this.#s(); }
  order() { return this.#N; }
  size()  { return this.#M; }

  hasVertex(u)  { return u < this.#s() && this.#vex[u]; }
  hasEdge(u, v) { return u < this.#s() && this.#edata[u].has(v); }
  edges(u)      { return u < this.#s()? this.#edata[u].keys() : this.#none.keys(); }
  degree(u)     { return u < this.#s()? this.#edata[u].size   : 0; }
  *vertices()   { for (var u=0, U=this.#s(); u<U; u++) { if (this.#vex[u]) yield u; } }
  *inEdges(v)   { for (var u=0, U=this.#s(); u<U; u++) { if (this.#edata[u].has(v)) yield u; } }
  inDegree(v)   { var a = 0; for (var u=0, U=this.#s(); u<U; u++) { if (this.#edata[u].has(v)) a++; } return a; }

  vertexData(u)    { return this.hasVertex(u)? this.#vdata[u] : undefined; }
  setVertexData(u, d) { if (this.hasVertex(u)) this.#vdata[u] = d; }
  edgeData(u, v)   { return this.hasEdge(u, v)? this.#edata[u].get(v) : undefined; }
  setEdgeData(u, v)   { if (this.hasEdge(u, v)) this.#edata[u].set(v, d); }

  // Write operations
  addVertex(u, d, d0) {
    if (this.hasVertex(u)) return;
    if (u >= this.#s()) {
      resize(this.#vex, u+1, false);
      resize(this.#vdata, u+1, d0);
      resizeWith(this.#edata, u+1, () => new Map());
    }
    this.#vex[u] = true;
    this.#vdata[u] = d;
    this.#N++;
  }

  addEdge(u, v, d) {
    if (this.hasEdge(u, v)) return;
    this.addVertex(u);
    this.addVertex(v);
    this.#edata[u].set(v, d);
    this.#M++;
  }

  removeEdge(u, v) {
    if (!this.hasEdge(u, v)) return;
    this.#edata[u].delete(v);
    this.#M--;
  }

  removeEdges(u) {
    if (!this.hasVertex(u)) return;
    this.#M -= this.degree(u);
    this.#edata[u].clear();
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

  // Lifetime operations
  constructor() {
    this.#vex = [];
    this.#vdata = [];
    this.#edata = [];
    this.#N = 0;
    this.#M = 0;
  }
}
export default DiGraph;
