<template>
	<view class="content">
		
		<swiper  class="swiper-box" catchtouchmove="stopTouchMove">
			<swiper-item class="tab-content"  >
				<scroll-view 
					class="list-scroll-content swiper-no-swiping" scroll-y
					
				>
					<!-- 空白页  @scrolltolower="loadData" -->
					<empty v-if=" orderList.length === 0"></empty>
					<!-- 新增商品 -->
					<view  class="add-goods">
						<view class="goods-list-item">
							<view class="goods-item">
								<text class="goods-title">商品名称</text>
								<input type="text" placeholder="请输入商品名称" class="goods-name" v-model="goodsName">
							</view>
							<view class="goods-item">
								<text class="goods-title">商品类别</text>
								<input type="text" placeholder="请选择商品类别" v-model="classifyName"
								 class="goods-name" disabled @tap.stop="freightTemplate(1)">
								<image src="../../static/sort-icon.png" mode="" class="sort-icon"></image>
							</view>
							<view class="goods-item-picture">
								<text class="goods-title">商品图片</text>
								<view class="add-pictrue" @tap="changeImg" v-show="showImg"></view>
								<image class="upload-img"  v-show="!showImg" :src="uploadPictures" 
								mode="aspectFill" @tap="lookBigImg(uploadPictures)"></image>
								<image src="../../static/delete.png"  v-show="!showImg" @tap.stop="deleteTemplate"
								class="sort-icon"></image>
							</view>
						</view>
						<!-- 间隙 -->
						<view class="blank"></view>
						
						<view class="goods-list-item ">
							<view class="goods-item">
								<text class="goods-title">商品价格</text>
								<input type="number" placeholder="请输入商品价格" v-model="goodsPrice" class="goods-name">
							</view>
							<view class="goods-item">
								<text class="goods-title">当前库存数量</text>
								<input type="number" placeholder="请输入当前库存数量" v-model="stockNum" class="goods-name">
							</view>
							<view class="goods-item">
								<text class="goods-title">商品重量（KG）</text>
								<input type="text" placeholder="请输入商品重量" v-model="goodsWeight" class="goods-name">
							</view>
						</view>
						
						<!-- 间隙 -->
						<view class="blank"></view>
						<!-- 详情 -->
						<view class="goods-list-item">
							<view class="goods-item-detail" @tap="detailOperation">
								<text class="goods-title">详情描述</text>
								<textarea class="textarea"  placeholder="请输入详情描述" v-html="content" v-model="content" />
							</view>
							<view class="goods-item">
								<text class="goods-title">预设开售时间</text>
								<ruiDatePicker fields="second"
									start="2010-00-00 00:00:00"
									end="2030-12-30 23:59:59"
									:value="openTime"
									@change="bindChange"
									@cancel="bindCancel" class="goods-name" >
								</ruiDatePicker>
								<image src="../../static/sort-icon.png" mode="" class="sort-icon"></image>
							</view>
							<view class="goods-item">
								<text class="goods-title">分销金额</text>
								<input type="number" placeholder="请输入分销金额" v-model="fenxiao" class="goods-name">
							</view>
							
							<view class="goods-item">
								<text class="goods-title">运费模版ID</text>
								<input type="text" placeholder="请选择" v-model="deliveryName"
								class="goods-name" disabled @tap.stop="freightTemplate(2)">
								<image src="../../static/sort-icon.png" mode="" class="sort-icon"></image>
							</view>
							
						</view>
						<view class="tab-list">
							<view class="tab-item" v-for="(item,index) in tabList" :key="index" 
							:class="{active:goodsStatusIndex == index}"  @tap="selectItem(item)">
								{{item.name}}
							</view>
							
						</view>
						<!-- 间隙 -->
						<view class="list-blank"></view>
					</view>
					
					
					
				</scroll-view>
			</swiper-item>
		</swiper>
		 <!--查看大图-->
		<view class="modal-frame" v-if="showBigImg" @click="cancelDownload">
			<view class="modal-box">
				<image :src="bigImg" mode="" class="sort-icon"></image>
			</view>

		</view>
		<!-- 上架或分类 -->
		<view class="tab-bar">
			<view class="tab-item" @tap="addConfirm" >确认添加</view>
		</view>
		<!-- 运费模板id -->
		<view class="popup" :class="specClass"  @tap="toggleSpec">
			<view class="mask"></view>
			<view class="layer">
				<view v-for="(item,index) in freightList" :key="index" class="attr-list" >
					<view class="item-list" @tap="toggleSpecTab(item)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
			
	</view>
