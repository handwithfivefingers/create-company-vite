import{r as u,F as j,j as t,B as Y,bU as P,bR as S,bT as q,ak as B,bp as M,o as T,c as k,R as L,C as E,bY as O,h as D}from"./index-XD4JDM6b.js";import{s as I}from"./index-79cLWf3F.js";import{C as V,a as w,b as A,c as G,d as W}from"./index-7vcF2zEs.js";import{C as f}from"./index-gQ4A6Ldr.js";import{S as F}from"./Common-NVt6K1ML.js";import{M as H}from"./MinusCircleOutlined-OyZX2Wh6.js";import"./InputValidate-jV_t71oq.js";import"./index-_FO-_LC5.js";import"./index-52Xb7zQV.js";const K=u.forwardRef((c,l)=>{const{i:n,presentState:h,listFormState:d,BASE_FORM:o}=c,{state:p,setState:y}=d,{state:x,setState:b}=h,[m,v]=u.useState(null),C=j.useFormInstance(),s=j.useWatch([...o,"legal_respon",n,"doc_type"],C),a=r=>{let i=l.current.getFieldValue([...o,"legal_respon"]);i=[...i.slice(0,r),...i.slice(r+1)];let e=[...x];e[r]=null,e=[...e.filter(_=>_!==null),null],b(e),S([...o,"legal_respon"],i,l),y(i)};return u.useEffect(()=>{var i,e;let r=(i=l.current)==null?void 0:i.getFieldsValue();v((e=r==null?void 0:r.category)==null?void 0:e.type)},[c]),t.jsxs(j.Item,{label:t.jsxs("div",{className:I.label,children:[t.jsxs("div",{className:I.title,children:["Thông tin người đại diện thứ ",n+1]}),t.jsx(Y,{type:"text",shape:"circle",danger:!0,icon:t.jsx(H,{onClick:()=>a(n)}),style:{display:p.length>1?"block":"none"}})]}),children:[t.jsx(P,{name:[...o,"legal_respon",n,"name"],label:"Họ và tên",onChange:r=>S([...o,"legal_respon",n,"name"],r.target.value,l,!0),required:!0}),t.jsx(f.SelectTitle,{name:[...o,"legal_respon",n,"title"],label:"Chức danh",placeholder:"Bấm vào đây",options:+m==1?F.TITLE_1TV:+m==2?F.TITLE_2TV:+m==3?F.TITLE_CP:"",required:!0}),t.jsxs("div",{style:{display:+x[n]!=-1?"none":"block"},children:[t.jsx(P,{type:"select",name:[...o,"legal_respon",n,"gender"],label:"Giới tính",options:F.GENDER,placeholder:"Bấm vào đây",required:!0}),t.jsx(V,{name:[...o,"legal_respon",n,"birth_day"],required:!0,inputReadOnly:!1}),t.jsx(f.SelectPersonType,{name:[...o,"legal_respon",n,"per_type"],label:"Dân tộc",required:!0}),t.jsx(w,{name:[...o,"legal_respon",n,"doc_type"],required:!0}),t.jsx(A,{indentifyType:s,name:[...o,"legal_respon",n,"doc_code"],required:!0}),t.jsx(G,{name:[...o,"legal_respon",n,"doc_time_provide"],required:!0,inputReadOnly:!1,indentifyType:s}),t.jsx(W,{name:[...o,"legal_respon",n,"doc_place_provide"],required:!0,indentifyType:s}),t.jsx(j.Item,{label:q("<b>Địa chỉ thường trú</b>"),children:t.jsx(f.SelectProvince,{name:[...o,"legal_respon",n,"current"],required:!0})}),t.jsx(f.RadioAddress,{prevField:[...o,"legal_respon",n,"current"],nextField:[...o,"legal_respon",n,"contact"],label:"<b>Nơi ở hiện tại</b>",required:!0})]})]})}),N={name:"",title:"",gender:"",birth_day:"",per_type:"",current:"",contact:"",doc_type:"",doc_code:"",doc_time_provide:"",doc_place_provide:""},se=u.forwardRef(({data:c,...l},n)=>{const{BASE_FORM:h}=l,{currentStep:d}=B(),o=j.useFormInstance(),[p,y]=u.useState([{...N}]),[x,b]=u.useState([null,null,null]);u.useState(!1);const m=M();u.useEffect(()=>{window.form=o},[]),u.useEffect(()=>{m.state&&setTimeout(()=>{var r,i;const{data:s}=m.state,a=(i=(r=s.create_company)==null?void 0:r.approve)==null?void 0:i.legal_respon;y(a),a.length&&a.map((e,_)=>{o.setFields([{name:[...h,"legal_respon",_],value:{...e,doc_time_provide:e!=null&&e.doc_time_provide?T(e==null?void 0:e.doc_time_provide,"YYYY-MM-DD"):null,birth_day:e!=null&&e.birth_day?T(e==null?void 0:e.birth_day,"YYYY-MM-DD"):null,doc_outdate:e!=null&&e.doc_outdate?T(e==null?void 0:e.doc_outdate,"YYYY-MM-DD"):null}}])})},d*1e3)},[m]);const v=()=>(y([...p,N]),C()),C=()=>{var r;let s=p.length,a=[...h,"legal_respon",s-1,"name"];(r=n.current)==null||r.scrollToField(a,{behavior:"smooth"})};return t.jsx(j.Item,{label:t.jsx("h3",{children:"Người đại diện pháp luật "}),className:k([I.hide,l.className,{[I.visible]:d===3}]),children:t.jsxs(L,{gutter:[16,12],children:[t.jsx(E,{span:24,children:p.length<3&&t.jsx(Y,{onClick:v,icon:t.jsx(O,{}),type:"primary",children:"Thêm người đại diện"})}),p.map((s,a)=>t.jsx(E,{lg:8,md:12,sm:24,children:t.jsx(U,{index:a,ref:n,BASE_FORM:h,handleForm:{state:p,setState:y},presentState:{state:x,setState:b},type:c==null?void 0:c.type})},[s,a]))]})})});let R=!1;const U=u.forwardRef((c,l)=>{var C;const{index:n,handleForm:h,BASE_FORM:d,presentState:o}=c,{state:p,setState:y}=o,x=M(),b=()=>{var i;let s=[...d,"origin_person"],a=(i=l==null?void 0:l.current)==null?void 0:i.getFieldValue(s),r=(a==null?void 0:a.map((e,_)=>({name:(e==null?void 0:e.name)||"...",value:_})))||[{value:null,name:"None"}];return r.push({value:-1,name:"Khác"}),r},m=(s,a)=>{var g;let r=[...p];r[a]=`${s}`,y(r);let i=[...d,"origin_person",s],e=[...d,"legal_respon",a],_=(g=l==null?void 0:l.current)==null?void 0:g.getFieldValue(i);_&&S(e,_,l),S([...e,"select_person"],s,l)};u.useEffect(()=>{x.state?setTimeout(()=>{v()},2e3):R||(v(),R=!0)},[x]);const v=()=>{var i;let s=(i=l.current)==null?void 0:i.getFieldValue([...d,"legal_respon",n,"name"]),a=b(),r=a.findIndex(e=>e.name===s);r!==-1&&S([...d,"legal_respon",n,"select_person"],a[r].value,l)};return t.jsxs(t.Fragment,{children:[t.jsx(j.Item,{name:[...d,"legal_respon",n,"select_person"],label:q("<b>Chọn người đại diện</b>"),rules:[{required:!0,message:"Chọn người đại diện là bắt buộc"}],children:b()&&t.jsx(D,{onSelect:s=>m(s,n),placeholder:"Bấm vào đây",autoComplete:"off",children:(C=b())==null?void 0:C.map((s,a)=>t.jsx(D.Option,{value:s.value,children:s.name},s.key?s.key:[name,a,s.value]))})}),t.jsx(K,{...c,ref:l,listFormState:h,presentState:o,BASE_FORM:d,i:n,type:c==null?void 0:c.type})]})});export{se as default};