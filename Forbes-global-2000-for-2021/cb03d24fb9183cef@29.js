import define1 from "./08c5ddca9401f513@192.js";

function _1(md){return(
md`# Saneef Notebooks Footer`
)}

function _2(md){return(
md`A generic footer to be included in my notebooks to _anonymously_ collect usage metrics through [Plausible Analytics](https://plausible.io/).`
)}

function _3(md){return(
md`---`
)}

function _content(md){return(
md`<small>
*My notebook collects anonymous usage metrics through [Plausible Analytics](https://observablehq.com/@saneef/plausible-analytics).* </small>
`
)}

function _footer(plausible_analytics_snippet,content)
{
  plausible_analytics_snippet;
  return content;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("content")).define("content", ["md"], _content);
  main.variable(observer("footer")).define("footer", ["plausible_analytics_snippet","content"], _footer);
  const child1 = runtime.module(define1);
  main.import("snippet", "plausible_analytics_snippet", child1);
  return main;
}
