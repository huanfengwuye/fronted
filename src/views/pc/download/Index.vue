<script lang="ts">
import { Component } from 'vue-facing-decorator'
import Download from '@/scripts/pages/download/download'

@Component
export default class PCDownload extends Download {}
</script>
<template>
	<div id="pc-dwonload">
		<div class="dwonload-bg">
			<div class="ios-btn">
				{{t('common.comeSoonIOS')}}
			</div>
			<div class="an-btn" @click="redirectToAndroidDownload">
				{{t('common.androidDownload')}}
			</div>
		</div>
	</div>
</template>

<style lang="scss">
#pc-dwonload {
	display: flex;
	justify-content: center; /* 水平方向居中对齐 */
	align-items: center; /* 垂直方向居中对齐 */
	box-sizing: border-box;
	position: relative;
	width: 100%;
	height: 900px;
	// background: url(@/assets/pcimg/download/download_bg.jpg) no-repeat center #0F131C;
	// background-size: 1919px 955px;
	.dwonload-bg{
		position: relative;
		max-width: 1440px;
		width: 100%;
		height: 747px;
		background: url("@/assets/pcimg/download/pc-bg.png") center/cover;
		.ios-btn{
			position: absolute; /* 使用绝对定位 */
			display: flex;
			width: 255px;
			height: 55px;
			// padding: 15px 80px;
			justify-content: center;
			align-items: center;
			gap: 10px;
			border-radius: 40px;
			background: #262B56;
			box-sizing:border-box;
			color: #FFF;
			text-align: center;
			font-family: Roboto;
			font-size: 18px;
			font-style: normal;
			font-weight: 700;
			line-height: normal;
			bottom: 36px;
			right: 24px;
		}
		.an-btn{
			position: absolute; /* 使用绝对定位 */
			border-radius: 40px;
			background: #4B58C9;
			display: flex;
			width: 255px;
			height: 55px;
			// padding: 15px 80px;
			justify-content: center;
			align-items: center;
			gap: 10px;
			box-sizing:border-box;
			color: #FFF;
			text-align: center;
			font-family: Roboto;
			font-size: 18px;
			font-style: normal;
			font-weight: 700;
			line-height: normal;
			bottom: 108px;
			right: 24px;
		}
	}


}
</style>
