(this["webpackJsonpwindmill-dashboard-react"]=this["webpackJsonpwindmill-dashboard-react"]||[]).push([[16,17],{215:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),s=a(42),c=a.n(s),i=a(13),o=a(35),d=a.n(o),r=a(34),m=a(8),u=a.n(m),p=a(36);const b={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",width:"40%",height:"60%",transform:"translate(-50%, -50%)",backgroundColor:"#0f4d4a",borderRadius:"1%",padding:"2%"}},f=e=>{let{isShowing:t,hide:a,type:n,clearfields:s,props:o,inputBalance:r,onInputchange:m,setinputBalance:p,unbond:f,isUnbondButtonEnabled:h,isUnbonding:E}=e;return t?u.a.createPortal(l.a.createElement(l.a.Fragment,null,l.a.createElement(c.a,{isOpen:t,onRequestClose:a,contentLabel:"Example Modal",style:b,ariaHideApp:!1},l.a.createElement("div",{className:"flex flex-col h-full justify-between"},l.a.createElement("div",null,l.a.createElement("div",{className:"flex flex-row justify-between items-center"},l.a.createElement("div",{className:""},l.a.createElement("span",{className:"deposit-modal-heading"},"Unbond")),l.a.createElement("div",{className:"btn-close white"},l.a.createElement("button",{type:"Button",className:"btn-close white","aria-label":"Close",onClick:s})))),l.a.createElement("div",{className:"flex flex-row justify-between items-center   text-white font-light"},l.a.createElement("span",{className:"text-white font-light"},"This will remove your SCRT tokens from the rewards contract. You will have to withdraw your SCRT to see it in your wallet")),l.a.createElement("div",{className:"flex flex-row items-center   text-white p-4 border mt-4"},l.a.createElement("div",{className:"flex flex-col d mr-4"},l.a.createElement("span",{className:"deposit-modal-heading"},"\u26a0")),l.a.createElement("div",{className:""},l.a.createElement("div",{className:"ul"},"Once the unbonding period begins you will:",l.a.createElement("div",{className:"li"},"- not be able to cancel the unbonding"),l.a.createElement("div",{className:"li"},"- need to wait 21 days for the amount to be liquid")))),l.a.createElement("div",{className:"flex flex-row  justify-between items-center mt-4"},l.a.createElement("div",{className:""},l.a.createElement("span",{className:"deposit-modal-available text-m"},"Available")),l.a.createElement("div",{className:"flex flex-row "},l.a.createElement("div",{className:"d-flex align-items-center m-1"},l.a.createElement("img",{src:d.a,alt:"LOGO Image",className:"img-fluid mini-logo-size"})),l.a.createElement("div",{className:"ps-1 pool_past_prizes m-1"},o.delegated/1e6," SCRT"))),l.a.createElement("div",{className:"flex flex-row  justify-between items-center  p-2 mt-2 deposit-modal-deposit-field deposit-modal-deposit-field-shape "},l.a.createElement("div",null,l.a.createElement("input",{className:"deposit-modal-deposit-field text-white w-full",type:"number",min:"0",placeholder:"0.00","placeholder-default":"white",name:"inputBalance",value:r,onChange:m})),l.a.createElement("div",{className:"deposit-modal-deposit-field-tokens"},"SCRT")),l.a.createElement("div",{className:"flex flex-row mt-4 items-center justify-between text-white "},l.a.createElement("div",{className:"deposit-modal-amount-percentage px-5 ",onClick:()=>{p((o.delegated/1e6*.25).toFixed(2))}},l.a.createElement("button",null,"25%")),l.a.createElement("div",{className:"deposit-modal-amount-percentage  px-5",onClick:()=>{p((o.delegated/1e6*.5).toFixed(2))}},l.a.createElement("button",null,"50%")),l.a.createElement("div",{className:"deposit-modal-amount-percentage px-5 ",onClick:()=>{p((o.delegated/1e6*.75).toFixed(2))}},l.a.createElement("button",null,"75%")),l.a.createElement("div",{className:"deposit-modal-amount-percentage  px-5",onClick:()=>{p((o.delegated/1e6).toFixed(6))}},l.a.createElement("button",null,"100%"))),l.a.createElement("div",{className:"btn    "},l.a.createElement(i.Button,{className:"btn account_deposit_button text-white self-center",onClick:()=>f(n),disabled:!h},E?l.a.createElement("div",{className:"loader-1 center"},l.a.createElement("span",null,".")):l.a.createElement("div",null,"Unbond")))))),document.body):null};t.default=function(e){let[t,a]=Object(n.useState)(0),[s,c]=Object(n.useState)(!1),[i,o]=Object(n.useState)(!1),[d,m]=Object(n.useState)({secretjs:null,address:null});async function u(){e.hide(),await e.callback(),a(0),o(!1)}return Object(n.useEffect)(()=>{null!=d.secretjs&&null!=d.address||async function(){const{secretjs:e,address:t}=await Object(r.a)();m({secretjs:e,address:t})}(),c(0!=t),1e6*t>e.delegated&&c(!1)},[d,t,e.delegated]),l.a.createElement(f,{isShowing:e.isShowing,hide:e.hide,type:e.type,clearfields:u,props:e,onInputchange:async function(e){a(e.target.value)},setinputBalance:a,inputBalance:t,unbond:async function(e){o(!0);const{secretjs:a,address:n}=d;let l=String(parseInt(1e6*t));try{let s;"user"===e&&(s={request_withdraw:{amount:l}}),"sponsor"===e&&(s={sponsor_request_withdraw:{amount:l}});const c=await a.tx.compute.executeContract({sender:n,contractAddress:"secret1j6ly79zfvh83g8te9utystt8hc6vm84u23gnmn",codeHash:"0d21c959e0f195e792e391b7b1729f6c6af70912ce76572faaa3db1f10412dfc",msg:s},{gasLimit:240297});Object(p.a)("success","Transaction sent!",`Successfully Unbonded: ${t} SCRT \n \n        Txhash: ${c.transactionHash}`)}catch(s){Object(p.a)("error","ERROR",s)}await u()},isUnbondButtonEnabled:s,isUnbonding:i})}}}]);
//# sourceMappingURL=16.f87d6c04.chunk.js.map