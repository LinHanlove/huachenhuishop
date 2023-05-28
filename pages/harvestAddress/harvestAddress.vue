<template>
	<view>
		<view v-if="!addresses" class="no-info mt-[300rpx] justify-center items-center flex-col flex">
			<image src="@/static/images/zuobiao.png" class="w-[100rpx] h-[100rpx] mb-[30rpx]" mode=""></image>
			<view class="text  text-[30rpx] text-[#8f8f8f] text-center  mb-[30rpx]">
				没有地址信息
			</view>
		</view>
		<view v-else class="has-info flex flex-col pb-[160rpx] p-[30rpx]">
			<view v-for="item in addresses" :key="item.id" @click='editAddress(item)'
				class="info-item border-box h-full py-[30rpx] flex justify-between bg-[#fff] rounded-lg shadow-lg mb-[24rpx]">
				<view class="info-wrap flex flex-col pl-[30rpx]">
					<view class="addr flex flex-col mb-[10rpx]">
						<view class="top text-[30rpx] font-bold mb-[4rpx]">
							{{item.address}}
						</view>
						<view class="text text-[24rpx] text-[#8f8f8f]">
							{{item.full_region}}
						</view>
					</view>
					<view class="name flex justify-start items-center">
						<view class="text text-[26rpx] mr-[10rpx]">
							<text> {{item.name}}</text>
							<text> {{item.mobile}}</text>
						</view>
						<view v-if="item===1"
							class="default text-[22rpx] text-[#ff3456] bg-[#faedef] text-center px-[2rpx] py-[10rpx] rounded-sm">
							默认
						</view>
					</view>

				</view>
				<view class="edit-wrap mt-[60rpx] mr-[20rpx]  h-full flex items-end">
					<view class="w-[60rpx] h-[60rpx]">
						<image src="@/static/images/qinam .png" class="w-[60rpx] h-[60rpx]" mode=""></image>
					</view>
				</view>

			</view>
		</view>

		<view @click="addNewAddress" class="btn-wrap fixed bottom-0 w-full h-[100rpx] flex justify-center items-center">
			<view
				class="btn w-full bg-gradient-to-r from-[#ff3456] to-[#ff347d] text-[28rpx] text-center leading-[100rpx]">
				新增收货地址
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getAddresses
	} from "@/service/api.js"
	export default {
		data() {
			return {
				addresses: []
			}
		},
		methods: {
			addNewAddress() {
				uni.navigateTo({
					url: `/pages/addNewAddress/addNewAddress`
				})
			},
			editAddress(item) {
				uni.navigateTo({
					url: `/pages/addNewAddress/addNewAddress?id=${item.id}`
				})
			},
			// 获取收获地址
			async _getAddresses() {
				const data = await getAddresses()
				this.addresses = data
				console.log(data);
			}
		},
		onShow() {
			this._getAddresses()
		}
	}
</script>

<style>

</style>