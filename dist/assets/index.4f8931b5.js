import{bs as g,h as E,bj as P,R as T,c as z,C as w,aY as j,a3 as L,bm as f,b as B,ad as C}from"./index.4485a61a.js";import{a,j as e,u as V,F as O,d as D}from"./vendor.aa9f5085.js";import{S as I}from"./index.2210d2fe.js";const $="_hide_ajnik_1",G="_visible_ajnik_10",q="_groupInput_ajnik_24",K="_titleSubForm_ajnik_31",Q="_label_ajnik_37",H="_title_ajnik_31",M={hide:$,visible:G,groupInput:q,titleSubForm:K,label:Q,title:H},J={required:"${label} l\xE0 b\u1EAFt bu\u1ED9c!",types:{email:"${label} \u0111\u1ECBnh d\u1EA1ng kh\xF4ng \u0111\xFAng!",number:"${label} is not a valid number!"},number:{range:"${label} must be between ${min} and ${max}"}},U=a.exports.lazy(()=>g(()=>import("./index.131be8dc.js"),["assets/index.131be8dc.js","assets/index.4485a61a.js","assets/index.60db42a3.css","assets/vendor.aa9f5085.js","assets/index.77c6235d.js","assets/index.9637fa1f.css","assets/index.03d8baa0.js","assets/index.2210d2fe.js","assets/index.1ead5670.js","assets/index.91af60bf.js","assets/index.f88775de.css","assets/GlobalService.863d0e3e.js","assets/index.a8c6c48a.js","assets/getDataOrAriaProps.08708643.js"]).then(({default:n})=>({default:a.exports.forwardRef((t,s)=>e(n,{ref:s,...t}))}))),W=a.exports.lazy(()=>g(()=>import("./index.c2e0043c.js"),["assets/index.c2e0043c.js","assets/index.68e7b78e.css","assets/index.4485a61a.js","assets/index.60db42a3.css","assets/vendor.aa9f5085.js","assets/index.77c6235d.js","assets/index.9637fa1f.css","assets/index.03d8baa0.js","assets/index.2210d2fe.js","assets/index.1ead5670.js","assets/Common.2b42caf6.js"]).then(({default:n})=>({default:a.exports.forwardRef((t,s)=>e(n,{ref:s,...t}))}))),X=a.exports.lazy(()=>g(()=>import("./index.1e9fa97a.js"),["assets/index.1e9fa97a.js","assets/index.4485a61a.js","assets/index.60db42a3.css","assets/vendor.aa9f5085.js","assets/GlobalService.863d0e3e.js","assets/index.2210d2fe.js"]).then(({default:n})=>({default:a.exports.forwardRef((t,s)=>e(n,{ref:s,...t}))}))),Z=a.exports.lazy(()=>g(()=>import("./index.14f04795.js"),["assets/index.14f04795.js","assets/index.77c6235d.js","assets/index.9637fa1f.css","assets/vendor.aa9f5085.js","assets/index.4485a61a.js","assets/index.60db42a3.css","assets/index.03d8baa0.js","assets/index.2210d2fe.js","assets/index.1ead5670.js","assets/Common.2b42caf6.js","assets/index.91af60bf.js","assets/index.f88775de.css","assets/GlobalService.863d0e3e.js","assets/index.a8c6c48a.js","assets/getDataOrAriaProps.08708643.js","assets/MinusCircleOutlined.a0ff49c9.js"]).then(({default:n})=>({default:a.exports.forwardRef((t,s)=>e(n,{ref:s,...t}))}))),ee=a.exports.lazy(()=>g(()=>import("./index.5799d3a3.js"),["assets/index.5799d3a3.js","assets/index.77c6235d.js","assets/index.9637fa1f.css","assets/vendor.aa9f5085.js","assets/index.4485a61a.js","assets/index.60db42a3.css","assets/index.03d8baa0.js","assets/index.2210d2fe.js","assets/index.1ead5670.js","assets/index.510bf42e.js","assets/index.c1c8e8e3.css","assets/index.a9fbd54a.js","assets/Pagination.57e5b150.js","assets/Collapse.037fa203.js","assets/getDataOrAriaProps.08708643.js"]).then(({default:n})=>({default:a.exports.forwardRef((t,s)=>e(n,{ref:s,...t}))}))),te=a.exports.lazy(async()=>g(()=>import("./index.4fddfc57.js"),["assets/index.4fddfc57.js","assets/index.f3bd6bb3.css","assets/index.77c6235d.js","assets/index.9637fa1f.css","assets/vendor.aa9f5085.js","assets/index.4485a61a.js","assets/index.60db42a3.css","assets/index.03d8baa0.js","assets/index.2210d2fe.js","assets/index.1ead5670.js","assets/Common.2b42caf6.js","assets/index.91af60bf.js","assets/index.f88775de.css","assets/GlobalService.863d0e3e.js","assets/index.a8c6c48a.js","assets/getDataOrAriaProps.08708643.js","assets/MinusCircleOutlined.a0ff49c9.js"]).then(({default:n})=>({default:a.exports.forwardRef((t,s)=>e(n,{ref:s,...t}))}))),k=["create_company","approve"],R="animate__animated animate__fadeIn animate__faster",ae=a.exports.forwardRef((n,t)=>{const[s,S]=a.exports.useState();let _=V();a.exports.useEffect(()=>{_!=null&&_.state&&v()},[_]);const v=()=>{var u,d;let{state:p}=_,i={},{category:r,data:o}=p;if(!!r){if(i.category={type:r.type,value:r._id,name:r.name},o){let l=(u=o==null?void 0:o.create_company)==null?void 0:u.approve;if(l){let{origin_person:c,legal_respon:h}=l;c&&(c=c.map(({birth_day:y,doc_time_provide:A,organization:x,...N})=>{let F={...N,birth_day:E(y,"YYYY-MM-DD"),doc_time_provide:E(A,"YYYY-MM-DD")};return x&&(F.organization={...x,doc_time_provide:E(x.doc_time_provide,"YYYY-MM-DD")}),F})),h&&(h=h.map(({birth_day:y,doc_time_provide:A,...x})=>({...x,birth_day:E(y,"YYYY-MM-DD"),doc_time_provide:E(A,"YYYY-MM-DD")}))),l={...l,origin_person:c,legal_respon:h}}i.create_company={approve:l}}console.log(i),(d=t.current)==null||d.setFieldsValue({...i})}},m=(p,i,r)=>{let{type:o,name:u,value:d}=i;f([r],{type:o,name:u,value:d},t);let l=[...k,"origin_person"],c=[...k,"legal_respon"];f([r],{type:o,name:u,value:d},t),f([l],void 0,t),f([c],void 0,t),S({type:o,name:u,value:d})},b=p=>{var i;return e(I,{placeholder:"B\u1EA5m v\xE0o \u0111\xE2y",onChange:(r,o)=>m(r,o,p),children:(i=n.data)==null?void 0:i.map(r=>e(I.Option,{value:r._id,...r,children:r.name},r._id))})},Y=p=>{let i=null;const r=[W,te,Z,ee,U,X],o={BASE_FORM:k,current:n.step,ref:t,className:R,data:p};return i=r.map((u,d)=>e(T,{children:e(w,{span:24,children:e(u,{...o})})},[o,d])),i};return e(O,{children:D(P,{layout:"vertical",ref:t,autoComplete:"off",validateMessages:J,children:[e(T,{className:z([M.hide,{[M.visible]:n.step===0}]),children:e(w,{span:24,children:e(P.Item,{name:["category"],label:"Ch\u1ECDn lo\u1EA1i h\xECnh doanh nghi\u1EC7p",placeholder:"B\u1EA5m v\xE0o \u0111\xE2y",className:R,required:!0,rules:[{required:!0}],children:b(["category"])})})}),e(a.exports.Suspense,{fallback:e("div",{className:"container spin-suspense",children:e(j,{align:"center",children:e(L,{spinning:!0,tip:"Loading..."})})}),children:Y(s)})]})})}),re=a.exports.lazy(()=>g(()=>import("./index.22d0265f.js"),["assets/index.22d0265f.js","assets/index.6b59f360.css","assets/index.4485a61a.js","assets/index.60db42a3.css","assets/vendor.aa9f5085.js"])),ne=a.exports.forwardRef((n,t)=>{const{setStep:s,saveService:S,paymentService:_,data:v,step:m,loading:b,onFinishScreen:Y,Prev:p,Next:i}=n,r=V(),o=a.exports.useCallback(l=>{var y;const h={data:{...l.current.getFieldsValue()}};return(y=r.state)!=null&&y._id&&(h._id=r.state._id),h},[v]),u=a.exports.useCallback(l=>{const c=o(l);return S(c)},[v]),d=a.exports.useCallback(l=>{const c=o(l);return _(c,l)},[v]);return e(B,{className:"card-boxShadow",children:D(a.exports.Suspense,{fallback:e("div",{className:"container spin-suspense",children:e(j,{align:"center",children:e(L,{spinning:!0,tip:"Loading..."})})},"create_company_page_suspense"),children:[e(ae,{data:v,ref:t,onFinishScreen:Y,step:m,setStep:s}),m===7&&e(re,{ref:t},["preview","create_company"]),D("div",{className:"card-boxShadow flex flex__spacing-4",style:{position:"sticky",bottom:0},children:[m>0&&D(O,{children:[e(C,{onClick:p,type:"dashed",children:"Quay l\u1EA1i"}),e(C,{loading:b,onClick:()=>u(t),children:"L\u01B0u l\u1EA1i"})]}),m<7&&e(C,{onClick:i,type:"primary",children:"Ti\u1EBFp t\u1EE5c"}),m===7&&e(C,{loading:b,onClick:()=>d(t),type:"primary",children:"Thanh to\xE1n"})]})]})})}),le=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"}));export{le as i,M as s};
