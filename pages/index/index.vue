<template>
	<view>
		<view class="search w-full h-[100rpx] px-[24rpx] flex items-center border-b border-[#eeeeee] border-t"
			@click="toSearchPage">
			<iconfont name="sousuo"></iconfont>
			<text class="text-[28rpx] text-[#666] pl-[10rpx]">搜索,发现更多好物</text>
		</view>
		<view class="banner w-full h-[420rpx] mt-[10rpx]">
			<u-swiper :list="banner.map(item => item.image_url)" height="400rpx" previousMargin="30" nextMargin="30"
				circular :autoplay="true" radius="5" bgColor="#ffffff" @click="toProductDetails"></u-swiper>
		</view>
		<!-- 2轮播 -->
		<view class='catalog-wrap w-full h-[144rpx]'>
			<swiper :autoplay="false" class="h-full" :acceleration="true" :display-multiple-items="1"
				previous-margin="15rpx" next-margin="15rpx" :current="current">
				<swiper-item class="w-full h-full flex justify-around items-center">
					<view class="swiper-item text-center" @click="toClassification(item)" v-for="item in channel"
						:key="item.id">
						<image :src="item.icon_url" mode="" class="w-[70rpx] h-[70rpx]"></image>
						<text class="block text-[26rpx] mt-[10rpx]">{{item.name}}</text>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<view class="goods-containerr w-full px-[30rpx] mt-[10rpx]">
			<view class="topic-container w-full" v-for="(item) in categoryList" :key="item.id">
				<view class="relative w-full h-[66px] rounded-lg overflow-hidden">
					<image :src="item.banner" mode="" class="w-full h-[66px]"></image>
					<view
						class="bg w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-[#000] opacity-[0.2] text-[#fff] text-center leading-[66px]">
					</view>
					<view
						class="text w-full h-full absolute top-0 left-0 right-0 bottom-0  text-[#fff] text-center leading-[66px]">
						{{item.name}}
					</view>
				</view>
				<view class="list-wrap flex flex-wrap w-full h-auto py-[26rpx] border-box">
					<view class="new-box  w-[200rpx] mr-[30rpx] mb-[20rpx]" @click="toProductDetails(goodsList)"
						v-for="goodsList in item.goodsList " :key="goodsList.id">
						<view class="box w-full">
							<image class="w-[200rpx] h-[200rpx]" :src="goodsList.list_pic_url" mode="">
							</image>
						</view>
						<view class="goods-info	w-full text-[24rpx] ">
							<text class="goods-title w-full truncate block">{{goodsList.name}}</text>
							<text class="price-container text-[red] block">￥{{goodsList.min_retail_price}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getAppInfo,
		getGoodsCount
	} from '@/service/api.js';
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				value: '',
				banner: [],
				categoryList: [],
				channel: [],
				current: 0
			}
		},
		computed: {
			...mapState(['goodCount']),
		},
		methods: {
			...mapMutations(['SET_GOODSLIST']),
			toSearchPage() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			async getAppInfoApi() {
				const {
					banner,
					categoryList,
					channel,
					notice
				} = await getAppInfo()
				this.banner = banner
				this.categoryList = categoryList
				this.channel = channel
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
				this.setTabBar()
			},
			// 跳转带商品详情
			toProductDetails(item) {
				if (typeof item == 'number') {
					uni.navigateTo({
						url: `/pages/productDetails/productDetails?id=${this.banner[item].goods_id}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/productDetails/productDetails?id=${item.id}`
					})
				}
			},
			// 跳转到商品分类
			toClassification(item) {
				uni.setStorageSync('toClassifications', {
					id: item.id,
					index: item.sort_order
				})
				uni.reLaunch({
					url: `/pages/classification/classification`
				})
			},
			setTabBar() {
				uni.setTabBarBadge({
					index: 2, // 索引，从 0 开始，指定第几个 tabBar
					text: `${this.goodCount}` // 徽标中显示的文本
				})
			}
		},

		onShow() {
			this.getAppInfoApi()
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP */
	.goods-containerr {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	/* #endif */
</style>