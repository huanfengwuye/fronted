<script lang="ts">
import { Component } from 'vue-facing-decorator'
import Download from '@/scripts/pages/download/download'

@Component
export default class H5Download extends Download {}
</script>
<template>
	<div id="turntable">
		<TopTitleBack :title="t('common.appDownload')"></TopTitleBack>
		<div class="download-bg">
			<div class="download-btn" @click="redirectToAndroidDownload">

			</div>
		</div>
	</div>
</template>

<style lang="scss">
#turntable {
	width: 100%;
	// height: 1500px;s
	.download-bg{
		display: flex;
		justify-content: center; /* 水平方向居中对齐 */
		width: 100%;
		height: 1086px;
		background: url("@/assets/romimg/download/bg.png");// center/cover;
		background-size: contain;
		background-position: center center;
		// padding-bottom: 32px;
		.download-btn{
			width: 344px;
			height: 90px;
			// border: 1px solid red;
			margin-top: 996px;
		}
	}
}
</style>