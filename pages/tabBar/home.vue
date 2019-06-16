<template>
	<view class="content">
		<!-- 实时数据 -->
		<view class="real-time-data">
			<view  class="real-time">
				<text class="title">成交客户（人）</text>
				<text class="number">{{salesToday.user_total}}</text>
			</view>
			<view  class="real-time">
				<text class="title">今日销量（件）</text>
				<text class="number">{{salesToday.goods_total}}</text>
			</view>
			<view  class="real-time">
				<text class="title">今日成交额（元）</text>
				<text class="number">{{salesToday.money_total}}</text>
			</view>
			
		</view>
		<!-- 出售或下架情况 -->
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex == index}"
				@click="tabClick('navbar',index)"
			>
				{{item.text}}
			</view>
		</view>
		<!-- 排序 -->
		<view class="sort">
			<view  class="target"
				v-for="(target,index) in orderbyList" @tap="select(index)" :key="index" :class="[target.selected?'on':'']"
			>
				{{target.text}}
				<view v-if="target.orderbyicon" class="icon" :class="target.orderbyicon[target.orderby]"></view>
			</view>
		</view>
		

		<swiper :current="tabCurrentIndex" class="swiper-box">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex" catchtouchmove="stopTouchMove">
				<scroll-view 
					class="list-scroll-content swiper-no-swiping" 
					scroll-y
					 
					@scrolltolower="loadMore"
				>
					<!-- 空白页  @scrolltolower="loadData" -->
					<empty v-if=" goodsList.length === 0"></empty>
					
					
					<!-- 订单列表 -->
					<view  v-for="(item,index) in goodsList" :key="index"
						class="goods-list"
						@tap="goodsDetail(item.goods_id)"
						
					>
						<view class="goods-list-item">
							<image class="goods-img" :src="item.images" mode="aspectFill"></image>
							<view class="goods-right">
								<text class="title">{{item.goods_name}}</text>
								<text class="price">￥{{item.goods_price}}</text>
								<view class="container">
									<view class="sales-actual">总销量 <text class="number">{{item.goods_sales}}</text></view>
									<view class="stock">库存 <text class="number">{{item.stock_num}}</text></view>
								</view>
								<view class="time">添加时 <text class="number">{{item.createtime}}</text></view>
								
							</view>
						</view>
					</view>
					
					
					<uni-load-more :status="loadingType"></uni-load-more>
					
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 添加商品或批量管理 -->
		<view class="tab-bar">
			<view 
				v-for="(item, index) in tabList" :key="index" 
				class="tab-item" 
				@click="addClick(index)"
			>
				{{item.text}}
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
				tabCurrentIndex: 0,
				salesToday:{},
				tabSelectIndex:0,
				
				//订单列表
				navList: [{
						state: 0,
						text: '出售中',
					},
					{
						state: 1,
						text: '已下架',
					}
				
				],
				tabList: [{
						state: 0,
						text: '添加商品',
					},
					{
						state: 1,
						text: '批量管理',
					},{
						state: 2,
						text: '分类管理',
					}
				
				],
				orderbyList:[
					{text:"添加时间",selected:true,orderbyicon:['sheng','jiang'],orderby:0},
					{text:"总销量",selected:false,orderbyicon:['sheng','jiang'],orderby:0},
					{text:"库存",selected:false,orderbyicon:['sheng','jiang'],orderby:0}
				],
				orderby:"sheng",
				
				goodsList:[],//获取商品列表
				loadingType: 'more', //more 是加载中   nomore是加载结束
				total:0,//总条数
				pageSize:0,//每页条数
				page:1,//当前页
				tempNumber:0,
				nextPage:false,//是否有下一页
				token:'',
				sortType:'asc'  ,//排序方式: asc=升序 ; desc=降序
				sortName:'createtime',//排序字段:createtime=添加时间，sales_actual=销量,stock_num=库存
				goodsStatus:10,//商品状态:10=已上架 20=已下架
				
			};
		},
		
		async onLoad(){
			let userInfo=uni.getStorageSync('userInfo');
			
			if(userInfo!==undefined){
				this.token = userInfo.token;
				this.loadData();
				this.goodsListModular();
			}else{
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
			
			
		},
		
		methods: {
			//获取今日销售情况
			async loadData(token){
				let self = this;
				uni.request({
					url: 'http://wxshop.qclike.cn/api/admins/todayTotal', 
					header:{
						// 'token':token,
						'X-Requested-With': 'XMLHttpRequest',
						"Accept": "application/json",
						"Content-Type": "application/json; charset=UTF-8",
					},
					method:'GET',
					data:{
						token:self.token
					},
					
					success: function(res) {
						if(res.data.code == 1){
							self.salesToday = res.data.data;
						}
						
					}
				});
				
			},
			
			//获取商品列表
			async goodsListModular(){
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
						sort_type:self.sortType,
						sort_name:self.sortName,
						goods_status:self.goodsStatus
					},
					
					success: function(res) {
						if(res.data.code == 1){
							let result = res.data.data;
							if(self.page == 1){//第一次加载
								self.goodsList = result.data;
							}else{//加载更多
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
						if(res.data.code == 0){
							let title = res.data.msg
							uni.showToast({title:title,icon:'none'});
							
						}
						
					},
					
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

			
			//顶部tab点击
			tabClick(todo,index){
				if(todo == 'navbar' && index != 'undefined'){
					this.tabCurrentIndex = index;
					if(this.tabCurrentIndex == 0){
					   this.goodsStatus = 10;
					}else{
						this.goodsStatus = 20;
					}
				}
				
				this.goodsList = [];
				this.pageSize = 0;
				this.total = 0;
				this.page = 1;
				//上架商品或下架商品
				this.goodsListModular();
				
				
			},
			//触发加载更多
			loadMore(){
				let self = this;
				if(self.nextPage){
					self.page = self.page +1;
					//调接口更新数据
					self.goodsListModular();
				}
			},
			//排序类型
			select(index){
				let self = this;
				switch(index) {
					 case 0:
						self.sortName = 'createtime';
						break;
					 case 1:
						self.sortName = 'sales_actual';
						break;
					case 2:
					    self.sortName = 'stock_num';
					    break;
					 default:
						break;
				} 
				let tmpTis = self.orderbyList[index].text+"排序 "
				if(self.orderbyList[index].orderbyicon){
					let type = self.orderbyList[index].orderby==0?'升序':'降序';
					if(self.orderbyList[index].selected){
						type = self.orderbyList[index].orderby==0?'降序':'升序';
						self.orderbyList[index].orderby = self.orderbyList[index].orderby==0?1:0;
					}
					console.log(type)
					switch(type) {
						 case '升序':
							self.sortType = 'asc';
							break;
						 case '降序':
							this.sortType = 'desc';
							break;
						 default:
							break;
					} 
					tmpTis+=type
				}
				self.orderbyList[index].selected = true;
				let len = self.orderbyList.length;
				for(let i=0;i<len;i++){
					if(i!=index){
						self.orderbyList[i].selected = false;
					}
				}
				self.tabClick();
			},
			//添加商品或批量操作
			addClick(todo){
				let self = this;
				
				console.log(222,todo)
				//todo 10,添加商品  20 批量操作
				if(todo == 0){
					uni.navigateTo({
						url:'/pages/goods/addgoods'
					})
					
				}else if(todo == 1){
					
					if(self.tabCurrentIndex == 0){
						//批量下架
						let index = 1;
						uni.navigateTo({
							url:`/pages/goods/manage`
						})
						
					}else if(self.tabCurrentIndex == 1){
						//批量上架架
						let index = 2;
						uni.navigateTo({
							url:`/pages/goods/manage1`
						})
					}
					
				}else if(todo == 2){
					//分类管理
					uni.navigateTo({
						url:'/pages/goods/category'
					})
				}
				
			},
			//详情页面
			goodsDetail(todo){
				var goodsId = todo;
				console.log(goodsId)
				uni.navigateTo({
					url:`/pages/detail/detail?goods_id=${goodsId}`,
					// url:`/pages/detail/goodsDetail?goods_id=${goodsId}`
				})
			}
			
		}
	}
</script>

<style lang="scss">
	@font-face {font-family:"HMfont-home";src:url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMMAAsAAAAAB3gAAALAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCfgqCXII4ATYCJAMMCwgABCAFhG0HQxuDBsiemjxBRCmUAtQ2VRCBG4ig2u+zZ3c/ortTgBIoQOVPBYSJYkUggWRSPqyjY2yEQyPe5FzmkfXucrOArBAKSdt/TjNmNTZyfrOTKAwgNQXmqbkEBgj2eS6nNz3A+YFyXHs9P2raURxQgHtR7yiyEknMW4bXLsaDeEygbVEkxYXiyhqgV+BVgbgmCQzQ55xKS2doCvWag0W8o9FMz9M24G34/fgvPvQktQxvPL5axIPc38m/U/JI9VSLIKjm80M7RsYWoBAXa4PHVHFxi0rbKaotAfuaFfxOqSp+Jwvlbv/wCImow+1dsAaGdEcqZnRrKhAggQzqaOI24Bmw02JRZmZ88bS/fq2vH6Y1yywb576F7tn3l1/5e7zm6Ze2+cW37DBXjFEftC+6U7vil0/zOvXIl3lf7cx/3DkeysBDV/tDQ5N7tli9AzsiHDgcO55136FS8LLTzBygm4Q9u6bCp1zAy0lh7v/L+PnQ0P71YAZeG0pE3eWwRIIOANX5dz4JQCX8hQLB+5z/hXZb5ofeVMCvjc0fKFEp+rs1bzkU/H5Vz67iarArF1vJlH4oO8g0SGi7EVU4OnY43jzr3U5omqVIGhaQNS2Rhd1CTcc26ppOo21TyfGOCUIlSgsbJhHC0DqSvp/IhnbIwh6gZu4BdcNQoe1iuC7sWAnJWEAQQxEP2V4ocQE/ph5qjDqrkNDpZUhWE4rrEJGlDIyLji1WSpAfkTm2yF1CPKUYYhLwwWL0HPJ6AzBIAm7E0WiR0mB6TAyue1M0F/ABo/MIhEEhPIjVC5JwAvywGE8ZS5+vggg6eTFIC6ejWAchZNL0UJxosT3IEqO/F+dehMi6COJRFAZhRIAPVIz8iJcUA6Bg/Tw3hENFE0fkg9LFSP1wX2P0+mbf952ANvxUjhQ5is4tRurpjHJLjF9IRbKIHAAA') format('woff2');}
	.icon {
		font-family:"HMfont-home" !important;
		font-size:26upx;
		font-style:normal;
		display: inline-block;
		margin-left: 8upx;
		margin-top: 2upx;
		&.sheng {
			&:before{content:"\e737";}
		}
		&.jiang {
			&:before{content:"\e736";}
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
		}
	}
	
	.swiper-box{
		height: calc(100% - 180px);
	}
	.list-scroll-content{
		height: 100%;
	}
	// 实时数据
	.real-time-data{
	    display: flex;
		flex-direction: row;
		width: 100%;
		background: #fff;
		padding: 0 5px;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.real-time{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 28upx;
			color: #333;
			position: relative;
			.title{
				text-align: center;
				height: 60upx;
				line-height: 60upx;
				width: 100%;
			}
			.number{
				text-align: center;
				height: 60upx;
				line-height: 60upx;
				width: 100%;
			}
		}
	
	}
	
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: #333;
			position: relative;
			&.current{
				color: #C5091D;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 80%;
					height: 0;
					border-bottom: 2px solid #C5091D;
				}
			}
		}
	}
	.sort{
		display: flex;
		flex-direction: row;
		width: 100%;
		background: #fff;
		padding: 0 5px;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.target{
			flex: 1;
			height: 40px;
			line-height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			margin-bottom: -2upx;
			color: #333;
			&.on{
				color: #C5091D;
			}
			
			
		}
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
			.goods-img{
				width: 180upx;
				height: 180upx;
				border-radius: 20upx;
			}
			.goods-right{
				width: 500upx;
				margin-left: 20upx;
				text-align: left;
				.title{
					display: inline-block;
					width: 100%;
					font-size: 28upx;
					color: #333;
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
				}
				.container{
					display: flex;
					flex-direction: row;
				}
				.sales-actual,.stock{
					flex: 1;
					font-size: 24upx;
					color: #807c87;
					.number{
						font-size: 24upx;
						color: #333;
					}
				}
				.time{
					display: inline-block;
					width: 100%;
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
