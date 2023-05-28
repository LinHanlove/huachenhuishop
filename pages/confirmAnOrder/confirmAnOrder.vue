<template>
	<view class="container bg-[#eee] pb-[50rpx]">
		<view class="wrap w-full">
			<view class="address-box w-full mb-[22rpx]">
				<view
					class="receive-title text-[26rpx] text-[#8f8f8f] p-[24rpx] border-b border-t border-[#eee] bg-[#fff]">
					收件人
				</view>
				<view @click="toHarvestAddress"
					class="add-address w-full bg-[#fff] p-[24rpx] border-box flex items-center justify-start">
					<image src="@/static/images/location.png" class="w-[50rpx] h-[50rpx] block" mode=""></image>
					<view class="addr-r w-full flex items-center justify-between ">
						<view class="addr-title text-[28rpx] leading-[80rpx] text-[#8f8f8f] ml-[24rpx]">请选择收货地址</view>
						<view class="arrow">
							<image src="@/static/images/rjiantou.png" class="w-[20rpx] h-[20rpx]" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="goods-list w-full mb-[24rpx] bg-[#fff]">
				<view class="list-title text-[26rpx] text-[#8f8f8f] p-[24rpx] border-b border-[#eee]">商品信息</view>
				<view class="a-goods p-[24rpx] flex bg-[#fff] justify-between">
					<view class="img-box h-[100rpx] flex justify-start items-center">
						<view class="image-wrap" v-for="(item,index) in checkedGoodsList" :key="item.id">
							<template v-if="index<5">
								<image :src="item.list_pic_url" class="w-[100rpx] h-[100rpx] mr-[12rpx]" mode="">
								</image>
							</template>
						</view>
					</view>
					<view class="goods-sum h-[100rpx] leading-[100rpx] text-[26rpx] text-[#8f8f8f] flex items-center ">
						<view class="text mr-[20rpx]">共{{CataCheckout.goodsCount}}件</view>
						<view class="arrow">
							<image src="@/static/images/rjiantou.png" class="w-[20rpx] h-[20rpx]" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="price-check-wrap bg-[#fff] pb-[24rpx] mb-[24rpx]">
				<view
					class="row-box flex justify-between items-center text-[28rpx] border-box border-b border-[#eee] px-[24rpx] h-[90rpx]">
					<view class="row-label w-[140rpx]">
						商品总价
					</view>
					<view class="right-text text-[#8f8f8f]">￥{{CataCheckout.goodsTotalPrice}}</view>
				</view>
				<view
					class="row-box flex justify-between items-center text-[28rpx] border-box border-b border-[#eee] px-[24rpx] h-[90rpx]">
					<view class="row-label w-[140rpx]">
						快递
					</view>
					<view class="right-text text-[#8f8f8f]">￥{{CataCheckout.freightPrice}}</view>
				</view>
				<view
					class="memo-box flex justify-between items-center text-[28rpx] border-box border-b border-[#eee] px-[24rpx] h-[90rpx]">
					<view class="row-label w-[140rpx]">
						快递
					</view>
					<view class="right-text text-[#8f8f8f] flex-1 ml-[8rpx]">
						<input type="text" class="h-[20rpx] text-right" placeholder="亲爱的买家，这里输入备注">
					</view>
				</view>
				<view class="bottom-box flex justify-end text-[28rpx] items-center border-box h-[90rpx] pr-[24rpx]">
					<view class="row-label w-[140rpx] ">合计:</view>
					<view class="right-text price-to-pay text-[30rpx] text-[#ff3456] font-bold ml-[6rpx]">
						￥{{CataCheckout.orderTotalPrice}}</view>
				</view>
			</view>
			<view class="pay-list flex justify-between items-center bg-[#fff] px-[24px] py-[30rpx] mb-[24rpx]">
				<view class="list-title text-[28rpx]">支付方式</view>
				<radio-group class="radio-group">
					<radio class="text-[26rpx] ml-[24rpx]" color="#09bb07"> 线下支付</radio>
					<radio class="text-[26rpx] ml-[24rpx]" color="#09bb07"> 在线支付</radio>
				</radio-group>
			</view>
		</view>
		<view
			class="settle-box flex fixed justify-between items-center h-[101rpx] w-full fiexd bottom-0 border-t border-[#eee] bg-[#fff]">
			<view
				class="left-price flex w-[500rpx] justify-start items-center leading-[100rpx] text-[28rpx] border-box pl-[24rpx]">
				<view class="total text-[#233445]"> 实付:</view>
				<view class="pay-money text-[#ff3456] text-[30rpx] font-bold">￥{{CataCheckout.actualPrice}}</view>
			</view>
			<view
				class="block w-[300rpx] flex justify-center h-full items-center bg-gradient-to-r from-[#ff3456] to-[#ff347d] rounded-0 h-full text-[32rpx] text-[#fff] border-0">
				<view>提交订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCataCheckout
	} from "@/service/api.js"
	export default {
		data() {
			return {
				checkedAddress: null,
				checkedGoodsList: null,
				CataCheckout: null,
				orderGoodsID: null
			}
		},
		methods: {
			// 接受参数
			onLoad(params) { //option为object类型，会序列化上个页面传递的参数
				this.orderGoodsID = params.id
			},

			// 下单前信息确认
			async getConfirmAnOrder() {
				console.log(this.orderGoodsID);
				if (this.orderGoodsID !== undefined) {
					console.log('进来了');
					const data = await getCataCheckout({
						addressId: 0,
						addType: 1,
						orderFrom: 'undefined',
						type: 0,
					})
					this.CataCheckout = data
					this.checkedAddress = data.checkedAddress
					this.checkedGoodsList = data.checkedGoodsList

				} else {
					const data = await getCataCheckout({
						addressId: 0,
						addType: 0,
						orderFrom: undefined,
						type: 0
					})
					this.CataCheckout = data
					this.checkedAddress = data.checkedAddress
					this.checkedGoodsList = data.checkedGoodsList
				}


			},
			// 跳转到收获地址
			toHarvestAddress() {
				uni.navigateTo({
					url: '/pages/harvestAddress/harvestAddress'
				})
			}
		},
		onShow() {
			this.getConfirmAnOrder()
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP */
	.receive-title,
	.settle-box {
		border-bottom: 1rpx solid #eee;
		border-top: 1rpx solid #eee;
	}

	.addr-r {
		padding-right: 50rpx;
	}

	.list-title,
	.row-box,
	.memo-box {
		border-bottom: 1rpx solid #eee;
	}

	/* #endif */
</style>