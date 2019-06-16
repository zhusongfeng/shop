<template>
	<view class="content">
		<swiper :current="tabCurrentIndex" class="swiper-box" catchtouchmove="stopTouchMove">
			<swiper-item class="tab-content"  >
				<scroll-view 
					class="list-scroll-content swiper-no-swiping" 
					scroll-y
					 
					@scrolltolower="loadMore"
				>
					<!-- 空白页  @scrolltolower="loadData" -->
					<empty v-if=" orderList.length === 0"></empty>
					
					
					<!-- 订单列表 -->
					<view  v-for="(item,index) in 3" :key="index"
						class="goods-list"
						@tap="orderDetails(item.id)"
						
					>
						<view class="goods-list-item">
							<image class="goods-img" src="../../static/p2.jpg" mode="aspectFill"></image>
							<view class="goods-right">
								<text class="title">这是一个标题，文字可能会很多。。。。。实话实说那是</text>
								<text class="price">￥10.23</text>
								<view class="container">
									<view class="sales-actual">总销量 <text class="number">123</text></view>
									<view class="stock">库存 <text class="number">123</text></view>
								</view>
								<view class="time">添加时 <text class="number">123</text></view>
								
							</view>
						</view>
					</view>
					
					
					<uni-load-more :status="loadingType"></uni-load-more>
					
				</scroll-view>
			</swiper-item>
		</swiper>
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
				orderList:[111],//订单列表
				loadingType: 'more', //more 是加载中   nomore是加载结束
				total:0,//总条数
				pageSize:0,//每页条数
				page:1,//当前页
				
				nextPage:false,//是否有下一页
				
			};
		},
		
		async onLoad(options){
			if(options.tabIndex){
				this.showTabIndex = options.tabIndex;
			}
			this.togglePages(options.state);
			
		},
		onShow() { //返回显示页面状态函数
			//，来进行局部刷新
			// this.loadData();
		},
		
		methods: {
			//获取订单列表
			loadData(){
				let self = this;
				self.$axios(self.$baseUrl.getOrderList,{
					page:self.page,
					params:self.searchKey
				})
				.then(res =>{
					let result = res.data.data;
					if(res.data.code == 1){
						if(self.page == 1){//第一次加载
							self.orderList = result.data;
						}else{//加载更多
					        result.data.forEach((item)=>{
								self.orderList.push(item) ;
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
					
				},(error) =>{
					console.log(error)
				})
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
					self.togglePages(self.tabCurrentIndex);
				}
			},
			
			
		}
	}
</script>

<style lang="scss">
	
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	.swiper-box{
		height: 100%;
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
