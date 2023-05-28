<template>
	<view>
		<!-- 跳转到搜索 -->
		<navigator class="w-full h-[80rpx] bg-[#f8f8f8] flex items-center justify-center">
			<iconfont name="sousuo" class="block"></iconfont>
			<text class="text-[28rpx] text-[#666]  pl-[10rpx]">搜索,共{{goodsCount}}款好味</text>
		</navigator>
		<view class="catalog flex">
			<view class="l w-[162rpx] h-full">
				<view v-if="goodsCount!==0" @click="activeOptionsList(0,0)" :class="{active: activeOption === 0}"
					class="w-[162rpx] h-[90rpx] text-[28rpx] leading-[90rpx] text-[#8f8f8f] text-center">全部</view>
				<view @click="activeOptionsList(item.id,index)" :class="{active: activeOption === index+1}"
					class="w-[162rpx] h-[90rpx] text-[28rpx] leading-[90rpx] text-[#8f8f8f] text-center"
					v-for="(item,index) in categoryList" :key="item.id">{{item.name}}</view>
			</view>
			<view class="r h-full flex-1">
				<view class=" w-full h-auto flex flex-wrap">
					<view class="good-box w-full flex flex-wrap px-[20rpx] mb-[100rpx]">
						<view v-if="optionsImg!== null" class="relative w-full h-[66px] rounded-lg overflow-hidden">
							<image :src="optionsImg.img_url" mode="" class="w-full h-[66px]"></image>
							<view
								class="bg w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-[#000] opacity-[0.2] text-[#fff] text-center leading-[66px]">
							</view>
							<view
								class="text w-full h-full absolute top-0 left-0 right-0 bottom-0  text-[#fff] text-center leading-[66px]">
								{{optionsImg.name}}
							</view>
						</view>
						<view class="w-1/2 mb-[100rpx]" @click="toProductDetails(item)" v-for="item in currentlist"
							:key="item.id">
							<view class="box w-full h-[338rpx] ">
								<image :src="item.list_pic_url" mode="" class="w-full m-auto h-full block"></image>
							</view>
							<view class="goods-info px-[10rpx] text-[28rpx]">
								<text class="goods-title w-full truncate block">{{item.name}}</text>
								<view class="goods-intro w-full truncate text-[#8f8f8f] text-[20rpx]">
									{{item.goods_brief}}
								</view>
								<view class="price-container w-full truncate text-[24rpx] text-[red]">
									￥{{item.min_retail_price}}
								</view>
							</view>
						</view>
					</view>
					<u-loadmore v-if="goodsCount!==0" loadmoreText="没有更多了" class="mt-[20rpx] block" color="#ed5b58"
						lineColor="#ed5b58" dashed line />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCatalog,
		getCount,
		getCatalogCurrentlist,
		getShowSettings,
		getCatalogCurrent
	} from "@/service/api.js"
	export default {
		data() {
			return {
				optionsImg: null,
				activeOption: 0,
				goodsCount: 0, //商品数量
				categoryList: [],
				currentlist: [],
				showSettings: {},
				indexParams: null,
			}
		},
		methods: {
			// 商品列表
			async getGoodsList(params) {
				const Currentlistdata = await getCatalogCurrentlist(params)
				this.currentlist = Currentlistdata.data

			},
			async startRander() {
				this.indexParams = uni.getStorageSync('toClassifications');
				const {
					goodsCount
				} = await getCount()
				// 获取分类目录全部分类数据
				const {
					categoryList
				} = await getCatalog()
				if (this.indexParams === '') {
					this.getGoodsList({
						id: 0,
						page: 1,
						size: 8,
					})
				} else {
					this.activeOption = this.indexParams.index
					this.getGoodsList({
							id: this.indexParams.id,
							page: 1,
							size: 8,
						}),
						getCatalogCurrent({
							id: this.indexParams.id
						}).then(res => {
							this.optionsImg = res
						})
				}
				// 显示设置
				const Settingsdata = await getShowSettings()
				this.goodsCount = goodsCount
				this.categoryList = categoryList
				this.showSettings = Settingsdata
				uni.removeStorageSync('toClassifications');
			},
			// 切换请求
			activeOptionsList(id, index) {
				if (id === 0) {
					this.activeOption = index
					this.optionsImg = null
				} else {
					this.activeOption = index + 1
					getCatalogCurrent({
						id
					}).then(res => {
						this.optionsImg = res
					})
				}

				this.getGoodsList({
					id: id,
					page: 1,
					size: 8,
				})
			},
			// 跳转到商品详情
			toProductDetails(item) {
				uni.navigateTo({
					url: `/pages/productDetails/productDetails?id=${item.id}`
				})
			}
		},
		// watch: {
		// 	indexParams: {
		// 		handler(value) {
		// 			if (value === '') {
		// 				console.log(666);
		// 			} else {
		// 				console.log(999);
		// 			}
		// 			console.log('------', value);
		// 			uni.removeStorageSync('toClassifications');

		// 		},
		// 		// immediate: true
		// 	}
		// },
		onShow() {
			// this.indexParams = uni.getStorageSync('toClassifications');
			this.startRander()
		}
	}
</script>

<style lang="scss">
	.active {
		color: #ff3456;
		font-size: 32rpx;
		font-weight: 500;
	}
</style>