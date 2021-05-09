Experimenting PageRank improvement by adjusting damping factor (α) between iterations.

After reading [Deeper Inside PageRank] i had an experiment in mind that i
wanted to try. As given here, no. of iterations is greatly dependent upon
the damping factor (alpha) ~ `log (tolerance) / log (damping)`. So for
alpha = 0.85, and tolerance = 10^-5, iterations ~= 85. For alpha = 0.5,
and same tolerance, iterations ~= 20 (quite a reduction).

The experiment was to adjust alpha in steps. Start with a small alpha,
change it when PageRank is converged, until the final desired value of
alpha. For example start initally with alpha = 0.5, let PageRank converge
quickly, and then switch to alpha = 0.85 and run PageRank until it
converges. Using a single step like this seems it might help reduce
iterations. Unfortunately it doesnt. Trying with multiple steps tends to
have even higher iteration count.


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

<br>
<br>

[![](https://i.imgur.com/XPKV828.jpg)](https://www.youtube.com/watch?v=J3sfsP9W048)

[Deeper Inside PageRank]: https://www.slideshare.net/SubhajitSahu/deeper-inside-PageRank-notes
