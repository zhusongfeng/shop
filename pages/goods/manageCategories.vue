<template>
	<view class="content">
		<swiper :current="tabCurrentIndex" class="swiper-box" catchtouchmove="stopTouchMove">
			<swiper-item class="tab-content"  >
				<scroll-view 
					class="list-scroll-content swiper-no-swiping" 
					scroll-y>
					<!-- 空白页  @scrolltolower="loadData" -->
					<empty v-if=" showList.length == 0"></empty>
					
					
					<!-- 订单列表 -->
					<view  v-for="(item,index) in showList" :key="index"
						class="goods-list">
						<view class="goods-list-item" >
							<text class="item-name">{{item.name}}</text>
							<view class="icon bianji"  @tap.stop="tabClick(6,item)"></view>
							<image class="item-delete" src="/static/delete.png" @tap.stop="deletes(item)" ></image>
						</view>
					</view>
					
					<!-- <uni-load-more :status="loadingType"></uni-load-more> -->
					
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 新建分类与管理分类 -->
		<view class="tab-bar">
			<view 
				v-for="(item, index) in tabList" :key="index" 
				class="tab-item" 
				@click="tabClick(index)"
			>
			<image class="new-classification" src="/static/new-classification.png" ></image>
				{{item.text}}
			</view>
		</view>
		<!-- 新建分类 -->
		<view class="popup" :class="addClass"  @tap.stop="toggleAddClass">
			<view class="mask"></view>
			<view class="class-layer">
				<text class="new-build">新建分类</text>
				<input type="text" class="new-input" @tap.stop placeholder="请填写分类名称" v-model="classification">
				<view class="new-btn">
					<text class="cancel" @tap.stop="tabCancel">取消</text>
					<text class="confirm" @tap.stop="tabConfirm">确定</text>
				</view>
				
				
			</view>
		</view>
		
	</view>
</template> 

