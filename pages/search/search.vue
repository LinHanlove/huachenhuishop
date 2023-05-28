<template>
	<view class="px-[24rpx]">
		<view class="search w-full h-[100rpx] flex items-center border-b border-[#eeeeee] border-t">
			<u-search :inputStyle="{fontSize:'28rpx'}" v-model="value"
				class="w-[calc(100%-90rpx)] text-[28rpx] h-[70rpx]" :showAction="false" shape="square" :animation="true"
				bgColor="#ffffff" @input="SearchHelper(value)" @focus="SearchHelper(value)"
				@search="searchKeyDown(value)"></u-search>
			<text class="text-[28rpx] text-[#666] text-right block w-[90rpx] h-full leading-[100rpx]"
				@click="back">取消</text>
		</view>
		<view class="warp" v-if="value===''">
			<view class="no-search" v-if="searchStatus">
				<view class="serach-keywords search-history" v-if="historyKeywordList.length!==0">
					<view class="h w-full h-[90rpx] text-[#8f8f8f] text-[28rpx] flex items-center justify-between">
						<text class="w-auto h-full block leading-[90rpx]">历史记录</text>
						<iconfont name="icon" @click="clearHistory"></iconfont>
					</view>
					<view class="b w-full h-auto border-box flex flex-wrap items-center">
						<view @click="historyKeyword(item)" v-for="(item,index) in historyKeywordList" :key="index"
							class="w-auto h-[48rpx] text-[24rpx] mx-[24rpx] mb-[24rpx] px-[14rpx] border border-[#eeeeee] leading-[48rpx]">
							{{item}}
						</view>
					</view>
				</view>
				<view class="serach-keywords search-hot">
					<view class="h w-full h-[90rpx] text-[#8f8f8f] text-[28rpx]">
						<text class="w-auto h-full leading-[90rpx]">热门搜索</text>
					</view>
					<view class="b w-full h-auto border-box flex items-center">

					</view>
				</view>
			</view>
			<!-- 搜索为空 -->
			<template v-if="!searchStatus && searchGoodsList.length === 0">
				<view class="text-[#8f8f8f] pt-[200rpx] w-full">
					<!-- #ifdef MP-WEIXIN -->
					<iconfont name="shila" class="text-[200rpx] "></iconfont>
					<!-- #endif -->
					<!-- #ifdef APP -->
					<image src="@/static/images/shiluo.png" mode="" class="w-[200rpx] m-auto block h-[200rpx]"></image>
					<!-- #endif -->
					<text class="text-[28rpx] w-full mt-[20rpx] block text-center">没找到，换个关键字试试</text>
				</view>
			</template>
			<!-- 搜索有内容 -->
			<template v-if="!searchStatus && searchGoodsList.length !== 0">
				<view class="shelper-list">
					<view class="w-full h-[70rpx]  px-[50rpx] text-[28rpx] mt-[10rpx]">

						<view class="flex w-full m-auto justify-around h-[100rpx]">
							<view v-for="(item ,index) in ['综合','价格','销量']" @click='activeSub(item,index)'
								:style="{color:subsection == item ? 'red' : 'black'}"
								class="w-1/3 flex items-center justify-center h-full text-[24rpx] leading-[100rpx] text-center ">
								<view>{{item}}</view>
								<template v-if="index===1">
									<view class="w-[20rpx] h-[40rpx] mr-[6rpx] pt-[9rpx]">
										<view>
											<image v-if="!priceStatus" src="@/static/images/shangjiantou.png"
												class="w-[15rpx] h-[15rpx] block" mode=""></image>
											<image v-if="priceStatus" src="@/static/images/shangjiantou-copy.png"
												class="w-[15rpx] h-[15rpx] block" mode=""></image>
										</view>
										<view>
											<image v-if="priceStatus" src="@/static/images/xiajiantou.png"
												class="w-[15rpx] h-[15rpx] block" mode=""></image>

											<image v-if="!priceStatus" src="@/static/images/xiajiantou-copy.png"
												class="w-[15rpx] h-[15rpx] block" mode=""></image>
										</view>
									</view>
								</template>

								<template v-if="index===2">
									<view class="w-[20rpx] h-[40rpx] mr-[6rpx] pt-[9rpx]">
										<view>
											<image v-if="!countStatus" src="@/static/images/shangjiantou.png"
												class="w-[15rpx] h-[15rpx] block" mode=""></image>
											<image v-if="countStatus" src="@/static/images/shangjiantou-copy.png"
												class="w-[15rpx] h-[15rpx] block" mode=""></image>
										</view>
										<view>
											<image v-if="countStatus" src="@/static/images/xiajiantou.png"
												class="w-[15rpx] h-[15rpx] block" mode=""></image>

											<image v-if="!countStatus" src="@/static/images/xiajiantou-copy.png"
												class="w-[15rpx] h-[15rpx] block" mode=""></image>
										</view>
									</view>
								</template>
							</view>
						</view>

						<view class=" w-full h-auto flex flex-wrap">
							<!-- #ifdef APP-->
							<view class="good-box w-[336rpx]  mb-[100rpx]" @click="toProductDetails(item)"
								v-for="item in searchGoodsList" :key="item.id">
								<view class="box w-full h-[338rpx] ">
									<image :src="item.list_pic_url" mode="" class="w-full m-auto h-full block"></image>
								</view>
								<view class="goods-info text-[28rpx]">
									<text class="goods-title text-black">{{item.name}}</text>
									<view class="goods-intro text-[#8f8f8f] text-[20rpx]">
										{{item.goods_brief}}
									</view>
									<view class="price-container text-[red]">￥{{item.min_retail_price}}
									</view>
								</view>
							</view>
							<!-- #endif -->
							<!-- #ifdef MP-WEIXIN-->
							<view class="good-box w-[300rpx] mb-[100rpx]" @click="toProductDetails(item)"
								v-for="item in searchGoodsList" :key="item.id">
								<view class="box w-full h-[338rpx] ">
									<image :src="item.list_pic_url" mode="" class="w-full m-auto h-full block"></image>
								</view>
								<view class="goods-info text-[28rpx]">
									<text class="goods-title text-black">{{item.name}}</text>
									<view class="goods-intro text-[#8f8f8f] text-[20rpx]">
										{{item.goods_brief}}
									</view>
									<view class="price-container text-[24rpx] text-[red]">
										￥{{item.min_retail_price}}
									</view>
								</view>
							</view>
							<!-- #endif -->
							<u-loadmore loadmoreText="没有更多了" class="mt-[20rpx] block" color="#ed5b58"
								lineColor="#ed5b58" dashed line />
						</view>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import {
		getSearchIndex,
		getSearchHelper,
		getSearchGoodsList,
		setClearHistory
	} from "@/service/api.js"
	export default {
		data() {
			return {
				value: '',
				subsection: '综合',
				priceStatus: true,
				countStatus: true,
				historyKeywordList: [], //历史搜索
				searchGoodsList: [], //搜索结果
				searchStatus: true, //搜索状态
				isAscendingOrder: true
			}
		},
		methods: {
			async getSearchInfo() {
				const {
					historyKeywordList
				} = await getSearchIndex()
				this.historyKeywordList = historyKeywordList
			},

			// 聚焦搜索
			SearchHelper(value) {
				getSearchHelper(value)
			},
			// 搜索请求
			SearchGoodsList(params) {
				getSearchGoodsList(params).then((data) => {
					this.searchGoodsList = data
					this.searchStatus = false
				})
			},
			// 回车
			searchKeyDown(value) {
				if (value === '') {
					this.SearchGoodsList({
						keyword: '',
						sort: 'default',
						order: 'desc',
						sales: 'desc'
					})

				} else {
					this.SearchGoodsList({
						keyword: value
					})
				}

			},
			// 选项卡
			activeSub(item, index) {
				this.subsection = item
				if (index === 0) {
					this.SearchGoodsList({
						keyword: this.value,
						sort: 'default',
						order: 'desc',
						sales: 'desc'
					})
				} else if (index === 1) {
					this.priceStatus = !this.priceStatus
					if (this.priceStatus) {
						// 升序
						this.SearchGoodsList({
							keyword: this.value,
							sort: 'price',
							order: 'asc',
							sales: 'asc'
						})
					} else {
						// 降序
						this.SearchGoodsList({
							keyword: this.value,
							sort: 'price',
							order: 'desc',
							sales: 'asc'
						})
					}
				} else if (index === 2) {
					this.countStatus = !this.countStatus
					if (this.countStatus) {
						// 升序
						this.SearchGoodsList({
							keyword: this.value,
							sort: 'sales',
							order: 'asc',
							sales: 'asc'
						})
					} else {
						// 降序
						this.SearchGoodsList({
							keyword: this.value,
							sort: 'sales',
							order: 'asc',
							sales: 'desc'
						})
					}
				}
				console.log(this.subsection);
			},
			// 返会前一页
			back() {
				uni.navigateBack()
			},
			// 点击历史记录
			historyKeyword(item) {
				this.value = item
				this.SearchGoodsList({
					keyword: this.value,
					sort: 'default',
					order: 'desc',
					sales: 'desc'
				})
			},
			// 清空历史记录
			clearHistory() {
				setClearHistory().then(() => {
					this.getSearchInfo()
				})
			},
			// 跳转到商品详情
			toProductDetails(item) {
				uni.navigateTo({
					url: `/pages/productDetails/productDetails?id=${item.id}`
				})
			}
		},
		onShow() {
			this.getSearchInfo()
		}
	}
</script>

<style>

</style>