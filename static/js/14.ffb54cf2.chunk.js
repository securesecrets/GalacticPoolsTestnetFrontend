(this["webpackJsonpwindmill-dashboard-react"]=this["webpackJsonpwindmill-dashboard-react"]||[]).push([[14],{222:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),l=a(42),c=a.n(l),i=a(13),o=a(35),r=a.n(o),d=a(34),m=a(8),u=a.n(m),p=a(36);const b={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",width:"35%",height:"35%",transform:"translate(-50%, -50%)",backgroundColor:"#0f4d4a",borderRadius:"1%"}},f=e=>{let{isShowing:t,hide:a,clearfields:n,balance:l,onInputchange:o,setinputBalance:d,inputBalance:m,deposit:p,isDepositButtonEnabled:f,isDepositing:E}=e;return t?u.a.createPortal(s.a.createElement(s.a.Fragment,null,s.a.createElement(c.a,{isOpen:t,onRequestClose:n,contentLabel:"Example Modal",style:b,ariaHideApp:!1},s.a.createElement("div",{className:"flex flex-col h-full justify-between"},s.a.createElement("div",{className:"flex flex-row justify-between items-center"},s.a.createElement("div",{className:""},s.a.createElement("span",{className:"deposit-modal-heading"},"Deposit")),s.a.createElement("div",{className:"btn-close white"},s.a.createElement("button",{type:"Button",className:"btn-close white","aria-label":"Close",onClick:n}))),s.a.createElement("div",{className:"flex flex-row  justify-between items-center mt-4"},s.a.createElement("div",{className:""},s.a.createElement("span",{className:"deposit-modal-available text-m"},"Available")),s.a.createElement("div",{className:"flex flex-row "},s.a.createElement("div",{className:"d-flex align-items-center m-1"},s.a.createElement("img",{src:r.a,alt:"LOGO ",className:"img-fluid mini-logo-size"})),s.a.createElement("div",{className:"ps-1 pool_past_prizes m-1"},l/1e6," SCRT"))),s.a.createElement("div",{className:"flex flex-row  justify-between items-center  p-2 mt-2 deposit-modal-deposit-field deposit-modal-deposit-field-shape "},s.a.createElement("div",null,s.a.createElement("input",{className:"deposit-modal-deposit-field text-white w-full",type:"number",min:"0",placeholder:"0.00","placeholder-default":"white",name:"inputBalance",value:m,onChange:o})),s.a.createElement("div",{className:"deposit-modal-deposit-field-tokens"},"SCRT")),s.a.createElement("div",{className:"flex flex-row mt-4 items-center justify-between text-white "},s.a.createElement("div",{className:"deposit-modal-amount-percentage px-5 ",onClick:()=>{d((l/1e6*.25).toFixed(2))}},s.a.createElement("button",null,"25%")),s.a.createElement("div",{className:"deposit-modal-amount-percentage  px-5",onClick:()=>{d((l/1e6*.5).toFixed(2))}},s.a.createElement("button",null,"50%")),s.a.createElement("div",{className:"deposit-modal-amount-percentage px-5 ",onClick:()=>{d((l/1e6*.75).toFixed(2))}},s.a.createElement("button",null,"75%")),s.a.createElement("div",{className:"deposit-modal-amount-percentage  px-5",onClick:()=>{d(l/1e6)}},s.a.createElement("button",null,"100%"))),s.a.createElement("div",{className:"flex flex-row mt-4 items-center justify-between "},s.a.createElement(i.Button,{className:"btn account_deposit_button text-white self-center",onClick:()=>p(),disabled:!f},E?s.a.createElement("div",{className:"loader-1 center"},s.a.createElement("span",null)):s.a.createElement("div",null,"Deposit")))))),document.body):null};t.default=function(e){let[t,a]=Object(n.useState)(null),[l,c]=Object(n.useState)(0),[i,o]=Object(n.useState)(!1),[r,m]=Object(n.useState)(!1),[u,b]=Object(n.useState)({secretjs:null,address:null});async function E(){const{secretjs:e,address:t}=u,{balance:{amount:n}}=await e.query.bank.balance({address:t,denom:"uscrt"});a(n)}async function h(){e.hide(),await e.callback(),c(0),m(!1)}return Object(n.useEffect)(()=>{null!=u.secretjs&&null!=u.address||async function(){const{secretjs:e,address:t}=await Object(d.a)();b({secretjs:e,address:t})}(),null==u.secretjs&&null==u.address||E(),o(0!==l),1e6*l>t&&o(!1)},[u,l,t,E]),s.a.createElement(f,{isShowing:e.isShowing,hide:e.hide,clearfields:h,balance:t,onInputchange:async function(e){c(e.target.value)},setinputBalance:c,inputBalance:l,deposit:async function(){m(!0);const{secretjs:e,address:t}=u;let n=String(1e6*l);try{let a=await e.tx.compute.executeContract({sender:t,contractAddress:"secret1j6ly79zfvh83g8te9utystt8hc6vm84u23gnmn",codeHash:"0d21c959e0f195e792e391b7b1729f6c6af70912ce76572faaa3db1f10412dfc",msg:{deposit:{}},sentFunds:[{amount:n,denom:"uscrt"}]},{gasLimit:240297});console.log(a),a.jsonLog?Object(p.a)("success","Transaction sent!",`Successfully deposited: ${l} SCRT \n \n        Txhash: ${a.transactionHash}`):Object(p.a)("error","ERROR",a.rawLog)}catch(c){Object(p.a)("error","ERROR",c)}const{balance:{amount:s}}=await e.query.bank.balance({address:t,denom:"uscrt"});a(s),await h()},isDepositButtonEnabled:i,isDepositing:r})}}}]);
//# sourceMappingURL=14.ffb54cf2.chunk.js.map