<template>
	<div class="pc-qr-dialog" v-show="showWin">
		<div class="qr-dialog-container">
			<div class="header">
				<span>预约提醒</span>
				<div class="close" @click="close">
					<icon color="#fff" name="close"></icon>
				</div>
			</div>
			<div class="body">
				<img src="@/assets/pcimg/roll/mp-qrcode.png">
				<div>
					<strong>扫码关注mskins微信公众号</strong>
					<span>填写授权信息获取开奖推送</span>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.pc-qr-dialog
{
	display: flex;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba( 0, 0, 0, .7 );
	z-index: 1000;

	align-items: center;
	justify-content: center;

	.qr-dialog-container
	{
		width: 320px;
		height: 366px;
		display: flex;
		flex-direction: column;

		.header
		{
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			height: 42px;
			background-color: #191C34;
			position: relative;

			.close
			{
				position: absolute;
				right: 10px;
				top: 0px;
				height: 100%;
				align-items: center;
				display: flex;
			}
		}

		.body
		{
			width: 100%;
			height: calc( 366px - 42px );
			background-color: #15182C;
			color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 32px;

			img
			{
				width: 180px;
				height: 185px;
			}

			div
			{
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				gap: 8px;

				strong
				{
					font-size: 18px;
				}

				span
				{
					font-size: 14px;
				}
			}
		}
	}
}
</style>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-facing-decorator';
@Component
export default class QRDialog extends Vue
{
	@Prop({ default: false })
	public show!: boolean

	public showWin: boolean = false

	@Watch( 'show' )
	public change( val: boolean )
	{
		this.showWin = val
	}

	public mounted()
	{
		this.showWin = this.show
	}

	@Emit( 'close' )
	public close()
	{
		return this.showWin = false
	}
}
</script>