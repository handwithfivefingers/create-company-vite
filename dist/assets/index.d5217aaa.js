import{m as c,p as o,l as h,k as m,j as e,c as x,F as d}from"./vendor.e5394fe2.js";import{bv as p,ad as u}from"./index.eab64f24.js";function C(){let[a]=c();const{animateClass:n}=o();let l=h(),s=a.get("text"),i=a.get("orderId"),r=a.get("code"),t=m();return s||t(l!=="POP"?-1:"/user"),e(p,{className:n,status:r!=="00"?"error":"success",title:x(d,{children:["M\xE3 \u0111\u01A1n h\xE0ng: ",e("b",{children:i})]}),subTitle:e("p",{children:r!=="00"?s:"\u0111\xE3 \u0111\u01B0\u1EE3c thanh to\xE1n th\xE0nh c\xF4ng, vui l\xF2ng ki\u1EC3m tra email sau 1 - 5 ph\xFAt."}),extra:[e(u,{type:"primary",onClick:()=>t("/user/order"),children:"Ki\u1EC3m tra \u0111\u01A1n h\xE0ng"}),e(u,{onClick:()=>t("/user/san-pham"),children:"V\u1EC1 trang s\u1EA3n ph\u1EA9m"})]})}export{C as default};
