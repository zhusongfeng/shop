<template>
	<view class="content">
		<uni-nav-bar left-icon="back" v-on:clickLeft="backButton"   >
			
			<view class="navigation">
				<text class="left" @tap.stop="singleRule">单规格</text>
				<text class="right"  @tap.stop="multipleRule">多规格</text>
			</view>
		</uni-nav-bar>
		<swiper  class="swiper-box" catchtouchmove="stopTouchMove">
			<swiper-item class="tab-content"  >
				<scroll-view 
					class="list-scroll-content swiper-no-swiping" scroll-y>
					
					<!-- 新增商品 -->
					<view  class="add-goods">
						<view class="goods-list-item">
							<view class="goods-item">
								<text class="goods-title">商品名称</text>
								<input type="text" placeholder="请输入商品名称" class="goods-name" v-model="goodsName">
							</view>
							<view class="goods-item">
								<text class="goods-title">商品类别</text>
								<input type="text" placeholder="请选择商品类别" v-model="classifyName" class="goods-name" disabled  @tap.stop="freightTemplate(1)">
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
						<view v-for="(item,index) in specAttr" :key='index'>
							<view class="goods-list-items" >
								<view class="goods-item">
									<text class="goods-title">规格名称</text>
									<input type="text" placeholder="请输入规格名称" class="goods-name" v-model="item.group_name">
								</view>
								<view class="goods-item" v-for="(todo,kindex) in item.spec_items" :key='kindex'>
									<text class="goods-title">规格值</text>
									<input type="text" placeholder="请输入规格值" class="goods-name"  v-model="todo.spec_value">
									<image v-if="item.spec_tab && kindex == 0"  src="../../static/add-icon.png" mode="" class="sort-icon" @tap="tabAdd(item)"></image>
								    <image v-if="kindex > 0" src="../../static/reduce-icon.png" mode="" class="sort-icon" @tap="tabDelete(index,todo.id)"></image>
								</view>
								<view class="operation" v-if="item.spec_items.length > 2">
									<!-- <text  class="dalete-operation" @tap="tabDeleteBig(item.group_id)">删除规则</text> -->
									<text class="save-operation" @tap="tabAdd(item)">保存规则</text>
								</view>
								<!-- <text class="save-operation" @tap="saveOperation">保存规则</text> -->
								
							</view>
							<!-- 间隙 -->
							<view class="blank"></view>
						</view>
						
						
						
						<!-- 间隙 -->
						<view class="blank"></view>
						<!-- 添加规格 -->
						<view class="add-specs">
							<text class="add-btn" @tap="tabSpecs">添加规格</text>
							
						</view>
						<!-- 多规格应用 -->
						<view class="new-specifications">
							<view class="set-up">
								<image src="../../static/set.png" mode="" class="set-up-icon"></image>
								<text class="set-up-name">批量设置</text>
							</view>
							<!-- 动态表格 -->
							<view class="new-add">
								<!-- 批量设置规格 -->
								<view class="batch-proces">
									<view class="left">
										<view class="left-item">
											<text class="sales-price">销售价</text>
											<input type="text" placeholder="请输入" class="sales-name">
										</view>
										<view class="left-item">
											<text class="sales-price">库存数量</text>
											<input type="text" placeholder="请输入" class="sales-name">
										</view>
										<view class="left-item">
											<text class="sales-price">重量</text>
											<input type="text" placeholder="请输入" class="sales-name">
										</view>
										
									</view>
									<text class="right">应用</text>
									
								</view>
								<!-- 单独设置规格  -->
								<view class="single-process" v-if="showSpecList" >
									<view class="spec-list-table">
										<view class="spec-list-title">
											<view class="item"></view>
											<view class="item">规格值</view>
											<view class="item">销售价</view>
											<view class="item">库存数量</view>
										</view>
										
										<view class="spec-list"  v-for="(item,index) in specList" :key="index">
											<block  v-for="(tood,k) in item.form" :key="k">
												<view class="spec-list-name" :style="'height:46px ; line-height:46px;'">{{item.spec_name}}</view>
												<view class="spec-list-item" >
													<view class="item" >{{tood.spec_value}}</view>
													<view class="item" >{{tood.goods_price}}</view>
													<view class="item" >{{tood.stock_num}}</view>
												</view>
											</block>
										
										</view>
										
									</view>
									
								</view>
							</view>
							
						</view>
						<!-- 间隙 -->
						<view class="blank"></view>
						<!-- 详情 -->
						<view class="goods-list-item">
							<view class="goods-item-detail">
								<text class="goods-title">详情描述</text>
								<textarea  placeholder="请输入详情描述" v-model="content"  class="textarea"/>
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
			<view class="tab-item"  @tap="addConfirm">确认添加</view>
		</view>
		<!-- 运费模板id -->
		<view class="popup" :class="specClass"  @click="toggleSpec">
			<view class="mask"></view>
			<view class="layer">
				<view v-for="(item,index) in freightList" :key="index" class="attr-list">
					
					<view class="item-list" @click="toggleSpecTab(item)">
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
				showAdd:false,//增加规格
				specIndex:0,
				addSpecIndex:0,
				tabAddIndex:0,//已有规格名添加规格值
				jumpImdex:0,
				specAttr:[
					{
						index:0,
						group_name:'',
						group_id:'',
						spec_tab:false,
						spec_items:[
							{
								index:0,
								id:0,
								spec_value_id:'',
								spec_value:'',
							}
							
						]
					}
					
				],//规则列表
				showSpecList:false,
				specList:[
					/* {
						index:0,
						spec_sku_id:'',
						spec_name:'',
						form:[
							{
								goods_price:null,
								stock_num:null,
								goods_weight:null
							}
						]
					} */
				],
				specName:'',//规格名
				specValue:'',//规格值
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
				]
				
				
				
			};
		},
		
		async onLoad(){
			let userInfo=uni.getStorageSync('userInfo');
			if(userInfo!==undefined){
				this.token = userInfo.token;
				
			}else{
				uni.navigateTo({
					url:'/pages/login/login'
				})
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
				/* if(!self.goodsPrice  ){ 
					uni.showToast({title: '请输入商品价格',icon:"none"});
					return ; 
				} */
				/* if(!self.stockNum){ 
					uni.showToast({title: '请输入商品库存数',icon:"none"});
					return ; 
				} */
				/* if(!self.goodsWeight){ 
					uni.showToast({title: '请输入商品重量',icon:"none"});
					return ; 
				} */
				
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
					url: 'https://wxshop.qclike.cn/api/admins/addGoodsSome',
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
						spec_many:{
							spec_attr:self.specAttr,
							spec_list:self.specList,
							
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
			
			//删除图片
			deleteTemplate(){
				let self = this;
				self.showImg = !self.showImg;
				self.uploadPictures = '';
			},
			//单规则操作
			singleRule(){
				 uni.navigateTo({
					url:'/pages/goods/addgoods'
				})
				 
			},
			//多规则操作
			multipleRule(){
				console.log('多规则操作')
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
			},
			//点击添加规则按钮
			tabSpecs(){
				let self = this;
				
				if(!self.specAttr[self.specIndex].group_name && !self.specAttr[self.specIndex].spec_items[0].spec_value){
					uni.showToast({title: '请先填写规格在继续添加',icon:"none"});
					return ; 
				}
				uni.request({
					url: 'https://wxshop.qclike.cn/api/admins/addSpec', 
					method:'POST',
					data:{
						token:self.token,
						spec_name:self.specAttr[self.specIndex].group_name,
						spec_value:self.specAttr[self.specIndex].spec_items[0].spec_value
					},
					success: function(res) {
						if(res.data.code == 1){
							let result = res.data.data;
							self.showSpecList = true;
							self.specAttr[self.specIndex].spec_tab = 'true';
							self.specAttr[self.specIndex].group_id = result.spec_id;
							self.specAttr[self.specIndex].spec_items[0].spec_value_id = result.spec_value_id;
							console.log(333,self.specList);
							self.specList.push(
									{
										index:self.specIndex,
										spec_sku_id:result.spec_value_id,
										spec_name:self.specAttr[self.specIndex].group_name,
										form:[
											{
												goods_price:null,
												stock_num:null,
												goods_weight:null,
												spec_value:self.specAttr[self.specIndex].spec_items[0].spec_value
											}
										]
									}
							
							);
							self.specIndex++;
							self.specAttr.push(
									{
										index:self.specIndex,
										group_name:'',
										group_id:'',
										spec_tab:false,
										spec_items:[
											{
												index:0,
												id:0,
												spec_value_id:'',
												spec_value:'',
											}
											
										]
									}
							
							);
							
							if(self.specIndex-1 == 0){
								return
							}else{
								
							}
							
							
						} else if(res.data.code == 0){
							let msg = res.data.msg
							uni.showToast({title: msg,icon:"none"});
						}
					}
				});
			},
			//已有规格名添加规格值
			tabAdd(todo){
				let self = this;
				self.tabAddIndex++;
			
				self.specAttr[todo.index].spec_items.push({
					index:self.tabAddIndex,
					id:self.tabAddIndex,
					spec_value_id:'',
					spec_value:"",
				})
				console.log(8888,todo.index)
				
				//商品规格
				self.specList[todo.index].form.push(
					{
						index:self.tabAddIndex,
						id:self.tabAddIndex,
						spec_value_id:'',
						spec_value:self.specAttr[todo.index].spec_items[self.tabAddIndex-1].spec_value
					}
				)
				console.log(999,self.specList)
				console.log(self.specAttr[todo.index].spec_items[self.tabAddIndex-1].spec_value)
				uni.request({
					url: 'https://wxshop.qclike.cn/api/admins/addSpecValue', 
					method:'POST',
					data:{
						token:self.token,
						spec_id:todo.group_id,
						spec_value:self.specAttr[todo.index].spec_items[self.tabAddIndex].spec_value
					},
					success: function(res) {
						if(res.data.code == 1){
							console.log('已有规格名添加规格值',self.tabAddIndex)
							self.tabAddIndex++;
							let result = res.data.data.spec_value_id;
							self.specAttr[todo.index].spec_items[self.tabAddIndex].spec_value_id = result;
							
							
						} else if(res.data.code == 0){
							let msg = res.data.msg
							uni.showToast({title: msg,icon:"none"});
						}
					}
				});
			},
			//已有规格名 删除规格
			tabDelete(index,id){
				console.log('删除规格',index,id)
				let self = this;
				 self.specAttr[index].spec_items = self.specAttr[index].spec_items.filter(function(item, k) {
					 
					console.log(111,item.id )
					return item.id != id; 
				});
				console.log('删除后的数据',self.specAttr)
			},
			//删除规格
			tabDeleteBig(id){
				console.log('删除规格',id)
				let self = this;
				self.specAttr = self.specAttr.filter(function(item) {
					console.log(111,item.group_id )
					return item.group_id != id; 
				});
			
				
				console.log('删除后的数据',self.specAttr)
			},
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
		.uni-navbar-container{
			text-align: center;
			margin-top: 6px;
			.navigation{
				display: flex;
				width: 145px;
				height: 32px;
				margin: auto;
				
				.left{
					flex: 1;
					color: #fff;
					background: #C5091D;
					
					font-size: 16px;
					
					height: 30px;
					line-height: 30px;
					text-align: center;
					border: 1px solid #FFFFFF;
				}
				.right{
					flex: 1;
					background: #FFFFFF;
					font-size: 16px;
					color: #C5091D;
					height: 30px;
					line-height: 30px;
					text-align: center;
					border: 1px solid #fff;
				}
			}
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
		height: calc(100% - 95px);
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
					font-size: 30upx;
					max-height:160upx; 
					color: #333333;
					.uni-textarea-wrapped{
						width: 98%;
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
	    .goods-list-items{
	    	width: 100%;
	    	margin: 0;
	    	padding-left: 32upx;
	    	background: #fff;
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
	    			width: 90%;
	    			text-overflow:ellipsis;
	    			white-space: nowrap;
	    			&.rui-picker{
	    				border: none;
	    			}
	    		}
	    		.sort-icon{
	    			position: absolute;
					z-index: 22;
	    			top: 30upx;
	    			right: 32upx;
	    			width: 40upx;
	    			height: 40upx;
	    			background-size: cover;
	    		}
	    	}
			.operation{
				width: 100%;
				margin-right: 32upx;
				height: 100upx;
				line-height: 100upx;
				display: flex;
				flex-direction: row;
				.dalete-operation,.save-operation{
					flex: 1;
					height: 100upx;
					line-height: 100upx;
					font-size: 28upx;
					color: #C5091D;
					color: #C5091D;
					text-align: center;
				}
				// .save-operation{
				// 	color: #fff;
				// }
				
			}
	    	.goods-item-picture{
	    		width: 100%;
	    		display: flex;
	    		flex-direction: column;
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
	    	}
	    	&.single{
	    		padding-top: 20upx;
	    	}
	    	
	    }
	    	
	    .new-specifications{
			width: 100%;
			.set-up{
				width: 100%;
				height: 60upx;
				line-height: 60upx;
				background-color: #ececec;
				display: flex;
				flex-direction: row;
				.set-up-icon{
					display: inline-block;
					margin-left: 30upx;
					width: 32upx;
					height: 32upx;
					background-size: cover;
					vertical-align: middle;
				}
				.set-up-name{
					font-size: 28upx;
					color: #999999;
					margin-top: -12upx;
					margin-left: 30upx;
				}
			}
			.new-add{
				width: 100%;
				.batch-proces{
					width: 100%;
					height: 164upx;
					background-color: #fff;
					display: flex;
					flex-direction: row;
					.left{
						flex: 1;
						display: flex;
						flex-direction: row;
						justify-content: left;
						margin-left: 32upx;
						.left-item{
							flex: 1;
							display: flex;
							flex-direction: column;
							.sales-price{
								font-size: 28upx;
								color: #333333;
								height: 80upx;
								line-height: 80upx;
							}
							.sales-name{
								font-size: 28upx;
								color: #333333;
								height: 80upx;
								line-height: 80upx;
							}
					           
						}
					}
					.right{
						width: 124upx;
						height: 60upx;
						line-height: 60upx;
						text-align: center;
						font-size: 28upx;
						color: #C5091D;
						border: 1px solid #C5091D;
						border-radius: 6upx;
						margin: 32upx;
					}
				}
			
			    .single-process{
					.spec-list-table{
						width: 100%;
						background-color: #fff;
						.spec-list-title{
							width: 100%;
							display: flex;
							flex-direction: row;
							border-top: 1px solid #ececec;
							.item{
								flex: 1;
								height: 92upx;
								line-height: 92upx;
								text-align: center;
								font-size: 28upx;
								color: #333333;
								border-right: 1px solid #ececec;
								&:nth-child(4){
									border-right: none;
								}
							}
						}
						.spec-list{
							width: 100%;
							// border-top: 1px solid #ececec;
							border-bottom: 1px solid #ececec;
							.spec-list-name{
								display: inline-block;
								float: left;
								width: 25%;
								text-align: center;
								font-size: 28upx;
								color: #333333;
								border-right: 1px solid #ececec;
								border-bottom: 1px solid #ececec;
								
							}
							.spec-list-item{
								width: 75%;
								float: right;
								display: inline-block;
								display: flex;
								flex-direction: row;
								.item{
									flex: 1;
									height: 92upx;
									line-height: 92upx;
									text-align: center;
									font-size: 28upx;
									color: #333333;
									border-right: 1px solid #ececec;
									border-bottom: 1px solid #ececec;
									&:nth-child(3){
										border-right:none;
									}
								}
							}
						}
							
						
					}
				
				}
			}
		}
        .blank{
			width: 100%;
			height: 24upx;
			background-color: #ececec;
		}
		.add-specs{
			width: 100%;
			height: 132upx;
			line-height: 132upx;
			text-align: center;
			background-color: #ececec;
			.add-btn{
				display: inline-block;
				height: 68upx;
				line-height: 68upx;
				width: 190upx;
				text-align: center;
				background: #C5091D;
				border-radius: 2px;
				font-size: 32upx;
				color: #FFFFFF;
			}
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
