(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/list/list"],{"172f":function(t,e,a){"use strict";var n=a("e82e"),o=a.n(n);o.a},"2f60":function(t,e,a){"use strict";a.r(e);var n=a("88f1"),o=a("4e10");for(var r in o)"default"!==r&&function(t){a.d(e,t,function(){return o[t]})}(r);a("172f");var i=a("2877"),s=Object(i["a"])(o["default"],n["a"],n["b"],!1,null,null,null);e["default"]=s.exports},"4e10":function(t,e,a){"use strict";a.r(e);var n=a("d793"),o=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);e["default"]=o.a},"88f1":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return o})},d793:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(a("a34a"));function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e,a,n,o,r,i){try{var s=t[r](i),u=s.value}catch(c){return void a(c)}s.done?e(u):Promise.resolve(u).then(n,o)}function i(t){return function(){var e=this,a=arguments;return new Promise(function(n,o){var i=t.apply(e,a);function s(t){r(i,n,o,s,u,"next",t)}function u(t){r(i,n,o,s,u,"throw",t)}s(void 0)})}}var s={data:function(){return{titleNViewBackground:"",goodsList:[],page:1,total:0,pageSize:0,searchName:"",searchId:"",loadingText:"正在加载...",tabCurrentIndex:0,types:"normal",moreList:!1,navList:[{state:0,text:"综合"},{state:1,text:"价格"},{state:2,text:"销量"}]}},onPageScroll:function(t){this.headerPosition=t.scrollTop>=0?"fixed":"absolute",this.headerTop=t.scrollTop>=0?null:0,this.statusTop=t.scrollTop>=0?null:-this.statusHeight+"px"},onPullDownRefresh:function(){setTimeout(function(){t.stopPullDownRefresh()},1e3)},onReachBottom:function(){var e=this;if(e.moreList)return t.showToast({title:"触发上拉加载"}),e.page=e.page+1,e.onLoad(),!1},onLoad:function(){var t=i(n.default.mark(function t(e){var a;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:a=this,e.id?(a.searchId=e.id,a.searchName=e.name):a.searchName=e.name,a.loadData();case 3:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),methods:{loadData:function(){var t=i(n.default.mark(function t(){var e;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=this,e.$axios(e.$baseUrl.getCategoryList,{id:5,page:e.page,types:e.types,name:e.searchName}).then(function(t){console.log(t.data.data);var a=t.data.data;1==t.data.code&&(e.page=a.current_page,e.total=a.total,e.pageSize=a.per_page,e.pageSize*e.page>e.total?(e.moreList=!1,e.loadingText="到底了！"):(e.moreList=!0,e.loadingText="上拉加载更多！"),e.moreList?a.data.forEach(function(t){e.goodsList.push(t)}):e.goodsList=a.data)},function(t){console.log(t)});case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),navToDetailPage:function(e){var a=e.goods_id;t.navigateTo({url:"/pages/product/product?id=".concat(a)})},tabClick:function(t){switch(this.tabCurrentIndex=t,t){case 0:this.types="normal";break;case 1:this.types="price";break;case 2:this.types="sales";break;default:break}this.goodsList=[],this.page=1,this.total=0,this.pageSize=0,this.moreList=!1,this.loadData()}}};e.default=s}).call(this,a("543d")["default"])},e82e:function(t,e,a){}},[["1014","common/runtime","common/vendor"]]]);