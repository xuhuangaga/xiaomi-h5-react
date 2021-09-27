// 模块化(es6提供): esmodule
// 导入和导出
// 其余文件可以使用到该文件的变量和方法

// export default: 默认导出 导出变量 数组 对象 方法 只能导出一次
// export: 导出 导出变量 数组 对象 方法 但是要加let或者const 能导出多次
import Taro from '@tarojs/taro'
import AMapLoader from '@amap/amap-jsapi-loader'

let key = ''
let amapFile: any = null
if (Taro.getEnv() === 'WEB') {
	key = '12fe4048ca291a9f93503d3eff774820'
} else {
	key = 'f9ff4af31dc7d265985f7e76d4f4a227'
	amapFile = require('../lib/amap-wx.js')
	const myAmapFun = new amapFile!.AMapWX({
		key
	})
}
//导入路由
export default {
	// item  店铺信息
	// item1 当前位置
	// isShow是否显示地图
	getLocation(item, item1, isShow) {
		
		let map:any=null
		if (Taro.getEnv() === 'WEB') {
			//驾车路线
			let route = null
			return new Promise((resovle, reject) => {
				AMapLoader.load({
					key,
					version: '1.4.15',
					Loca: {
						// 是否加载 Loca， 缺省不加载
						version: '1.3.2' // Loca 版本，缺省 1.3.2
					}
				})
					.then(AMap => {
						if (item) {
							map = new AMap.Map('container1', {
								'center': [item.position.lng, item.position
									.lat
								]
							})
							//点标记
							let temp =
								'<view class="marker-route marker-marker-bus-from"><text><image src="http://i8.mifile.cn/v1/a1/87fbaa8d-73a4-247a-acea-dea9fed47099.png" style="width:70px;height:70px"></image></text>' +
								`<view>${item.store_name}</view></view>`
							let marker = new AMap.Marker({
								position: new AMap.LngLat(item.position
									.lng, item.position.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
								content: temp
							});
							map.add(marker);
						} else {
							if (isShow)
								map = new AMap.Map('container')
							else {
								map = new AMap.Map('')
							}
						}
						if (item1) {
							// 路线规划
							AMap.plugin('AMap.Driving', function () {
								let driving = new AMap.Driving({
									// 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
									policy: AMap.DrivingPolicy.LEAST_TIME
								})
								let startLngLat = [item1.lng, item1.lat]
								let endLngLat = [item.position
									.lng, item.position.lat
								]
								driving.search(startLngLat, endLngLat, function (status, result) {
									route = result
									// 未出错时，result即是对应的路线规划方案
								})
							})
						}
						return map!.plugin('AMap.Geolocation', function () {
							
							let geolocation = new AMap.Geolocation({
								// 是否使用高精度定位，默认：true
								enableHighAccuracy: true,
								// 设置定位超时时间，默认：无穷大
								timeout: 10000,
								// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
								buttonOffset: new AMap.Pixel(10, 20),
								//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
								zoomToAccuracy: true,
								//  定位按钮的排放位置,  RB表示右下
								buttonPosition: 'RB'
							})

							geolocation.getCurrentPosition(function (status, result) {
								if (status == 'complete') {
									onComplete(result)
								} else {
									onError(result)
								}
							})

							function onComplete(data) {
								// data是具体的定位信息
								resovle({
									route: route,
									code: 200,
									msg: '定位成功',
									data
								})
								// console.log(data)
							}

							function onError(data) {
								// 定位出错
								reject({
									code: 500,
									msg: '定位失败',
									data
								})
							}
						})
					})
					.catch(e => {
						console.log(e)
					})
			})
		} else {
			return new Promise((resovle, reject) => {
				let myAmapFun = new amapFile.AMapWX({ key: key });
				myAmapFun.getRegeo({
					success: data => {
						//成功回调
						resovle({
							code: 200,
							msg: '定位成功',
							data
						})
						console.log(data)
					},
					fail: info => {
						//失败回调
						reject({
							code: 500,
							msg: '定位失败',
							info
						})
						console.log(info)
					}
				})
			})
		}
	},
	//微信登录
	// wechatLogin() {
	// 	Taro.getUserProfile({
	// 		desc: '小米商场正在获取您的微信信息',
	// 		success: (info) => {
	// 			Taro.login({
	// 				provider: 'weixin',
	// 				success: (res) => {
	// 					if (res.code) {
	// 						api.wechatLogin({
	// 							code: res.code
	// 						}).then(r => {
	// 							if (r.code === 200) {
	// 								let user = {
	// 									...info.userInfo,
	// 									openid: r.data.openid
	// 								}
	// 								Taro.setStorageSync('xiaomiUser', user)
	// 								Taro.setStorageSync('token', r.data.token)
	// 								Taro.showToast({
	// 									title: r.msg
	// 								})
	// 							}
	// 						})
	// 					}
	// 				}
	// 			})
	// 		},
	// 		fail: (err) => {
	// 			Taro.showToast({
	// 				title: '您拒绝了授权',
	// 				icon: 'none'
	// 			})
	// 		}
	// 	})
	// },


	//检测用户是否登录
	// key:本地存储用户信息的key
	// next:传入一个函数 下一步的操作
	// item:next函数需要的参数
	checkLogin({
		key,
		next,
		item
	}) {
		//检测本地有没有用户信息
		let user = Taro.getStorageSync(key)
		if (user) {
			//已经登录 继续下一步操作
			next(item)
		} else {
			//未登录 提示用户是否跳转
			Taro.showModal({
				title: '登录后才可使用此功能',
				content: '点击跳转登录/注册',
				success: (res) => {
					if (res.confirm) {
						//跳转到登录页
						Taro.navigateTo({
							url: '/pages/login/login'
						})
					} else {
						// Toast('您取消了操作')
					}
				}
			})
		}
	},
	//存储记录
	//书架 bookshelf
	//搜索历史 search
	//书籍分类小类 minro
	//key:存储的名字
	//item:根据什么属性名来去重
	saveHistory({
		key,
		data,
		item
	}) {
		//拼接一个名字
		let name = key + 'History'
		let history = Taro.getStorageSync(name)
		let arr: any = []
		if (history) {
			//已经存储过了 将以前的数据一起保存下来
			arr = history
		}
		arr.unshift(data)
		if (typeof (data) === "string") {
			//简单数据类型去重
			arr = Array.from(new Set(arr));
		} else {
			//复杂数据类型去重
			const res = new Map();
			arr = arr.filter(arr => !res.has(arr[item]) && res.set(arr[item], 1))
		}
		Taro.setStorageSync(name, arr)
	},
	//获取存储记录
	getHistory(key) {
		let name = key + 'History'
		let arr = Taro.getStorageSync(name)
		if (arr) return arr
		else return null
	},
	//删除存储记录
	//key:bookshelf(书架) search(搜索记录)
	//data:属性值
	//attr:根据什么属性名删除
	removeHistory(key, data, attr) {
		let name = key + 'History'
		let arr = this.getHistory(key)
		if (arr.length > 0) {
			//传入的数据不为空 则做过滤操作
			if (data) {
				// 将以前存的数据转换成数组
				arr = arr.filter((item, index) => {
					return item[attr] !== data[attr];
				});
				Taro.setStorageSync(name, arr);
			} else {
				//传入的数据为空 则清空该历史（用于清空搜索历史）
				Taro.setStorageSync(name, []);
			}
		}
	},
	// 生成id
	genID(length) {
		return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
	},
	// 获取dom
	getDom(selector, all) {
		return new Promise(resolve => {
			Taro.createSelectorQuery().in(this)[all ? 'selectAll' : 'select'](selector).boundingClientRect()
				.exec(rect => {
					if (all && Array.isArray(rect) && rect.length) {
						resolve(rect)
					}
					if (!all && rect) {
						resolve(rect)
					}
				})
		})
	},
	// 获取属性结构最大层级
	getMaxlevel(treeData, attr = 'children') {
		let level = 0
		let v = this
		let maxLevel = 0

		function loop(data, level) {
			data.forEach(item => {
				item.level = level
				if (level > maxLevel) {
					maxLevel = level
				}
				if (attr in item) {
					if (item.children.length > 0) {
						loop(item.children, level + 1)
					}
				}
			})
		}
		loop(treeData, 1)
		return maxLevel
	}
}
