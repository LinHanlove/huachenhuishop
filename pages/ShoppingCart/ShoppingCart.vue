<template>
	<view class="container">

		<view v-if="goodsCount!==0" class="goodsList_box">
			<view class="goodsList pb-[220rpx] w-full">
				<uni-swipe-action>
					<uni-swipe-action-item :autoClose="true" v-for="(item, index) in cartList" :key="item.id">
						<view class="content w-full h-[240rpx] flex justify-start">
							<view class="checkedItem flex items-center justify-center  w-[120rpx] h-full">
								<image v-if="item.checked===1" @click="isChecked(item)"
									src="@/static/images/gou-red.png" class="w-[40rpx]  h-[40rpx]" mode=""></image>
								<image v-if="item.checked===0" @click="isChecked(item)" src="@/static/images/gou.png"
									class="w-[40rpx]  h-[40rpx]" mode="">
								</image>
							</view>
							<view class="goods-info pt-[30rpx] flex-1">
								<view class="goods-url h-full flex">
									<view class="goGoodsDetail w-[180rpx] h-[180rpx] mr-[20rpx]">
										<image @click="toProductDetails(item)" :src="item.list_pic_url"
											class="w-[180rpx] h-[180rpx]" mode=""></image>
									</view>
									<view class="text-box h-full border-b border-[#eee] flex-1 w-[440rpx]">
										<view
											class="goods-title w-full truncate text-[30rpx] pt-[10rpx] text-[#233445]">
											{{item.goods_name}}
										</view>
										<view
											class="goods-label w-full h-[38rpx] mb-[25rpx] mt-[8rpx] leading-[38rpx] truncate text-[30rpx] text-[#999]">
											{{item.goods_specifition_name_value}}
										</view>
										<view
											class="goods-price pr-[30rpx] flex justify-between w-full h-[60rpx] leading-[38rpx] truncate text-[30rpx] text-[#999]">
											<view class="price-now text-[28rpx] text-[#ff3456]">￥{{item.retail_price}}
											</view>
											<view class="nothing w-[146rpx] h-[52rpx] flex justify-end items-center">
												<view @click="cutNumber(item)"
													class="cutNumber w-[46rpx] h-[46rpx] rounded-full border-[#999] border-[1rpx] border text-center leading-[46rpx]">
													-</view>
												<input type="number" :value="item.number"
													class="number w-[48rpx] h-[46rpx] block mx-[5rpx] text-[28rpx] text-center leading-[46rpx]">
												<view @click="addNumber(item)"
													class="addNumber w-[46rpx] h-[46rpx] rounded-full border-[#999] bg-[#ff3456] text-[#fff] border-[1rpx] border text-center leading-[46rpx]">
													+</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>

						<template v-slot:right>
							<view @click="SwiptAction(item)"
								class="slot-button h-full bg-[#ff3456] text-center leading-[240rpx] text-[28rpx] px-[30rpx] text-[#fff]">
								<text>删除</text>
							</view>
						</template>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<view
				class="settle-box fixed bottom-0 z-[999] border-[#eee] border-t border-[1rpx] flex items-center w-full h-[110rpx] bg-[#fff]">
				<view class="left-price w-full flex items-center h-[100rpx] ">
					<view @click="isCheckAll" class="all-selected pl-[40rpx] text-[#000] flex items-center ">
						<template>
							<image v-if="isCheckAllStart" src="@/static/images/gou-red.png"
								class="w-[40rpx] h-[40rpx] mr-[20rpx]" mode=""></image>
							<image v-if="!isCheckAllStart" src="@/static/images/gou.png"
								class="w-[40rpx] h-[40rpx] mr-[20rpx]" mode=""></image>
						</template>
						<view class="text text-[26rpx]">全选({{cartTotal.checkedGoodsCount }})</view>
					</view>
					<view class="total text-[26rpx] ml-[20rpx] text-[#ff3456]">
						<text>合计:</text>
						<text class="pl-[10rpx]">￥{{cartTotal.checkedGoodsAmount}}</text>
					</view>
				</view>
				<view @click="toConfirmAnOrder"
					class="checkoutOrder w-[300rpx] h-full bg-gradient-to-r from-[#ff3456] to-[#ff347d] text-center leading-[100rpx]  text-[32rpx] text-[#fff]">
					去结算</view>

			</view>
		</view>
		<view v-else class="goodslist_nullbox mt-[240rpx]">
			<view class="cart-empty-view w-[120rpx] h-[120rpx] m-auto">
				<image src="@/static/images/gouwuche0.png" class="w-full h-full" mode=""></image>
			</view>
			<view class="cart-empty-txt text-center w-full text-[#8f8f8f] text-[28rpx] my-[40rpx]">
				车里什么都没有，快去买一点吧
			</view>
			<view @click="toIndex"
				class="to-index-btn text-[#fff] bg-gradient-to-r rounded-lg from-[#ff3456] to-[#ff347d] w-[400rpx] h-[90rpx] leading-[90rpx] text-center m-auto text-[28rpx]">
				去逛逛
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCartIndex,
		setCartUpdate,
		setCartChecked,
		setCartDelete,
		getGoodsCount
	} from "@/service/api.js"
	export default {
		data() {
			return {
				goodsCount: null,
				cartList: [],
				cartTotal: {},
				isCheckAllStart: false,
			}
		},
		methods: {
			async getGoodCount() {
				const {
					cartList,
					cartTotal
				} = await getCartIndex()
				const {
					cartTotal: {
						goodsCount
					}
				} = await getGoodsCount()
				this.cartList = cartList
				this.cartTotal = cartTotal
				this.goodsCount = goodsCount
				console.log(goodsCount);
				this.isCheckAllStart = this.cartTotal.checkedGoodsCount === this.cartTotal.goodsCount ? true :
					false
			},
			// 跳转到商品详情
			toProductDetails(item) {
				uni.navigateTo({
					url: `/pages/productDetails/productDetails?id=${item.goods_id}`
				})
			},
			// 更新购物车
			undataCart(params) {
				setCartUpdate(params).then(() => this.getGoodCount())
			},
			//数量减
			cutNumber(item) {
				if (item.number === 1) return
				item.number--
				this.undataCart({
					id: item.id,
					number: item.number,
					productId: item.product_id,
				})
			},
			//数量加
			addNumber(item) {
				item.number++
				this.undataCart({
					id: item.id,
					number: item.number,
					productId: item.product_id,
				})
			},
			// 调用check函数
			check(params, checked) {
				setCartChecked(params).then((res) => {
					this.cartList = res.cartList
					this.cartTotal = res.cartTotal
					this.isCheckAllStart = this.cartTotal.checkedGoodsCount === this.cartTotal.goodsCount ? true :
						false
				})
			},
			// 点击选中或取消
			isChecked(item) {
				item.checked = item.checked === 0 ? 1 : 0
				this.check({
					productIds: item.product_id,
					isChecked: item.checked
				})
			},
			// 全选按钮
			isCheckAll() {
				this.isCheckAllStart = !this.isCheckAllStart
				if (this.isCheckAllStart) {
					this.check({
						productIds: this.cartList.map(item => item.product_id),
						isChecked: 1
					})
				} else {
					this.check({
						productIds: this.cartList.map(item => item.product_id),
						isChecked: 0
					})
				}
			},
			//跳转到确认订单页面
			toConfirmAnOrder() {
				if (this.cartTotal.checkedGoodsCount === 0) {
					uni.showToast({
						title: '你好像没有选中商品',
						icon: "none",
						duration: 2000
					});
				} else {
					uni.navigateTo({
						url: '/pages/confirmAnOrder/confirmAnOrder',
					});
				}

			},
			//右滑删除
			SwiptAction(item) {
				setCartDelete({
					productIds: item.product_id
				}).then(() => {
					this.getGoodCount()
				})
			},
			// 跳转到首页
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		},
		onShow() {
			this.getGoodCount()
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP */
	.text-box {
		border-bottom: 1rpx solid #eee;
	}

	.cutNumber {
		border: 1rpx solid #eee;
	}

	.goods-price {
		box-sizing: border-box;
		padding: 0 30rpx 0 0;
	}

	/* #endif */
</style>