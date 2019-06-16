<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400" autoplay>
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image
							:src="item" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="introduce-section">
			<text class="title">{{commodityDetails.goods_name}}</text>
			<view class="price-box">
				<text class="price-tip">价格：¥</text>
				<text class="price">{{goods_price}}</text>
				
			</view>
			<view class="bot-row">
				<text>销量: {{commodityDetails.goods_sales}}</text>
				<text>库存: {{stock_num}}</text>
			</view>
		</view>
		<!-- 规格信息 -->
		<view class="specs-info" v-if="specList">
			<!-- 名称 -->
			<view class="specs-info-name"  v-for="(item,index) in specList.spec_attr">
				<view class="name">
					{{item.group_name}}
				</view>
				<view class="specs-info-list" v-for="(todo,index) in item.spec_items">
					{{todo.spec_value}}
				</view>
				
			</view>
			
			
			
		</view>
		
		
		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<view class="evalution">
				<rich-text :nodes="contentHtml" type="text"></rich-text>
			</view>
			
		</view>
	</view>
</template>

<script>
	var graceRichText = require("../../static/richText.js");
	import uniNumberBox from '@/components/uni-number-box.vue';
	
	export default{
		components: {
			uniNumberBox
		},
		data() {
			return {
				specSelected:[],
				favorite: false,
				shareList: [],
				goods_price:0,//商品价格
				line_price:0,//
				stock_num:1,//库存
				commodityDetails:{},//商品详情信息
				imgList: [], //商品详情顶部轮播图列表
				contentHtml:'',//后台返回的HTML代码
				specList: {},  //尺寸 和颜色
				specChildList: [],
				ContrastList: [],
				
				goods_id:'',
				token:'',
				number:1,//商品数量
				specSkuId:'',
				
				
			};
		},
		async onLoad(options){
			
			let userInfo=uni.getStorageSync('userInfo');
			if(userInfo!==undefined){
				this.token = userInfo.token;
				
			}else{
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
			
			if(options.goods_id){
				this.goods_id = options.goods_id;
				this.loadData();
			}
			
			
		},
		 
		methods:{
			
			//获取
			async loadData(){
				let self = this;
				uni.request({
					url: 'http://wxshop.qclike.cn/api/admins/goodsDetail', 
					method:'POST',
					header:{
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data:{
						token:self.token,
						goods_id:self.goods_id
					},
					success: function(res) {
						let resulrt = res.data.data.detail;
						
						if(res.data.code == 0){
							let msg = res.data.msg
							uni.showToast({title: msg,icon:"none"});
						}
						if(res.data.code == 1){
							self.imgList = resulrt.imgs_url;
							self.commodityDetails = resulrt;
							
							self.goods_price = resulrt.spec[0].goods_price;
							
							self.stock_num =resulrt.spec[0].stock_num;
							self.goodsStatus = resulrt.goods_status;
							self.specSkuId = resulrt.spec[0].spec_sku_id;
							self.specList = res.data.data.specData;
							console.log(111111111,self.specList )
							if(res.data.data.specData){
								self.ContrastList = res.data.data.specData.spec_list;
							}
							
							 // 强化 richText    
					        self.contentHtml = graceRichText.format(resulrt.content);
							
							
							
							
						}
						
						
					}
				});
				
			},
			
		
		},

	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 422upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
				background-size: cover;
			}
		}
		
	}
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;
		
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-primary;
		}
		.price{
			font-size: $font-lg + 2upx;
		}
		.m-price{
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
			text{
				flex: 1;
			}
		}
	}
	.specs-info{
		background: #fff;
		padding: 20upx 30upx;
		.specs-info-name{
			
			.name{
				height: 60upx;
				line-height: 60upx;
				font-size: 30upx;
				color: #333333;
			}
			.specs-info-list{
				display: inline-block;
				width: 150upx;
				height: 60upx;
				line-height: 60upx;
				font-size: 30upx;
			    color: #333333;
			}
		}
		
		
	}
	
	
	.eva-box{
		display: flex;
		padding: 20upx 0;
		.portrait{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
			.con{
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
	}
	/*  详情 */
	.detail-desc{
		background: #fff;
		margin-top: 16upx;
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
				
			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
		.evalution{
			display:flex;
			flex-direction:column;
			background: #fff;
			padding: 20upx 20upx 40upx;
		}
		
	}
	
	
</style>
