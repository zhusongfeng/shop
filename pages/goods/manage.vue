<template>
	<view class="content">
		<swiper  class="swiper-box" catchtouchmove="stopTouchMove">
			<swiper-item class="tab-content"  >
				<scroll-view 
					class="list-scroll-content swiper-no-swiping" 
					scroll-y
					 
					@scrolltolower="loadMore"
				>
					<!-- 空白页  @scrolltolower="loadData" -->
					<empty v-if=" goodsList.length == 0"></empty>
					
					
					<!-- 订单列表 -->
					<view  v-for="(item,index) in goodsList" :key="index"
						class="goods-list"
					>
						<view class="goods-list-item">
							<image class="radio"
								:src="item.checked?'/static/selected.png':'/static/select.png'" 
								mode="aspectFit"
								@tap.stop="radioSelect(index)"
							></image>
							<image class="goods-img" :src="item.images" mode="aspectFill"></image>
							<view class="goods-right">
								<text class="title">{{item.goods_name}}</text>
								<text class="price">￥{{item.sales_money}}</text>
								<view class="container">
									<view class="sales-actual">总销量 <text class="number">{{item.sales_actual}}</text></view>
									<view class="stock">库存 <text class="number">5555</text></view>
								</view>
								
							</view>
						</view>
					</view>
					
					
					<!-- <uni-load-more :status="loadingType"></uni-load-more> -->
					
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 下架或分类 -->
		<view class="tab-bar">
			<view 
				v-for="(item, index) in tabList" :key="index" 
				class="tab-item" 
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>
		
		<!-- 商品分类列表 -->
		<view class="popup" :class="specClass"  @tap="toggleSpec">
			<view class="mask"></view>
			<view class="layer">
				<view v-for="(item,index) in categoryList" :key="index" class="attr-list" >
					<view class="item-list" @tap="toggleSpecTab(item)">
						{{item.name}}
					</view>
				</view>
				<view class="classification" @tap.stop="addClassification">
					<image class="new-classification" src="/static/new-classification.png" ></image>
					<text class="class">新建分类</text>
				</view>
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
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				specClass: 'none',
				addClass:'none',
				status:null,//10:上架,20:下架
				goodsId:'',//商品id,示例 24,25,26代表三个商品
				goodsList:[],//订单列表
				categoryList:[],//商品分类列表
				loadingType: 'more', //more 是加载中   nomore是加载结束
				total:0,//总条数
				pageSize:0,//每页条数
				page:1,//当前页
				allChecked:0,
				//订单列表
				tabList: [{
						state: 0,
						text: '下架',
					},
					{
						state: 1,
						text: '分类至',
					}
				],
				
				nextPage:false,//是否有下一页
				token:'',
				cateId:'',//分类id
				classification:'',//分类名称
			};
		},
		
		async onLoad(){
			
			let userInfo=uni.getStorageSync('userInfo');
			
			if(userInfo!==undefined){
				this.token = userInfo.token;
				this.loadData();
			}else{
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
			
			
		},
		onShow() { //返回显示页面状态函数
			//，来进行局部刷新
			this.loadData();
		},
		
		methods: {
			//获取上架列表数据
			async loadData(){
				let self = this;
				uni.request({
					url: 'https://wxshop.qclike.cn/api/admins/goodsList',
					header:{
						'content-type': 'application/x-www-form-urlencoded', 
					},
					method:'POST',
					data:{
						token:self.token,
						page:self.page,
						sort_type:'asc',//升序
						sort_name:'createtime',//创建时间
						goods_status:10,//上架
					},
					success: function(res) {
						if(res.data.code == 1){
							let result = res.data.data;
							if(res.data.code == 1){
								
								if(self.page == 1){//第一次加载
									self.goodsList = result.data;
									self.goodsList = self.goodsList.map(item=>{
										item.checked = false;
										return item;
									});
								}else{//加载更多
									result.data = result.data.map(item=>{
										item.checked = false;
										return item;
									});
									result.data.forEach((item)=>{
										self.goodsList.push(item) ;
									})
								}
								self.pageSize = result.per_page;//每页条数
								self.total = result.total;//总条数
								self.page = result.current_page; //当前页
								
								//判读是否有下一页数据
								if(self.total > self.pageSize * self.page){
									self.loadingType = 'more';
									self.nextPage = true;
								}else{
									self.loadingType = 'nomore';
									self.nextPage = false;
								}
							}
						}
						console.log(res.data);
					}
				});
				if(self.loadingType === 'loading'){
					//防止重复加载
					return;
				}
				self.loadingType = 'loading';
			}, 
			//禁止手指滑动
			stopTouchMove: function() {
			  return false;
			},

			
			
			//触发加载更多
			loadMore(){
				let self = this;
				if(self.nextPage){
					self.page = self.page +1;
					//调接口更新数据
					self.loadData();
				}
			},
			//底部tab切换
			tabClick(index){
				
				let self = this;
				let goodsIdArr= [];
				
				self.goodsList.forEach((item,index)=>{
					if(item.checked){
						goodsIdArr.push(item.goods_id);
					}
					
				})
				goodsIdArr.forEach((item,index)=>{
					if(goodsIdArr.length-1 > index){
						self.goodsId += item+','
					}else{
						self.goodsId += item;
					}
					
				})
				if(goodsIdArr.length == 0){
					uni.showToast({title:'请先选择商品',icon:'none'});
				}else{
					//调接口处理
					if(index == 0){ //批量下架
						 uni.request({
							url: 'https://wxshop.qclike.cn/api/admins/upordowngoods',
							header:{
								'content-type': 'application/x-www-form-urlencoded', 
							},
							method:'POST',
							data:{
									token:self.token,
									status:20,
									goods_id:self.goodsId
								},
								success: function(res) {
									if(res.data.code == 1){
										 self.loadData();
									} else if(res.data.code == 0){
										let msg = res.data.msg
										uni.showToast({title: msg,icon:"none"});
									}
							}
						});						
						
					}else if(index == 1){
						
						if(self.specClass === 'show'){
							self.specClass = 'hide';
							setTimeout(() => {
								self.specClass = 'none';
							}, 250);
						}else if(self.specClass === 'none'){
							self.specClass = 'show';
						}
						uni.request({
							url: 'https://wxshop.qclike.cn/api/admins/showlist', 
							method:'POST',
							data:{
								token:self.token
							},
							success: function(res) {
								if(res.data.code == 1){
									self.categoryList =  res.data.data.categorydata;
								} else if(res.data.code == 0){
									
								}
								console.log(res.data);
							}
						});
						
						//改分类
						
					}
					
				 
				 
				 
				}
			},
			//选择批量操作
			radioSelect(index){
				let self = this;
				self.goodsList[index].checked = !self.goodsList[index].checked;
				//进行强制渲染
				self.$forceUpdate();
				
			},
			//弹窗开关
			toggleSpec() {
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
				}
			},
			//确认按钮
			toggleSpecTab(todo){
				let self = this;
				if(self.specClass === 'show'){
					self.specClass = 'hide';
					setTimeout(() => {
						self.specClass = 'none';
					}, 250);
				}else if(self.specClass === 'none'){
					self.specClass = 'show';
				}
				
				 uni.request({
					url: 'https://wxshop.qclike.cn/api/admins/goodscate',
					method:'POST',
					header:{
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data:{
							token:self.token,
							goods_id:self.goodsId,
							cate_id:todo.id
							
						},
						success: function(res) {
							if(res.data.code == 1){
								self.loadData();
							} else if(res.data.code == 0){
								let msg = res.data.msg
								uni.showToast({title: msg,icon:"none"});
							}
					}
				});						
				
			},
			
			//新增分类
			addClassification(){
				this.addClass = 'show';
				this.specClass = 'none';
			},
			//确认新增分类
			tabConfirm(){
				let self = this;
				if(!self.classification){ 
					uni.showToast({title: '请输入分类名称',icon:"none"});
					return ; 
				}
				self.specClass= 'show';
				self.addClass = 'none';
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
								self.specClass = 'none';
								self.$nextTick(function(){
									self.tabClick(1);
								})
								
							} else if(res.data.code == 0){
								let msg = res.data.msg
								uni.showToast({title: msg,icon:"none"});
							}
					}
				});		
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
			}
			
			
		}
	}
</script>

<style lang="scss">
	
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
			text-align: center;
			background: #fff;
			.radio{
				width: 50upx;
				height: 50upx;
				margin: auto 10upx ;
				
			}
			.goods-img{
				width: 180upx;
				height: 180upx;
				border-radius: 20upx;
			}
			.goods-right{
				width: 450upx;
				margin-left: 20upx;
				text-align: left;
				display: flex;
				flex-direction: column;
				align-content: space-between;
				.title{
					display: inline-block;
					width: 100%;
					font-size: 28upx;
					color: #333;
					height: 60upx;
					line-height: 60upx;
					overflow: hidden;
                    white-space: nowrap;
					text-overflow: ellipsis;
				}
				.price{
					display: inline-block;
					width: 100%;
					font-size: 28upx;
					color: #C5091D;
					font-size: 28upx;
					margin-top: 20upx;
				}
				.container{
					display: flex;
					flex-direction: row;
					height: 60upx;
					line-height: 60upx;
					.sales-actual,.stock{
						flex: 1;
						font-size: 24upx;
						color: #807c87;
						.number{
							font-size: 24upx;
							color: #333;
						}
					}
				}
				
				
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
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
</style>
