import {web} from "./config.js"

const serviceModule = {
	login: {
		url: web.www+'/login', //用户登录接口
		method: 'POST'
	},
	todayTotal:{
		url: web.www+'/todayTotal', //获取今日统计数据
		method: 'get'
	},
	freightlist:{
		url: web.www+'/freightlist', //获取商品分类信息
		method: 'POST'
	},
	getCategoryList:{ 
		url:web.www+'/api.goods/category_list',//获取商品列表信息
		method: 'post'
	},
	getCommodityDetails:{
		url:web.www+'/api.goods/detail',//获取商品详情
		method: 'post'
	},
	getAdressLists:{
		url:web.www+'/api.adress/lists',//获取收货地址列表
		method: 'post'
	},
	
	
	setFirstUserInfo:{
			url:web.www+'/api.user/setFirstUserInfo',//用户授权登录后提交用户微信信息
			method: 'post',
	},   
	getAdressDetail:{
		url:web.www+'/api.adress/detail',//收货地址详情
		method: 'post'
	},
	setDefaultAdress:{
		url:web.www+'/api.adress/setdefault',//设置默认收货地址
		method: 'post'
	},
	getcollectionList:{
		url:web.www+'/api.collections/collectionList',//我的收藏列表
		method: 'post'
	},
	isCollection:{
		url:web.www+'/api.collections/is_Collection',//判断是否收藏
		method: 'post'
	},
	addCollection:{
		url:web.www+'/api.collections/add',//添加收藏
		method: 'post'
	},
	cancelCollection:{
		url:web.www+'/api.collections/cancel',//取消收藏
		method: 'post'
	},
	addAdress:{
		url:web.www+'/api.adress/add',//添加收货地址
		method: 'post'
	},
	editAdress:{
		url:web.www+'/api.adress/edit',//修改收货地址
		method: 'post'
	},
	delAdress:{
		url:web.www+'/api.adress/del',//删除收货地址
		method: 'post'
	},
	setDefaultAdress:{
		url:web.www+'/api.adress/setdefault',//设置为默认地址
		method: 'post'
	},
	getOrderList:{
		url:web.www+'/api.order/orderlist',//用户全部订单
		method: 'post'
	},
	shopCartList:{
		url:web.www+'/api.cart/getlists',//购物车列表
		method: 'post'
	},
	addCart:{
		url:web.www+'/api.cart/add',//加入购物车
		method: 'post'
	},
	getListSpay:{
		url:web.www+'/api.cart/getlistspay',//获取购物车选中商品列表
		method: 'post'
	},
	delCart:{
		url:web.www+'/api.cart/delete',//删除购物车内某个商品订单
		method: 'post'
	},
	clearAllCart:{
		url:web.www+'/api.cart/clearAll',//删除购物车内所有商品订单
		method: 'post'
	},
	addCartNumber:{
		url:web.www+'/api.cart/inc',//购物车内增加某件商品数量
		method: 'post'
	},
	subCartNumber:{
		url:web.www+'/api.cart/sub',//购物车内减少某件商品数量
		method: 'post'
	},
	cartPay:{
		url:web.www+'/api.order/cart_pay',//从购物车中 直接购买商品
		method: 'post'
	},
	unpayorderlist:{
		url:web.www+'/api.order/unpayorderlist',//未支付订单
		method: 'post'
	},
	unfreightlist:{
		url:web.www+'/api.order/unfreightlist',//待发货订单列表
		method: 'post'
	},
	unreceiptlist:{
		url:web.www+'/api.order/unreceiptlist',//待收货订单列表
		method: 'post'
	},
	searchOrder:{
		url:web.www+'/api.order/searchOrder',//订单列表搜索
		method: 'post'
	},
	cancel:{
		url:web.www+'/api.order/cancel',//取消订单
		method: 'post'
	},
	finish:{
		url:web.www+'/api.order/finish',//确认收货
		method: 'post'
	},
	refundMoney:{
		url:web.www+'/api.order/refund_money',//申请退款
		method: 'post'
	},
	finishList:{
		url:web.www+'/api.order/finishlist',//用户已完成订单(含已退款)
		method: 'post'
	},
	orderDetails:{
		url:web.www+'/api.order/detail',//订单详情
		method: 'post'
	},
	buyNowPay:{
		url:web.www+'/api.order/buyNow_pay',//从订单列表中购买商品
		method: 'post'
	},
	directPurchase:{
		url:web.www+'/api.order/buyNow',//直接购买商品
		method: 'post'
	},
	getScoreLog:{
		url:web.www+'/api.salelog/scorelog',//我的分销记录
		method: 'post'
	},
	getMyScore:{
		url:web.www+'/api.salelog/myscore',//我的分销统计
		method: 'post'
	},
	setRealName:{
		url:web.www+'/api.index/realName',//实名认证
		method: 'post'
	},
	orderPay:{
		url:web.www+'/api.order/order_pay',//订单支付接口
		method: 'post'
	},
	upload:{
		url:web.www+'/api.user/upload',//上传头像接口
		method: 'post'
	},
	profile:{
		url:web.www+'/api.user/profile',//修改用户个人信息
		method: 'post'
	},
	getUserInfo:{
		url:web.www+'/api.user/getUserInfo',//获取用户信息
		method: 'post'
	},
	getRealInfo:{
		url:web.www+'/api.user/getRealInfo',//获取用户实名认证信息
		method: 'post'
	}

};


const ApiSetting = { ...serviceModule
}
export default ApiSetting
