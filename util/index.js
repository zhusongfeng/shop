import {web} from "./config.js"
import _this from '@/main.js'

const httpServer = (opts, data) => {
	let userInfo=uni.getStorageSync('userInfo');
	let token='';
	
	if(userInfo!==undefined){
		token= userInfo.token;
	}
	let httpDefaultOpts = {
		url: opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
		'X-Requested-With': 'XMLHttpRequest',
		"Accept": "application/json",
		"Content-Type": "application/json; charset=UTF-8",
	} : {
		// 'token':'2d3039bc-3dba-48f0-a957-2be2dcb27b67',
		// 'token':token,
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Access-Control-Allow-Headers':'Content-Type,Access-Token'
		
	},
		dataType: 'json',
	}
	console.log(111111,httpDefaultOpts)
// 
// 	let promise = new Promise(function(resolve, reject) {
// 		uni.request(httpDefaultOpts).then(
// 			(res) => {
// 				//返回的统一结果
// 				let result=res[1];
// 				//后台的状态码  如果是401则需要重新登录 获取token
// 				if(result.data.code==401){
// 					
// 					uni.login({
// 						success(res) {
// 						//调用登录接口
// 						uni.request({
// 							url:web.www+'/login',
// 							data:{
// 								account:httpDefaultOpts.data.account,
// 								password:httpDefaultOpts.data.password,
// 							},
// 							method: 'POST',
// 							header: {
// 								'X-Requested-With': 'XMLHttpRequest',
// 								"Accept": "application/json",
// 								"Content-Type": "application/json; charset=UTF-8",
// 								'Access-Control-Allow-Headers':'Content-Type,Access-Token'
// 							},
// 							success(res) {
// 								var loginToken=res.data.data.userInfo.token;
// 								
// 								var provider={};
// 								provider.nickname=res.data.data.userInfo.nickname;
// 								provider.token=loginToken;
// 								//存下本地的数据
// 								_this.store.state.hasLogin=true;
// 								uni.setStorage({//缓存用户登陆状态
// 									key: 'userInfo',  
// 									data: provider  
// 								}) 
// 							}
// 							
// 						})
// 						}
// 					});
// 				}else{
// 					
// 				}
// 				resolve(result);
// 			}
// 		).catch(
// 			(response) => {
// 				reject(response)
// 			}
// 		)
// 	})
// 
// 	return promise

}

export default httpServer
