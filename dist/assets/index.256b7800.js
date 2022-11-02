import{C as g}from"./index.f5da86e5.js";import{S as C}from"./Common.2b42caf6.js";import{bj as D,c as B,R as I,C as T,ac as P,bz as R,bm as S,bx as L}from"./index.bd197d1a.js";import{a as p,j as t,d as _,F as O}from"./vendor.aa9f5085.js";import{C as b}from"./index.c5f88f51.js";import{s as F}from"./index.a2024bc0.js";import{S as N}from"./index.e14e48dc.js";import{M as f}from"./MinusCircleOutlined.a925faf6.js";import"./index.5448d220.js";import"./index.9dabc2c1.js";import"./GlobalService.8b4e5eef.js";import"./isEqual.31b5dcfb.js";import"./index.e2e19752.js";import"./getDataOrAriaProps.08708643.js";const Z=p.exports.forwardRef(({data:u,...n},e)=>{const{current:y,BASE_FORM:r}=n,[l,c]=p.exports.useState([]),[x,d]=p.exports.useState([null,null,null]);p.exports.useState(!1);const h={name:"",title:"",gender:"",birth_day:"",per_type:"",current:"",contact:"",doc_type:"",doc_code:"",doc_time_provide:"",doc_place_provide:""};p.exports.useEffect(()=>{m()},[]);const m=()=>(c([...l,h]),s()),s=()=>{let a=l.length,o=[...r,"legal_respon",a-1,"name"];e.current.scrollToField(o,{behavior:"smooth"})};return t(D.Item,{label:t("h3",{children:"Ng\u01B0\u1EDDi \u0111\u1EA1i di\u1EC7n ph\xE1p lu\u1EADt "}),className:B([F.hide,n.className,{[F.visible]:y===3}]),children:_(I,{gutter:[16,12],children:[t(T,{span:24,children:l.length<3&&t(P,{onClick:m,icon:t(R,{}),type:"primary",children:"Th\xEAm ng\u01B0\u1EDDi \u0111\u1EA1i di\u1EC7n"})}),l.map((a,o)=>t(T,{lg:8,md:12,sm:24,children:t(M,{index:o,ref:e,BASE_FORM:r,handleForm:{state:l,setState:c},presentState:{state:x,setState:d},type:u==null?void 0:u.type})},[a,o]))]})})}),M=p.exports.forwardRef((u,n)=>{var m;const{index:e,handleForm:y,BASE_FORM:r,presentState:l}=u,{state:c,setState:x}=l,d=()=>{var i;let s=[...r,"origin_person"],a=(i=n==null?void 0:n.current)==null?void 0:i.getFieldValue(s),o=(a==null?void 0:a.map((E,v)=>({name:(E==null?void 0:E.name)||"...",value:v})))||[{value:null,name:"None"}];return o.push({value:-1,name:"Kh\xE1c"}),o},h=(s,a)=>{var A;let o=[...c];o[a]=s,x(o);let i=[...r,"origin_person",s],E=[...r,"legal_respon",a],v=(A=n==null?void 0:n.current)==null?void 0:A.getFieldValue(i);v&&S(E,v,n)};return p.exports.useEffect(()=>{let s=n.current.getFieldValue([...r,"legal_respon",e,"name"]),a=d(),o=a.findIndex(i=>i.name===s);o!==-1&&S([...r,"legal_respon",e,"select_person"],a[o].value,n)},[]),_(O,{children:[t(D.Item,{name:[...r,"legal_respon",e,"select_person"],label:L("<b>Ch\u1ECDn ng\u01B0\u1EDDi \u0111\u1EA1i di\u1EC7n</b>"),children:d()&&t(N,{onChange:s=>h(s,e),placeholder:"B\u1EA5m v\xE0o \u0111\xE2y",autoComplete:"off",value:c[e],children:(m=d())==null?void 0:m.map((s,a)=>t(N.Option,{value:s.value,children:s.name},s.key?s.key:[name,a,s.value]))})}),t(k,{ref:n,listFormState:y,presentState:l,BASE_FORM:r,i:e,type:u==null?void 0:u.type})]})}),k=p.exports.forwardRef((u,n)=>{const{i:e,presentState:y,listFormState:r,BASE_FORM:l,type:c}=u,{state:x,setState:d}=r,{state:h,setState:m}=y,s=a=>{let o=n.current.getFieldValue([...l,"legal_respon"]);o=[...o.slice(0,a),...o.slice(a+1)];let i=[...h];i[a]=null,i=[...i.filter(E=>E!==null),null],m(i),S([...l,"legal_respon"],o,n),d(o)};return _(D.Item,{label:_("div",{className:F.label,children:[_("div",{className:F.title,children:["Th\xF4ng tin ng\u01B0\u1EDDi \u0111\u1EA1i di\u1EC7n th\u1EE9 ",e+1]}),t(P,{type:"text",shape:"circle",danger:!0,icon:t(f,{onClick:()=>s(e)}),style:{display:x.length>1?"block":"none"}})]}),children:[t(g,{name:[...l,"legal_respon",e,"name"],label:"H\u1ECD v\xE0 t\xEAn",onChange:a=>S([...l,"legal_respon",e,"name"],a.target.value,n,!0)}),t(b.SelectTitle,{name:[...l,"legal_respon",e,"title"],label:"Ch\u1EE9c danh",placeholder:"B\u1EA5m v\xE0o \u0111\xE2y",options:+c==1?C.TITLE_1TV:+c==2?C.TITLE_2TV:+c==3?C.TITLE_CP:"",ref:n}),_("div",{style:{display:+h[e]!=-1?"none":"block"},children:[t(g,{type:"select",name:[...l,"legal_respon",e,"gender"],label:"Gi\u1EDBi t\xEDnh",options:C.GENDER,placeholder:"B\u1EA5m v\xE0o \u0111\xE2y"}),t(g,{type:"date",name:[...l,"legal_respon",e,"birth_day"],label:"Ng\xE0y sinh",placeholder:"15/01/1966 - ENTER",inputReadOnly:!1}),t(b.SelectPersonType,{name:[...l,"legal_respon",e,"per_type"],label:"D\xE2n t\u1ED9c",ref:n}),t(g,{type:"select",name:[...l,"legal_respon",e,"doc_type"],label:"Lo\u1EA1i gi\u1EA5y t\u1EDD",options:C.DOC_TYPE,placeholder:"B\u1EA5m v\xE0o \u0111\xE2y"}),t(g,{name:[...l,"legal_respon",e,"doc_code"],label:"S\u1ED1 CMND / CCCD / H\u1ED9 chi\u1EBFu",placeholder:"0316184427"}),t(g,{type:"date",name:[...l,"legal_respon",e,"doc_time_provide"],label:"Ng\xE0y c\u1EA5p",placeholder:"15/01/1966 - ENTER",inputReadOnly:!1}),t(b.SelectDocProvide,{name:[...l,"legal_respon",e,"doc_place_provide"],label:"N\u01A1i c\u1EA5p",ref:n}),t(D.Item,{label:t("div",{dangerouslySetInnerHTML:{__html:"</><b>\u0110\u1ECBa ch\u1EC9 th\u01B0\u1EDDng tr\xFA</b></>"}}),children:t(b.SelectProvince,{ref:n,name:[...l,"legal_respon",e,"current"]})}),t(b.RadioAddress,{ref:n,prevField:[...l,"legal_respon",e,"current"],nextField:[...l,"legal_respon",e,"contact"],label:"<b>N\u01A1i \u1EDF hi\u1EC7n t\u1EA1i</b>"})]})]})});export{Z as default};
