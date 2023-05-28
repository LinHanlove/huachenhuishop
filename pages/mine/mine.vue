<template>
	<view class="container  bg-[#eee]">
		<view class="userinfo w-full mb-[24rpx] border-box bg-[#fff]">
			<view class="head-wrap flex justify-between items-center mx-[30rpx] py-[30rpx]">
				<view v-if="userInfo" class="head-l flex items-center justify-start">
					<view class="l w-[110rpx] h-[110rpx] mr-[20rpx]">
						<image :src="userInfo.avatar" class="w-[110rpx] h-[110rpx] rounded-full" mode=""></image>
					</view>
					<view class="r flex justify-start items-center ">
						<view class="t text-[28rpx]">
							{{userInfo.nickname}}
						</view>
					</view>
				</view>
				<view v-else class="head-l flex items-center justify-start">
					<view class="l w-[110rpx] h-[110rpx] mr-[20rpx]">
						<image src="" class="w-[110rpx] h-[110rpx] rounded-full" mode=""></image>
					</view>
					<view class="r flex justify-start items-center ">
						<view class="t text-[28rpx]" @click="toRegister">
							点我登录
						</view>
					</view>
				</view>
				<view class="head-r">
					<view class="arrow">
						<image src="@/static/images/rjiantou.png" class="w-[20rpx] h-[20rpx] block" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="order-container  w-full bg-[#fff] h-auto   mb-[24rpx]">
			<view @click='toMyOrder'
				class="header h-[90rpx] w-full mx-[30rpx] pr-[30rpx] text-[30rpx] text-[#8f8f8f] border-b border-[#eee] flex justify-between items-center">
				<view class="top-title w-[200rpx] h-[90rpx] flex justify-start items-center">
					<view class="left-line w-[6rpx] h-[20rpx] bg-[#ff3456] mr-[20rpx]"></view>
					<view class="text ">
						我的订单
					</view>
				</view>
				<view class="see-more h-[90rpx] text-[28rpx] pr-[30rpx] text-[#8f8f8f] flex justify-end items-center">
					<view class="text mr-[20rpx]">
						查看全部订单
					</view>
					<view class="arrow">
						<image src="@/static/images/rjiantou.png" class="w-[20rpx] h-[20rpx] pr-[20rpx] block" mode="">
						</image>
					</view>
				</view>
			</view>
			<view class="btn-container px-[30rpx] py-[24rpx] text-[30rpx] flex justify-between">
				<view class="icon-wrap w-[29%] text-center flex flex-col items-center">
					<view class="arrow">
						<image src="@/static/images/weifukuan.png" class="w-[60rpx] h-[60rpx]  block" mode="">
						</image>
					</view>
					<view>待付款</view>
				</view>
				<view class="icon-wrap w-[29%] text-center flex flex-col items-center">
					<view class="arrow">
						<image src="@/static/images/daifahuo.png" class="w-[60rpx] h-[60rpx]  block" mode="">
						</image>
					</view>
					<view>待发货</view>
				</view>
				<view class="icon-wrap w-[29%] text-center flex flex-col items-center">
					<view class="arrow">
						<image src="@/static/images/daishouhuo.png" class="w-[60rpx] h-[60rpx]  block" mode="">
						</image>
					</view>
					<view>待收货</view>
				</view>

			</view>
		</view>
		<view class="li-wrap flex items-center text-[24rpx] mb-[30rpx] bg-[#fff] px-[30rpx]">
			<view @click='toHarvestAddress' class="list flex justify-between items-center h-[100rpx] w-full border-box">
				<view class="list-l flex items-center justify-start">
					<view class="arrow">
						<image src="@/static/images/zuobiao.png" class="w-[20rpx] h-[20rpx] pr-[20rpx] block" mode="">
						</image>
					</view>
					<view class="text text-[28rpx] text-[#8f8f8f]">
						地址管理
					</view>
				</view>
				<view class="arrow">
					<image src="@/static/images/rjiantou.png" class="w-[20rpx] h-[20rpx] block" mode=""></image>
				</view>
			</view>
		</view>
		<view class="li-wrap flex flex-col items-center text-[24rpx] bg-[#fff] px-[30rpx]">
			<view @click="toFootprintList" class="list flex justify-between items-center h-[100rpx] w-full border-box">
				<view class="list-l flex items-center justify-start">
					<view class="arrow">
						<image src="@/static/images/zuji.png" class="w-[20rpx] h-[20rpx] pr-[20rpx] block" mode="">
						</image>
					</view>
					<view class="text text-[28rpx] text-[#8f8f8f]">
						我的足迹
					</view>
				</view>
				<view class="arrow">
					<image src="@/static/images/rjiantou.png" class="w-[20rpx] h-[20rpx] block" mode=""></image>
				</view>
			</view>
			<button open-type="contact" class="list flex justify-between items-center h-[100rpx] w-full border-box">
				<view class="list-l flex items-center justify-start">
					<view class="arrow">
						<image src="@/static/images/kefu.png" class="w-[20rpx] h-[20rpx] pr-[20rpx] block" mode="">
						</image>
					</view>
					<view class="text text-[28rpx] text-[#8f8f8f]">
						联系客服
					</view>
				</view>
				<view class="arrow">
					<image src="@/static/images/rjiantou.png" class="w-[20rpx] h-[20rpx] block" mode=""></image>
				</view>
			</button>
			<view @click="toAboutUs" class="list flex justify-between items-center h-[100rpx] w-full border-box">
				<view class="list-l flex items-center justify-start">
					<view class="arrow">
						<image src="@/static/images/mine.png" class="w-[20rpx] h-[20rpx] pr-[20rpx] block" mode="">
						</image>
					</view>
					<view class="text text-[28rpx] text-[#8f8f8f]">
						关于我们
					</view>
				</view>
				<view class="arrow">
					<image src="@/static/images/rjiantou.png" class="w-[20rpx] h-[20rpx] block" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: null
			}
		},
		methods: {
			toRegister() {
				uni.navigateTo({
					url: "/pages/register/register"
				})
			},
			// 跳转到地址管理
			toHarvestAddress() {
				uni.navigateTo({
					url: "/pages/harvestAddress/harvestAddress"
				})
			},
			//跳转到我的订单
			toMyOrder() {
				uni.navigateTo({
					url: "/pages/myOrder/myOrder"
				})
			},
			//本地获取userInfo
			getUserInfo() {
				const {
					userInfo
				} = uni.getStorageSync('auth')
				if (userInfo) {
					this.userInfo = userInfo
				} else {
					this.userInfo = null
				}
			},
			// 跳转到我的足迹
			toFootprintList() {
				uni.navigateTo({
					url: "/pages/myFootprintList/myFootprintList"
				})
			},
			// 跳转到关于我们
			toAboutUs() {
				uni.navigateTo({
					url: "/pages/aboutUs/aboutUs"
				})
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: '新的标题'
			});
			this.getUserInfo()
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP */
	.header {
		border-bottom: 1rpx solid #eee;
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
</style>