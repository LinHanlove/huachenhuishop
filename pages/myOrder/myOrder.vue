<template>
	<view class="bg-[#eee]">
		<u-sticky bgColor="#fff">
			<u-tabs :inactiveStyle="{fontSize:'28rpx'}" :activeStyle="{fontSize:'30rpx'}" lineColor="#ff3456"
				:list="list1" @click='current'></u-tabs>
		</u-sticky>
		<view class="wrap w-full h-auto bg-[#fff]">
			<view v-if='orderList.length!==0' class="have">
				<view v-for="item in orderList" :key="item.id"
					class="order-list-wrap pr-[30rpx] w-full bg-[#fff] mt-[18rpx]">
					<view
						class="list-top-wrap h-[90rpx] px-[24rpx] leading-[90rpx] flex justify-between  border-b border-[#eee]">
						<view class="time text-[26rpx] text-[#8f8f8f]">
							{{item.add_time}}
						</view>
						<view class="status flex  justify-end items-center">
							<view class="order-status text-[#ff3456] text-[28rpx]">
								{{item.order_status_text}}
							</view>
						</view>
					</view>
					<view class="goods-list w-full bg-[#fff]">
						<view class="a-goods flex justify-between items-center p-[24rpx]">
							<view class="img-box h-[120rpx] flex justify-start">
								<view class="image-wrap" v-for="images in item.goodsList" :key="images.id">
									<image :src="images.list_pic_url" class="w-[120rpx] h-[120rpx] mr-[18rpx]" mode="">
									</image>
								</view>
							</view>
							<view
								class="goods-sum h-[100rpx] leading-[100rpx] flex justify-end items-center text-[26rpx] text-[#8f8f8f]">
								<view class="text mr-[20rpx]">
									共{{item.goodsCount}}件
								</view>
								<view class="arrow">
									<image src="@/static/images/rjiantou.png" class="w-[20rpx] h-[20rpx] block" mode="">
									</image>
								</view>
							</view>
						</view>
					</view>
					<view
						class="order-price-wrap border-[#eee] border-b h-[90rpx] leading-[90rpx] flex justify-end items-center bg-[#fff]">
						<view class="order-price pr-[20rpx] h-[90rpx] flex justify-end">
							<view class="price-label text-[26rpx] text-[#8f8f8f]">
								总价：¥
							</view>
							<view class="price-sum text-[30rpx]">
								{{item.actual_price}}
							</view>
						</view>
						<view class="trans text-[28rpx] text-[#233445]">
							(含运费 ¥{{item.freight_price}})
						</view>
					</view>
					<view class="order-edit h-[100rpx] flex justify-end items-center">
						<view
							class="edit-btn py-[8rpx] rounded-lg px-[20rpx] text-[24rpx] text-[#fff] bg-gradient-to-r from-[#ff3456] to-[#ff347d]  h-[60rpx] leading-[44rpx] mr-[24rpx]">
							继续支付
						</view>
					</view>
				</view>

			</view>
			<view v-else class="no-have flex flex-col items-center w-full pt-[230rpx]">
				<view class="_image m-auto">
					<image src="@/static/images/ddan.png" class="mb-[30rpx] w-[100rpx] h-[100rpx]" mode=""></image>
				</view>

				<view class="text text-[30rpx] text-[#8f8f8f] text-center mb-[30rpx]">
					您目前没有相关订单
				</view>
				<view @click="toIndex"
					class="to-index-btn text-[#fff] text-center rounded-lg w-[300rpx] h-[90rpx] leading-[90rpx] text-[28rpx] m-auto    bg-gradient-to-r from-[#ff3456] to-[#ff347d]">
					马上去逛逛
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getOrderList
	} from "@/service/api.js"
	export default {
		data() {
			return {
				list1: [{
					name: '全部',
					showType: 0
				}, {
					name: '待付款',
					showType: 1
				}, {
					name: '待发货',
					showType: 2
				}, {
					name: '待收货',
					showType: 3
				}],
				orderList: []
			}
		},
		methods: {
			async getorderList(
				showType = 0,
				size = 8,
				page = 1
			) {
				const {
					data
				} = await getOrderList({
					showType,
					size,
					page
				})
				this.orderList = data
				console.log(data);
			},
			current(item) {
				this.getorderList(item.showType, 8, 1)
				console.log(item);
			},
			// 跳转到主页
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		},
		onShow() {
			this.getorderList()
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP */
	.list-top-wrap {
		border: 1rpx solid #eee;
	}

	/* #endif */
</style>