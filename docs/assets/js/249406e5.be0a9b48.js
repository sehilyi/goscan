"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4114],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(n),d=r,h=m["".concat(l,".").concat(d)]||m[d]||u[d]||o;return n?a.createElement(h,i(i({ref:t},c),{},{components:n})):a.createElement(h,i({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[m]="string"==typeof e?e:r,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1301:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const o={sidebar_position:7},i="Data Sampling",s={unversionedId:"visualizations/data-sampling",id:"visualizations/data-sampling",title:"Data Sampling",description:"For the efficient rendering of visualizations, entire data is not shown in the whole genome scale for point mutations, indels, and gene annotations.",source:"@site/docs/visualizations/data-sampling.md",sourceDirName:"visualizations",slug:"/visualizations/data-sampling",permalink:"/docs/visualizations/data-sampling",draft:!1,editUrl:"https://github.com/hms-dbmi/chromoscope/tree/master/docs/docs/visualizations/data-sampling.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"docsSidebar",previous:{title:"Export",permalink:"/docs/visualizations/export"},next:{title:"Loading Data",permalink:"/docs/category/loading-data"}},l={},p=[],c={toc:p},m="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(m,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"data-sampling"},"Data Sampling"),(0,r.kt)("p",null,"For the efficient rendering of visualizations, entire data is not shown in the whole genome scale for point mutations, indels, and gene annotations."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Point mutations"),": Chromoscope selects ",(0,r.kt)("strong",{parentName:"p"},"500")," ",(0,r.kt)("a",{parentName:"p",href:"#vcf--tbi"},"point mutations")," in each visible tile. Given that showing dense point mutations are important to the corresponding tracks, Chromoscope keeps point mutations with relatively small ",(0,r.kt)("inlineCode",{parentName:"p"},"DISTPREV")," (i.e., distance to the previous mutation) and filters out proportion mutations with relatively high ",(0,r.kt)("inlineCode",{parentName:"p"},"DISTPREV"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Indels"),": Chromoscope selects ",(0,r.kt)("strong",{parentName:"p"},"500")," ",(0,r.kt)("a",{parentName:"p",href:"#vcf--tbi"},"indels")," in each visible tile.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Genes"),": When there are too many genes overlapping each other, Chromoscope only shows genes that have the highest scores internally calculated (e.g., citation counts), which are computed during the processing of the data. Reference: ",(0,r.kt)("a",{parentName:"p",href:"https://docs.higlass.io/data_preparation.html#gene-annotation-tracks"},"https://docs.higlass.io/data_preparation.html#gene-annotation-tracks")))),(0,r.kt)("p",null,"All aforementioned tracks select visible elements dynamically based on the zoom level. When zooming in, more mutations will be displayed until, eventually, all point mutations become visible when zooming in close enough."))}u.isMDXComponent=!0}}]);