<script>
	export default {
		
		data() {
			return {
				tabCurrentIndex: 0,
				addClass:'none',
				showList:[],//商品分类列表
				loadingType: 'more', //more 是加载中   nomore是加载结束
				total:0,//总条数
				pageSize:0,//每页条数
				page:1,//当前页
				nextPage:false,//是否有下一页
				tabList: [{
						state: 0,
						text: '新建分类',
					}
				],
				tabIndex:null,
				parentId:null,//上级分类id
				cateName:null,//分类名
				classification:'',
				
			};
		},
		
		async onLoad(){
			let userInfo=uni.getStorageSync('userInfo');
			
			if(userInfo!==undefined){
				this.token = userInfo.token;
				this.status = 10;
				this.loadData();
			}else{
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
			
			
		},
		onShow() { //返回显示页面状态函数
			//，来进行局部刷新
			// this.loadData();
		},
		
		methods: {
			//获取商品分类信息
			loadData(){
				let self = this;
				uni.request({
					url: 'http://wxshop.qclike.cn/api/admins/showlist', 
					method:'POST',
					data:{
						token:self.token,
						page:self.page
					},
					success: function(res) {
						if(res.data.code == 1){
							let result = res.data.data;
							if(res.data.code == 1){
								self.showList = result.categorydata;
								
							}
						}
						
					}
				});
				
			}, 
			//禁止手指滑动
			stopTouchMove: function() {
			  return false;
			},

			
			/* selectItem(todo){
				console.log(todo);
				let classifyId = todo.id;
				let classifyName = todo.name;
				uni.navigateTo({
					url:`/pages/goods/addgoods?classifyId=${classifyId}&classifyName=${classifyName}`
				})
			}, */
			//确认新增分类或修改分类
			tabConfirm(){
				let self = this;
				if(!self.classification){ 
					uni.showToast({title: '请输入分类名称',icon:"none"});
					return ; 
				}
				self.specClass= 'show';
				self.addClass = 'none';
				if(self.tabIndex == 0){//新增分类
					uni.request({
						url: 'https://wxshop.qclike.cn/api/admins/cateupdate',
						method:'POST',
						header:{
							'content-type': 'application/x-www-form-urlencoded', 
						},
						data:{
								token:self.token,
								parent_id:0,
								cate_name:self.classification
								
							},
							success: function(res) {
								if(res.data.code == 1){
									
									self.classification = '';
									
									self.$nextTick(function(){
										self.loadData();
									})
									
								} else if(res.data.code == 0){
									let msg = res.data.msg
									uni.showToast({title: msg,icon:"none"});
								}
						}
					});	
				}
				if(self.tabIndex == 6){//修改分类
				console.log('修改分类',self.classification)
					uni.request({
						url: 'https://wxshop.qclike.cn/api/admins/cateupdate',
						method:'POST',
						header:{
							'content-type': 'application/x-www-form-urlencoded', 
						},
						data:{
								token:self.token,
								parent_id:self.parentId,
								cate_name:self.classification,
								
							},
							success: function(res) {
								if(res.data.code == 1){
									self.$nextTick(function(){
										self.loadData();
									})
									
								} else if(res.data.code == 0){
									let msg = res.data.msg
									uni.showToast({title: msg,icon:"none"});
								}
						}
					});
				}
					
			},
			
			//取消新增分类
			tabCancel(){
				console.log('取消新增分类')
				this.specClass= 'show';
				
				this.addClass = 'none';
			},
			toggleAddClass(){
				if(this.addClass === 'show'){
					this.addClass = 'hide';
					setTimeout(() => {
						this.addClass = 'none';
					}, 250);
				}else if(this.addClass === 'none'){
					this.addClass = 'show';
				}
			},
			//底部tab切换
			tabClick(index,todo){
				let self = this;
				self.tabIndex = index;
				if(self.addClass === 'show'){
					self.addClass = 'hide';
					setTimeout(() => {
						self.addClass = 'none';
					}, 250);
				}else if(self.addClass === 'none'){
					self.addClass = 'show';
				}
				if(todo){
					self.parentId = todo.id;
				    self.cateName = todo.name;
					self.classification = todo.name;
				}
			},
			
			//删除操作
			deletes(todo){
				let self = this;
				uni.showModal({
					title: '删除提示',
					content: '你将删除这个分类',
					success: (res)=>{
						if (res.confirm) {
							uni.request({
								url: 'https://wxshop.qclike.cn/api/admins/catedel',
								method:'POST',
								header:{
									'content-type': 'application/x-www-form-urlencoded', 
								},
								data:{
										token:self.token,
										ids:todo.id
									},
									success: function(res) {
										if(res.data.code == 1){
											self.$nextTick(function(){
												self.loadData();
											})
											
										} else if(res.data.code == 0){
											let msg = res.data.msg
											uni.showToast({title: msg,icon:"none"});
										}
								}
							});
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
					
			},
			
			
			
		}
	}
</script>

<style lang="scss">
	@font-face {font-family:"HMfont-home";src:url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMIAAsAAAAABvwAAAK8AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqBSIFAATYCJAMMCwgABCAFhG0HVBskBsiusClj9ljNiEIaBdizs389YOCARVDt99mzu+8dMMpzQEn5KEAZRez+yRDbSDIixkYo1tF/+vv5OxYJFk2VghXWbbzzPn8D/OMG3vvXGTU90ZFhOrNJROZwCRGjj/Iry36wAbfSxBsuNGggeG9sMbJKDd7xg8vpr4ACmWdZLnMtGxMwwUD3wCiywi3oDWMXuITzBNpNc4BP3j5/Q1thTQvE1SQiaOd8isKSrUJds7aIVyqt6XECAF6Gj49/sBcUSZVZc09duQng/CfPcXTVrIs+gj+fBWwTGZsghbhcGzurJhgZ1S6rt2fXipDmCv5PyNMltf2HRxJEzSrsBKtIk9wU32WS+E1w14UZ1HFiG+QkJg3ODWmyn5/20eOvTz5LnR6l8aWDT5Sn3wLtYlfNe7RIik/fN961C3Vftf6YZLr5ZMcjU/LExqD9u3LzvKE8KQtBGAp9ilm1XbAK2m83TdlozEvQ0Zbrh8HBMrKDB03MjRwHaJKP2f5jf+NfDvML4f+tHQX8+EJvkwL1z9Mqwfi/kd+zq+hCS5+LynN5piObGRlNaNedmrJc/R7jVUO3agmtOT7zJy32WkjWahGihbQJlQ5bklpT7ENotyG3ucOAjpoobVi3BxB6HSDp9h2yXne0kDSoDPtBrTdQaHc61D07LEezm1Im4wBLc2z6UoaO0bpR8SdHLifNCkPKL+s4CaLX5Skm77hknWNBdxLt9SzEmkqBWXAZ57lgSyVl37YaZqMzt7tWd6OtshTQdYJixLAAKplDTT5RCv3Bplu6/ycWcXJEW+pqrL+YGkuGR14unh7onazsVXcv13RNRPb0mBCqUaKAssDCcjsmUKt+VIr5zJbGiMjIGTfqV+sr21pfUXxALmvCmpMjRY5i9G5CZepynIyYZOr+sksyR2W0UHLiChIrRmXfA0E') format('woff2');}
		.icon {
			font-family:"HMfont-home" !important;
			font-size:60upx;
			font-style:normal;
			color:#000000;
			&.bianji {
				&:before{content:"\e61b";}
			}
			&.tianjia {
				&:before{content:"\e81a";}
			}
		}
	
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	.tab-bar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.tab-item{
			flex: 1;
			height: 40px;
			line-height: 40px;
			font-size: 30upx;
			color: #333;
			text-align: center;
			.new-classification{
				display: inline-block;
				width: 40upx;
				height: 40upx;
				background-size: cover;
				margin-right: 10upx;
				vertical-align: middle;
			}
		}
	}
	
	
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	
	.uni-swiper-item{
		height: auto;
	}
	.goods-list{
		display: flex;
		flex-direction: column;
		background: #fff;
		margin-top: 16upx;
		.goods-list-item{
			display: flex;
			width: 100%;
			margin: 0;
			padding: 20upx;
			font-size: 30upx;
			color: #333;
			text-align: center;
			background: #fff;
			display: flex;
			flex-direction: row;
			.item-name{
				flex: 1;
				text-align: left;
			}
			.bianji{
				width: 40upx;
				height: 40upx;
				margin: 0 10px ;
				font-size: 40upx;
			}
			.item-delete{
				width: 40upx;
				height: 40upx;
				margin: 0 10px ;
				background-size: cover;
			}
			
			
		}
	
	   
	}
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			/* min-height: 40vh; */
			max-height: 60vh;
			overflow-y: auto;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			padding: 30upx;
			.attr-list{
				width: 90%;
				.item-list{
					width: 100%;
					height: 88upx;
					line-height: 88upx;
					font-size: 30upx;
					border-bottom: 1px solid #eee;
					color: #333333;
				}
				
			}
		    .classification{
				width: 180upx;
				height: 80upx;
				margin: auto;
				display: flex;
				margin-top: 40upx;
				flex-direction: row;
				.new-classification{
					width: 40upx;
					height: 40upx;
					background-size: cover;
				}
				.class{
					font-size: 30upx;
					margin-left: 20upx;
					color:#C5091D;
				}
			}
		}
		.class-layer{
			position: fixed;
			z-index: 99;
			width: 80%;
			height: 300upx;
			top: 35%;
			left: 50%;
			border-radius: 10px;
			margin: auto;
			-moz-transform: translate(-50%, -50%);
			-ms-transform: translate(-50%, -50%);
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			margin: auto;
			max-height: 60vh;
			overflow-y: auto;
			border-radius: 10upx ;
			background-color: #fff;
			
			.new-build{
				width: 100%;
				display: inline-block;
				height: 40upx;
				line-height: 40upx;
				font-size: 32upx;
				color: #333;
				margin-top: 30upx;
				text-align: center;
			}
			.new-input{
				width: 90%;
				margin-left: 5%;
				margin-top: 30upx;
				display: inline-block;
				height: 80upx;
				line-height: 80upx;
				text-indent: 40upx;
				font-size: 28upx;
				color: #333;
				border: 1px solid #ececec;
				text-align: left;
			}
			.new-btn{
				margin-top: 10upx;
				border-top: 1px solid #ececec;
				display: flex;
				flex-direction: row;
				.cancel,.confirm{
					flex: 1;
					height: 100upx;
					line-height: 100upx;
					text-align: center;
					font-size: 32upx;
					color: #333;
					border-right: 1px solid #ececec;
				}
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
	
	
	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	
</style>
