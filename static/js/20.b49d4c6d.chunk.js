(this["webpackJsonpwindmill-dashboard-react"]=this["webpackJsonpwindmill-dashboard-react"]||[]).push([[20],{214:function(e,t,a){"use strict";a.r(t);var n=a(36),s=a.n(n),c=a(40),r=a(8),l=a(0),i=a.n(l),o=a(59),u=a.n(o),d=a(14),m=a(42),p=a.n(m),f=a(46),b=a(9),h=a.n(b),x=a(47),v={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",width:"35%",height:"35%",transform:"translate(-50%, -50%)",backgroundColor:"#0f4d4a",borderRadius:"1%"}};t.default=function(e){var t=Object(l.useState)(null),a=Object(r.a)(t,2),n=a[0],o=a[1],m=Object(l.useState)(0),b=Object(r.a)(m,2),j=b[0],w=b[1],E=Object(l.useState)(!1),g=Object(r.a)(E,2),y=g[0],O=g[1],N=Object(l.useState)(!1),k=Object(r.a)(N,2),C=k[0],S=k[1],R=Object(l.useState)({secretjs:null,address:null}),z=Object(r.a)(R,2),q=z[0],F=z[1];function L(){return(L=Object(c.a)(s.a.mark((function e(){var t,a,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(f.a)();case 2:t=e.sent,a=t.secretjs,n=t.address,F({secretjs:a,address:n});case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(){return(T=Object(c.a)(s.a.mark((function e(){var t,a,n,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=q.secretjs,a=q.address,e.next=3,t.query.bank.balance({address:a,denom:"uscrt"});case 3:n=e.sent,c=n.balance.amount,o(c);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(){return(_=Object(c.a)(s.a.mark((function e(){var t,a,n,c,r,l;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return S(!0),t=q.secretjs,a=q.address,n=String(1e6*j),"secret1a25z89fjjjhr6zyuvr3w7z694fv4yq2z8drqxq","00e789c42814eb05255cb553f1439d4cb7969d493e26d68f0766b7e4d1cae2b5",e.prev=5,e.next=8,t.tx.compute.executeContract({sender:a,contractAddress:"secret1a25z89fjjjhr6zyuvr3w7z694fv4yq2z8drqxq",codeHash:"00e789c42814eb05255cb553f1439d4cb7969d493e26d68f0766b7e4d1cae2b5",msg:{deposit:{}},sentFunds:[{amount:n,denom:"uscrt"}]},{gasLimit:240297});case 8:c=e.sent,console.log(c),c.jsonLog?Object(x.a)("success","Transaction sent!","Successfully deposited: ".concat(j," SCRT \n \n        Txhash: ").concat(c.transactionHash)):Object(x.a)("error","ERROR",c.rawLog),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(5),Object(x.a)("error","ERROR",e.t0);case 16:return e.next=18,t.query.bank.balance({address:a,denom:"uscrt"});case 18:return r=e.sent,l=r.balance.amount,o(l),e.next=23,H();case 23:case"end":return e.stop()}}),e,null,[[5,13]])})))).apply(this,arguments)}function A(e){return B.apply(this,arguments)}function B(){return(B=Object(c.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:w(t.target.value);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function H(){return D.apply(this,arguments)}function D(){return(D=Object(c.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.callback();case 2:e.hide(),w(0),S(!1);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}Object(l.useEffect)((function(){null!=q.secretjs&&null!=q.address||function(){L.apply(this,arguments)}(),null==q.secretjs&&null==q.address||function(){T.apply(this,arguments)}(),O(0!=j),1e6*j>n&&O(!1)}),[q,j]);var J=function(e){var t=e.isShowing;e.hide;return t?h.a.createPortal(i.a.createElement(i.a.Fragment,null,i.a.createElement(u.a,{isOpen:t,onRequestClose:H,contentLabel:"Example Modal",style:v,ariaHideApp:!1},i.a.createElement("div",{className:"flex flex-col h-full justify-between"},i.a.createElement("div",{className:"flex flex-row justify-between items-center"},i.a.createElement("div",{className:""},i.a.createElement("span",{className:"deposit-modal-heading"},"Deposit")),i.a.createElement("div",{className:"btn-close white"},i.a.createElement("button",{type:"Button",className:"btn-close white","aria-label":"Close",onClick:H}))),i.a.createElement("div",{className:"flex flex-row  justify-between items-center mt-4"},i.a.createElement("div",{className:""},i.a.createElement("span",{className:"deposit-modal-available text-m"},"Available")),i.a.createElement("div",{className:"flex flex-row "},i.a.createElement("div",{className:"d-flex align-items-center m-1"},i.a.createElement("img",{src:p.a,alt:"LOGO Image",className:"img-fluid mini-logo-size"})),i.a.createElement("div",{className:"ps-1 pool_past_prizes m-1"},n/1e6," SCRT"))),i.a.createElement("div",{className:"flex flex-row  justify-between items-center  p-2 mt-2 deposit-modal-deposit-field deposit-modal-deposit-field-shape "},i.a.createElement("div",null,i.a.createElement("input",{className:"deposit-modal-deposit-field text-white w-full",type:"number",min:"0",placeholder:"0.00","placeholder-default":"white",name:"inputBalance",value:j,onChange:A})),i.a.createElement("div",{className:"deposit-modal-deposit-field-tokens"},"SCRT")),i.a.createElement("div",{className:"flex flex-row mt-4 items-center justify-between text-white "},i.a.createElement("div",{className:"deposit-modal-amount-percentage px-5 ",onClick:function(){w((n/1e6*.25).toFixed(2))}},i.a.createElement("button",null,"25%")),i.a.createElement("div",{className:"deposit-modal-amount-percentage  px-5",onClick:function(){w((n/1e6*.5).toFixed(2))}},i.a.createElement("button",null,"50%")),i.a.createElement("div",{className:"deposit-modal-amount-percentage px-5 ",onClick:function(){w((n/1e6*.75).toFixed(2))}},i.a.createElement("button",null,"75%")),i.a.createElement("div",{className:"deposit-modal-amount-percentage  px-5",onClick:function(){w(n/1e6)}},i.a.createElement("button",null,"100%"))),i.a.createElement("div",{className:"flex flex-row mt-4 items-center justify-between "},i.a.createElement(d.Button,{className:"btn account_deposit_button text-white self-center",onClick:function(){return function(){return _.apply(this,arguments)}()},disabled:!y},C?i.a.createElement("div",{className:"loader-1 center"},i.a.createElement("span",null)):i.a.createElement("div",null,"Deposit")))))),document.body):null};return i.a.createElement(J,{isShowing:e.isShowing,hide:e.hide})}}}]);
//# sourceMappingURL=20.b49d4c6d.chunk.js.map