(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/share"],{"03dc":function(t,n,e){"use strict";var o=e("d241"),i=e.n(o);i.a},5486:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})},"76df":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{transform:"translateY(50vh)",timer:0,backgroundColor:"rgba(0,0,0,0)",show:!1,config:{}}},props:{contentHeight:{type:Number,default:0},hasTabbar:{type:Boolean,default:!1},shareList:{type:Array,default:function(){return[]}}},created:function(){var n=t.upx2px(this.contentHeight)+"px";this.config={height:n,transform:"translateY(".concat(n,")"),backgroundColor:"rgba(0,0,0,.4)"},this.transform=this.config.transform},methods:{toggleMask:function(){var n=this;if(1!=this.timer){if(this.timer=1,setTimeout(function(){n.timer=0},500),this.show)return this.transform=this.config.transform,this.backgroundColor="rgba(0,0,0,0)",void setTimeout(function(){n.show=!1,n.hasTabbar&&t.showTabBar()},200);this.show=!0,this.hasTabbar?t.hideTabBar({success:function(){setTimeout(function(){n.backgroundColor=n.config.backgroundColor,n.transform="translateY(0px)"},10)}}):setTimeout(function(){n.backgroundColor=n.config.backgroundColor,n.transform="translateY(0px)"},10)}},stopPrevent:function(){},shareToFriend:function(n){t.share({provider:"weixin",scene:"WXSceneSession",type:1,summary:"我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){console.log("fail:"+JSON.stringify(t))}})},share:function(){t.share({provider:"weixin",scene:"WXSceneSession",type:0,href:"http://baidu.com/",title:"37喵 为追剧而生",summary:"我正在使用追剧助手，赶紧跟我一起来体验！",imageUrl:"http://baidu.com/Content/img/jiazai.png",success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){console.log("fail:"+JSON.stringify(t))}})},shareFriend:function(){t.share({provider:"weixin",scene:"WXSceneSession",type:0,href:"http:*******************",title:"你笑起来真好看",summary:"唐艺昕，你有火吗？没有,为何你点燃了我的心？",imageUrl:"http:*******************",success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){console.log("fail:"+JSON.stringify(t))}})}}};n.default=e}).call(this,e("543d")["default"])},8209:function(t,n,e){"use strict";e.r(n);var o=e("76df"),i=e.n(o);for(var r in o)"default"!==r&&function(t){e.d(n,t,function(){return o[t]})}(r);n["default"]=i.a},c359:function(t,n,e){"use strict";e.r(n);var o=e("5486"),i=e("8209");for(var r in i)"default"!==r&&function(t){e.d(n,t,function(){return i[t]})}(r);e("03dc");var s=e("2877"),a=Object(s["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=a.exports},d241:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/share-create-component',
    {
        'components/share-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c359"))
        })
    },
    [['components/share-create-component']]
]);                