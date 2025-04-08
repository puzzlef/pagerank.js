Design of **PageRank algorithm** for link analysis in *JavaScript*.

<br>


### Adjusting Damping factor in steps

The idea behind this experiment ([adjust-damping-factor-stepwise]) was to
*adjust the damping factor* `α` *in steps*, to see if it might help *reduce*
PageRank computation time. The PageRank computation first starts with a *small*
*initial damping factor* `α = α₀`. After the ranks have *converged*, the *damping*
*factor* `α` is updated to the next damping factor step, say `α₁` and PageRank
computation is continued again. This is done until the *final desired value* of
`αₑ` is reached. For example, the computation starts initially with `α = α₀ = 0.5`,
lets ranks converge quickly, and then switches to `α = αₑ = 0.85` and
continues PageRank computation until it converges. This **single-step** change
is attempted with the initial (fast converge) *damping factor* `α₀` from `0.1`
to `0.8`. Similar to this, two-step, three-step, and four-step changes are also
attempted. With a **two-step** approach, a *midpoint* between the initial
damping value `α₀` and `αₑ = 0.85` is selected as well for the second set of
iterations. Similarly, **three-step** and **four-step** approaches use *two* and
*three* midpoints respectively.

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

[![](https://i.imgur.com/UAbQTQW.png)][sheetp]

[adjust-damping-factor-stepwise]: https://github.com/puzzlef/pagerank.js/tree/adjust-damping-factor-stepwise

<br>
<br>


[![](https://i.imgur.com/XPKV828.jpg)](https://www.youtube.com/watch?v=J3sfsP9W048)\
[![ORG](https://img.shields.io/badge/org-puzzlef-green?logo=Org)](https://puzzlef.github.io)
[![DOI](https://zenodo.org/badge/365472264.svg)](https://zenodo.org/badge/latestdoi/365472264)
![](https://ga-beacon.deno.dev/G-KD28SG54JQ:hbAybl6nQFOtmVxW4if3xw/github.com/puzzlef/pagerank.js)

[Prof. Dip Sankar Banerjee]: https://sites.google.com/site/dipsankarban/
[Prof. Kishore Kothapalli]: https://cstar.iiit.ac.in/~kkishore/
[Deeper Inside PageRank]: https://www.slideshare.net/SubhajitSahu/deeper-inside-PageRank-notes
["graphs"]: https://github.com/puzzlef/graphs
[charts]: https://photos.app.goo.gl/G8Q6WSUn6pebH49VA
[sheets]: https://docs.google.com/spreadsheets/d/1ksTlhtzloh1HAvNoiWvmnP00FIyE9MZkGwMeyuEUjaI/edit?usp=sharing
[sheetp]: https://docs.google.com/spreadsheets/d/e/2PACX-1vTZRQRMgWnenPfVvz7KPCHmh4WuZm7wVviWx*EtpPhJIItKevIAoJMP7eM-tycdlhBd9k21Mb5Qp3DD/pubhtml
