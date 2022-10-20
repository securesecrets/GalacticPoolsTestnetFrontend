(this["webpackJsonpwindmill-dashboard-react"]=this["webpackJsonpwindmill-dashboard-react"]||[]).push([[22],{102:function(e,t,n){"use strict";n.d(t,"d",(function(){return _})),n.d(t,"b",(function(){return R})),n.d(t,"a",(function(){return D})),n.d(t,"c",(function(){return U}));n(7);var r=n(0),a=n.n(r);function o(e){return function(t){return!!t.type&&t.type.tabsRole===e}}var s=o("Tab"),c=o("TabList"),l=o("TabPanel");function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function u(e,t){return r.Children.map(e,(function(e){return null===e?null:function(e){return s(e)||c(e)||l(e)}(e)?t(e):e.props&&e.props.children&&"object"===typeof e.props.children?Object(r.cloneElement)(e,i({},e.props,{children:u(e.props.children,t)})):e}))}function d(e,t){return r.Children.forEach(e,(function(e){null!==e&&(s(e)||l(e)?t(e):e.props&&e.props.children&&"object"===typeof e.props.children&&(c(e)&&t(e),d(e.props.children,t)))}))}function f(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=f(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}var p=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=f(e))&&(r&&(r+=" "),r+=t);return r},b=0;function h(){return"react-tabs-"+b++}function v(e){var t=0;return d(e,(function(e){s(e)&&t++})),t}var y,m=["children","className","disabledTabClassName","domRef","focus","forceRenderTabPanel","onSelect","selectedIndex","selectedTabClassName","selectedTabPanelClassName","environment","disableUpDownKeys"];function g(){return(g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function T(e,t){return(T=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function C(e){return e&&"getAttribute"in e}function N(e){return C(e)&&e.getAttribute("data-rttab")}function O(e){return C(e)&&"true"===e.getAttribute("aria-disabled")}var I=function(e){var t,n;function o(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).tabNodes=[],t.handleKeyDown=function(e){var n=t.props,r=n.direction,a=n.disableUpDownKeys;if(t.isTabFromContainer(e.target)){var o=t.props.selectedIndex,s=!1,c=!1;32!==e.keyCode&&13!==e.keyCode||(s=!0,c=!1,t.handleClick(e)),37===e.keyCode||!a&&38===e.keyCode?(o="rtl"===r?t.getNextTab(o):t.getPrevTab(o),s=!0,c=!0):39===e.keyCode||!a&&40===e.keyCode?(o="rtl"===r?t.getPrevTab(o):t.getNextTab(o),s=!0,c=!0):35===e.keyCode?(o=t.getLastTab(),s=!0,c=!0):36===e.keyCode&&(o=t.getFirstTab(),s=!0,c=!0),s&&e.preventDefault(),c&&t.setSelected(o,e)}},t.handleClick=function(e){var n=e.target;do{if(t.isTabFromContainer(n)){if(O(n))return;var r=[].slice.call(n.parentNode.children).filter(N).indexOf(n);return void t.setSelected(r,e)}}while(null!=(n=n.parentNode))},t}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,T(t,n);var i=o.prototype;return i.setSelected=function(e,t){if(!(e<0||e>=this.getTabsCount())){var n=this.props;(0,n.onSelect)(e,n.selectedIndex,t)}},i.getNextTab=function(e){for(var t=this.getTabsCount(),n=e+1;n<t;n++)if(!O(this.getTab(n)))return n;for(var r=0;r<e;r++)if(!O(this.getTab(r)))return r;return e},i.getPrevTab=function(e){for(var t=e;t--;)if(!O(this.getTab(t)))return t;for(t=this.getTabsCount();t-- >e;)if(!O(this.getTab(t)))return t;return e},i.getFirstTab=function(){for(var e=this.getTabsCount(),t=0;t<e;t++)if(!O(this.getTab(t)))return t;return null},i.getLastTab=function(){for(var e=this.getTabsCount();e--;)if(!O(this.getTab(e)))return e;return null},i.getTabsCount=function(){return v(this.props.children)},i.getPanelsCount=function(){return function(e){var t=0;return d(e,(function(e){l(e)&&t++})),t}(this.props.children)},i.getTab=function(e){return this.tabNodes["tabs-"+e]},i.getChildren=function(){var e=this,t=0,n=this.props,o=n.children,i=n.disabledTabClassName,d=n.focus,f=n.forceRenderTabPanel,p=n.selectedIndex,b=n.selectedTabClassName,v=n.selectedTabPanelClassName,m=n.environment;this.tabIds=this.tabIds||[],this.panelIds=this.panelIds||[];for(var g=this.tabIds.length-this.getTabsCount();g++<0;)this.tabIds.push(h()),this.panelIds.push(h());return u(o,(function(n){var o=n;if(c(n)){var h=0,g=!1;null==y&&function(e){var t=e||("undefined"!==typeof window?window:void 0);try{y=!("undefined"===typeof t||!t.document||!t.document.activeElement)}catch(n){y=!1}}(m),y&&(g=a.a.Children.toArray(n.props.children).filter(s).some((function(t,n){var r=m||("undefined"!==typeof window?window:void 0);return r&&r.document.activeElement===e.getTab(n)}))),o=Object(r.cloneElement)(n,{children:u(n.props.children,(function(t){var n="tabs-"+h,a=p===h,o={tabRef:function(t){e.tabNodes[n]=t},id:e.tabIds[h],panelId:e.panelIds[h],selected:a,focus:a&&(d||g)};return b&&(o.selectedClassName=b),i&&(o.disabledClassName=i),h++,Object(r.cloneElement)(t,o)}))})}else if(l(n)){var T={id:e.panelIds[t],tabId:e.tabIds[t],selected:p===t};f&&(T.forceRender=f),v&&(T.selectedClassName=v),t++,o=Object(r.cloneElement)(n,T)}return o}))},i.isTabFromContainer=function(e){if(!N(e))return!1;var t=e.parentElement;do{if(t===this.node)return!0;if(t.getAttribute("data-rttabs"))break;t=t.parentElement}while(t);return!1},i.render=function(){var e=this,t=this.props,n=(t.children,t.className),r=(t.disabledTabClassName,t.domRef),o=(t.focus,t.forceRenderTabPanel,t.onSelect,t.selectedIndex,t.selectedTabClassName,t.selectedTabPanelClassName,t.environment,t.disableUpDownKeys,function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(t,m));return a.a.createElement("div",g({},o,{className:p(n),onClick:this.handleClick,onKeyDown:this.handleKeyDown,ref:function(t){e.node=t,r&&r(t)},"data-rttabs":!0}),this.getChildren())},o}(r.Component);I.defaultProps={className:"react-tabs",focus:!1},I.propTypes={};var P=["children","defaultIndex","defaultFocus"];function j(e,t){return(j=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var _=function(e){var t,n;function r(t){var n;return(n=e.call(this,t)||this).handleSelected=function(e,t,r){var a=n.props.onSelect,o=n.state.mode;if("function"!==typeof a||!1!==a(e,t,r)){var s={focus:"keydown"===r.type};1===o&&(s.selectedIndex=e),n.setState(s)}},n.state=r.copyPropsToState(n.props,{},t.defaultFocus),n}return n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,j(t,n),r.getDerivedStateFromProps=function(e,t){return r.copyPropsToState(e,t)},r.getModeFromProps=function(e){return null===e.selectedIndex?1:0},r.copyPropsToState=function(e,t,n){void 0===n&&(n=!1);var a={focus:n,mode:r.getModeFromProps(e)};if(1===a.mode){var o=Math.max(0,v(e.children)-1),s=null;s=null!=t.selectedIndex?Math.min(t.selectedIndex,o):e.defaultIndex||0,a.selectedIndex=s}return a},r.prototype.render=function(){var e=this.props,t=e.children,n=(e.defaultIndex,e.defaultFocus,function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,P)),r=this.state,o=r.focus,s=r.selectedIndex;return n.focus=o,n.onSelect=this.handleSelected,null!=s&&(n.selectedIndex=s),a.a.createElement(I,n,t)},r}(r.Component);_.defaultProps={defaultFocus:!1,forceRenderTabPanel:!1,selectedIndex:null,defaultIndex:null,environment:null,disableUpDownKeys:!1},_.propTypes={},_.tabsRole="Tabs";var x=["children","className"];function w(){return(w=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function k(e,t){return(k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var R=function(e){var t,n;function r(){return e.apply(this,arguments)||this}return n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,k(t,n),r.prototype.render=function(){var e=this.props,t=e.children,n=e.className,r=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,x);return a.a.createElement("ul",w({},r,{className:p(n),role:"tablist"}),t)},r}(r.Component);R.defaultProps={className:"react-tabs__tab-list"},R.propTypes={},R.tabsRole="TabList";var F=["children","className","disabled","disabledClassName","focus","id","panelId","selected","selectedClassName","tabIndex","tabRef"];function S(){return(S=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function E(e,t){return(E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var D=function(e){var t,n;function r(){return e.apply(this,arguments)||this}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,E(t,n);var o=r.prototype;return o.componentDidMount=function(){this.checkFocus()},o.componentDidUpdate=function(){this.checkFocus()},o.checkFocus=function(){var e=this.props,t=e.selected,n=e.focus;t&&n&&this.node.focus()},o.render=function(){var e,t=this,n=this.props,r=n.children,o=n.className,s=n.disabled,c=n.disabledClassName,l=(n.focus,n.id),i=n.panelId,u=n.selected,d=n.selectedClassName,f=n.tabIndex,b=n.tabRef,h=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(n,F);return a.a.createElement("li",S({},h,{className:p(o,(e={},e[d]=u,e[c]=s,e)),ref:function(e){t.node=e,b&&b(e)},role:"tab",id:l,"aria-selected":u?"true":"false","aria-disabled":s?"true":"false","aria-controls":i,tabIndex:f||(u?"0":null),"data-rttab":!0}),r)},r}(r.Component);D.defaultProps={className:"react-tabs__tab",disabledClassName:"react-tabs__tab--disabled",focus:!1,id:null,panelId:null,selected:!1,selectedClassName:"react-tabs__tab--selected"},D.propTypes={},D.tabsRole="Tab";var A=["children","className","forceRender","id","selected","selectedClassName","tabId"];function K(){return(K=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function M(e,t){return(M=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var U=function(e){var t,n;function r(){return e.apply(this,arguments)||this}return n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,M(t,n),r.prototype.render=function(){var e,t=this.props,n=t.children,r=t.className,o=t.forceRender,s=t.id,c=t.selected,l=t.selectedClassName,i=t.tabId,u=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(t,A);return a.a.createElement("div",K({},u,{className:p(r,(e={},e[l]=c,e)),role:"tabpanel",id:s,"aria-labelledby":i}),o||c?n:null)},r}(r.Component);U.defaultProps={className:"react-tabs__tab-panel",forceRender:!1,selectedClassName:"react-tabs__tab-panel--selected"},U.propTypes={},U.tabsRole="TabPanel"}}]);
//# sourceMappingURL=22.28db25b7.chunk.js.map