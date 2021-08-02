Experimenting PageRank improvement by adjusting *damping factor α* between iterations.

The idea behind this experiment was to *adjust the damping factor* `α`
*in steps*, to see if it might help *reduce* PageRank computation time.
The PageRank computation first starts with a *small initial damping factor*
`α = α₀`. After the ranks have *converged*, the *damping factor* `α` is
updated to the next damping factor step, say `α₁` and PageRank computation
is continued again. This is done until the *final desired value* of `αₑ` is
reached. For example, the computation starts initially with `α = α₀ = 0.5`,
lets ranks converge quickly, and then switches to `α = αₑ = 0.85` and
continues PageRank computation until it converges. This **single-step**
change is attempted with the initial (fast converge) *damping factor* `α₀`
from `0.1` to `0.8`. Similar to this, two-step, three-step, and four-step
changes are also attempted. With a **two-step** approach, a *midpoint*
between the initial damping value `α₀` and `αₑ = 0.85` is selected as
well for the second set of iterations. Similarly, **three-step** and
**four-step** approaches use *two* and *three* midpoints respectively.

A *small sample graph* is used in this experiment, which is stored in
the *MatrixMarket (.mtx)* file format. The experiment is implemented in
Node.js, and executed on a personal laptop. Only the *iteration count*
of each test case is measured. The *tolerance* `τ = 10⁻⁵` is used for
all test cases. Statistics of each test case is printed to *standard*
*output (stdout)*, and redirected to a *log file*, which is then processed
with a *script* to generate a *CSV file*, with each row representing the
details of a *single test case*. This *CSV file* is imported into *Google*
*Sheets*, and necessary tables are set up with the help of the *FILTER*
function to create the *charts*.

From the results it is clear that **modifying the damping factor** `α`
**in steps is not a good idea**. The *standard fixed damping factor*
*PageRank*, with `α = 0.85`, converges in `35` *iterations*. Using a
*single-step* approach increases the total number of iterations required,
by at least `4` *iterations* (with an initial *damping factor* `α₀ = 0.1`).
Increasing `α₀` further *increases* the total number of iterations needed
for computation. Switching to a *multi-step* approach also increases the
number of iterations needed for convergence. The two-step, three-step,
and four-step approaches require a total of atleast `49`, `60`, and `71`
*iterations* respectively. Again, increasing `α₀` continues to *increase*
the total number of iterations needed for computation. A possible
explanation for this effect is that the ranks for different values of
the *damping factor* `α` are *significantly different*, and switching
to a different damping factor `α` after each step mostly leads to
*recomputation*.

All outputs are saved in [out](out/) and a small part of the output is listed
here. Some [charts] are also included below, generated from [sheets]. The input
data used for this experiment is available at ["graphs"]. This experiment was
done with guidance from [Prof. Dip Sankar Banerjee] and [Prof. Kishore Kothapalli].

<br>

