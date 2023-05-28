<template>
	<view class="container  bg-[#eee]">
		<view class="print-goods w-full   ">
			<view class="day-item w-full bg-[#fff] mb-[20rpx]">
				<view class="day-hd w-full h-[100rpx] leading-[100rpx] text-[#8f8f8f] text-center text-[30rpx]">
					654844
				</view>
				<view class="item-list_box w-full h-auto flex flex-wrap">
					<view
						class="item_list border-r border-b border-[#eee] bg-[#fff] w-1/2 h-auto  text-center p-[20rpx border-box]">
						<view class="_image w-full flex justify-end">
							<image src="@/static/images/delete.png" class="w-[46rpx] h-[46rpx]" mode=""></image>
						</view>
						<view class="box">
							<image src="@/static/images/delete.png" class="w-[320rpx] h-[320rpx]" mode=""></image>
						</view>
						<view class="goods-info text-left pl-[20rpx]">
							<view class="goods-title text-[28rpx] text-[#8f8f8f] mb-[6rpx] truncate">
								afaf
							</view>
							<view class="goods-title text-[28rpx] text-[#888] mb-[6rpx] truncate">
								afaf
							</view>
							<view class="goods-title text-[28rpx] text-[#ff3456] mb-[6rpx] truncate">
								afaf
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getFootprintList
	} from "@/service/api.js"
	export default {
		data() {
			return {
				time: null
			}
		},
		methods: {
			async getFootprintlist() {
				const data = await getFootprintList({
					page: 1,
					size: 8
				})
				console.log(data);
			}
		},
		onShow() {
			this.getFootprintlist()
		}
	}
</script>

<style lang="scss">

</style>