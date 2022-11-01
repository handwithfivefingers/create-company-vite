import{C as i}from"./index.77c6235d.js";import{S as g}from"./Common.2b42caf6.js";import{bj as x,c as L,R as O,C as A,ad as F,by as w,bm as _,bw as y}from"./index.4485a61a.js";import{a as u,u as M,j as n,d}from"./vendor.aa9f5085.js";import{C as p}from"./index.91af60bf.js";import{I as N}from"./index.03d8baa0.js";import{M as V}from"./MinusCircleOutlined.a0ff49c9.js";import"./index.2210d2fe.js";import"./index.1ead5670.js";import"./GlobalService.863d0e3e.js";import"./index.a8c6c48a.js";import"./getDataOrAriaProps.08708643.js";const k="_hide_r1cav_1",z="_visible_r1cav_10",G="_groupInput_r1cav_19",H="_newLine_r1cav_27",q="_label_r1cav_31",Y="_title_r1cav_37",s={hide:k,visible:z,groupInput:G,newLine:H,label:q,title:Y},ie=u.exports.forwardRef(({data:l,...r},e)=>{const[E,c]=u.exports.useState({}),{current:S,BASE_FORM:a}=r,[h,m]=u.exports.useState([{}]),[v,B]=u.exports.useState(!1),C=M();u.exports.useEffect(()=>{let t=[...h];(l==null?void 0:l.type)==2&&t.length<2?(t.push({}),m(t)):(l==null?void 0:l.type)===3&&t.length<3&&(t.push({},{}),m(t))},[E]),u.exports.useEffect(()=>{if(l!=null&&l.type)switch(l==null?void 0:l.type){case 2:m([{},{}]);break;case 3:m([{},{},{}]);break;default:m([{}]);break}},[l]),u.exports.useEffect(()=>{if(C.state){let t=e.current.getFieldValue([...a,"origin_person"]);t!=null&&t.length&&m(t)}},[r.current,C]);const R=u.exports.useMemo(()=>t=>{var b;let o=null,D=(b=e.current)==null?void 0:b.getFieldValue([...a,"origin_person",t,"present_person"]);return D==="personal"?o=n(j,{type:l==null?void 0:l.type,ref:e,BASE_FORM:[...a,"origin_person",t]}):D==="organization"&&(o=n($,{type:l==null?void 0:l.type,ref:e,BASE_FORM:[...a,"origin_person",t]})),o},[v]),I=()=>(m([...h,{}]),f()),f=()=>{let t=h.length-1,o=[...a,"origin_person",t,"present_person"];e.current.scrollToField(o,{behavior:"smooth"})},T=t=>{try{let o=e.current.getFieldValue([...a,"origin_person"]);o=[...o.slice(0,t),...o.slice(t+1)];let D=[...h.slice(0,t),...h.slice(t+1)];_([...a,"origin_person"],o,e),m(D)}catch(o){console.log("removeItem",o)}},P=(t,o)=>{B(!v)};return n(x.Item,{className:L([s.hide,r.className,{[s.visible]:S===2}]),children:d(O,{gutter:[16,12],children:[h.length<10&&(l==null?void 0:l.type)!==1&&n(A,{span:24,style:{position:"sticky",top:"0",zIndex:1},children:n(F,{onClick:I,icon:n(w,{}),type:"primary",children:"Th\xEAm th\xE0nh vi\xEAn g\xF3p v\u1ED1n"})}),h.map((t,o)=>n(A,{span:24,children:d(x.Item,{label:d("div",{className:s.label,children:[d("div",{className:s.title,children:["Th\xE0nh vi\xEAn g\xF3p v\u1ED1n ",(l==null?void 0:l.type)!==1&&` th\u1EE9 ${o+1}`]}),n(F,{type:"text",shape:"circle",danger:!0,icon:n(V,{onClick:()=>T(o)}),style:{display:(l==null?void 0:l.type)==2&&h.length>2||(l==null?void 0:l.type)==3&&h.length>3?"block":"none"}})]}),children:[n(U,{BASE_FORM:a,index:o,ref:e,presentSelect:P}),R(o)]})},[...a,"origin_person",o]))]})})}),j=u.exports.forwardRef((l,r)=>{const{BASE_FORM:e,type:E}=l;return d("div",{className:s.groupInput,children:[E&&E!==1&&n(x.Item,{name:[...e,"capital"],label:"S\u1ED1 ti\u1EC1n g\xF3p v\u1ED1n",placeholder:"S\u1ED1 ti\u1EC1n g\xF3p v\u1ED1n",children:n(N,{formatter:c=>`${c}`.replace(/\B(?=(\d{3})+(?!\d))/g,","),min:0,style:{width:"100%"}})}),n(i,{name:[...e,"name"],label:"H\u1ECD v\xE0 T\xEAn",placeholder:"NGUY\u1EC4N V\u0102N A",onChange:c=>_([...e,"name"],c.target.value,r,!0)}),n(i,{type:"date",name:[...e,"birth_day"],label:"Ng\xE0y sinh",placeholder:"Ch\u1ECDn ng\xE0y",inputReadOnly:!1}),n(i,{type:"select",name:[...e,"gender"],label:"Gi\u1EDBi t\xEDnh",options:g.GENDER,placeholder:"B\u1EA5m v\xE0o \u0111\xE2y"}),n(p.SelectPersonType,{ref:r,name:[...e,"per_type"],label:"D\xE2n t\u1ED9c",placeholder:"B\u1EA5m v\xE0o \u0111\xE2y"}),n(i,{type:"select",name:[...e,"doc_type"],label:"Lo\u1EA1i gi\u1EA5y t\u1EDD",options:g.DOC_TYPE}),n(i,{label:"S\u1ED1 CMND / CCCD / H\u1ED9 chi\u1EBFu",name:[...e,"doc_code"],placeholder:"0010829446357"}),n(i,{type:"date",name:[...e,"doc_time_provide"],label:"Ng\xE0y c\u1EA5p",placeholder:"Ch\u1ECDn ng\xE0y",inputReadOnly:!1}),n(p.SelectDocProvide,{ref:r,name:[...e,"doc_place_provide"],label:"N\u01A1i c\u1EA5p",placeholder:"B\u1EA5m v\xE0o \u0111\xE2y"}),n(x.Item,{label:y("<b>\u0110\u1ECBa ch\u1EC9 th\u01B0\u1EDDng tr\xFA</b>"),className:s.newLine,children:n(p.SelectProvince,{ref:r,name:[...e,"current"]})}),n(p.RadioAddress,{prevField:[...e,"current"],nextField:[...e,"contact"],ref:r,bodyStyle:s})]})}),$=u.exports.forwardRef((l,r)=>{const{BASE_FORM:e,type:E}=l;return d("div",{className:s.groupInput,children:[E&&E!==1&&n(x.Item,{name:[...e,"capital"],label:"S\u1ED1 ti\u1EC1n g\xF3p v\u1ED1n",placeholder:"S\u1ED1 ti\u1EC1n g\xF3p v\u1ED1n",required:!0,children:n(N,{formatter:c=>`${c}`.replace(/\B(?=(\d{3})+(?!\d))/g,","),min:0,style:{width:"100%"}})}),n(i,{label:"T\xEAn t\u1ED5 ch\u1EE9c",name:[...e,"organization","name"],placeholder:"C\xD4NG TY TNHH D\u1ECACH V\u1EE4 T\u01AF V\u1EA4N WARREN B",onChange:c=>_([...e,"organization","name"],c.target.value,r,!0),required:!0}),n(i,{label:"M\xE3 s\u1ED1 DN ho\u1EB7c M\xE3 s\u1ED1 thu\u1EBF",name:[...e,"organization","mst"],placeholder:"0316184427",required:!0}),n(i,{type:"date",name:[...e,"organization","doc_time_provide"],label:y("Ng\xE0y c\u1EA5p <i>(ng\xE0y \u0111\u0103ng k\xFD l\u1EA7n \u0111\u1EA7u)</i>"),placeholder:"Ch\u1ECDn ng\xE0y",inputReadOnly:!1,required:!0}),n(x.Item,{label:y("<b>\u0110\u1ECBa ch\u1EC9 tr\u1EE5 s\u1EDF ch\xEDnh</b>"),className:s.newLine,required:!0,children:n(p.SelectProvince,{ref:r,name:[...e,"organization","doc_place_provide"]})}),n(i,{name:[...e,"name"],label:n("div",{dangerouslySetInnerHTML:{__html:"</>H\u1ECD v\xE0 T\xEAn \u0111\u1EA1i di\u1EC7n ph\xE1p lu\u1EADt <i>(\u0110DPL)</i></>"}}),placeholder:"NGUY\u1EC4N V\u0102N A",onChange:c=>_([...e,"name"],c.target.value,r,!0)}),n(p.SelectTitle,{ref:r,name:[...e,"title"],label:y("Ch\u1EE9c danh <i>(\u0110DPL)</i>"),placeholder:"B\u1EA5m v\xE0o \u0111\xE2y",options:g.TITLE_2}),n(i,{type:"date",name:[...e,"birth_day"],label:"Ng\xE0y sinh",placeholder:"Ch\u1ECDn ng\xE0y",inputReadOnly:!1}),n(i,{type:"select",name:[...e,"gender"],label:"Gi\u1EDBi t\xEDnh",options:g.GENDER,placeholder:"B\u1EA5m v\xE0o \u0111\xE2y"}),n(p.SelectPersonType,{ref:r,name:[...e,"per_type"],label:"D\xE2n t\u1ED9c",placeholder:"B\u1EA5m v\xE0o \u0111\xE2y"}),n(i,{type:"select",name:[...e,"doc_type"],label:"Lo\u1EA1i gi\u1EA5y t\u1EDD",options:g.DOC_TYPE}),n(i,{label:"S\u1ED1 CMND / CCCD / H\u1ED9 chi\u1EBFu",name:[...e,"doc_code"],placeholder:"0316184427"}),n(i,{type:"date",name:[...e,"doc_time_provide"],label:"Ng\xE0y c\u1EA5p",placeholder:"Ch\u1ECDn ng\xE0y",inputReadOnly:!1}),n(p.SelectDocProvide,{ref:r,name:[...e,"doc_place_provide"],label:"N\u01A1i c\u1EA5p",placeholder:"B\u1EA5m v\xE0o \u0111\xE2y"}),n(x.Item,{className:s.newLine,label:y("<b>\u0110\u1ECBa ch\u1EC9 th\u01B0\u1EDDng tr\xFA <i>(\u0110DPL)</i></b>"),children:n(p.SelectProvince,{ref:r,name:[...e,"current"]})}),n(p.RadioAddress,{prevField:[...e,"current"],nextField:[...e,"contact"],ref:r,bodyStyle:s})]})}),U=u.exports.forwardRef((l,r)=>{const{BASE_FORM:e,index:E}=l;return n(i,{display:"none",type:"select",name:[...e,"origin_person",E,"present_person"],onChange:l.presentSelect,placeholder:"B\u1EA5m v\xE0o \u0111\xE2y",options:[{value:"personal",name:"Th\xE0nh vi\xEAn g\xF3p v\u1ED1n l\xE0 c\xE1 nh\xE2n"},{value:"organization",name:"Th\xE0nh vi\xEAn g\xF3p v\u1ED1n l\xE0 t\u1ED5 ch\u1EE9c"}]})});export{ie as default};
