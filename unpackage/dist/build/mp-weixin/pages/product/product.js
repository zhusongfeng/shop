(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/product"],{"012c":function(o,t,e){"use strict";e.r(t);var n=e("cd06"),i=e("eadd");for(var s in i)"default"!==s&&function(o){e.d(t,o,function(){return i[o]})}(s);e("4383");var a=e("2877"),c=Object(a["a"])(i["default"],n["a"],n["b"],!1,null,null,null);t["default"]=c.exports},"248b":function(o,t,e){},4383:function(o,t,e){"use strict";var n=e("248b"),i=e.n(n);i.a},b9a8:function(o,t,e){"use strict";(function(o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(e("a34a"));function i(o){return o&&o.__esModule?o:{default:o}}function s(o,t,e,n,i,s,a){try{var c=o[s](a),d=c.value}catch(u){return void e(u)}c.done?t(d):Promise.resolve(d).then(n,i)}function a(o){return function(){var t=this,e=arguments;return new Promise(function(n,i){var a=o.apply(t,e);function c(o){s(a,n,i,c,d,"next",o)}function d(o){s(a,n,i,c,d,"throw",o)}c(void 0)})}}var c=e("8eec"),d=function(){return e.e("components/uni-number-box").then(e.bind(null,"8cb0"))},u=function(){return e.e("components/share").then(e.bind(null,"c359"))},r={components:{share:u,uniNumberBox:d},data:function(){return{specClass:"none",specSelected:[],favorite:!1,shareList:[],goods_price:0,line_price:0,stock_num:1,commodityDetails:{},imgList:[],contentHtml:"",specList:[],specChildList:[],goodsStatus:10,goods_id:"",number:1,specSkuId:"",goodsId:"",goodsSkuId:""}},onLoad:function(){var o=a(n.default.mark(function o(t){var e,i,s;return n.default.wrap(function(o){while(1)switch(o.prev=o.next){case 0:e=this,i=t.id,this.$data.goods_id=i+"",this.goods_id=i,s=[],e.$axios(e.$baseUrl.getCommodityDetails,{goods_id:i}).then(function(o){var t=o.data.data.detail;if(1==o.data.code){e.imgList=t.imgs_url,e.commodityDetails=t,e.goods_price=t.spec[0].goods_price,e.line_price=t.spec[0].line_price,e.stock_num=t.spec[0].stock_num,e.goodsStatus=t.goods_status,e.specSkuId=t.spec[0].spec_sku_id,e.goodsId=t.spec[0].goods_id,e.goodsSkuId=t.spec[0].spec_sku_id,e.contentHtml=c.format(t.content);var n=o.data.data.specData.spec_attr;console.log(n),""==n&&null==n&&"undefined"==n||(n.forEach(function(o,t){e.specList.push({id:t+1,name:o.group_name})}),n.forEach(function(o,t){o.spec_items.forEach(function(o,e){s.push({id:e,pid:t+1,name:o.spec_value})})}),s.forEach(function(o,t){e.specChildList.push({id:t+1,pid:o.pid,name:o.name})}),e.specList.forEach(function(o){var t=!0,n=!1,i=void 0;try{for(var s,a=e.specChildList[Symbol.iterator]();!(t=(s=a.next()).done);t=!0){var c=s.value;if(c.pid===o.id){e.$set(c,"selected",!0),e.specSelected.push(c);break}}}catch(d){n=!0,i=d}finally{try{t||null==a.return||a.return()}finally{if(n)throw i}}}))}},function(o){console.log(o)}),this.isCollection(i);case 7:case"end":return o.stop()}},o,this)}));function t(t){return o.apply(this,arguments)}return t}(),onUnload:function(){if(!this.favorite){console.log("onUnload============================");var t=this;o.setStorage({key:"needRemoveGoodsId",data:t.goods_id})}},methods:{toggleSpec:function(){var o=this;"show"===this.specClass?(this.specClass="hide",setTimeout(function(){o.specClass="none"},250)):"none"===this.specClass&&(this.specClass="show")},selectSpec:function(o,t){var e=this,n=this.specChildList;n.forEach(function(o){o.pid===t&&e.$set(o,"selected",!1)}),this.$set(n[o],"selected",!0),this.specSelected=[],n.forEach(function(o){!0===o.selected&&e.specSelected.push(o)})},share:function(){o.share({provider:"weixin",scene:"WXSceneSession",type:0,href:"http://baidu.com/",title:"37喵 为追剧而生",summary:"我正在使用追剧助手，赶紧跟我一起来体验！",imageUrl:"http://baidu.com/Content/img/jiazai.png",success:function(o){console.log("success:"+JSON.stringify(o))},fail:function(o){console.log("fail:"+JSON.stringify(o))}})},toFavorite:function(){console.log("当前收藏的状态"+this.favorite),this.favorite?this.cancelCollection(this.$data.goods_id):this.addCollection(this.$data.goods_id)},stopPrevent:function(){},isCollection:function(o){var t=this;t.$axios(t.$baseUrl.isCollection,{goods_id:o+""}).then(function(o){console.log(o),1==o.data.code?t.$data.favorite=1==o.data.data.status:t.$api.msg(o.data.msg)},function(o){console.log(o)})},addCollection:function(t){console.log("======================="+t),o.showLoading({title:"正在提交..."});var e=this;e.$axios(e.$baseUrl.addCollection,{goods_id:t}).then(function(t){o.hideLoading(),console.log(t),1==t.data.code?e.$data.favorite=!0:e.$api.msg(t.data.msg)},function(t){o.hideLoading(),console.log(t)})},cancelCollection:function(t){o.showLoading({title:"正在提交..."});var e=this;e.$axios(e.$baseUrl.cancelCollection,{goods_id:t}).then(function(t){o.hideLoading(),console.log(t),1==t.data.code?e.$data.favorite=!1:e.$api.msg(t.data.msg)},function(t){o.hideLoading(),console.log(t)})},numberChange:function(o){console.log("//数量",o),this.number=o.number},addCart:function(){var t=this;t.$axios(t.$baseUrl.addCart,{goods_id:t.goods_id,goods_num:t.number,goods_sku_id:t.specSkuId}).then(function(t){1==t.data.code&&o.showToast({title:"加入购物车成功",icon:"success"})},function(o){console.log(o)})},orderNow:function(){console.log("点击购买操作");var t=this.goodsId,e=this.goodsSkuId,n=this.number;o.navigateTo({url:"/pages/cart/neworderdetails?goodsId=".concat(t,"&goodsSkuId=").concat(e,"&goodsNum=").concat(n)})}}};t.default=r}).call(this,e("543d")["default"])},cd06:function(o,t,e){"use strict";var n=function(){var o=this,t=o.$createElement;o._self._c},i=[];e.d(t,"a",function(){return n}),e.d(t,"b",function(){return i})},eadd:function(o,t,e){"use strict";e.r(t);var n=e("b9a8"),i=e.n(n);for(var s in n)"default"!==s&&function(o){e.d(t,o,function(){return n[o]})}(s);t["default"]=i.a}},[["e8a8","common/runtime","common/vendor"]]]);