// 页面白名单，不受拦截的页面路由
const whiteList = [
	'/pages/index/index',
	"pages/search/search",
	"pages/productDetails/productDetails",
	// "pages/harvestAddress/harvestAddress",
]

function hasPermission(url) {
	// url 被拦截的跳转页面	
	const {
		token
	} = uni.getStorageSync('auth'); //使用token

	// 在白名单中或token可以直接跳转
	if (whiteList.indexOf(url) !== -1 || token) {
		console.log('通过')
		return true
	}
	console.log('失败')
	return false
}

uni.addInterceptor('navigateTo', {
	// 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
	invoke(e) {
		if (!hasPermission(e.url)) {
			let t = setTimeout(() => {
				uni.reLaunch({
					url: "/pages/register/register"
				})
				clearTimeout(t)
			}, 500)

			return false
		}
		return true
	},

})