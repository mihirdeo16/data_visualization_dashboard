import define1 from "./c2dae147641e012a@46.js";

function _1(md){return(
md`# Plausible Analytics on Observable `
)}

function _2(md){return(
md`This a fork of
[Plausible Analytics on Observable](https://observablehq.com/@endpointservices/plausible-analytics)
by [Tom Larkworthy](https://observablehq.com/@tomlarkworthy).
`
)}

function _3(md){return(
md`

*Here is code snippet for uploading pageview analytics to [Plausible.io](https://plausible.io). Plausible.io is the least personally invasive usage tracker that I know. No personal information is transmitted nor tracking identifiers installed. So no GDPR consent is required*. All it tracks is page views, dwell time and screen res (device detection), which is enough for me to see *which notebooks provide long term value* so I can prioritize accordingly.



The snipper here will upload stats for the underlying content domain: \`<login>.static.observableusercontent.com\` to [plausible.io](https://plausible.io/) (e.g. tomlarkworthy.static.observableusercontent.com)


Plausible's tracking snippet (plausible.js) was forked so it would report notebook paths properly


\`\`\`js
import {snippet} from '@saneef/plausible-analytics'
\`\`\`

\`\`\`js
snippet
\`\`\`

### Change log

- 2021-11-25: Bug fix, use safe-localstorage

  
### Known issues
- referrer is always "observablehq.com"
- pages loaded through /embed/ are unintelligible links worker links.`
)}

function _4(md){return(
md`### Forked Snippet`
)}

function _snippet(html,localStorage,XMLHttpRequest)
{
  const DATA_DOMAIN = window.origin.replace("https://", "");
  const DATA_API = "https://plausible.io";
  var a = html`<a href="${document.baseURI.replace(
      "observablehq.com",
      DATA_DOMAIN
    )}">`, // Fix for Observable
    r = window.document,
    t = localStorage, // Fix for Observable
    o = r.currentScript,
    s = "https://plausible.io/api/event",
    l = t && t.plausible_ignore;

  function p(t) {
    console.warn("Ignoring Event: " + t);
  }
  function e(t, e) {
    if (
      /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(a.hostname) ||
      "file:" === a.protocol
    )
      return p("localhost");
    if (
      !(
        window._phantom ||
        window.__nightmare ||
        window.navigator.webdriver ||
        window.Cypress
      )
    ) {
      if ("true" == l) return p("localStorage flag");
      var i = {};
      (i.n = t),
        (i.u = a.href),
        (i.d = DATA_DOMAIN),
        (i.r = r.referrer || null),
        (i.w = window.innerWidth),
        e && e.meta && (i.m = JSON.stringify(e.meta)),
        e && e.props && (i.p = JSON.stringify(e.props));
      var n = new XMLHttpRequest();
      n.open("POST", s, !0),
        n.setRequestHeader("Content-Type", "text/plain"),
        n.send(JSON.stringify(i)),
        (n.onreadystatechange = function () {
          4 == n.readyState && e && e.callback && e.callback();
        });
    }
  }
  var i = (window.plausible && window.plausible.q) || [];
  window.plausible = e;
  for (var n, w = 0; w < i.length; w++) e.apply(this, i[w]);
  function d() {
    n !== a.pathname && ((n = a.pathname), e("pageview"));
  }
  var u,
    c = window.history;
  c.pushState &&
    ((u = c.pushState),
    (c.pushState = function () {
      u.apply(this, arguments), d();
    }),
    window.addEventListener("popstate", d)),
    "prerender" === r.visibilityState
      ? r.addEventListener("visibilitychange", function () {
          n || "visible" !== r.visibilityState || d();
        })
      : d();
}


function _6(localStorage){return(
localStorage
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("snippet")).define("snippet", ["html","localStorage","XMLHttpRequest"], _snippet);
  main.variable(observer()).define(["localStorage"], _6);
  const child1 = runtime.module(define1);
  main.import("localStorage", child1);
  return main;
}
