(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userinfo/userinfo"],{"228b":function(n,e,t){"use strict";t.r(e);var r=t("3392"),o=t("933b");for(var u in o)"default"!==u&&function(n){t.d(e,n,function(){return o[n]})}(u);t("95dc");var c=t("2877"),i=Object(c["a"])(o["default"],r["a"],r["b"],!1,null,null,null);e["default"]=i.exports},2795:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=u(t("a34a")),o=t("2f62");function u(n){return n&&n.__esModule?n:{default:n}}function c(n,e,t,r,o,u,c){try{var i=n[u](c),a=i.value}catch(f){return void t(f)}i.done?e(a):Promise.resolve(a).then(r,o)}function i(n){return function(){var e=this,t=arguments;return new Promise(function(r,o){var u=n.apply(e,t);function i(n){c(u,r,o,i,a,"next",n)}function a(n){c(u,r,o,i,a,"throw",n)}i(void 0)})}}function a(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),r.forEach(function(e){f(n,e,t[e])})}return n}function f(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var l={data:function(){return{}},computed:a({},(0,o.mapState)(["userInfo"])),onLoad:function(){var e=i(r.default.mark(function e(){return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:console.log(111111111),n.login({provider:"weixin",success:function(e){n.getUserInfo({provider:"weixin",withCredentials:!0,success:function(n){console.log("用户昵称为："+n.userInfo.nickname)},fail:function(n){console.log("res="+JSON.stringify(n))}})},fail:function(n){console.log("fail"),console.log(n)}});case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()};e.default=l}).call(this,t("543d")["default"])},3392:function(n,e,t){"use strict";var r=function(){var n=this,e=n.$createElement;n._self._c},o=[];t.d(e,"a",function(){return r}),t.d(e,"b",function(){return o})},"933b":function(n,e,t){"use strict";t.r(e);var r=t("2795"),o=t.n(r);for(var u in r)"default"!==u&&function(n){t.d(e,n,function(){return r[n]})}(u);e["default"]=o.a},"95dc":function(n,e,t){"use strict";var r=t("c956"),o=t.n(r);o.a},c956:function(n,e,t){}},[["025b","common/runtime","common/vendor"]]]);