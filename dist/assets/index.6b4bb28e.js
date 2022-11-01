import{j as E,_ as b,w as he,n as le,as as se,k as B,K as oe,aS as Ce,aT as ye,H as ge,Y as ce,aU as be,V as xe,N as ke}from"./index.eab64f24.js";import{j as o,F as Ne,r as u,c as $}from"./vendor.e5394fe2.js";var we=function(t){var l=t.prefixCls,a=t.className,n=t.style,c=t.children,i=t.containerRef;return o(Ne,{children:o("div",{className:E("".concat(l,"-content"),a),style:b({},n),"aria-modal":"true",role:"dialog",ref:i,children:c})})},de=u.exports.createContext(null);function ue(e){return typeof e=="string"&&String(Number(e))===e?(he(!1,"Invalid value type of `width` or `height` which should be number type instead."),Number(e)):e}var fe={width:0,height:0,overflow:"hidden",outline:"none",position:"absolute"};function ve(e){var t,l,a,n,c=e.prefixCls,i=e.open,h=e.placement,w=e.inline,x=e.push,S=e.forceRender,k=e.autoFocus,L=e.keyboard,v=e.scrollLocker,p=e.rootClassName,O=e.rootStyle,C=e.zIndex,X=e.className,U=e.style,j=e.motion,P=e.width,q=e.height,V=e.children,W=e.contentWrapperStyle,z=e.mask,J=e.maskClosable,H=e.maskMotion,A=e.maskClassName,F=e.maskStyle,N=e.afterOpenChange,K=e.onClose,D=u.exports.useRef(),R=u.exports.useRef(),T=u.exports.useRef(),Q=function(f){var I=f.keyCode,M=f.shiftKey;switch(I){case oe.TAB:{if(I===oe.TAB){if(!M&&document.activeElement===T.current){var ne;(ne=R.current)===null||ne===void 0||ne.focus({preventScroll:!0})}else if(M&&document.activeElement===R.current){var re;(re=T.current)===null||re===void 0||re.focus({preventScroll:!0})}}break}case oe.ESC:{K&&L&&K(f);break}}};u.exports.useEffect(function(){if(i&&k){var r;(r=D.current)===null||r===void 0||r.focus({preventScroll:!0})}},[i,k]);var d=u.exports.useState(!1),G=le(d,2),Z=G[0],Y=G[1],s=u.exports.useContext(de),_;x===!1?_={distance:0}:x===!0?_={}:_=x||{};var y=(t=(l=(a=_)===null||a===void 0?void 0:a.distance)!==null&&l!==void 0?l:s==null?void 0:s.pushDistance)!==null&&t!==void 0?t:180,ee=u.exports.useMemo(function(){return{pushDistance:y,push:function(){Y(!0)},pull:function(){Y(!1)}}},[y]);u.exports.useEffect(function(){if(i){var r;s==null||(r=s.push)===null||r===void 0||r.call(s)}else{var f;s==null||(f=s.pull)===null||f===void 0||f.call(s)}},[i]),u.exports.useEffect(function(){i&&z&&(v==null||v.lock())},[i,z]),u.exports.useEffect(function(){return function(){var r;v==null||v.unLock(),s==null||(r=s.pull)===null||r===void 0||r.call(s)}},[]);var te=z&&o(se,{...H,visible:i,children:function(r,f){var I=r.className,M=r.style;return o("div",{className:E("".concat(c,"-mask"),I,A),style:b(b({},M),F),onClick:J?K:void 0,ref:f})}},"mask"),ae=typeof j=="function"?j(h):j,m={};if(Z&&y)switch(h){case"top":m.transform="translateY(".concat(y,"px)");break;case"bottom":m.transform="translateY(".concat(-y,"px)");break;case"left":m.transform="translateX(".concat(y,"px)");break;default:m.transform="translateX(".concat(-y,"px)");break}h==="left"||h==="right"?m.width=ue(P):m.height=ue(q);var g=o(se,{...ae,visible:i,forceRender:S,onVisibleChanged:function(f){N==null||N(f),f||v==null||v.unLock()},removeOnLeave:!1,leavedClassName:"".concat(c,"-content-wrapper-hidden"),children:function(r,f){var I=r.className,M=r.style;return o("div",{className:E("".concat(c,"-content-wrapper"),I),style:b(b(b({},m),M),W),children:o(we,{containerRef:f,prefixCls:c,className:X,style:U,children:V})})}},"panel"),ie=b({},O);return C&&(ie.zIndex=C),o(de.Provider,{value:ee,children:$("div",{className:E(c,"".concat(c,"-").concat(h),p,(n={},B(n,"".concat(c,"-open"),i),B(n,"".concat(c,"-inline"),w),n)),style:ie,tabIndex:-1,ref:D,onKeyDown:Q,children:[te,o("div",{tabIndex:0,ref:R,style:fe,"aria-hidden":"true","data-sentinel":"start"}),g,o("div",{tabIndex:0,ref:T,style:fe,"aria-hidden":"true","data-sentinel":"end"})]})})}var Se=function(){return document.body},me=function(t){var l=t.open,a=t.getContainer,n=t.forceRender,c=t.wrapperClassName,i=t.prefixCls,h=t.afterOpenChange,w=t.destroyOnClose,x=u.exports.useState(!1),S=le(x,2),k=S[0],L=S[1],v=function(C){L(C),h==null||h(C)};if(!n&&!k&&!l&&w)return null;var p=b(b({},t),{},{prefixCls:i,afterOpenChange:v});return a===!1?o(ve,{...p,inline:!0}):o(Ce,{visible:l,forceRender:n,getContainer:a,wrapperClassName:c,children:function(O){var C=O.scrollLocker;return o(ve,{...p,scrollLocker:C})}})};me.defaultProps={open:!1,getContainer:Se,prefixCls:"rc-drawer",placement:"right",autoFocus:!0,keyboard:!0,width:378,mask:!0,maskClosable:!0};var pe=globalThis&&globalThis.__rest||function(e,t){var l={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(l[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(l[a[n]]=e[a[n]]);return l};ye("default","large");var Oe={distance:180};function Re(e){var t=e.width,l=e.height,a=e.size,n=a===void 0?"default":a,c=e.closable,i=c===void 0?!0:c,h=e.mask,w=h===void 0?!0:h,x=e.push,S=x===void 0?Oe:x,k=e.closeIcon,L=k===void 0?o(ke,{}):k,v=e.bodyStyle,p=e.drawerStyle,O=e.className,C=e.visible,X=e.open,U=e.children,j=e.style,P=e.title,q=e.headerStyle,V=e.onClose,W=e.footer,z=e.footerStyle,J=e.prefixCls,H=e.getContainer,A=e.extra,F=e.afterVisibleChange,N=e.afterOpenChange,K=pe(e,["width","height","size","closable","mask","push","closeIcon","bodyStyle","drawerStyle","className","visible","open","children","style","title","headerStyle","onClose","footer","footerStyle","prefixCls","getContainer","extra","afterVisibleChange","afterOpenChange"]),D=u.exports.useContext(ge),R=D.getPopupContainer,T=D.getPrefixCls,Q=D.direction,d=T("drawer",J),G=H===void 0&&R?function(){return R(document.body)}:H,Z=i&&o("button",{type:"button",onClick:V,"aria-label":"Close",className:"".concat(d,"-close"),children:L});[["visible","open"],["afterVisibleChange","afterOpenChange"]].forEach(function(m){var g=le(m,2);g[0],g[1]});function Y(){return!P&&!i?null:$("div",{className:E("".concat(d,"-header"),B({},"".concat(d,"-header-close-only"),i&&!P&&!A)),style:q,children:[$("div",{className:"".concat(d,"-header-title"),children:[Z,P&&o("div",{className:"".concat(d,"-title"),children:P})]}),A&&o("div",{className:"".concat(d,"-extra"),children:A})]})}function s(){if(!W)return null;var m="".concat(d,"-footer");return o("div",{className:m,style:z,children:W})}var _=E(B({"no-mask":!w},"".concat(d,"-rtl"),Q==="rtl"),O),y=u.exports.useMemo(function(){return t!=null?t:n==="large"?736:378},[t,n]),ee=u.exports.useMemo(function(){return l!=null?l:n==="large"?736:378},[l,n]),te={motionName:ce(d,"mask-motion"),motionAppear:!0,motionEnter:!0,motionLeave:!0,motionDeadline:500},ae=function(g){return{motionName:ce(d,"panel-motion-".concat(g)),motionAppear:!0,motionEnter:!0,motionLeave:!0,motionDeadline:500}};return o(be,{status:!0,override:!0,children:o(me,{prefixCls:d,onClose:V,...K,open:X||C,mask:w,push:S,width:y,height:ee,rootClassName:_,getContainer:G,afterOpenChange:function(g){N==null||N(g),F==null||F(g)},maskMotion:te,motion:ae,rootStyle:j,children:$("div",{className:"".concat(d,"-wrapper-body"),style:xe({},p),children:[Y(),o("div",{className:"".concat(d,"-body"),style:v,children:U}),s()]})})})}export{Re as D};
