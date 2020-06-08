# HolyJS-2019-msk

[https://www.youtube.com/playlist?list=PL8sJahqnzh8KXjvw3i0bY-fCn1abQMbv8]

---

# Guillermo Rauch — Client rendering, server rendering, pre rendering

[https://youtu.be/impcGrPD0xQ]

## Static <b>advantages</b>

- Cheap scaling
- High availability
- Reduced backend load
- O(1) TTFB
- All-or-nothing code rollouts
- Very high throughput
- Great security model
- Failures contained to build

## Static <b>shortcoming</b>

- <b>Lengthy build</b> process
- Small changes trigger <b>full rebuild</b>
- Full pre-build intractable at <b>>N pages</b>
- <b>SEO suffers</b> unless 100% pre-built
- <b>Perf suffers</b> unless 100% pre-built
- <b>Not dynamic</b>

## <del>Static</del> SSR <del>shortcomings</del> advantages

- <del>Lengthy build</del> <b>Quick build</b> process
- Small changes <b>are instant</b> <del>trigger full rebuild</del>
- <del>Full pre-build intractable at >N</del> <b>infinity pages</b>
- <b>SEO is great</b><del>suffers unless 100% pre-built</del>
- <b>Pert is great</b><del>suffers unless 100% pre-built</del>
- <del>Not</del><b>dynamic</b>

## SSR <b>shortcomings</b>

- <b>Duplicate business logc</b> on server and client, usually problematic (e.g.: node-fetch)
- <b>Complex ops and maintenance</b> (readiness probes, alerts, metrics)
- <b>Very expensive</b>
- Practically always <b>single region</b>
- Prone to <b>stability problems and memory leaks</b>
- High dependence on <b>ad-hoc caching services</b> for scaling
- Increased <b>security attack surface</b> (Node.js)
- <b>Duplicate monitoring, tracing and exception-reporting</b> in both server and client
- <b>Unstable and unpredictable TTFB</b>
- <b>Failures are catastrophic</b> (500 page)

## JAMstack

- J = JavaScript
- A = API
- M = Markup

JAMstack: retain the static model, <b>defer dynamic computation to the client</b>

## JAMstack <b>advantages</b>

- All the benefits of static
- Single error reporting surface
- Single debugging story
- Great local dev story
- Plugs into any backend

Preloading + Parallelism yields <b>great performance</b>

Solution: <b>combine</b> static site generation with dynamic client-side computation

Introducing <b>Incremental Static Site Generation (iSSG)</b>

## iSSG <b>advantages</b>

- Highly available (tolerates backend downtime)
- Always global (html files in CDN)
- Always fast (pre-rendered / tolerates backend slowness)
- Scales infinitely
- Cheap

`Most applications can be modeled fully "statically" thanks to iSSG + client-side JS`
Static is new Dynamic

Next.js is now tackling the essential comlexity

iSSG is coming soon to Next.js canary

---
