(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/addNewAddress/addNewAddress"],{230:function(n,e,t){"use strict";(function(n,e){var r=t(4);t(26);r(t(25));var o=r(t(231));n.__webpack_require_UNI_MP_PLUGIN__=t,e(o.default)}).call(this,t(1)["default"],t(2)["createPage"])},231:function(n,e,t){"use strict";t.r(e);var r=t(232),o=t(234);for(var i in o)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(i);t(247);var u,d=t(32),c=Object(d["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],u);c.options.__file="pages/addNewAddress/addNewAddress.vue",e["default"]=c.exports},232:function(n,e,t){"use strict";t.r(e);var r=t(233);t.d(e,"render",(function(){return r["render"]})),t.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(e,"components",(function(){return r["components"]}))},233:function(n,e,t){"use strict";var r;t.r(e),t.d(e,"render",(function(){return o})),t.d(e,"staticRenderFns",(function(){return u})),t.d(e,"recyclableRender",(function(){return i})),t.d(e,"components",(function(){return r}));var o=function(){var n=this,e=n.$createElement;n._self._c;n._isMounted||(n.e0=function(e){n.popup=!0})},i=!1,u=[];o._withStripped=!0},234:function(n,e,t){"use strict";t.r(e);var r=t(235),o=t.n(r);for(var i in r)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return r[n]}))}(i);e["default"]=o.a},235:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t(169),o=function(){Promise.all([t.e("common/vendor"),t.e("components/erha-picker/erha-picker")]).then(function(){return resolve(t(236))}.bind(null,t)).catch(t.oe)},i={components:{ehPicker:o},data:function(){return{form:{name:"",phone:"",region:"",detailRegion:""},id:null,popup:!1}},methods:{conceal:function(n){console.log(n),this.popup=!1},formSubmit:function(n){this.id?console.log(88):console.log(999)},addressDetail:function(){(0,r.getAddressDetail)({id:0}).then((function(){}))}},onLoad:function(e){var t=this;e.id&&(this.id=e.id,n.setNavigationBarTitle({title:"编辑地址"}),(0,r.getAddressDetail)({id:e.id}).then((function(n){t.form.name=n.name,t.form.phone=n.mobile,t.form.region=n.full_region,t.form.detailRegion=n.address})))},onShow:function(){this.addressDetail()}};e.default=i}).call(this,t(2)["default"])},247:function(n,e,t){"use strict";t.r(e);var r=t(248),o=t.n(r);for(var i in r)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return r[n]}))}(i);e["default"]=o.a},248:function(n,e,t){}},[[230,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/addNewAddress/addNewAddress.js.map