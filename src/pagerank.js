export class PagerankOptions {
  repeat
  damping
  tolerance
  maxIterations

  constructor(repeat=1, damping=0.85, tolerance=1e-6, maxIterations=500) {
    this.repeat        = repeat;
    this.damping       = damping;
    this.tolerance     = tolerance;
    this.maxIterations = maxIterations;
  }
}


export class PagerankResult {
  ranks
  iterations
  time

  constructor(ranks, iterations=0, time=0) {
    this.ranks      = ranks;
    this.iterations = iterations;
    this.time       = time;
  }
}
