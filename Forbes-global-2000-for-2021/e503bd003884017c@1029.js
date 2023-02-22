// https://observablehq.com/@saneef/yet-another-multi-select@1029
import define1 from "./9bed702f80a3797e@402.js";
import define2 from "./cb03d24fb9183cef@29.js";

function _1(md){return(
md`# Yet Another Multi-select`
)}

function _2(md){return(
md`A replacement for [Observable Input: Select][1] with autocomplete and means to pick multiple options. Uses [\`datalist\`][2], making it accessible and usable within Observable Notebooks.

[1]: https://observablehq.com/@observablehq/input-select
[2]: http://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist`
)}

function _3(FileAttachment){return(
FileAttachment("cover.jpg").image({
  width: 480
})
)}

function _4(toc){return(
toc({
  headers: "h2,h3,h4,h5",
  hideStartingFrom: "Sample Data"
})
)}

function _5(md){return(
md`## Usage

Import into your notebook using:
~~~js
     import {yamultiselect} from '@saneef/yet-another-multi-select'
~~~

... then, declare a \`yamultiselect\` with \`viewof\`, like so:
~~~js
     viewof flavor = yamultiselect(
        ["salty", "sweet", "bitter", "sour", "umami"],  // data
        {label: "Flavors"} // options
      )
~~~

... you can access the value in any cell using \`flavor\` variable.

~~~js
     flavor
~~~`
)}

function _flavor(yamultiselect){return(
yamultiselect(["salty", "sweet", "bitter", "sour", "umami"], {
  label: "Flavors"
})
)}

function _7(flavor){return(
flavor
)}

function _8(md){return(
md`## Options

The available \`options\` are:

* \`label\`: a label; either a string or an HTML element.
* \`value\`: an array of initial values.
* \`placeholder\`: the [placeholder][placeholder] attribute.
* \`keyof\`: a function to return the key for the given element in \`data\` (not used when \`data\` is of type [\`Map\`][Map]).
* \`valueof\`: a function to return the value of the given element in \`data\` (not used when \`data\` is of type [\`Map\`][Map]).
* \`width\`: the width of the input (not including the label).
* \`disabled\`: whether input is disabled; defaults to \`false\`.

[placeholder]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/placeholder
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map`
)}

function _9(md){return(
md`## Examples`
)}

function _10(md){return(
md`### Initial values`
)}

function _colors2(yamultiselect,x11colors){return(
yamultiselect(x11colors, {
  value: ["azure", "darksalmon"],
  label: "Colors"
})
)}

function _12(colors2){return(
colors2
)}

function _13(md){return(
md`### Types of \`data\``
)}

function _14(md){return(
md`#### Data as Array of Strings`
)}

function _color(yamultiselect,x11colors){return(
yamultiselect(x11colors, { label: "Colors" })
)}

function _16(color){return(
color
)}

function _17(md){return(
md`#### Data as Array of Objects`
)}

function _objOfTeams(yamultiselect,teams){return(
yamultiselect(teams, {
  valueof: (d) => d.name,
  keyof: (d) => d.name,
  label: "Teams"
})
)}

function _19(objOfTeams){return(
objOfTeams
)}

function _20(md){return(
md`#### Data as a Map`
)}

function _sizes(yamultiselect){return(
yamultiselect(
  new Map([
    ["Short", 8],
    ["Tall", 12],
    ["Grande", 16],
    ["Venti", 20]
  ]),
  { value: [8], label: "Sizes" }
)
)}

function _22(sizes){return(
sizes
)}

function _23(md){return(
md`### Disabled Input`
)}

function _disableMultiSelect(yamultiselect,x11colors){return(
yamultiselect(x11colors, {
  disabled: true,
  value: ["darksalmon"],
  label: "Colors"
})
)}

function _25(disableMultiSelect){return(
disableMultiSelect
)}

function _26(md){return(
md`### Setting input \`width\``
)}

function _colors3(yamultiselect,x11colors){return(
yamultiselect(x11colors, {
  value: ["darksalmon"],
  label: "Colors",
  width: 320
})
)}

function _28(md){return(
md`### Write into \`value\``
)}

function _writableMultiselect(yamultiselect,x11colors){return(
yamultiselect(x11colors, {
  label: "Colors"
})
)}

function _30(writableMultiselect){return(
writableMultiselect
)}

function _31(Inputs,$0,pick,x11colors){return(
Inputs.button("Write a random color", {
  reduce: () => {
    $0.value = [pick(x11colors)];
  }
})
)}

function _32(md){return(
md`## Implementation`
)}