</template> 

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	
	import ruiDatePicker from '@/components/rattenking-dtpicker.vue';
	export default {
		components: {
			uniNavBar,
			ruiDatePicker,
			
		},
		data() {
			return {
				tabIndex: 0,
				specClass: 'none',
				showImg:true,
				bigImg:'',
                showBigImg:false,
				orderList:[111],//订单列表
				freightList:[],//运费模版ID
				classifyName:'',//类名
				classifyId:'',//类名
				goodsName:'',//商品名称
				goodsPrice:null,//商品价格
				stockNum:null,//库存数
				fenxiao:null,//商品分销金额
				deliveryName:'',//运费模板id
				deliveryId:'',//运费模板id
				openTime:'',//开售时间
				content:'',//描述
				goodsStatus:10,//商品状态 10:上架 20:下架 30:售空
				token:'',
				goodsStatusIndex:0,
				uploadPictures:'',//
				currentTime:null,//当期时间
				selectCurrentTime:null,//选择的预售时间
				goodsWeight:'',//商品重量
				newTime :'',
				tabList:[
					{
						index:0,
						name:'上架',
						goods_status:10
					},
					{
						index:1,
						name:'下架',
						goods_status:20
					},
					{
						index:2,
						name:'售空',
						goods_status:30
					}
				],
				goodsId:'',//商品的id
				
				
				
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
				this.goodsId = options.goods_id;
				this.loadData();
			}
			
			//获取当前时间
			//补位 当某个字段不是两位数时补0
			function fnW(str){
				var num;
				str>10?num=str:num="0"+str;
				return num;
			} 
			function fnDate(){
				
				// new Date(now .getTime() + 300000); 
				//1. js获取当前时间
				var date=new Date();
				//2. 获取当前分钟
				var min=date.getMinutes();
				//3. 设置当前时间+5分钟：把当前分钟数+5后的值重新设置为date对象的分钟数
				date.setMinutes(min+5);
				//4. 测试
				console.log(date);
				
				var year=date.getFullYear();//当前年份
				var month=date.getMonth();//当前月份
				var data=date.getDate();//天
				var hours=date.getHours();//小时
				var minute=date.getMinutes();//分
				var second=date.getSeconds();//秒
				var time=year+fnW((month+1))+fnW(data)+fnW(hours)+fnW(minute)+fnW(second);
				return time;
			}
			this.currentTime = fnDate();
		},
		
		
		methods: {
			
			//获取商品详情信息
			loadData(){
				let self = this;
				uni.request({
					url: 'https://wxshop.qclike.cn/api/admins/goodsDetail',
					method:'POST',
					header:{
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data:{
						token:self.token,
						goods_id:self.goodsId
					},
					success: function(res) {
						
						if(res.data.code == 1){
							let result = res.data.data.detail;
							self.goodsName = result.goods_name;
							self.classifyName = result.category.name;
							self.classifyId = result.category.id;
							self.showImg = !self.showImg;
							if(result.image){
								self.uploadPictures = result.image;
							}
							self.goodsPrice = result.spec[0].goods_price;
							self.stockNum = result.spec[0].stock_num;
							self.goodsWeight = result.spec[0].goods_weight;
							self.content = result.content;
							self.openTime = result.createtime;
							self.deliveryName = result.freight.name;
							self.deliveryId = result.freight.id;
							console.log(333,result.spec[0].goods_status)
							if(result.goods_status == 10){
								self.goodsStatusIndex = 0;
							}else if(result.goods_status == 20){
								self.goodsStatusIndex = 1;
							}else if(result.goods_status == 30){
								self.goodsStatusIndex = 2;
							}
							let detailInfo = uni.getStorageSync('detailInfo');
							if(detailInfo!==undefined){
								self.content = detailInfo.content;
							}
							console.log(detailInfo)
							
							// self.fenxiao = result;//商品分销金额
							
						} else if(res.data.code == 0){
							let msg = res.data.msg
							uni.showToast({title: msg,icon:"none"});
						}
					}
				});
			},
			//确认添加
			addConfirm(){
				let self = this;
				//验证
				if(!self.goodsName){ 
					uni.showToast({title: '请输入商品名称',icon:"none"});
					return ; 
				}
				if(!self.classifyId){ 
					uni.showToast({title: '请选择商品类别',icon:"none"});
					return ; 
				}
				if(!self.uploadPictures){
					uni.showToast({title: '请选择商品图片',icon:"none"});
					return ; 
				}
				if(!self.goodsPrice  ){ 
					uni.showToast({title: '请输入商品价格',icon:"none"});
					return ; 
				}
				if(!self.stockNum){ 
					uni.showToast({title: '请输入商品库存数',icon:"none"});
					return ; 
				}
				if(!self.goodsWeight){ 
					uni.showToast({title: '请输入商品重量',icon:"none"});
					return ; 
				}
				
				if(!self.content){ 
					uni.showToast({title: '请输入详情描述',icon:"none"});
					return ; 
				}
				if(!self.openTime){ 
					uni.showToast({title: '请选择开售时间',icon:"none"});
					return ; 
				}else{
					
					if(self.currentTime == self.newTime){
						uni.showToast({title: '预售时间要大于当前时间',icon:"none"});
						return ; 
					}
					console.log(this.currentTime,this.selectCurrentTime)
					if(self.currentTime > self.selectCurrentTime){
						uni.showToast({title: '预售时间要大于当前时间',icon:"none"});
						return ; 
					}
				}
				
				if(!self.fenxiao){ 
					uni.showToast({title: '请输入分销金额',icon:"none"});
					return ; 
				}
				if(!self.deliveryId){ 
					uni.showToast({title: '请选择运费模板',icon:"none"});
					return ; 
				}
			
				uni.request({
					url: 'https://wxshop.qclike.cn/api/admins/addGoods',
					method:'POST',
					data:{
						token:self.token,
						row:{
							goods_name:self.goodsName,
							category_id:self.classifyId,
							content:self.content,
							sales_starttime:self.openTime,
							fenxiao:self.fenxiao,
							images:self.uploadPictures,
							delivery_id:self.deliveryId,
							goods_status:self.goodsStatus
							
						},
						spec:{
							goods_price:self.goodsPrice,
							stock_num:self.stockNum,
							goods_weight:self.goodsWeight
						}
						
					},
					success: function(res) {
						if(res.data.code == 1){
							uni.navigateTo({
								url:'/pages/tabBar/home'
							})
						} else if(res.data.code == 0){
							let msg = res.data.msg
							uni.showToast({title: msg,icon:"none"});
						}
					}
				});
			}, 
			//禁止手指滑动
			stopTouchMove: function() {
			  return false;
			},

			
			//改变时间
			bindChange(picker){
				var a = picker.split(' ')[0];
				var b = picker.split(' ')[1];
				var aArr = a.split('-');
				var bArr = b.split(':');
				
				this.selectCurrentTime = aArr[0]+aArr[1]+aArr[2]+bArr[0]+bArr[1]+bArr[2];
				//进行强制渲染
				 this.$forceUpdate();
			    this.openTime = picker;
				
			},
			//点击取消操作
			bindCancel(){
				console.log(2222)
			},
			//点击返回按钮
			 backButton(){ 
				uni.navigateTo({
					url:'/pages/tabBar/home'
				})
			},
			//选择商品状态
			selectItem(todo){
				let self = this;
				self.goodsStatusIndex = todo.index;
				self.goodsStatus = todo.goods_status;
				
			},
			//上传图片
			changeImg(){
				let self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera '], //从相册选择或相机
					success: function (res) {
					 const tempFilePaths = res.tempFilePaths;
					 const uploadTask = uni.uploadFile({
					  url : 'https://wxshop.qclike.cn/api/admins/upload',
					  filePath: tempFilePaths[0],
					  name: 'file',
					  data:{
						  token:self.token,
						  file:tempFilePaths[0]
					  },
					  method:'POST',
					  success: function (uploadFileRes) {
						  if(JSON.parse(uploadFileRes.data).code == 1){
							  self.showImg = !self.showImg;
							   self.uploadPictures = JSON.parse(uploadFileRes.data).data.url;
						  }
						  console.log(9999,JSON.parse(uploadFileRes.data).data.url)
						 /* //进行强制渲染
						  self.$forceUpdate(); */
						   // console.log('进行强制渲染',uploadFileRes.data);
						}
					 });
				 
					 uploadTask.onProgressUpdate(function (res) {
						  self.percent = res.progress;
						  /* console.log('上传进度' + res.progress);
						  console.log('已经上传的数据长度' + res.totalBytesSent);
						  console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend); */
						 });
					},
					error : function(e){
					 console.log(e);
					}
				});
			},
			
			//查看大图
			lookBigImg(todo){
				let self = this;
				self.bigImg = todo;
				self.showBigImg = true;
			},
			 //关闭查看大图
			cancelDownload:function () {
				let self = this;
				self.showBigImg = false;
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
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
				}
				if(todo && this.tabIndex == 1){
					
					this.classifyId = todo.id;
					this.classifyName = todo.name;
				}
				//运费模版ID
				if(todo && this.tabIndex == 2){
					this.deliveryId = todo.id;
					this.deliveryName = todo.name;
				}
				
			},
			//编辑详情
			detailOperation(){
				var provider={};
				provider.content = this.content;
				//存下本地的数据
				uni.setStorage({//缓存用户登陆状态
					key: 'detailInfo',  
					data: provider  
				}) 
				uni.navigateTo({
					url:`/pages/LevineHua-editor/LevineHua-editor`,
					// url:`/pages/detail/goodsDetail?goods_id=${goodsId}`
				})
			},
			
			//删除图片
			deleteTemplate(){
				let self = this;
				self.showImg = !self.showImg;
				self.uploadPictures = '';
			},
			
			//运费模板
			freightTemplate(index){
				let self = this;
				self.tabIndex = index;
				if(self.specClass === 'show'){
					self.specClass = 'hide';
					setTimeout(() => {
						self.specClass = 'none';
					}, 250);
				}else if(self.specClass === 'none'){
					self.specClass = 'show';
				}
				//选择类别接口
				if(index == 1){
					uni.request({
						url: 'https://wxshop.qclike.cn/api/admins/showlist', 
						method:'POST',
						data:{
							token:self.token
						},
						success: function(res) {
							if(res.data.code == 1){
								self.freightList =  res.data.data.categorydata;
							} else if(res.data.code == 0){
								
							}
							console.log(res.data);
						}
					});
				}
				//运费模板
				if(index == 2){
					uni.request({
						url: 'https://wxshop.qclike.cn/api/admins/freightlist',
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
				}
				
				
			}
					
		}
	}
