(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{163:function(e,n,t){"use strict";(function(e,n){var r=t(4);t(26);r(t(25));var o=r(t(164));e.__webpack_require_UNI_MP_PLUGIN__=t,n(o.default)}).call(this,t(1)["default"],t(2)["createPage"])},164:function(e,n,t){"use strict";t.r(n);var r=t(165),o=t(167);for(var a in o)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(a);t(170);var c,i=t(32),u=Object(i["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],c);u.options.__file="pages/index/index.vue",n["default"]=u.exports},165:function(e,n,t){"use strict";t.r(n);var r=t(166);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},166:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return c})),t.d(n,"recyclableRender",(function(){return a})),t.d(n,"components",(function(){return r}));try{r={iconfont:function(){return t.e("components/iconfont/iconfont").then(t.bind(null,269))},uSwiper:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-swiper/u-swiper")]).then(t.bind(null,276))}}}catch(i){if(-1===i.message.indexOf("Cannot find module")||-1===i.message.indexOf(".vue"))throw i;console.error(i.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,n=e.$createElement,t=(e._self._c,e.banner.map((function(e){return e.image_url})));e.$mp.data=Object.assign({},{$root:{g0:t}})},a=!1,c=[];o._withStripped=!0},167:function(e,n,t){"use strict";t.r(n);var r=t(168),o=t.n(r);for(var a in r)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(a);n["default"]=o.a},168:function(e,n,t){"use strict";(function(e){var r=t(4);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(t(59)),a=r(t(61)),c=r(t(11)),i=t(169),u=t(35);function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){(0,c.default)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var f={data:function(){return{value:"",banner:[],categoryList:[],channel:[],current:0}},computed:d({},(0,u.mapState)(["goodCount"])),methods:d(d({},(0,u.mapMutations)(["SET_GOODSLIST"])),{},{toSearchPage:function(){e.navigateTo({url:"/pages/search/search"})},getAppInfoApi:function(){var e=this;return(0,a.default)(o.default.mark((function n(){var t,r,a,c;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,i.getAppInfo)();case 2:t=n.sent,r=t.banner,a=t.categoryList,c=t.channel,t.notice,e.banner=r,e.categoryList=a,e.channel=c,e.getGoodsCount();case 11:case"end":return n.stop()}}),n)})))()},getGoodsCount:function(){var e=this;return(0,a.default)(o.default.mark((function n(){var t,r;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,i.getGoodsCount)();case 2:t=n.sent,r=t.cartTotal.goodsCount,e.goodsCount=r,e.SET_GOODSLIST(r),e.setTabBar();case 7:case"end":return n.stop()}}),n)})))()},toProductDetails:function(n){"number"==typeof n?e.navigateTo({url:"/pages/productDetails/productDetails?id=".concat(this.banner[n].goods_id)}):e.navigateTo({url:"/pages/productDetails/productDetails?id=".concat(n.id)})},toClassification:function(n){e.setStorageSync("toClassifications",{id:n.id,index:n.sort_order}),e.reLaunch({url:"/pages/classification/classification"})},setTabBar:function(){e.setTabBarBadge({index:2,text:"".concat(this.goodCount)})}}),onShow:function(){this.getAppInfoApi()}};n.default=f}).call(this,t(2)["default"])},170:function(e,n,t){"use strict";t.r(n);var r=t(171),o=t.n(r);for(var a in r)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(a);n["default"]=o.a},171:function(e,n,t){}},[[163,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map