<template>
	<view>
		<view class="logo w-full flex justify-center items-center mt-[60rpx]">
			<image src="@/static/images/logo.jpg" class="w-[120rpx] h-[120rpx]" mode=""></image>
		</view>
		<view class="logo-name w-full text-center h-[50rpx] leading-[50rpx] text-[32rpx] mt-[40rpx]">
			花城汇
		</view>
		<view
			class="login  w-full text-center h-[80rpx] leading-[80rpx] text-[#8f8f8f] text-[28rpx] mb-[40rpx] mt-[80rpx]">
			请完成微信授权以继续使用
		</view>
		<button @click='register'
			class="w-[500rpx] h-[100rpx] text-center text-[32rpx] leading-[100rpx] bg-[#54b635] text-[#fff]">
			微信快捷登录
		</button>
		<view class="cancel w-full h-[100rpx] leading-[100rpx] text-center text-[28rpx] text-[#555] mt-[30rpx]">
			取消
		</view>
	</view>
</template>

<script>
	import {
		login
	} from "@/service/api.js"
	export default {
		data() {
			return {
				show: true
			}
		},
		methods: {
			// {code: "微信登陆后的code", encryptedData: "密钥",iv: "iv", rawData: "用户信息",signature:"签名"}
			register() {
				uni.getUserProfile({
					withCredentials: true,
					desc: '登录后可同步数据',
					lang: 'zh_CN',
					success({
						encryptedData,
						iv,
						rawData,
						signature
					}) {
						// 获取code
						uni.login({
							success({
								code
							}) {
								login({
									encryptedData,
									iv,
									rawData,
									signature,
									code
								}).then(function(res) {
									console.log(res);
									console.log(res.token, '----');
									if (res.token) {
										// 将携带token的数据包存在本地
										uni.setStorageSync('auth', res)
										// 登录成功 一秒后跳转到mine
										uni.showToast({
											title: '正在登录...',
											icon: "error",
											duration: 2000,
											success() {
												let t = setTimeout(() => {
													uni.switchTab({
														url: "/pages/mine/mine"
													})
													clearTimeout(t)
												}, 2000)
											}
										});
									} else {
										uni.showToast({
											title: '登录失败！重试',
											icon: "error",
											duration: 2000
										});

									}

								})
							},
							fail(error) {
								console.log(error);
							}
						});
					},
				});
			}
		},
		/**
		 * 1.使用wx.login()获取code
			2.通过ajax请求将code发送到业务服务器
			3.业务服务器将appid+appsecret+code发送到微信服务器
			4.通过微信服务器验证appid+appsecret+code的合法性 返回session_key、openid
			5.业务服务器将微信服务器返回的session_key和openid生成token 并将token返回给小程序
			6.微信小程序端将token保存到本地，并且设置请求拦截器以每一次请求都带到业务服务器
			7.业务服务器校验token的合法性 如果合法返回响应数据

		 */
	}
</script>

<style>

</style>