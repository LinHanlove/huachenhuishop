<template>
	<view class="container bg-[#eee]">
		<view class="edit-container  w-full mb-[30rpx] rounded-lg shadow-lg">
			<form class="w-full h-full" @submit="formSubmit">

				<view class="uni-form-item bg-[#fff] uni-column flex justify-start items-center pl-[30rpx]">
					<view class="img  flex items-center mr-[20rpx]">
						<image src="@/static/images/xming.png" class="w-[36rpx]  h-[36rpx]" mode=""></image>
					</view>
					<view
						class="input-wrap flex justify-between items-center flex-1 py-[30rpx] pr-[30rpx] border-[#eee] border-b">
						<input type="text" placeholder="姓名" v-model="form.name" class="a-input  w-full text-[28rpx]  ">
					</view>

				</view>
				<view class="uni-form-item bg-[#fff]  uni-column flex justify-start items-center pl-[30rpx]">
					<view class="img  flex items-center mr-[20rpx]">
						<image src="@/static/images/phone.png" class="w-[36rpx]  h-[36rpx]" mode=""></image>
					</view>
					<view
						class="input-wrap flex justify-between items-center flex-1 py-[30rpx] pr-[30rpx] border-[#eee] border-b">
						<input type="text" placeholder="手机号码" v-model="form.phone"
							class="a-input  w-full text-[28rpx]  ">
					</view>

				</view>
				<view @click="popup=true"
					class="uni-form-item  bg-[#fff]  uni-column flex justify-start items-center pl-[30rpx]">
					<view class="img  flex items-center mr-[20rpx]">
						<image src="@/static/images/dizhi-red.png" class="w-[36rpx]  h-[36rpx]" mode=""></image>
					</view>
					<view
						class="input-wrap flex justify-between items-center flex-1 py-[30rpx] pr-[30rpx] border-[#eee] border-b">
						<input type="text" :disabled="true" placeholder="选择省份、城市、区县" v-model="form.region"
							class="a-input  w-full text-[28rpx]  ">
					</view>

				</view>
				<view class="uni-form-item bg-[#fff]  uni-column flex justify-start items-center pl-[30rpx]">
					<view class="img  flex items-center mr-[20rpx]">
						<image src="@/static/images/lou.png" class="w-[36rpx]  h-[36rpx]" mode=""></image>
					</view>
					<view
						class="input-wrap  pb-[30rpx] flex justify-between items-center flex-1 py-[30rpx] pr-[30rpx] border-[#eee] border-b">
						<input type="text" placeholder="详细地址, 如街道、小区或写字楼等" v-model="form.detailRegion"
							class="a-input  w-full text-[28rpx]  ">
					</view>
				</view>
				<view
					class="default-wrap w-full  bg-[#fff] my-[32rpx] shadow-lg rounded-lg p-[30rpx] border-box  flex justify-between items-center">
					<view class="text text-[28rpx]">
						设为默认地址
					</view>
					<switch checked color="#FF3456" style="transform:scale(0.7)" />
				</view>
				<view class="btn-wrap w-full pt-[30rpx] border-box">
					<button form-type="submit"
						class="btn rounded-lg shadow-lg bg-gradient-to-r from-[#ff3456] to-[#ff347d] text-[28rpx] leading-[100rpx] h-[100rpx] w-full text-center">
						保存
					</button>
				</view>
			</form>
		</view>
		<ehPicker @conceal="conceal" v-if="popup" />
	</view>
</template>

<script>
	import ehPicker from '@/components/erha-picker/erha-picker.vue';
	import {
		getAddressDetail,
		getRegionList
	} from "@/service/api.js"
	export default {
		components: {
			ehPicker
		},
		data() {
			return {
				form: {
					name: "",
					phone: "",
					region: "",
					detailRegion: ''
				},
				id: null,
				popup: false
			}
		},
		methods: {
			conceal(param) {
				// 获取到传过来的 省 市 区 县数据
				console.log(param);
				// 选择完毕后隐藏
				this.popup = false;

			},
			formSubmit: function(e) {
				if (this.id) {
					console.log(88);
				} else {

					console.log(999);
				}
			},

			// 收货地址详情	
			addressDetail() {
				getAddressDetail({
					id: 0
				}).then(() => {})
			}
		},
		onLoad(params) {
			if (params.id) {
				this.id = params.id
				uni.setNavigationBarTitle({
					title: '编辑地址'
				});
				getAddressDetail({
					id: params.id
				}).then((res) => {
					this.form.name = res.name
					this.form.phone = res.mobile
					this.form.region = res.full_region
					this.form.detailRegion = res.address
				})
			}
		},
		onShow() {
			this.addressDetail()
		},
	}
</script>

<style lang="scss">
	/* #ifdef APP */
	.input-wrap {
		border: 1rpx solid #eee;
	}

	/* #endif */
</style>