function _yamultiselect(isMap,first,identity,second,getKeys,getValues,newId,html,blockClass,ns,cssPropWidth,Event,preventDefault,dataList,icons,attachStyles,invalidation){return(
(data, options = {}) => {
  const { width, locale, disabled, label, placeholder } = Object.assign(
    {
      width: 240,
      disabled: false,
      placeholder: "Search…"
    },
    options
  );

  const keyof = options.keyof ? options.keyof : isMap(data) ? first : identity;
  const valueof = options.valueof
    ? options.valueof
    : isMap(data)
    ? second
    : identity;

  const keys = getKeys(data, keyof);
  const values = getValues(data, valueof);

  const initialIndices = Array.isArray(options.value)
    ? indicesFromValues(options.value)
    : [];

  let selectedIndices = new Set(initialIndices);

  const id = newId();
  const datalistId = `${id}-datalist`;
  const inputEl = html`<input id="${id}"
                              class="${blockClass}__input" 
                              type="text" 
                              list="${datalistId}"
                              placeholder=${placeholder}
                              disabled=${disabled}
                              />`;
  const selectionEl = html`<ul class="${blockClass}__selected-items" region="status"></ul>`;
  const labelEl = label ? html`<label for="${id}">${label}</label>` : "";
  const datalistEl = html`<datalist id=${datalistId}></datalist>`;

  const form = html`<form class="${ns} ${blockClass}" style=${cssPropWidth(
    width
  )} disabled=${disabled}>
  ${labelEl}
  
  <div class="${blockClass}__wrapper">
    ${selectionEl}
    ${inputEl}
    ${datalistEl}
  </div>
</form>`;

  function dispatchInputEvent() {
    form.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function indicesFromValues(value) {
    let indices = [];
    value.forEach((v) => {
      const index = values.indexOf(v);
      if (index >= 0) {
        indices.push(index);
      }
    });
    return indices;
  }

  function oninput(event) {
    preventDefault(event);
    const pickedKey = event.target?.value;
    if (pickedKey) {
      const iOfIndex = keys.indexOf(pickedKey);
      if (iOfIndex >= 0) {
        inputEl.value = "";
        selectedIndices.add(iOfIndex);
        updateUI();
        dispatchInputEvent();
      }
    }
  }

  function removeIndex(index) {
    const result = selectedIndices.delete(index);
    if (result) {
      updateUI();
      dispatchInputEvent();
    }
  }

  function updateOptions() {
    datalistEl.innerHTML = null;
    const options = dataList(keys, selectedIndices);
    options.forEach((option) => datalistEl.append(option));
  }

  function updateSelectedPills() {
    selectionEl.innerHTML = null;
    let items = [];
    for (let i of selectedIndices) {
      const k = keys[i];
      items.push(html`<li class="${blockClass}__selected-item">
  <span class="${blockClass}__selected-item-label">${k}</span>
  <button class="${blockClass}__remove"
          type="button"
          title="Remove"
          onclick=${() => removeIndex(i)}
          disabled=${disabled}>
    <span class="${blockClass}__icon">${icons.close()}</span>
  </button>
</li>`);
    }
    items.forEach((el) => selectionEl.append(el));
  }

  function updateUI() {
    updateOptions();
    updateSelectedPills();
  }

  function generateValues() {
    let items = [];
    for (let i of selectedIndices) {
      items.push(values[i]);
    }
    return items;
  }

  form.onchange = preventDefault;
  form.oninput = oninput;
  form.onsubmit = preventDefault;

  attachStyles(invalidation);
  updateUI();

  return Object.defineProperty(form, "value", {
    get() {
      return selectedIndices.size ? generateValues() : [];
    },
    set(value) {
      if (Array.isArray(value)) {
        const indices = indicesFromValues(value);
        selectedIndices = new Set(indices);
        updateUI();
        dispatchInputEvent();
      }
    }
  });
}
)}

function _dataList(html){return(
(keys, selectedIndices) =>
  keys.reduce((acc, v, i) => {
    if (!selectedIndices.has(i)) {
      return [...acc, html.fragment`<option value=${v}></option>`];
    }
    return acc;
  }, [])
)}

function _getKeys(isMap,stringify){return(
(data, keyof) => {
  if (isMap(data)) {
    return Array.from(data.keys()).map((k) => stringify(k));
  }

  let keys = [];
  data.forEach((d, i) => keys.push(stringify(keyof(d, i, data))));
  return keys;
}
)}

function _getValues(isMap){return(
(data, valueof) => {
  if (isMap(data)) {
    return Array.from(data.values());
  }

  let values = [];
  data.forEach((d, i) => values.push(valueof(d, i, data)));
  return values;
}
)}

function _ns(Inputs){return(
Inputs.text().classList[0]
)}

function _msns(ns)
{
  return ns.replace("oi-", "yams-");
}


function _blockClass(msns){return(
`${msns}-form`
)}

function _newId(msns)
{
  let nextId = 0;

  return function newId() {
    return `${msns}-${++nextId}`;
  };
}


function _length(){return(
(x) => {
  return x == null ? null : typeof x === "number" ? `${x}px` : `${x}`;
}
)}

function _cssPropWidth(length){return(
function cssPropWidth(width) {
  return { "--input-width": length(width) };
}
)}

function _preventDefault(){return(
function preventDefault(event) {
  event.preventDefault();
}
)}

function _identity(){return(
function identity(x) {
  return x;
}
)}

function _first(){return(
function first([x]) {
  return x;
}
)}

function _second(){return(
function second([, x]) {
  return x;
}
)}

function _isMap(){return(
(data) => data instanceof Map
)}

function _stringify(){return(
function stringify(x) {
  return x == null ? "" : `${x}`;
}
)}

function _pick(){return(
(arr) => arr[Math.floor(Math.random() * arr.length)]
)}

function _attachStyles(msns,html,blockClass,invalidation){return(
(placeOfUseInvalidation) => {
  const elId = `${msns}-style`;

  if (document.getElementById(elId)) return;

  const style = html`<style id=${elId}>
  .${blockClass} {
    --border-radius-100: 0.125rem;
    --border-radius-200: 0.25rem;
    --color-border: #b3b3b3;
    --color-bg: #f5f5f5;
    --color-bg-hover: #ffdfdf;
    --color-icon: #777;
    --color-icon-hover: #e7040f;
  }

  .${blockClass}[disabled] {
    cursor: not-allowed;
  }

  .${blockClass} input[type="text"] {
    width: inherit;
  }

  .${blockClass}__wrapper {
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-100);
    background-color: var(--color-bg);
    width: 100%;
  }

  .${blockClass}__selected-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin: 0;
  }
  .${blockClass}__selected-items:not(:empty) {
    border-block-end: 1px solid var(--color-border);
    padding: 0.25rem;
  }
  .${blockClass}__selected-item {
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    list-style: none;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-200);
    padding-inline-start: 0.5rem;
    background-color: white;
  }

  button.${blockClass}__remove {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    background: transparent;
    border: 0;
    padding: 0.25rem;
    margin: 0;
    margin-inline-start: 0.5rem;
    line-height: 1;
    border-inline-start: 1px solid var(--color-border);
    color: var(--color-icon);
  }

  .${blockClass}__remove:hover:not([disabled]),
  .${blockClass}__remove:active:not([disabled]),
  .${blockClass}__remove:focus:not([disabled]) {
    background-color: var(--color-bg-hover);
    color: var(--color-icon-hover);
  }

  .${blockClass}__icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    position: relative;
    vertical-align: middle;
  }

  .${blockClass}__icon svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .${blockClass}__input {
    margin: 0;
    padding: 0.25rem;
    border: 0;
    border-radius: var(--border-radius-100);
    background: white;
  }

  /* Dirty fix for Firefox where the placeholder don't disappear sometimes */
  .${blockClass}__input:focus::-moz-placeholder { 
    color:transparent; 
  }

  .${blockClass}__input[disabled] {
    cursor: not-allowed;
  }
</style>`;

  document.head.append(style);

  placeOfUseInvalidation.then(() => style.remove());
  invalidation.then(() => style.remove());
}
)}

function _icons(svg){return(
{
  close: () =>
    svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
}
)}

function _52(md){return(
md`## Credits

* Inspiration
  * Thanks to [Aaron](https://observablehq.com/@aaronkyle), for inspiring me to take a crack at this problem.
* Code References
  * [Observable Inputs](https://observablehq.com/@observablehq/inputs)
  * [Jeremy’s Inputs](https://observablehq.com/@jashkenas/inputs)
  * [John Alexis Guerra Gómez’s Multi Auto Select](https://observablehq.com/@john-guerra/multi-auto-select)
* Icons
  * [Feather Icons](https://feathericons.com/)
* Support
  * Thanks to [Harris Lapiroff](https://observablehq.com/@harrislapiroff) for pointing out some bugs.`
)}

function _53(md){return(
md`## Sample Data`
)}

function _x11colors(){return(
[
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen"
]
)}

function _teams(){return(
[
  {name: "Lakers", location: "Los Angeles, California"},
  {name: "Warriors", location: "San Francisco, California"},
  {name: "Celtics", location: "Boston, Massachusetts"},
  {name: "Nets", location: "New York City, New York"},
  {name: "Raptors", location: "Toronto, Ontario"},
]
)}

function _html(htl){return(
htl.html
)}

function _57(md){return(
md`## Imports`
)}

function _60(md){return(
md`---`
)}

function _61(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["cover.jpg", {url: new URL("./files/e50e3cc6ed348b150173470566242e9360e24ba20c181a6f46412c414d33612a1c925e7bab746dc8fb0fe2cf68ed43481dd4e74ae5720f53f03fc0065b66a215.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["FileAttachment"], _3);
  main.variable(observer()).define(["toc"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof flavor")).define("viewof flavor", ["yamultiselect"], _flavor);
  main.variable(observer("flavor")).define("flavor", ["Generators", "viewof flavor"], (G, _) => G.input(_));
  main.variable(observer()).define(["flavor"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof colors2")).define("viewof colors2", ["yamultiselect","x11colors"], _colors2);
  main.variable(observer("colors2")).define("colors2", ["Generators", "viewof colors2"], (G, _) => G.input(_));
  main.variable(observer()).define(["colors2"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof color")).define("viewof color", ["yamultiselect","x11colors"], _color);
  main.variable(observer("color")).define("color", ["Generators", "viewof color"], (G, _) => G.input(_));
  main.variable(observer()).define(["color"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("viewof objOfTeams")).define("viewof objOfTeams", ["yamultiselect","teams"], _objOfTeams);
  main.variable(observer("objOfTeams")).define("objOfTeams", ["Generators", "viewof objOfTeams"], (G, _) => G.input(_));
  main.variable(observer()).define(["objOfTeams"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("viewof sizes")).define("viewof sizes", ["yamultiselect"], _sizes);
  main.variable(observer("sizes")).define("sizes", ["Generators", "viewof sizes"], (G, _) => G.input(_));
  main.variable(observer()).define(["sizes"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("viewof disableMultiSelect")).define("viewof disableMultiSelect", ["yamultiselect","x11colors"], _disableMultiSelect);
  main.variable(observer("disableMultiSelect")).define("disableMultiSelect", ["Generators", "viewof disableMultiSelect"], (G, _) => G.input(_));
  main.variable(observer()).define(["disableMultiSelect"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("viewof colors3")).define("viewof colors3", ["yamultiselect","x11colors"], _colors3);
  main.variable(observer("colors3")).define("colors3", ["Generators", "viewof colors3"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("viewof writableMultiselect")).define("viewof writableMultiselect", ["yamultiselect","x11colors"], _writableMultiselect);
  main.variable(observer("writableMultiselect")).define("writableMultiselect", ["Generators", "viewof writableMultiselect"], (G, _) => G.input(_));
  main.variable(observer()).define(["writableMultiselect"], _30);
  main.variable(observer()).define(["Inputs","viewof writableMultiselect","pick","x11colors"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("yamultiselect")).define("yamultiselect", ["isMap","first","identity","second","getKeys","getValues","newId","html","blockClass","ns","cssPropWidth","Event","preventDefault","dataList","icons","attachStyles","invalidation"], _yamultiselect);
  main.variable(observer("dataList")).define("dataList", ["html"], _dataList);
  main.variable(observer("getKeys")).define("getKeys", ["isMap","stringify"], _getKeys);
  main.variable(observer("getValues")).define("getValues", ["isMap"], _getValues);
  main.variable(observer("ns")).define("ns", ["Inputs"], _ns);
  main.variable(observer("msns")).define("msns", ["ns"], _msns);
  main.variable(observer("blockClass")).define("blockClass", ["msns"], _blockClass);
  main.variable(observer("newId")).define("newId", ["msns"], _newId);
  main.variable(observer("length")).define("length", _length);
  main.variable(observer("cssPropWidth")).define("cssPropWidth", ["length"], _cssPropWidth);
  main.variable(observer("preventDefault")).define("preventDefault", _preventDefault);
  main.variable(observer("identity")).define("identity", _identity);
  main.variable(observer("first")).define("first", _first);
  main.variable(observer("second")).define("second", _second);
  main.variable(observer("isMap")).define("isMap", _isMap);
  main.variable(observer("stringify")).define("stringify", _stringify);
  main.variable(observer("pick")).define("pick", _pick);
  main.variable(observer("attachStyles")).define("attachStyles", ["msns","html","blockClass","invalidation"], _attachStyles);
  main.variable(observer("icons")).define("icons", ["svg"], _icons);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("x11colors")).define("x11colors", _x11colors);
  main.variable(observer("teams")).define("teams", _teams);
  main.variable(observer("html")).define("html", ["htl"], _html);
  main.variable(observer()).define(["md"], _57);
  const child1 = runtime.module(define1);
  main.import("toc", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer()).define(["footer"], _61);
  return main;
}
