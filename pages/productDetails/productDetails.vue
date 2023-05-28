<template>
	<view class="bg-[#eee]">
		<u-swiper :list="gallery.map(item=>item.img_url)" @change="setCurrent" :autoplay="true" :circular="true"
			indicatorStyle="right: 20px" height="560rpx">
			<view slot="indicator" class="indicator-num flex items-center">
				<image src="@/static/images/current.png" class="w-[22rpx] block h-[22rpx]" mode=""></image>
				<text class="indicator-num__text block">{{ current + 1 }}/{{ gallery.length }}</text>
			</view>
		</u-swiper>
		<view class="info-wrap w-full flex justify-between items-center p-[30rpx] bg-[#fff] border-b border-[#f1f1f1]">
			<view class="l w-[calc(100%-100rpx)]">
				<view class="goods-title w-full text-[30rpx] truncate">{{info.name}}</view>
				<view class="goods-intro w-full text-[24rpx] text-[#8f8f8f] truncate">{{info.goods_brief}}</view>
			</view>
			<view class="r w-[100rpx] flex justify-end">
				<view class="share">
					<image src="@/static/images/fenxiang.png" mode="" class="w-[26rpx] h-[28rpx]"></image>
					<text class="text-[26rpx] text-[#8f8f8f]">分享</text>
				</view>
			</view>
		</view>
		<view class="price-info flex justify-between items-center px-[30rpx] py-[20rpx] bg-[#fff]">
			<view class="l w-3/5 text-[26rpx] text-[red]">
				￥{{info.min_retail_price}}
			</view>
			<view class="r w-2/5 flex items-center justify-end text-[26rpx] text-[#8f8f8f]">
				<view class="stock mr-[15rpx]">库存{{info.goods_number}}</view>
				<view class="sales">已售{{info.sell_volume}}份</view>
			</view>
		</view>
		<!-- 选择 -->
		<view @click="show = true"
			class="switchAttrPop flex justify-between items-center px-[24rpx] my-[24rpx] w-full h-[100rpx] bg-[#fff]">
			<view class="text-[28rpx] text-[38f8f8f]">{{specsSwitchValue}}</view>
			<view>
				<image src="@/static/images/rjiantou.png" class="w-[20rpx] h-[20rpx]" mode=""></image>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="details-wrap bg-[#fff]">
			<view class="title w-full text-[32rpx] px-[30rpx] py-[40rpx]">商品详情</view>
			<u-parse :content="info.goods_desc"></u-parse>
		</view>
		<!-- 规格 -->
		<view class="w-full">
			<u-popup :show="show" mode="bottom" :safeAreaInsetBottom="true" :closeable="true" @close="close"
				:customStyle="{
				padding: '20rpx 40rpx ',bottom: '110rpx'}" :overlayStyle="{bottom: '110rpx'}">
				<view class="img-info flex w-full h-[160rpx]">
					<view class="img-wrap w-[160rpx] mr-[10rpx]">
						<template>
							<image v-for="(item,index) in gallery" :key="item.id" v-if="index===0" :src="item.img_url"
								mode="" class="w-[160rpx] h-[160rpx]">
							</image>
						</template>
					</view>
					<view class="info w-full h-full w-[calc(100%-160rpx)]">
						<view class="price-range text-[28rpx] flex ">
							<view class="p-title">零售价:</view>
							<view class="g-price text-[red] mr-[10rpx]">{{info.min_retail_price}}元</view>
						</view>
						<view class="text-[#8f8f8f] text-[28rpx]">{{specsSwitchValue}}</view>

					</view>
				</view>
				<view class="spec-con">
					<view class="spec-item mt-[10rpx]">
						<view class="name text-[28rpx] text-[#333]">规格</view>
						<view class="values flex flex-wrap">

							<template>
								<view @click="specsSwitch(item.value)"
									class="value_item text-[28rpx] mt-[10rpx] px-[20rpx] py-[5rpx] leading-[50rpx] text-center mr-[25rpx] mb-[14rpx] "
									:style="{border:specsValue===item.value ?'1rpx solid red':'1rpx solid #fff'}"
									v-for="(item,index) in specificationList.valueList" :key="item.id">
									{{item.value}}
								</view>
							</template>

						</view>
					</view>
					<view class="spec-item mt-[10rpx]">
						<view class="name text-[28rpx] text-[#333]">库存</view>
						<view class="stock-num text-[28rpx]" v-for="(item,index) in productList" :key="item.id"
							v-if="index===0">{{item.goods_number}}</view>
					</view>
					<view class="spec-item mt-[10rpx]">
						<view class="name text-[28rpx] text-[#333]">数量(件)</view>
						<view class="selnum w-[280rpx] h-[60rpx] border border-[#ccc] flex items-center">
							<button @click="cutSelnum"
								class="cut w-1/3 h-full text-center leading-[60rpx] text-[#555] ">-</button>
							<view class=" w-1/3 h-full border-r border-[#ccc] border-l">
								<input type="text" v-model="selnumValue"
									class=" w-full h-full text-center   text-[28rpx]">
							</view>
							<button @click="addSelnum"
								class="add w-1/3 h-full text-center leading-[60rpx] text-[#555] ">+</button>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 客服会话 -->
		<!-- #ifdef APP -->
		<u-modal :show="showCustomerService" @confirm="confirm" confirmText="返回">
			<slot>
				<view>
					<view class="title w-full text-center text-[32rpx] font-bold text-[#606266]">模拟进入客服会话
					</view>
					<view class="centent pt-[15rpx] px-[30rpx]">开发者工具暂不支持打开客服会话，请使用真机调试

					</view>
				</view>
			</slot>
		</u-modal>
		<!-- #endif -->
		<view v-if="isShowError" class="w-[250rpx] z-[999] rounded-lg
			 h-[250rpx] text-center  bg-[#ccc] absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2">
			<image src="@/static/images/ku.png" class="w-[100rpx] block mt-[50rpx] m-auto h-[100rpx]" mode=""></image>
			<view class="text-[30rpx] mt-[20rpx] ">{{ShowErrorText}}</view>
		</view>
		<!-- 底部 -->
		<view class="fixed bottom-0 z-[999] w-full h-[110rpx] bg-[#fff]">
			<view class="flex items-center w-full h-full ">
				<view class="l w-[40%] w-full h-full ">
					<view class="w-full h-full  flex  items-center">
						<view class="w-[30%]   text-center" @click="toIndex">
							<image src="@/static/images/shouye0.png" class="w-[40rpx] m-auto block h-[40rpx]" mode="">
							</image>
							<text class="text-[20rpx] text-[#8f8f8f] block">主页</text>
						</view>
						<!-- #ifdef MP-WEIXIN-->
						<button open-type="contact"
							class="w-[30%] p-0 m-0 leading-2 block flex items-center justify-center text-center h-full">
							<view>
								<image src="@/static/images/kefu.png" class="w-[40rpx] m-auto h-[40rpx]" mode="">
								</image>
								<text class="text-[20rpx] text-[#8f8f8f] block">客服</text>
							</view>
						</button>
						<!-- #endif -->
						<!-- #ifdef APP -->
						<view class="w-[30%]  text-center" @click="showCustomerService=true">
							<image src="@/static/images/kefu.png" class="w-[40rpx] m-auto h-[40rpx]" mode=""></image>
							<text class="text-[20rpx] text-[#8f8f8f] block">客服</text>
						</view>
						<!-- #endif -->
						<view class="w-[30%]  text-center relative">
							<image src="@/static/images/gouwuche0.png" class="w-[40rpx] m-auto h-[40rpx]" mode="">
							</image>
							<view @click="toShoppingCart" class="text-[20rpx] text-[#8f8f8f] ">购物车
								<view v-if="goodsCount>0"
									class="w-[50rpx] h-[25rpx] bg-[#f56c6c] rounded-lg text-[#fff] text-[20rpx] leading-[20rpx] text-center absolute top-[-5px] left-[50rpx]">
									{{goodsCount}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="info.goods_number !== 0" class="r w-[60%] h-full">
					<view class="w-full h-full flex items-center text-[28rpx]">
						<button @click="CartAdd"
							class="w-[50%] h-full text-[26rpx] leading-[110rpx] rounded-[0] text-[#8f8f8f] block bg-[orange]">
							加入购物车
						</button>
						<button @click="buyNow"
							class="w-[50%] h-full text-[26rpx] leading-[110rpx] rounded-[0] text-[#8f8f8f] block bg-[#ed5b58]">
							立即购买
						</button>
					</view>
				</view>
				<view v-else
					class="w-[60%] h-full text-center leading-[110rpx] text-[28rpx] text-[#8f8f8f] bg-[#f2f2f2]">
					商品已售罄</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getGoodsDetail,
		getGoodsCount,
		setCartAdd
	} from "@/service/api.js"
	import {
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				ShowErrorText: "请选择规格",
				goods_id: 0,
				current: 0,
				show: false,
				isShowError: false,
				gallery: [],
				info: [],
				productList: [],
				specificationList: [],
				specsStatus: false,
				specsSwitchValue: "",
				specsValue: '',
				selnumValue: 1,
				shopListNum: 0,
				showCustomerService: false, //客服
				goodsCount: 0, //购物车数量
			}
		},
		onLoad(query) {
			this.goods_id = query.id
		},
		methods: {
			...mapMutations(['SET_GOODSLIST']),
			async goodsDetail() {
				const {
					gallery,
					info,
					productList,
					specificationList
				} = await getGoodsDetail({
					id: this.goods_id
				})
				this.gallery = gallery
				this.info = info
				this.productList = productList
				this.specificationList = specificationList
				this.specsSwitchValue = `已选择:${ specificationList.valueList.find((item, index) =>
					index === 0).value}`
				this.getGoodsCount()
			},
			// 获取购物车数量 
			async getGoodsCount() {
				const {
					cartTotal: {
						goodsCount
					}
				} = await getGoodsCount()
				this.goodsCount = goodsCount
				this.SET_GOODSLIST(goodsCount)
			},
			// 设置指示器
			setCurrent(index) {
				this.current = index.current
			},
			close() {
				this.show = false
			},
			// 规格开关
			specsSwitch(value) {
				if (this.info.goods_number === 0) {
					if (value === this.specsValue) {
						this.specsSwitchValue = '请选择规格和数量'
						this.specsValue = ''
						this.specsStatus = false
					} else {
						this.specsSwitchValue = `已选择:${value}`
						this.specsValue = value
						this.specsStatus = true
						this.showError('库存不足')
					}
				} else {
					if (value === this.specsValue) {
						this.specsValue = ''
						this.specsSwitchValue = '请选择规格和数量'
						this.specsStatus = false
					} else {
						this.specsValue = value
						this.specsStatus = true
						this.specsSwitchValue = `已选择:${value}`
					}
				}

			},
			// 数量减
			cutSelnum() {
				this.selnumValue--
				if (this.selnumValue < 0) this.selnumValue = 0
				if (this.selnumValue === 0) this.specsStatus = false
			},
			// 数量加
			addSelnum() {
				this.selnumValue++
				if (this.selnumValue > 0) this.specsStatus = true
			},
			// 跳转到首页
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			// 关闭会话
			confirm() {
				this.showCustomerService = false
			},
			// 错误弹出框
			showError(text) {
				this.ShowErrorText = text
				this.isShowError = true
				let t = setTimeout(() => {
					this.isShowError = false
					clearTimeout(t)
				}, 2000)
			},
			//添加到购物车
			CartAdd() {
				const goodsId = this.productList.find((item, index) =>
					index === 0).goods_id.toString()
				const productId = this.productList.find((item, index) =>
					index === 0).id
				if (!this.specsStatus) {
					this.showError('请选择规格')
				} else {
					uni.showToast({
						icon: "loading",
						title: '正在添加',
						duration: 2000
					});
					setCartAdd({
						addType: 0,
						goodsId: goodsId,
						number: this.selnumValue,
						productId: productId,
					}).then(() => {
						let t = setTimeout(() => { //轻提示
							uni.showToast({
								icon: "success",
								title: '添加成功',
								duration: 2000
							});
							clearTimeout(t)
						}, 1000)

						this.getGoodsCount()
					})
				}

			},
			// 立即购买
			buyNow() {
				if (this.specsStatus) {
					this.CartAdd()
					uni.navigateTo({
						url: `/pages/confirmAnOrder/confirmAnOrder?id=${this.info.id}`
					})
				} else {
					this.showError('请选择规格')
				}
				this.show = true
			},
			//跳转到购物车
			toShoppingCart() {
				uni.switchTab({
					url: "/pages/ShoppingCart/ShoppingCart"
				})
			}
		},
		onShow() {
			this.goodsDetail()
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP */
	.info-wrap {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.switchAttrPop {
		width: 100%;
		padding: 0 24rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.value_item {
		margin-top: 10rpx;
		border: 1rpx solid red;
	}

	.selnum {
		border: 1rpx solid #ccc;
	}

	.cart-add-box {
		width: 100%;
		padding: 0 10rpx;
		box-sizing: border-box;
		background-color: #fff;
	}



	/* #endif */
	/* #ifdef MP-WEIXIN */
	button {
		font-size: 28rpx;
		background-color: #fff;
		border: none;
		padding: 0;
		margin: 0;
		line-height: 1;
	}

	input {
		outline: none;
		border: none;
		list-style: none;
	}

	button::after {
		border: none !important; // 或者 border: none;
		border-radius: 0;
		padding: 0;
		line-height: 0;
	}

	/* #endif */


	._p {
		margin-top: -10rpx;
	}

	.u-transition {
		z-index: 2 !important;
	}

	.indicator-num {
		padding: 2px 0;
		background-color: rgba(0, 0, 0, 0.35);
		border-radius: 100px;
		width: 40px;
		@include flex;
		justify-content: center;

		&__text {
			color: #FFFFFF;
			font-size: 12px;
		}
	}
</style>