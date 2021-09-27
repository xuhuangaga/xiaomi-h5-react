
import dayjs from 'dayjs'
import daifukuan from '../static/user/daifukuan.png'
import daishouhuo from '../static/user/daishouhuo.png'
import tuihuanxiu from '../static/user/tuihuanxiu.png'
import huiyuanzhongxin from '../static/user/huiyuanzhongxin.png'
import youhui from '../static/user/youhui.png'
import fuwuzhongxin from '../static/user/fuwuzhongxin.png'
import xiaomizhijia from '../static/user/xiaomizhijia.png'
import fma from '../static/user/fma.png'
import liwu from '../static/user/liwu.png'
import shezhi from '../static/user/shezhi.png'
export const arr = [{
		icon: daifukuan,
		name: '待付款',
		url: '/pages/myorders/myorders?index=1'
	},
	{
		icon: daishouhuo,
		name: '待收货',
		url: '/pages/myorders/myorders?index=2'
	},
	{
		icon: tuihuanxiu,
		name: '退换修',
		url: '/pages/myorders/myorders?index=0'
	}
]
export const arr1 = [
	[
		{
			icon: huiyuanzhongxin,
			name: '会员中心',
			url: '/pages/member/member'
		},
		{
			icon: youhui,
			name: '我的优惠',
			url: '/pages/coupon/coupon'
		},
	],
	[
		{
			icon: fuwuzhongxin,
			name: '服务中心',
			url: '/pages/member/member'
		},
		{
			icon: xiaomizhijia,
			name: '小米之家',
			url: '/pages/xmcitys/xmcitys'
		},
	],
	[
		{
			icon: fma,
			name: '我的F码',
			url: '/pages/code/code'
		},
		{
			icon:liwu,
			name: '礼物码兑换',
			url: '/pages/gift/gift'
		},
		{
			icon: liwu,
			name: '收货地址',
			url: '/pages/address/address'
		},
	],
	[
		{
			icon: shezhi,
			name: '退出登录',
			url: ''
		}
	]
]

//秒杀场次
let now = dayjs()
let date = now.format('YYYY-MM-DD')
export const seckill_site = [
	{
		title: '08:00',
		startTime: date + ` 08:00:00`,
		endTime: date + ` 10:00:00`,
		desc: '',
		startHours: 8,
		endHours: 10,
	}, {
		title: '10:00',
		startTime: date + ` 10:00:00`,
		endTime: date + ` 12:00:00`,
		desc: '',
		startHours: 10,
		endHours: 12,
		
	}, {
		title: '12:00',
		startTime: date + ` 12:00:00`,
		endTime: date + ` 14:00:00`,
		desc: '',
		startHours: 12,
		endHours: 14,
	}, {
		title: '14:00',
		startTime: date + ` 14:00:00`,
		endTime: date + ` 16:00:00`,
		desc: '',
		startHours: 14,
		endHours: 16,
	}
]