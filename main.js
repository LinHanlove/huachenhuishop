import App from './App'

import Vue from 'vue'
import './uni.promisify.adaptor'
import store from "@/store"
import "@/service/interceptor.js"
Vue.config.productionTip = false
App.mpType = 'app'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
const app = new Vue({
	...App,
	store,
})


// 引入请求封装，将app参数传递到配置中
// require('@/service/http.js')(app)
require("@/service/http.js")(app)
app.$mount()