import{aj as L,a3 as z,ak as M,al as F,j as s,a as U,c as b,S as q,i as p,r as o,ae as x,am as J,an as Y,g as K,f as Q,b as Z,m as B}from"./index-XD4JDM6b.js";const ee=t=>e=>{e({type:L.SET_MESSAGE,payload:{errorList:t}})},te=()=>t=>t({type:L.CLEAR_MESSAGE}),ae="_listStep_w4ca5_1",se="_stepItem_w4ca5_9",ne="_stepContent_w4ca5_13",ce="_content_w4ca5_20",oe="_title_w4ca5_27",re="_desc_w4ca5_32",ie="_icon_w4ca5_67",le="_sticky_w4ca5_82",de="_cardHeader_w4ca5_99",_e="_collapsed_w4ca5_114",pe="_scroll_w4ca5_123",r={listStep:ae,stepItem:se,stepContent:ne,content:ce,title:oe,desc:re,icon:ie,sticky:le,cardHeader:de,collapsed:_e,scroll:pe},ue={"--animate-duration":"0.5s","--animate-delay":"0.3s"},ye=t=>{const e=z(f=>f.commonReducer.collapsed),{steps:l,currentStep:j}=M(),{updateStep:m}=F(),v=l==null?void 0:l.length;return s.jsx(U,{className:b([r.cardHeader,{[r.collapsed]:e}]),children:s.jsx("div",{className:r.listStep,style:{"--offset":v},children:l==null?void 0:l.map((f,h)=>s.jsx("div",{className:b(r.stepItem,{[r.sticky]:j==h,"animate__animated animate__fadeIn animate__faster":t.step==h}),style:ue,onClick:()=>m(h),children:s.jsxs("div",{className:b([r.stepContent]),children:[s.jsx("div",{className:r.icon,children:s.jsx(q.Avatar,{active:!0})}),s.jsxs("div",{className:r.content,children:[s.jsx("div",{className:r.title,children:f.title}),s.jsx("div",{className:r.desc,children:f.desc})]})]})},["step_progress",h,v]))})})},me=[{title:"Bước 1",desc:"Chọn loại hình doanh nghiệp",field:["category"]},{title:"Bước 2",desc:"Vốn điều lệ",field:["create_company","approve","base_val"]},{title:"Bước 3",desc:"Thành viên góp vốn",field:["create_company","approve","origin_person"]},{title:"Bước 4",desc:"Người đại diện pháp luật",field:["create_company","approve","legal_respon"]},{title:"Bước 5",desc:"Tên công ty",field:["create_company","approve","core","name"]},{title:"Bước 6",desc:"Địa chỉ đặt trụ sở",field:["create_company","approve","core","address"]},{title:"Bước 7",desc:"Ngành nghề đăng kí",field:["create_company","approve","company_main_career"]},{title:"Bước 8",desc:"Xem lại",field:["create_company","preview"]}],fe=[{title:"Bước 1",desc:"Chọn loại hình doanh nghiệp",field:["category"]},{title:"Bước 2",desc:"Nhập thông tin",field:["pending","approve"]},{title:"Bước 3",desc:"Xem lại",field:["pending","preview"]}],he=[{title:"Bước 1",desc:"Chọn loại hình doanh nghiệp",field:["category"]},{title:"Bước 2",desc:"Giải thể",field:["dissolution","approve"]},{title:"Bước 3",desc:"Xem lại",field:["dissolution","preview"]}],R=[{title:"Bước 1",desc:"Chọn loại hình doanh nghiệp",field:["category"]},{title:"Bước 2",desc:"Thông tin chung",field:["change_info","base_inform"]},{title:"Bước 3",desc:"Xem lại",field:["change_info","preview"]}],u={createOrder:"/order",updateOrder:"/order",updateAndPayment:"/order/payment",createOrderWithPayment:"/order/payment",products:"/product",checkCompany:"/service/search",categories:"/category"},g={createOrder:t=>p.post(u.createOrder,t),createOrderWithPayment:t=>p.post(u.createOrderWithPayment,t),getDataBySlug:t=>p.get(`${u.products}/${t.slug}`),getCategoryBySlug:t=>p.get(u.categories+"/"+t.slug),getProduct:t=>p.get(u.products,{params:t}),checkCompany:t=>p.post(u.checkCompany,t),updateOrder:(t,e)=>p.post(u.updateOrder+"/"+t,e),updateAndPayment:(t,e)=>p.post(u.updateAndPayment+"/"+t,e)},ge="_inline_1syia_78",ve="_box__shadow_1syia_139",Se="_mainContent_1syia_150",Ce="_formContent_1syia_157",V={"ant-table-scroll-horizontal":"_ant-table-scroll-horizontal_1syia_1","ant-table-container":"_ant-table-container_1syia_1","ant-table-content":"_ant-table-content_1syia_1","ant-layout-sider-trigger":"_ant-layout-sider-trigger_1syia_24","ant-layout-footer":"_ant-layout-footer_1syia_29","ant-form-item-control-input-content":"_ant-form-item-control-input-content_1syia_33","ant-picker":"_ant-picker_1syia_48","ant-select-selector":"_ant-select-selector_1syia_49","ant-form-item":"_ant-form-item_1syia_33","ant-row":"_ant-row_1syia_62","site-layout-background":"_site-layout-background_1syia_66","spin-suspense":"_spin-suspense_1syia_70",inline:ge,"cc-scroll":"_cc-scroll_1syia_90","cc-card":"_cc-card_1syia_114",box__shadow:ve,"ant-tabs-content-holder":"_ant-tabs-content-holder_1syia_143","ant-tabs-content":"_ant-tabs-content_1syia_143",mainContent:Se,formContent:Ce},Ee=o.lazy(()=>x(()=>import("./index-79cLWf3F.js").then(t=>t.i),__vite__mapDeps([0,1,2,3,4,5]))),Pe=o.lazy(()=>x(()=>import("./index-Hjq6JCuq.js"),__vite__mapDeps([6,1,2]))),we=o.lazy(()=>x(()=>import("./index-yMqrPzL0.js"),__vite__mapDeps([7,1,2]))),xe=o.lazy(()=>x(()=>import("./index-9s1Pnhp_.js"),__vite__mapDeps([8,1,2]))),je=()=>{const t=o.useRef(),[e,l]=o.useState(),[j,m]=o.useState(!1),{onCreateStep:v,updateStep:f}=F(),{steps:h}=M();let I=J();const k=Y(),{data:S,isFetching:G,isLoading:C,status:H}=K({cacheName:["userProduct",I],fn:()=>g.getCategoryBySlug(I),otherPath:!0}),A=Q(),{errorList:T}=z(a=>a.messageReducer);o.useEffect(()=>{k(te()),f(0)},[]),o.useEffect(()=>{if(e!=null&&e.type){let a=[];e.type===1?a=me:e.type===2?a=R:e.type===3?a=fe:e.type===4&&(a=he),v(a)}},[e]),o.useEffect(()=>{if(T.length>0){const a=document.querySelector(".card-scrollTop");a==null||a.scrollIntoView()}},[T]),o.useEffect(()=>{S&&H==="success"&&l({...S,data:S.data.sort((a,c)=>a.type-c.type)})},[S]);const E=async({_id:a,...c})=>{var d,_;try{m(!0);let n;a?n=await g.updateOrder(a,c):n=await g.createOrder(c);const{data:i}=n.data;if(n.status===200)return B.success(i.message);throw n==null?void 0:n.data}catch(n){B.error({content:((_=(d=n.response)==null?void 0:d.data)==null?void 0:_.error)||n.message||"Đã có lỗi xảy ra, vui lòng thử lại sau",duration:3})}finally{m(!1)}},P=async({_id:a,...c},d)=>{var _,n;if(d.current)try{if(!await $(d))return;if(m(!0),a)return await g.updateOrder(a,c),A(`/user/checkout/${a}`);{const y=await g.createOrder(c),{data:w}=y.data;return A(`/user/checkout/${w._id}`)}}catch(i){let y=((n=(_=i.response)==null?void 0:_.data)==null?void 0:n.error)||i.message||"Đã có lỗi xảy ra, vui lòng thử lại sau";B.error({content:y})}finally{m(!1)}},$=async a=>{var d,_;let c=!1;try{await((d=a.current)==null?void 0:d.validateFields()),c=!0}catch(n){const i=[],{errorFields:y}=n;if(y&&y.length)for(let w of h){const{field:N}=w,D=(N==null?void 0:N.join("_"))||!1;for(let O of y){const W=(_=O.name)==null?void 0:_.join("_");D&&W.includes(D)&&i.push({...O,errors:[w.title," : ",...O.errors]})}}i.length?(X(i),c=!1):c=!0}finally{return c}},X=a=>{k(ee(a))};return s.jsxs("div",{className:V.mainContent,children:[s.jsx(ye,{}),s.jsx("div",{className:V.formContent,children:s.jsxs(Z,{spinning:G||j,children:[(e==null?void 0:e.type)===1&&s.jsx(Ee,{data:e==null?void 0:e.data,paymentService:P,saveService:E,loading:C,ref:t}),(e==null?void 0:e.type)===2&&s.jsx(Pe,{loading:C,ref:t,data:e,changeInforStep:R,paymentService:P,saveService:E}),(e==null?void 0:e.type)===3&&s.jsx(we,{data:e==null?void 0:e.data,paymentService:P,saveService:E,loading:C,ref:t}),(e==null?void 0:e.type)===4&&s.jsx(xe,{data:e==null?void 0:e.data,paymentService:P,saveService:E,loading:C,ref:t})]})})]})},Oe=Object.freeze(Object.defineProperty({__proto__:null,default:je},Symbol.toStringTag,{value:"Module"}));export{g as P,te as c,Oe as i};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-79cLWf3F.js","assets/index-XD4JDM6b.js","assets/index-vhdyNjOD.css","assets/InputValidate-jV_t71oq.js","assets/index-_FO-_LC5.js","assets/index-LG51yNEu.css","assets/index-Hjq6JCuq.js","assets/index-yMqrPzL0.js","assets/index-9s1Pnhp_.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}