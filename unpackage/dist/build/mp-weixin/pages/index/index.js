(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0111":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(t("a34a")),a=t("2f62");function i(n){return n&&n.__esModule?n:{default:n}}function r(n,e,t,o,a,i,r){try{var s=n[i](r),c=s.value}catch(u){return void t(u)}s.done?e(c):Promise.resolve(c).then(o,a)}function s(n){return function(){var e=this,t=arguments;return new Promise(function(o,a){var i=n.apply(e,t);function s(n){r(i,o,a,s,c,"next",n)}function c(n){r(i,o,a,s,c,"throw",n)}s(void 0)})}}function c(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),o.forEach(function(e){u(n,e,t[e])})}return n}function u(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var l={data:function(){return{titleNViewBackground:"#fff",swiperCurrent:0,swiperLength:0,carouselList:[],newList:[],randomList:[],categoryData:[],searchName:"",isWeiXinLogin:!0,token:""}},computed:c({},(0,a.mapState)(["hasLogin","userInfo"])),onLoad:function(){this.loadData(),this.getCategoryInformation(),this.doAuthorize()},methods:c({},(0,a.mapMutations)(["login"]),{loadData:function(){var n=s(o.default.mark(function n(){var e;return o.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:e=this,e.$axios(e.$baseUrl.homePage,{}).then(function(n){if(1==n.data.code){var t=n.data.data.bannerlist;e.swiperLength=t.length,e.carouselList=t,e.newList=n.data.data.NewList,e.randomList=n.data.data.Randomlist}},function(n){console.log(n)});case 2:case"end":return n.stop()}},n,this)}));function e(){return n.apply(this,arguments)}return e}(),getCategoryInformation:function(){var n=this;n.$axios(n.$baseUrl.getCategoryData,{}).then(function(e){1==e.data.code&&(n.categoryData=e.data.data.categorydata)},function(n){console.log(n)})},onSearchchange:function(){var e=this.searchName;n.navigateTo({url:"/pages/list/list?name=".concat(e)})},onSearch:function(){var e=this.searchName;n.navigateTo({url:"/pages/list/list?name=".concat(e)})},swiperChange:function(n){var e=n.detail.current;this.swiperCurrent=e,this.titleNViewBackground=this.carouselList[e].background},navToBannerDetailPage:function(e){var t=e.id;n.navigateTo({url:"/pages/bannerdetail/bannerdetail?id=".concat(t)})},navToDetailPage:function(e){var t=e.goods_id;n.navigateTo({url:"/pages/product/product?id=".concat(t)})},navToCategoryList:function(e){var t=e.id,o=e.name;n.navigateTo({url:"/pages/list/list?id=".concat(t,"&name=").concat(o)})},doAuthorize:function(){var n=this;setTimeout(function(){console.log("==============================="),console.log(n.userInfo.token),console.log(n.hasLogin),n.hasLogin||n.doRealAuthorize()},300)},onGetUserInfo:function(e){e.mp.detail.userInfo&&(this.$data.isWeiXinLogin=!0,n.showTabBar(),this.doRealAuthorize(),this.setFristUserInfo(e.mp.detail.userInfo))},setFristUserInfo:function(n){void 0!==n.avatarUrl&&void 0!==n.nickName&&void 0!==n.gender&&(this.userInfo.portrait=n.avatarUrl,this.userInfo.nickname=n.nickName,this.userInfo.gender=n.gender),console.log("this.userInfo.portrait============>"+this.userInfo.portrait),console.log("this.userInfo.nickname============>"+this.userInfo.nickname),console.log("this.userInfo.gender============>"+this.userInfo.gender);var e=this;e.$axios(e.$baseUrl.setFirstUserInfo,{avatarUrl:this.userInfo.portrait,nickname:this.userInfo.nickname,gender:this.userInfo.gender}).then(function(n){console.log(n),console.log("setFristUserInfo++++成功了")},function(n){console.log(n),console.log("setFristUserInfo++++失败了了")})},doRealAuthorize:function(){var e=this,t=this;n.hideTabBar(),n.getSetting({success:function(o){console.log(o),console.log("是否授权",o.authSetting["scope.userInfo"]),e.$data.isWeiXinLogin=!1!==o.authSetting["scope.userInfo"]&&void 0!==o.authSetting["scope.userInfo"],!0===e.$data.isWeiXinLogin&&(n.showTabBar(),n.getUserInfo({success:function(e){console.log(e),console.log(e.encryptedData),t.userInfo.portrait=e.userInfo.avatarUrl,t.userInfo.nickname=e.userInfo.nickName,t.setFristUserInfo(e.userInfo),n.login({success:function(e){console.log(e.code);var o=t;n.showLoading({title:"正在加载..."}),o.$axios(o.$baseUrl.login,{code:e.code}).then(function(e){if(n.hideLoading(),1==e.data.code){var t=e.data.data.userInfo.token;console.log(e),console.log(t),o.userInfo.token=t,o.login(o.userInfo),setTimeout(function(){o.setFristUserInfo(o.userInfo)},500)}else o.$api.msg(e.data.msg)},function(e){n.hideLoading(),console.log(e)})}})}}))}})}})};e.default=l}).call(this,t("543d")["default"])},"137a":function(n,e,t){"use strict";t.r(e);var o=t("2210"),a=t("52cd");for(var i in a)"default"!==i&&function(n){t.d(e,n,function(){return a[n]})}(i);t("d1e3");var r=t("2877"),s=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=s.exports},2210:function(n,e,t){"use strict";var o=function(){var n=this,e=n.$createElement;n._self._c},a=[];t.d(e,"a",function(){return o}),t.d(e,"b",function(){return a})},"52cd":function(n,e,t){"use strict";t.r(e);var o=t("0111"),a=t.n(o);for(var i in o)"default"!==i&&function(n){t.d(e,n,function(){return o[n]})}(i);e["default"]=a.a},d1e3:function(n,e,t){"use strict";var o=t("fc26"),a=t.n(o);a.a},fc26:function(n,e,t){}},[["c12a","common/runtime","common/vendor"]]]);