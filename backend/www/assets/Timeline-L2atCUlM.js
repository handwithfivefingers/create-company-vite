import{r as a,J as j,t as y,s as m,x as T,av as J,L as k}from"./index-XD4JDM6b.js";var q=function(r,t){var l={};for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&t.indexOf(e)<0&&(l[e]=r[e]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(r);n<e.length;n++)t.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(r,e[n])&&(l[e[n]]=r[e[n]]);return l},B=function(t){var l=t.prefixCls,e=t.className,n=t.color,f=n===void 0?"blue":n,u=t.dot,d=t.pending,x=d===void 0?!1:d;t.position;var v=t.label,O=t.children,g=q(t,["prefixCls","className","color","dot","pending","position","label","children"]),p=a.useContext(j),C=p.getPrefixCls,o=C("timeline",l),N=y(m(m({},"".concat(o,"-item"),!0),"".concat(o,"-item-pending"),x),e),i=y(m(m(m({},"".concat(o,"-item-head"),!0),"".concat(o,"-item-head-custom"),!!u),"".concat(o,"-item-head-").concat(f),!0)),h=/blue|red|green|gray/.test(f||"")?void 0:f;return a.createElement("li",T({},g,{className:N}),v&&a.createElement("div",{className:"".concat(o,"-item-label")},v),a.createElement("div",{className:"".concat(o,"-item-tail")}),a.createElement("div",{className:i,style:{borderColor:h,color:h}},u),a.createElement("div",{className:"".concat(o,"-item-content")},O))};const w=B;var F=function(r,t){var l={};for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&t.indexOf(e)<0&&(l[e]=r[e]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(r);n<e.length;n++)t.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(r,e[n])&&(l[e[n]]=r[e[n]]);return l},S=function(t){var l=a.useContext(j),e=l.getPrefixCls,n=l.direction,f=t.prefixCls,u=t.pending,d=u===void 0?null:u,x=t.pendingDot,v=t.children,O=t.className,g=t.reverse,p=g===void 0?!1:g,C=t.mode,o=C===void 0?"":C,N=F(t,["prefixCls","pending","pendingDot","children","className","reverse","mode"]),i=e("timeline",f),h=typeof d=="boolean"?null:d,L=d?a.createElement(w,{pending:!!d,dot:x||a.createElement(k,null)},h):null,b=a.Children.toArray(v);b.push(L),p&&b.reverse();var D=function(c,P){return o==="alternate"?c.props.position==="right"?"".concat(i,"-item-right"):c.props.position==="left"||P%2===0?"".concat(i,"-item-left"):"".concat(i,"-item-right"):o==="left"?"".concat(i,"-item-left"):o==="right"||c.props.position==="right"?"".concat(i,"-item-right"):""},E=b.filter(function(s){return!!s}),I=a.Children.count(E),_="".concat(i,"-item-last"),z=a.Children.map(E,function(s,c){var P=c===I-2?_:"",A=c===I-1?_:"";return J(s,{className:y([s.props.className,!p&&d?P:A,D(s,c)])})}),$=b.some(function(s){var c;return!!(!((c=s==null?void 0:s.props)===null||c===void 0)&&c.label)}),R=y(i,m(m(m(m(m({},"".concat(i,"-pending"),!!d),"".concat(i,"-reverse"),!!p),"".concat(i,"-").concat(o),!!o&&!$),"".concat(i,"-label"),$),"".concat(i,"-rtl"),n==="rtl"),O);return a.createElement("ul",T({},N,{className:R}),z)};S.Item=w;const H=S;export{H as T};