```bash
$ node ./ data/min-4SCC.mtx

# Loading graph data/min-4SCC.mtx ...
# order: 21 size: 35 {}
# Expected iterations: 70
#
# With fixed damping:
# [35 iters.] pagerankPush {dam=0.85, tol=1e-5}
# [35 iters.] pagerankPushAdjust {dam=0.85, tol=1e-5}
#
# With single step damping adjust:
# [54 iters.] pagerankPushAdjust {dam=0.84,0.85, tol=1e-5}
# [55 iters.] pagerankPushAdjust {dam=0.83,0.85, tol=1e-5}
# [55 iters.] pagerankPushAdjust {dam=0.82,0.85, tol=1e-5}
# [54 iters.] pagerankPushAdjust {dam=0.81,0.85, tol=1e-5}
# [54 iters.] pagerankPushAdjust {dam=0.8,0.85, tol=1e-5}
# [51 iters.] pagerankPushAdjust {dam=0.7,0.85, tol=1e-5}
# [47 iters.] pagerankPushAdjust {dam=0.6,0.85, tol=1e-5}
# [45 iters.] pagerankPushAdjust {dam=0.5,0.85, tol=1e-5}
# [43 iters.] pagerankPushAdjust {dam=0.4,0.85, tol=1e-5}
# [42 iters.] pagerankPushAdjust {dam=0.3,0.85, tol=1e-5}
# [40 iters.] pagerankPushAdjust {dam=0.2,0.85, tol=1e-5}
# [39 iters.] pagerankPushAdjust {dam=0.1,0.85, tol=1e-5}
#
# With 2-steps damping adjust:
# [74 iters.] pagerankPushAdjust {dam=0.8,0.83,0.85, tol=1e-5}
# [69 iters.] pagerankPushAdjust {dam=0.7,0.78,0.85, tol=1e-5}
# [64 iters.] pagerankPushAdjust {dam=0.6,0.73,0.85, tol=1e-5}
# [60 iters.] pagerankPushAdjust {dam=0.5,0.68,0.85, tol=1e-5}
# [56 iters.] pagerankPushAdjust {dam=0.4,0.63,0.85, tol=1e-5}
# [54 iters.] pagerankPushAdjust {dam=0.3,0.58,0.85, tol=1e-5}
# [51 iters.] pagerankPushAdjust {dam=0.2,0.53,0.85, tol=1e-5}
# [49 iters.] pagerankPushAdjust {dam=0.1,0.48,0.85, tol=1e-5}
#
# With 3-steps damping adjust:
# [91 iters.] pagerankPushAdjust {dam=0.8,0.82,0.83,0.85, tol=1e-5}
# [86 iters.] pagerankPushAdjust {dam=0.7,0.75,0.8,0.85, tol=1e-5}
# [80 iters.] pagerankPushAdjust {dam=0.6,0.68,0.77,0.85, tol=1e-5}
# [75 iters.] pagerankPushAdjust {dam=0.5,0.62,0.73,0.85, tol=1e-5}
# [70 iters.] pagerankPushAdjust {dam=0.4,0.55,0.7,0.85, tol=1e-5}
# [66 iters.] pagerankPushAdjust {dam=0.3,0.48,0.67,0.85, tol=1e-5}
# [62 iters.] pagerankPushAdjust {dam=0.2,0.42,0.63,0.85, tol=1e-5}
# [60 iters.] pagerankPushAdjust {dam=0.1,0.35,0.6,0.85, tol=1e-5}
#
# With 4-steps damping adjust:
# [108 iters.] pagerankPushAdjust {dam=0.8,0.81,0.83,0.84,0.85, tol=1e-5}
# [104 iters.] pagerankPushAdjust {dam=0.7,0.74,0.78,0.81,0.85, tol=1e-5}
# [95 iters.] pagerankPushAdjust {dam=0.6,0.66,0.73,0.79,0.85, tol=1e-5}
# [89 iters.] pagerankPushAdjust {dam=0.5,0.59,0.68,0.76,0.85, tol=1e-5}
# [84 iters.] pagerankPushAdjust {dam=0.4,0.51,0.63,0.74,0.85, tol=1e-5}
# [79 iters.] pagerankPushAdjust {dam=0.3,0.44,0.58,0.71,0.85, tol=1e-5}
# [74 iters.] pagerankPushAdjust {dam=0.2,0.36,0.53,0.69,0.85, tol=1e-5}
# [71 iters.] pagerankPushAdjust {dam=0.1,0.29,0.48,0.66,0.85, tol=1e-5}
```

[![](https://i.imgur.com/UAbQTQW.png)][sheetp]

<br>
<br>

[![](https://i.imgur.com/XPKV828.jpg)](https://www.youtube.com/watch?v=J3sfsP9W048)

[Prof. Dip Sankar Banerjee]: https://sites.google.com/site/dipsankarban/
[Prof. Kishore Kothapalli]: https://cstar.iiit.ac.in/~kkishore/
[Deeper Inside PageRank]: https://www.slideshare.net/SubhajitSahu/deeper-inside-PageRank-notes
["graphs"]: https://github.com/puzzlef/graphs
[charts]: https://photos.app.goo.gl/G8Q6WSUn6pebH49VA
[sheets]: https://docs.google.com/spreadsheets/d/1ksTlhtzloh1HAvNoiWvmnP00FIyE9MZkGwMeyuEUjaI/edit?usp=sharing
[sheetp]: https://docs.google.com/spreadsheets/d/e/2PACX-1vTZRQRMgWnenPfVvz7KPCHmh4WuZm7wVviWx*EtpPhJIItKevIAoJMP7eM-tycdlhBd9k21Mb5Qp3DD/pubhtml
