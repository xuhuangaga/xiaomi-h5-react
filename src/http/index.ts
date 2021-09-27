
import Taro from '@tarojs/taro'
import wx from 'flyio/dist/npm/wx'
import web from 'flyio/dist/npm/fly'

let http: any = null
if (Taro.getEnv() === 'WEB') {
	http = web
} else {
	http = wx
}
const fly =new http

fly.config.baseURL = 'http://localhost:7001'

fly.interceptors.request.use(config => {
	let token = Taro.getStorageSync('token')
	if (token) {
		// headers属性是后端约定的
		config.headers['Authorization'] = token
	}
	return config
}, err => {
	return Promise.reject(err)
})

fly.interceptors.response.use(res => {
	return res.data
}, err => {
	//每次请求失败的状态码
	let status = err.status
	// 200 请求成功
	// 201 创建成功
	// 204 删除成功
	switch (status) {
		case 400:
			Taro.showToast({
				title: '请求的地址不存在或者包含不支持的参数',
				icon: 'none'
			})
			break;
		case 401:
			Taro.showToast({
				title: '登录过期,请重新登录',
				icon: 'none'
			})
			setTimeout(() => {
				Taro.navigateTo({
					url: '/pages/login/login'
				})
			}, 1000)
			break
		case 403:
			Taro.showToast({
				title: '被禁止访问',
				icon: 'none'
			})
			break
		case 404:
			Taro.showToast({
				title: '请求的资源不存在',
				icon: 'none'
			})
			break
		case 422:
			Taro.showToast({
				title: '当创建一个对象时，发生了一个验证错误',
				icon: 'none'
			})
			break
		case 500:
			Taro.showToast({
				title: '内部错误',
				icon: 'none'
			})
			break;
	}
	console.log(err)
	return Promise.reject(err)
})

export default fly