</script>

<style lang="scss">
	
	page, .content{
		background: #ececec;
		height: 100%;
	}
	.body{
		/*距离顶部范围应该在116-120范围内*/
		padding-top: 118upx;
		top: var(--status-bar-height);
	}
	/deep/.uni-navbar{
		background-color: #C5091D !important;
		.uni-icon-back{
			color: #fff !important;
		}
	}
	.uni-page-head{
		display: flex;
		flex-direction: row;
		.uni-page-head-hd{
			
			.uni-page-head-btn{
				width: 90%;
				.uni-btn-icon{
					display: inline-block;
					width: 90%;
					text-align: right;
				}
			}
		}
	}
	
	.tab-bar{
		display: flex;
		height: 50px;
		padding: 0 5px;
		background: #C5091D;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.tab-item{
			flex: 1;
			height: 50px;
			line-height: 50px;
			font-size: 30upx;
			color: #fff;
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
		height: calc(100% - 50px);
	}
	.modal-frame{
		 width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0,0,0,0.8);
		z-index: 9999999;
		.modal-box{
			width: 100%;
			background-size: cover;
			position: fixed;
			top: 50%;
			left: 50%;
			border-radius: 10px;
			margin: auto;
			-moz-transform: translate(-50%, -50%);
			-ms-transform: translate(-50%, -50%);
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			z-index: 200;
			.sort-icon{
				width: 750upx;
				box-sizing: border-box;
				img{
					width: 100%;
					background-size: cover;
				}
			}
			/* .sort-icon{
				width: 100%;
				height: 100%;
			} */
			
		}
	}
	.list-scroll-content{
		height: 100%;
	}
	
	.uni-swiper-item{
		height: auto;
	}
	.add-goods{
		display: flex;
		flex-direction: column;
		background: #fff;
		
		.goods-list-item{
			width: 100%;
			margin: 0;
			padding-left: 32upx;
			background: #fff;
			.goods-item-detail{
				width: 100%;
				display: flex;
				flex-direction: row;
				border-bottom: 1px solid #EFEFEF;
				.goods-title{
					width: 222upx;
					text-align: left;
					font-size: 30upx;
					color: #333333;
					margin-top: 30upx;
					line-height: 100upx;
					vertical-align: middle;
				}
				.textarea{
					height: 100upx;
					line-height: 100upx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				uni-textarea{
					max-height: 140upx;
					padding-top: 20upx;
					 overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					.uni-textarea-wrapped{
						.uni-textarea-placeholder{
							width: 98%;
							line-height: 40upx;
							
				
						}
					}
				}
				.uni-textarea-placeholder{
					width: 98%;
					line-height: 40upx;
					.uni-textarea-compute{
						line-height: 100upx;
					}
					.uni-textarea-textarea{
						line-height: 100upx;
					}
				}
				.goods-name{
					flex: 1;
					height: 98upx;
					text-align: left;
					text-indent: 50upx;
					// margin-left: 40upx;
					font-size: 30upx;
					max-height:160upx; 
					height: 100upx;
					color: #333333;
					overflow: hidden;
					width: 50%;
					text-overflow:ellipsis;
					white-space: nowrap;
					.uni-textarea-wrapped{
						width: 50%;
						text-overflow:ellipsis;
						white-space: nowrap;
						// width: 98%;
						line-height: 40upx;
						padding: 20upx 0;
					}
				}
			}
			.goods-item{
				width: 100%;
				height: 98upx;
				line-height: 100upx;
				display: flex;
				flex-direction: row;
				border-bottom: 1px solid #EFEFEF;
				position: relative;
				.goods-title{
					width: 222upx;
					text-align: left;
					font-size: 30upx;
					color: #333333;
					
				}
				.goods-name{
					flex: 1;
					height: 98upx;
					text-align: left;
					text-indent: 50upx;
					line-height: 100upx;
					font-size: 30upx;
					color: #333333;
					// margin-left: 40upx;
					width: 90%;
					text-overflow:ellipsis;
					white-space: nowrap;
					&.rui-picker{
						border: none;
					}
				}
				.sort-icon{
					position: absolute;
					top: 38upx;
					right: 32upx;
					width: 14upx;
					height: 24upx;
					background-size: cover;
				}
			}
			.goods-item-picture{
				width: 100%;
				display: flex;
				flex-direction: column;
				position: relative;
				.goods-title{
					height: 90upx;
					line-height: 90upx;
					text-align: left;
					font-size: 30upx;
					color: #333333;
				}
				.add-pictrue{
					margin: 0 0 40upx 0;
					width: 160upx;
					height: 160upx;
					background-image:url('../../static/add-picture.png');
					background-size:cover;
					background-repeat: no-repeat;
				}
				.upload-img{
					margin: 0 0 40upx 0;
					width: 160upx;
					height: 160upx;
					background-size:cover;
				}
				.sort-icon{
					position: absolute;
					top: 80upx;
					left: 140upx;
					width: 40upx;
					height: 40upx;
					background-size: cover;
				}
			}
			
			&.single{
				padding-top: 20upx;
			}
			
		}
	
        .blank{
			width: 100%;
			height: 24upx;
			background-color: #ececec;
		}
		.list-blank{
			width: 100%;
			height: 88upx;
			background-color: #ececec;
		}
		.tab-list{
			width: 100%;
			height: 160upx;
			line-height: 160upx;
			display: flex;
			flex-direction: row;
			margin: auto;
			justify-content: space-between;
			background-color: #ececec;
			.tab-item{
				margin:30upx 20upx ;
				flex: 1;
				height: 80upx;
				line-height: 80upx;
				background-color: #fff;
				border-radius: 20upx;
				text-align: center;
				
				font-size: 30upx;
				color: #333333;
				&.active{
					background: #C5091D;
					color: #fff;
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
	
	
</style>
