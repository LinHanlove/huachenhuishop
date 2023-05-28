import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
// 整个应用的数据仓库
const store = new Vuex.Store({
	state: {
		goodCount: ''
	},
	getters: {},
	// 同步修改state数据
	mutations: {
		// 定义一个函数修改state.goodsList
		// mutation函数的第二个参数才是获取外界执行的参数的
		SET_GOODSLIST(state, payload) {
			state.goodCount = payload;
		}
	},
	// 定义异步修改state数据
	// action函数的一个参数为context类似于store实例
	actions: {

	}
});

export default store;