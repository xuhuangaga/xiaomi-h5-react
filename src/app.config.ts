export default {
  pages: [
    'pages/index/index',
    'pages/category/category',
    'pages/carts/carts',
    'pages/my/my',
    'pages/search/search',
    'pages/detail/detail',
    'pages/list/list',
    'pages/login/login',
    'pages/register/register',
    'pages/orders/orders',
    'pages/address/address',
    'pages/editaddress/editaddress',
    'pages/myorders/myorders',
    'pages/xmcitys/xmcitys',
    'pages/xmhome/xmhome',
    'pages/xmdetail/xmdetail',
    'pages/xmnavigation/xmnavigation',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '小米Lite',
		navigationBarTextStyle: 'black'
  },
  tabBar:{
    color: "#999999",
		selectedColor: "#Ff6c18",
		list: [{
				text: "首页",
				pagePath: "pages/index/index",
				iconPath: "static/tabbar/icon-home.png",
				selectedIconPath: "static/tabbar/icon-home-selected.png"
			},
			{
				text: "分类",
				pagePath: "pages/category/category",
				iconPath: "static/tabbar/icon-category.png",
				selectedIconPath: "static/tabbar/icon-category-selected.png"
			},
			{
				text: "购物车",
				pagePath: "pages/carts/carts",
				iconPath: "static/tabbar/icon-cart.png",
				selectedIconPath: "static/tabbar/icon-cart-selected.png"
			},
			{
				text: "我的",
				pagePath: "pages/my/my",
				iconPath: "static/tabbar/icon-user.png",
				selectedIconPath: "static/tabbar/icon-user-selected.png"
			}
		]
  }
}
