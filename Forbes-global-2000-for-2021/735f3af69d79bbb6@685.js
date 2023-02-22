import define1 from "./e503bd003884017c@1029.js";

function _1(md){return(
md`# Forbes GLOBAL 2000 for 2021
 It is an annual ranking of the top 2000 public companies in the world, published by Forbes magazine.
 _Source: (Forbes List)[https://www.forbes.com/lists/global2000/]_`
)}

function _2(md){return(
md`![Forbes](https://specials-images.forbesimg.com/imageserve/5cdc3ff7169cc600095f5c21/960x0.jpg)`
)}

function _3(md){return(
md`## Data:
_Source:[data.world](https://data.world/aroissues/forbes-global-2000-2008-2019)_`
)}

function _table(Inputs,data){return(
Inputs.table(data,{
columns: [
    "Rank_nr",
    "Company",
    "Industry",
    "Country",
  "Sales",
  "Profits",
  "Assets",
  "Market_Value"
  ],
  header: {
    Rank_nr: "Rank",
    Market_Value:"Market Value"
  }

})
)}

function _5(md){return(
md`---`
)}

function _6(md){return(
md`### Top Performing Industries by Profit`
)}

function _7(Plot,data){return(
Plot.plot({
  marks: [
    Plot.barX(data,Plot.groupY({x:"mean"},{y:"Industry",x:"Profits",fill:"#3F72AF",sort: {y: "x", reverse: true},r:1})),
  ],
  width:900,
  marginLeft:180,
  x:{
    label:"Profit in Billion",
     tickFormat: "$,.1s",
        grid: true
  },
  style:{
    fontSize:12
  }
})
)}

function _8(md){return(
md`### Profit earn by organization in different countries.`
)}

function _selectMul(yamultiselect,data){return(
yamultiselect(
            [...new Set(data.map(d => d.Country))], 
            {
              value:["United States","India","China"],
              label: "Select countries",
              width: 600
})
)}

function _10(Plot,data,selectMul){return(
Plot.plot({
  marks: [
    Plot.ruleY(data,Plot.groupY({x:"mean"},{y:selectMul,x:"Profits",stroke:"#4D455D",strokeWidth: 6,sort: {y: "x", reverse: true}})),

    Plot.dotY(data,Plot.groupY({x:"mean"},{y:selectMul,x:"Profits",fill:"#439A97",sort: {y: "x", reverse: true},r:8})),

  ],
  width:900,
  marginLeft:100,
  marginBottom:60,
  x:{
    label:"Profit in Billion",
     tickFormat: "$,.1s",
        grid: true
  },
    style:{
    fontSize:12
  }
})
)}

function _11(md){return(
md`### Trend of Sales vs Profit.`
)}

function _toggle(Inputs){return(
Inputs.toggle({label: "Add `Market value`", 
                               value: true,
                                width: 600
                              })
)}

function _13(Plot,data,toggle,d3){return(
Plot.plot({
  marks: [
    Plot.circle(data, {x: "Sales", y: "Profits",
                       r: toggle ? "Market_Value":6,
                       fill:"Assets",
                      fillOpacity:0.6}),
    Plot.ruleY(data,{y:d3.mean(data, d => d.Profits),strokeWidth:2,stroke:"Red",strokeOpacity:0.8}),
    Plot.text(data,{x:550000,y:d3.mean(data, d => d.Profits),text: ['Mean'],dy: -10})
  ],
  marginLeft:60,
  marginBottom:60,
  width:1000,
  insetTop:20,
  x:{
    label:"Sales in Billion",
     tickFormat: "$,.1s",
        grid: true
  },
  y:{
    label:"Profits in Billion",
     tickFormat: "$,.1s",
        grid: true
  },
  color:{ 
            legend:true,
            type: "linear", 
            scheme: "cool",
            ticks: 10, 
            width: 650,
            tickFormat: "$,.1s",
            style: {
              fontSize: 12},
            height:68,
            tickSize:12,
            marginLeft:40
        },
  size:{legend:true}
})
)}

function _14(md){return(
md`### Companies with highest profit margin.`
)}

function _range(Inputs){return(
Inputs.range([2, 35], {label: "Select Top", step: 1,value:5})
)}

function _16(Plot,topPtoS,range){return(
Plot.plot({
  marks:[
    Plot.barX(topPtoS.slice(0,range),{x:"ProfitToSale",
                                      y:"Company",
                                      fill:"#7FBCD2",
                                      sort:{y: "x", reverse: true}})
  ],
  marginLeft:300,
  marginBottom:50,
  width:1200,
  style:{
    fontSize:12
  },
  x:{
      label:"Profit margin",
      tickFormat: ".1s",
      ticks: 10,
      grid:true,
  }
})
)}

function _17(md){return(
md`_Profit margin, to know more about it: [wikipedia](https://en.wikipedia.org/wiki/Profitmargin)_`
)}

function _18(md){return(
md`### Appendix`
)}

function _topPtoS(data){return(
data.map((d)=>{
  return{
    Company: d.Company,
    ProfitToSale: d.Sales >0 ?(d.Profits/d.Sales): 0,
  };
}).sort((a, b) => (a.ProfitToSale < b.ProfitToSale) ? 1 : (a.ProfitToSale > b.ProfitToSale) ? -1 : 0)
)}

function _data(forbesGlobal200020221){return(
forbesGlobal200020221.sheet(0,{headers:true})
)}

function _forbesGlobal200020221(FileAttachment){return(
FileAttachment("Forbes Global 2000 -2022@1.xlsx").xlsx()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Forbes Global 2000 -2022@1.xlsx", {url: new URL("./files/dd8702a82044939593d664c4671660010f67a0af1b4a2750d6cabceff7f39de64adccbcb932b59c5fca92a90efc9b7162533f177c0bf3d1e6bca36e211796e4b.xlsx", import.meta.url), mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof table")).define("viewof table", ["Inputs","data"], _table);
  main.variable(observer("table")).define("table", ["Generators", "viewof table"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["Plot","data"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof selectMul")).define("viewof selectMul", ["yamultiselect","data"], _selectMul);
  main.variable(observer("selectMul")).define("selectMul", ["Generators", "viewof selectMul"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","data","selectMul"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof toggle")).define("viewof toggle", ["Inputs"], _toggle);
  main.variable(observer("toggle")).define("toggle", ["Generators", "viewof toggle"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","data","toggle","d3"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof range")).define("viewof range", ["Inputs"], _range);
  main.variable(observer("range")).define("range", ["Generators", "viewof range"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","topPtoS","range"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("topPtoS")).define("topPtoS", ["data"], _topPtoS);
  main.variable(observer("data")).define("data", ["forbesGlobal200020221"], _data);
  main.variable(observer("forbesGlobal200020221")).define("forbesGlobal200020221", ["FileAttachment"], _forbesGlobal200020221);
  const child1 = runtime.module(define1);
  main.import("yamultiselect", child1);
  return main;
}
