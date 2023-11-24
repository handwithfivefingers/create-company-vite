import{r,w as M,bM as Ne,J as L,p as Y,b1 as Oe,bN as Re,t as T,s as w,aG as ee,x as E,aH as re,av as te,b0 as Se,q as we,A as ae,_ as W,bO as ze,bP as $e,l as _e,ar as Ae,bQ as Be}from"./index-XD4JDM6b.js";import{P as ke}from"./index-ehUL30Ed.js";import{M as Ie}from"./index-gcWtjv3K.js";import{D as je}from"./dropdown-D6H3nMuz.js";var q=r.createContext("default"),Z=function(e){var a=e.children,t=e.size;return r.createElement(q.Consumer,null,function(n){return r.createElement(q.Provider,{value:t||n},a)})},Te=function(c,e){var a={};for(var t in c)Object.prototype.hasOwnProperty.call(c,t)&&e.indexOf(t)<0&&(a[t]=c[t]);if(c!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(c);n<t.length;n++)e.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(c,t[n])&&(a[t[n]]=c[t[n]]);return a},Le=function(e,a){var t=r.useContext(q),n=r.useState(1),l=M(n,2),i=l[0],o=l[1],s=r.useState(!1),u=M(s,2),m=u[0],g=u[1],v=r.useState(!0),C=M(v,2),d=C[0],R=C[1],f=r.useRef(null),b=r.useRef(null),O=Ne(a,f),p=r.useContext(L),x=p.getPrefixCls,h=function(){if(!(!b.current||!f.current)){var N=b.current.offsetWidth,_=f.current.offsetWidth;if(N!==0&&_!==0){var X=e.gap,U=X===void 0?4:X;U*2<_&&o(_-U*2<N?(_-U*2)/N:1)}}};r.useEffect(function(){g(!0)},[]),r.useEffect(function(){R(!0),o(1)},[e.src]),r.useEffect(function(){h()},[e.gap]);var P=function(){var N=e.onError,_=N?N():void 0;_!==!1&&R(!1)},z=e.prefixCls,A=e.shape,S=A===void 0?"circle":A,H=e.size,G=H===void 0?"default":H,k=e.src,de=e.srcSet,I=e.icon,fe=e.className,ve=e.alt,ge=e.draggable,K=e.children,be=e.crossOrigin,D=Te(e,["prefixCls","shape","size","src","srcSet","icon","className","alt","draggable","children","crossOrigin"]),y=G==="default"?t:G,he=Object.keys(Y(y)==="object"?y||{}:{}).some(function(j){return["xs","sm","md","lg","xl","xxl"].includes(j)}),Q=Oe(he),xe=r.useMemo(function(){if(Y(y)!=="object")return{};var j=Re.find(function(_){return Q[_]}),N=y[j];return N?{width:N,height:N,lineHeight:"".concat(N,"px"),fontSize:I?N/2:18}:{}},[Q,y]),$=x("avatar",z),ye=T(w(w({},"".concat($,"-lg"),y==="large"),"".concat($,"-sm"),y==="small")),V=r.isValidElement(k),Ee=T($,ye,w(w(w({},"".concat($,"-").concat(S),!!S),"".concat($,"-image"),V||k&&d),"".concat($,"-icon"),!!I),fe),Ce=typeof y=="number"?{width:y,height:y,lineHeight:"".concat(y,"px"),fontSize:I?y/2:18}:{},B;if(typeof k=="string"&&d)B=r.createElement("img",{src:k,draggable:ge,srcSet:de,onError:P,alt:ve,crossOrigin:be});else if(V)B=k;else if(I)B=I;else if(m||i!==1){var F="scale(".concat(i,") translateX(-50%)"),pe={msTransform:F,WebkitTransform:F,transform:F},Pe=typeof y=="number"?{lineHeight:"".concat(y,"px")}:{};B=r.createElement(ee,{onResize:h},r.createElement("span",{className:"".concat($,"-string"),ref:b,style:E(E({},Pe),pe)},K))}else B=r.createElement("span",{className:"".concat($,"-string"),style:{opacity:0},ref:b},K);return delete D.onError,delete D.gap,r.createElement("span",E({},D,{style:E(E(E({},Ce),xe),D.style),className:Ee,ref:O}),B)},He=r.forwardRef(Le);const ne=He;var De=function(e){var a=r.useContext(L),t=a.getPrefixCls,n=a.direction,l=e.prefixCls,i=e.className,o=i===void 0?"":i,s=e.maxCount,u=e.maxStyle,m=e.size,g=t("avatar-group",l),v=T(g,w({},"".concat(g,"-rtl"),n==="rtl"),o),C=e.children,d=e.maxPopoverPlacement,R=d===void 0?"top":d,f=e.maxPopoverTrigger,b=f===void 0?"hover":f,O=re(C).map(function(P,z){return te(P,{key:"avatar-key-".concat(z)})}),p=O.length;if(s&&s<p){var x=O.slice(0,s),h=O.slice(s,p);return x.push(r.createElement(ke,{key:"avatar-popover-key",content:h,trigger:b,placement:R,overlayClassName:"".concat(g,"-popover")},r.createElement(ne,{style:u},"+".concat(p-s)))),r.createElement(Z,{size:m},r.createElement("div",{className:v,style:e.style},x))}return r.createElement(Z,{size:m},r.createElement("div",{className:v,style:e.style},O))};const Me=De;var ce=ne;ce.Group=Me;const We=ce;var Ge=function(c,e){var a={};for(var t in c)Object.prototype.hasOwnProperty.call(c,t)&&e.indexOf(t)<0&&(a[t]=c[t]);if(c!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(c);n<t.length;n++)e.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(c,t[n])&&(a[t[n]]=c[t[n]]);return a},le=function(e){var a=e.prefixCls,t=e.separator,n=t===void 0?"/":t,l=e.children,i=e.menu,o=e.overlay,s=e.dropdownProps,u=Ge(e,["prefixCls","separator","children","menu","overlay","dropdownProps"]),m=r.useContext(L),g=m.getPrefixCls,v=g("breadcrumb",a),C=function(f){if(i||o){var b=E({},s);return"overlay"in e&&(b.overlay=o),r.createElement(je,E({menu:i,placement:"bottom"},b),r.createElement("span",{className:"".concat(v,"-overlay-link")},f,r.createElement(Se,null)))}return f},d;return"href"in u?d=r.createElement("a",E({className:"".concat(v,"-link")},u),l):d=r.createElement("span",E({className:"".concat(v,"-link")},u),l),d=C(d),l!=null?r.createElement("li",null,d,n&&r.createElement("span",{className:"".concat(v,"-separator")},n)):null};le.__ANT_BREADCRUMB_ITEM=!0;const oe=le;var ie=function(e){var a=e.children,t=r.useContext(L),n=t.getPrefixCls,l=n("breadcrumb");return r.createElement("span",{className:"".concat(l,"-separator")},a||"/")};ie.__ANT_BREADCRUMB_SEPARATOR=!0;const Fe=ie;var Ue=function(c,e){var a={};for(var t in c)Object.prototype.hasOwnProperty.call(c,t)&&e.indexOf(t)<0&&(a[t]=c[t]);if(c!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(c);n<t.length;n++)e.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(c,t[n])&&(a[t[n]]=c[t[n]]);return a};function qe(c,e){if(!c.breadcrumbName)return null;var a=Object.keys(e).join("|"),t=c.breadcrumbName.replace(new RegExp(":(".concat(a,")"),"g"),function(n,l){return e[l]||n});return t}function Je(c,e,a,t){var n=a.indexOf(c)===a.length-1,l=qe(c,e);return n?r.createElement("span",null,l):r.createElement("a",{href:"#/".concat(t.join("/"))},l)}var se=function(e,a){return e=(e||"").replace(/^\//,""),Object.keys(a).forEach(function(t){e=e.replace(":".concat(t),a[t])}),e},Ke=function(e,a,t){var n=we(e),l=se(a||"",t);return l&&n.push(l),n},J=function(e){var a=e.prefixCls,t=e.separator,n=t===void 0?"/":t,l=e.style,i=e.className,o=e.routes,s=e.children,u=e.itemRender,m=u===void 0?Je:u,g=e.params,v=g===void 0?{}:g,C=Ue(e,["prefixCls","separator","style","className","routes","children","itemRender","params"]),d=r.useContext(L),R=d.getPrefixCls,f=d.direction,b,O=R("breadcrumb",a);if(o&&o.length>0){var p=[];b=o.map(function(h){var P=se(h.path,v);P&&p.push(P);var z;h.children&&h.children.length&&(z=r.createElement(Ie,{items:h.children.map(function(S){return{key:S.path||S.breadcrumbName,label:m(S,v,o,Ke(p,S.path,v))}})}));var A={separator:n};return z&&(A.overlay=z),r.createElement(oe,E({},A,{key:P||h.breadcrumbName}),m(h,v,o,p))})}else s&&(b=re(s).map(function(h,P){return h&&te(h,{separator:n,key:P})}));var x=T(O,w({},"".concat(O,"-rtl"),f==="rtl"),i);return r.createElement("nav",E({className:x,style:l},C),r.createElement("ol",null,b))};J.Item=oe;J.Separator=Fe;const Qe=J;var Ve={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"arrow-left",theme:"outlined"};const Xe=Ve;var ue=function(e,a){return r.createElement(ae,W(W({},e),{},{ref:a,icon:Xe}))};ue.displayName="ArrowLeftOutlined";const Ye=r.forwardRef(ue);var Ze={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"}}]},name:"arrow-right",theme:"outlined"};const er=Ze;var me=function(e,a){return r.createElement(ae,W(W({},e),{},{ref:a,icon:er}))};me.displayName="ArrowRightOutlined";const rr=r.forwardRef(me);var tr=function(e,a,t){return!a||!t?null:r.createElement(Ae,{componentName:"PageHeader"},function(n){return r.createElement("div",{className:"".concat(e,"-back")},r.createElement(Be,{onClick:function(i){t==null||t(i)},className:"".concat(e,"-back-button"),"aria-label":n.back},a))})},ar=function(e){return r.createElement(Qe,E({},e))},nr=function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"ltr";return e.backIcon!==void 0?e.backIcon:a==="rtl"?r.createElement(rr,null):r.createElement(Ye,null)},cr=function(e,a){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"ltr",n=a.title,l=a.avatar,i=a.subTitle,o=a.tags,s=a.extra,u=a.onBack,m="".concat(e,"-heading"),g=n||i||o||s;if(!g)return null;var v=nr(a,t),C=tr(e,v,u),d=C||l||g;return r.createElement("div",{className:m},d&&r.createElement("div",{className:"".concat(m,"-left")},C,l&&r.createElement(We,E({},l)),n&&r.createElement("span",{className:"".concat(m,"-title"),title:typeof n=="string"?n:void 0},n),i&&r.createElement("span",{className:"".concat(m,"-sub-title"),title:typeof i=="string"?i:void 0},i),o&&r.createElement("span",{className:"".concat(m,"-tags")},o)),s&&r.createElement("span",{className:"".concat(m,"-extra")},r.createElement(_e,null,s)))},lr=function(e,a){return a?r.createElement("div",{className:"".concat(e,"-footer")},a):null},or=function(e,a){return r.createElement("div",{className:"".concat(e,"-content")},a)},ir=function(e){var a=ze(!1),t=M(a,2),n=t[0],l=t[1],i=function(s){var u=s.width;l(u<768,!0)};return r.createElement($e,null,function(o){var s=o.getPrefixCls,u=o.pageHeader,m=o.direction,g,v=e.prefixCls,C=e.style,d=e.footer,R=e.children,f=e.breadcrumb,b=e.breadcrumbRender,O=e.className,p=!0;"ghost"in e?p=e.ghost:u&&"ghost"in u&&(p=u.ghost);var x=s("page-header",v),h=function(){return f!=null&&f.routes?ar(f):null},P=h(),z=f&&"props"in f,A=(g=b==null?void 0:b(e,P))!==null&&g!==void 0?g:P,S=z?f:A,H=T(x,O,w(w(w({"has-breadcrumb":!!S,"has-footer":!!d},"".concat(x,"-ghost"),p),"".concat(x,"-rtl"),m==="rtl"),"".concat(x,"-compact"),n));return r.createElement(ee,{onResize:i},r.createElement("div",{className:H,style:C},S,cr(x,e,m),R&&or(x,R),lr(x,d)))})};const fr=ir;export{fr as P};