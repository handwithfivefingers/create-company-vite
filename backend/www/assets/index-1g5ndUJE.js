import{r as s,F as l,j as e,M as g,bS as t,I as r,h as c,n as S}from"./index-XD4JDM6b.js";import{P as b}from"./Payment-Xt6o7eCM.js";const m={},M=s.forwardRef(({onFinishScreen:x,...j},u)=>{const[p,h]=s.useState(!1),[n,f]=s.useState(null),[a]=l.useForm();s.useImperativeHandle(u,()=>({openModal:y,closeModal:d,onSetData:I}),[j]),s.useEffect(()=>{window.form=a},[]),s.useEffect(()=>{if(n){const{deliveryInformation:i,isPayment:o}=n;a.setFieldsValue({deliveryInformation:i,isPayment:o})}},[n]);const y=()=>h(!0),d=()=>h(!1),I=i=>f(i),v=i=>{const o=a.getFieldsValue();x({...o,_id:n._id})};return e.jsx(g,{open:p,onCancel:d,onOk:v,width:"75%",children:e.jsxs(l,{form:a,children:[e.jsx("div",{className:m.heading,children:e.jsx("h2",{children:"Hóa đơn"})}),e.jsxs("div",{className:m.content,children:[e.jsxs(t,{title:"Thông tin giao nhận",layout:"vertical",children:[e.jsx(t.Item,{label:"Tên người nhận",style:{padding:"0 4px 0 0"},children:e.jsx(l.Item,{name:["deliveryInformation","name"],noStyle:!0,children:e.jsx(r,{})})}),e.jsx(t.Item,{label:"Số điện thoại",style:{padding:"0 4px "},children:e.jsx(l.Item,{name:["deliveryInformation","phone"],noStyle:!0,children:e.jsx(r,{})})}),e.jsx(t.Item,{label:"Địa chỉ",style:{padding:"0 0 0 4px"},children:e.jsx(l.Item,{name:["deliveryInformation","address"],noStyle:!0,children:e.jsx(r,{})})})]}),e.jsxs(t,{title:"Thông tin thanh toán",layout:"vertical",children:[e.jsx(t.Item,{label:"Mã thanh toán",children:n==null?void 0:n.paymentCode}),e.jsx(t.Item,{label:"Cổng thanh toán",children:b[n==null?void 0:n.paymentType]||"-"}),e.jsx(t.Item,{label:"Trạng thái thanh toán",children:e.jsx(l.Item,{name:"isPayment",noStyle:!0,children:e.jsxs(c,{style:{width:"100%"},children:[e.jsx(c.Option,{value:!1,children:"Chưa thanh toán"}),e.jsx(c.Option,{value:!0,children:"Đã thanh toán"})]})})}),e.jsxs(t.Item,{label:"Số tiền",children:[S(n==null?void 0:n.price),"đ"]})]})]})]})})});export{M as default};