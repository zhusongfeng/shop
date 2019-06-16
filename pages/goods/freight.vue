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
					<empty v-if=" freightList.length === 0"></empty>
					
					
					<!-- 订单列表 -->
					<view  v-for="(item,index) in freightList" :key="index"
						class="goods-list">
						<view class="goods-list-item" @tap.stop="freightTemplate(item)">{{item.name}}</view>
					</view>
					
					
					<!-- <uni-load-more :status="loadingType"></uni-load-more> -->
					
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
</template> 

<script>
	// 运费部分
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				tabCurrentIndex: 0,
				freightList:[],//运费模板列表
				loadingType: 'more', //more 是加载中   nomore是加载结束
				total:0,//总条数
				pageSize:0,//每页条数
				page:1,//当前页
				token:''
				
			};
		},
		
		async onLoad(){
			
			let userInfo=uni.getStorageSync('userInfo');
			let token='';
			if(userInfo!==undefined){
				this.token= userInfo.token;
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
			//获取运费模板列表
			loadData(){
				let self = this;
				
				uni.request({
					url: 'http://wxshop.qclike.cn/api/admins/freightlist',
					method:'POST',
					data:{
						token:self.token
					},
					success: function(res) {
						if(res.data.code == 1){
							self.freightList =  res.data.data.datalist;
						} else if(res.data.code == 0){
							
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
					self.togglePages(self.tabCurrentIndex);
				}
			},
			//选中模板
			freightTemplate(todo){
				
				let deliveryId = todo.id;
				let deliveryName = todo.name;
				uni.navigateTo({
					url:`/pages/goods/addgoods?deliveryId=${deliveryId}&deliveryName=${deliveryName}`
				})
				
			}
			
			
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
			font-size: 30upx;
			color: #333;
			text-align: center;
			background: #fff;
			
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
