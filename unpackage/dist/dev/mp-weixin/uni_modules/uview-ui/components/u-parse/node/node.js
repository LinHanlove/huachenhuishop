(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uview-ui/components/u-parse/node/node"],{391:function(t,e,n){"use strict";n.r(e);var r=n(392),i=n(394);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n(396);var s,a=n(32),u=n(398),c=Object(a["default"])(i["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],s);"function"===typeof u["default"]&&Object(u["default"])(c),c.options.__file="uni_modules/uview-ui/components/u-parse/node/node.vue",e["default"]=c.exports},392:function(t,e,n){"use strict";n.r(e);var r=n(393);n.d(e,"render",(function(){return r["render"]})),n.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(e,"components",(function(){return r["components"]}))},393:function(t,e,n){"use strict";var r;n.r(e),n.d(e,"render",(function(){return i})),n.d(e,"staticRenderFns",(function(){return s})),n.d(e,"recyclableRender",(function(){return o})),n.d(e,"components",(function(){return r}));var i=function(){var t=this,e=t.$createElement;t._self._c},o=!1,s=[];i._withStripped=!0},394:function(t,e,n){"use strict";n.r(e);var r=n(395),i=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},395:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=function(){Promise.resolve().then(function(){return resolve(n(391))}.bind(null,n)).catch(n.oe)},i={name:"node",options:{virtualHost:!0},data:function(){return{ctrl:{}}},props:{name:String,attrs:{type:Object,default:function(){return{}}},childs:Array,opts:Array},components:{node:r},mounted:function(){for(this.root=this.$parent;"mp-html"!=this.root.$options.name;this.root=this.root.$parent);},beforeDestroy:function(){},methods:{toJSON:function(){},play:function(e){if(this.root.pauseVideo){for(var n=!1,r=e.target.id,i=this.root._videos.length;i--;)this.root._videos[i].id==r?n=!0:this.root._videos[i].pause();if(!n){var o=t.createVideoContext(r,this);o.id=r,this.root._videos.push(o)}}},imgTap:function(e){var n=this.childs[e.currentTarget.dataset.i];if(n.a)return this.linkTap(n.a);n.attrs.ignore||(this.root.$emit("imgTap",n.attrs),this.root.previewImg&&t.previewImage({current:parseInt(n.attrs.i),urls:this.root.imgList}))},imgLongTap:function(t){},imgLoad:function(t){var e=t.currentTarget.dataset.i;this.childs[e].w?(this.opts[1]&&!this.ctrl[e]||-1==this.ctrl[e])&&this.$set(this.ctrl,e,1):this.$set(this.ctrl,e,t.detail.width)},linkTap:function(e){var n=e.currentTarget?this.childs[e.currentTarget.dataset.i].attrs:e,r=n.href;this.root.$emit("linkTap",n),r&&("#"==r[0]?this.root.navigateTo(r.substring(1)).catch((function(){})):r.includes("://")?this.root.copyLink&&t.setClipboardData({data:r,success:function(){return t.showToast({title:"链接已复制"})}}):t.navigateTo({url:r,fail:function(){t.switchTab({url:r,fail:function(){}})}}))},mediaError:function(t){var e=t.currentTarget.dataset.i,n=this.childs[e];if("video"==n.name||"audio"==n.name){var r=(this.ctrl[e]||0)+1;if(r>n.src.length&&(r=0),r<n.src.length)return this.$set(this.ctrl,e,r)}else"img"==n.name&&this.opts[2]&&this.$set(this.ctrl,e,-1);this.root&&this.root.$emit("error",{source:n.name,attrs:n.attrs,errMsg:t.detail.errMsg})}}};e.default=i}).call(this,n(2)["default"])},396:function(t,e,n){"use strict";n.r(e);var r=n(397),i=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},397:function(t,e,n){},398:function(t,e,n){"use strict";n.r(e);var r=n(399);e["default"]=r["default"]},399:function(t,e,n){"use strict";n.r(e),e["default"]=function(t){t.options.wxsCallMethods||(t.options.wxsCallMethods=[])}}}]);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/uview-ui/components/u-parse/node/node.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uview-ui/components/u-parse/node/node-create-component',
    {
        'uni_modules/uview-ui/components/u-parse/node/node-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(391))
        })
    },
    [['uni_modules/uview-ui/components/u-parse/node/node-create-component']]
]);