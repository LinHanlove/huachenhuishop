const http = uni.$u.http
// 获取AppInfo get请求
export const getAppInfo = () => http.get('/api/index/appInfo')
//搜索历史记录
export const getSearchIndex = () => http.get('/api/search/index')
//搜索 input
export const getSearchHelper = (keyword) => http.get('/api/search/helper', {
	params: {
		keyword
	}
})
// 回车搜索
export const getSearchGoodsList = (params) => http.get('/api/goods/list', {
	params
})
// 清空历史记录
export const setClearHistory = () => http.post('/api/search/clearHistory')
// 商品详情
export const getGoodsDetail = (params) => http.get('/api/goods/detail', {
	params
})
//购物车数量
export const getGoodsCount = () => http.get('/api/cart/goodsCount')
// 加入购物车
export const setCartAdd = (params) => http.post('/api/cart/add', params)
// 全部分类、
export const getCatalog = () => http.get('/api/catalog/index')
// 统计商品总数
export const getCount = () => http.get('/api/goods/count')
// 获取当前商品类别的商品列表
export const getCatalogCurrentlist = (params) => http.post('/api/catalog/currentlist', params)
// 显示设置
export const getShowSettings = () => http.get('/api/settings/showSettings')
// 当前分类
export const getCatalogCurrent = (params) => http.get('/api/catalog/current', {
	params
})
// 获取购物车列表
export const getCartIndex = () => http.get('/api/cart/index')
// 更新购物车商品
export const setCartUpdate = (params) => http.post('/api/cart/update', params)
// 选中或取消选中商品
export const setCartChecked = (params) => http.post('/api/cart/checked', params)
// 下单前信息确认
export const getCataCheckout = (params) => http.get('/api/cart/checkout', {
	params
})
// 删除购物车商品
export const setCartDelete = (params) => http.post('/api/cart/delete', params)
// 使用微信登录，获取 token
export const login = (info) => http.post('/api/auth/loginByWeixin', {
	info
})
// 获取地址列表
export const getAddresses = () => http.get('/api/address/getAddresses')
// 收货地址详情	
export const getAddressDetail = (params) => http.get('/api/address/addressDetail', {
	params
})
// 获取区域列表
export const getRegionList = (params) => http.get('/api/region/list', {
	params
})
// 保存收货地址
export const setSaveAddress = (params) => http.post('/api/address/saveAddress', params)
// 订单列表
export const getOrderList = (params) => http.get('/api/order/list', {
	params
})
// 足迹列表
export const getFootprintList = (params) => http.get('/api/footprint/list', {
	params
})