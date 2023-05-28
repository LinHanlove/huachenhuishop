<template>
	<u-overlay :show="true">
		<view class="w-full h-full bg-[transparent] opacity-100ss  left-0 bottom-0 right-0 top-0 fixed z-50">
			<view class="level-container bg-[#fff]">
				<view class="flex justify-between border-b-[1rpx] bordr-b-[#ccc]">
					<ul class="name-list title h-[100rpx] px-[30rpx] pt-[40rpx]  bg-[#fff]  text-[#999] text-[28rpx]">
						<li class='mr-[30rpx]' :class="showIndex==0?'select':''" @click="anewSelect(0)">{{province}}
						</li>
						<li class='mr-[30rpx]' :class="showIndex==1?'select':''" @click="anewSelect(1)">{{city}}</li>
						<li class='mr-[30rpx]' :class="showIndex==2?'select':''" @click="anewSelect(2)">{{area}}</li>
						<li class='mr-[30rpx]' :class="showIndex==3?'select':''" @click="anewSelect(3)">{{street}}</li>
					</ul>
					<view class="tetx-[#999] text-[28rpx] px-[30rpx] pt-[40rpx]" @click="bottom">
						确定
					</view>
				</view>
				<view class="w-full h-[492rpx] pl-[30rpx]">
					<ul v-if="showIndex==0" class="content h-[104rpx] leading-[104rpx] text-[28rpx] text-[#333]"
						:style="'height:'+ heightCot + 'rpx'">
						<li @click="selectPro(index,item.label)" v-for="(item,index) in provinceData" :key="item">
							{{item.label}}
						</li>
					</ul>

					<ul v-if="showIndex==1" class="content h-[104rpx] leading-[104rpx] text-[28rpx] text-[#333]"
						:style="'height:'+ heightCot + 'rpx'">
						<li @click="selectCity(index,item.label)" v-for="(item,index) in cityData" :key="item">
							{{item.label}}
						</li>
					</ul>

					<ul v-if="showIndex==2" class="content h-[104rpx] leading-[104rpx] text-[28rpx] text-[#333]"
						:style="'height:'+ heightCot + 'rpx'">
						<li @click="selectaArea(index,item.label)" v-for="(item,index) in areaData" :key="item">
							{{item.label}}
						</li>
					</ul>
					<ul v-if="showIndex==3" class="content  h-[104rpx] leading-[104rpx] text-[28rpx] text-[#333]"
						:style="'height:'+ heightCot + 'rpx'">
						<li @click="selectStreet(index,item)" v-for="(item,index) in streetsData" :key="item">{{item}}
						</li>
					</ul>
				</view>
			</view>
		</view>
	</u-overlay>
</template>

<script>
	import provinceData from './city-data/province.js';
	import getCity from './city-data/city.js';
	import getArea from './city-data/area.js';
	import getStreets from './city-data/streets.js';
	export default {
		data() {
			return {
				province: "省份",
				city: "城市",
				area: "区县",
				street: "街道",
				cityDataAll: '', // 市的所有數據
				getAreaAll: '', // 区的所有数据
				getStreetsAll: '', // 街道的所有数据
				presentIndex: [],
				proIndex: 0,
				cityIndex: 0,
				areaIndex: 0,

				provinceData: '', // 当前展示的省数据
				cityData: '', // 当前展示的市数据
				areaData: '', //当前展示的区数据
				streetsData: '', //当前展示的区数据
				showIndex: 0,
				heightCot: 0,
				bb: ''
			}
		},
		created() {
			uni.getSystemInfo({
				success: res => {
					console.log(res.safeArea.height)
					this.heightCot = (res.safeArea.height * 2) / 2
				}
			})
		},
		mounted() {
			// console.log(provinceData)
			this.provinceData = provinceData;
			this.cityDataAll = getCity;
			this.getAreaAll = getArea;
			this.getStreetsAll = getStreets
		},
		methods: {
			anewSelect(num) {
				switch (num) {
					case 0:
						this.showIndex = 0;
						this.areaData = [];
						this.streetsData = [];
						this.city = '请选择';
						this.area = '请选择';
						this.street = '请选择'
						break;
					case 1:
						this.showIndex = 1;
						this.areaData = [];
						this.streetsData = [];
						this.area = '请选择';
						this.street = '请选择'
						break;
					case 2:
						this.showIndex = 2;
						this.streetsData = [];
						this.street = '请选择'
						break;
					case 3:
						console.log(11111);
						break;
				}
			},
			selectPro(index, label) {
				console.log(index)
				const {
					cityDataAll
				} = this;
				this.proIndex = index; // 当前省的下标
				this.province = label;
				this.cityData = cityDataAll[index];
				this.showIndex = 1;

			},
			selectCity(index, label) {
				const {
					proIndex
				} = this;
				// console.log(this.getAreaAll)
				this.city = label;
				this.cityIndex = index; // 当前市的下标
				this.areaData = this.getAreaAll[proIndex][index];
				this.showIndex = 2;
			},
			selectaArea(index, label) {
				const {
					proIndex,
					cityIndex
				} = this;
				this.area = label;
				this.showIndex = 3;
				console.log(index)
				console.log(this.getStreetsAll[proIndex][cityIndex])
				console.log(this.getStreetsAll[proIndex][cityIndex][index])
				this.streetsData = this.getStreetsAll[proIndex][cityIndex][index]
			},
			selectStreet(index, label) {
				this.street = label;
				const {
					province,
					city,
					area,
					street
				} = this;
				this.$emit('conceal', {
					province,
					city,
					area,
					street
				})
				// this.showIndex = 4;
			},
		}
	}
</script>

<style lang="less">
	ul,
	li {
		list-style: none;
	}

	.level-container {
		width: 100%;
		background: #fff;
		position: fixed;
		bottom: 0;

		.select {
			color: red;
			position: relative;

			&::after {
				content: '';
				width: 40upx;
				height: 6upx;
				background: red;
				position: absolute;
				left: 50%;
				bottom: -8upx;
				margin-left: -20upx;
			}
		}

		li {
			font-size: 26upx;
		}

		.content,
		.name-list {
			padding: 0 20upx;
		}

		.title {
			font-size: 32upx;
			margin: 30upx 20upx;
		}

		.name-list {
			display: flex;

			li {
				margin-right: 40upx;
				padding-bottom: 6upx;
			}
		}

		.content {
			margin-top: 20upx;
			height: 600upx;
			overflow-y: auto;

			li {
				border-bottom: 1px solid #f1f1f1;
				padding: 20upx 0;
			}

			li:last-child {
				border-bototm: none !important;
			}
		}
	}
</style>