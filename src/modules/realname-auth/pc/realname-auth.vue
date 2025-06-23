<template>
	<div class="pc-realname-auth">
		<van-overlay
			:show="showTip"
			style="background: rgba( 0, 0, 0, .7 )"
			z-index="200"
		>
			<div class="wrapper">
				<div class="dialog-c-wrap">
					<div class="close" @click="closeTip"><img src="@/assets/pcimg/common/close.png" alt=""></div>
					<div class="diag-c-title">{{ t( 'recharge.pleaseConfirmOld' ) }}</div>	
					<div class="bottom-btn" @click="confirmTip">{{ t( 'notify.confirm' ) }}</div>
				</div>
			</div>
		</van-overlay>

		<van-overlay
			:show="diagReal"
			style="background-color: rgba(0,0,0,.7);" 
			z-index="200" :lock-scroll="false"
		>
			<div class="wrapper">
				<div class="dialog-c-wrap">
					<div class="close" @click="diagReal = false"><img src="@/assets/pcimg/common/close.png" alt=""></div>
					<div class="diag-c-title">{{ t( 'users.realnameTitle' ) }}</div>
					<div class="input-wrap">
						<input type="text" v-model="inputRealContent.realName" :placeholder="t( 'users.enterRealname' )" :disabled="hasReal">
					</div>
					<div class="input-wrap">
						<input type="text" v-model="inputRealContent.idNumber" :placeholder="t( 'users.enterIdcard' )" :disabled="hasReal">
					</div>
					<div class="bottom-btn" @click="confirmRealName" v-if="!hasReal">{{ t( 'notify.confirm' ) }}</div>
				</div>
			</div>
		</van-overlay>
		<van-overlay :show="QRCodeShow" style="background-color: rgba(0,0,0,.7);" :z-index="200" :lock-scroll="false">
			<div class="qrcode-verify-container">
				<div class="header">
					<p>{{ t( 'users.realnameTitle' ) }}</p>
					<img @click="closeQRcodeDialog()" src="@/assets/pcimg/recharge/close-tip.png">
				</div>
				<div class="body">
					<div ref="qrCodeDivRef" id="qrCode"></div>
				</div>
				<div class="footer">
					{{ t( 'users.realnameHelp' ) }}
				</div>
			</div>
		</van-overlay>
	</div>
</template>
<script lang="ts" src="@/scripts/modules/realname-auth/realname-auth.ts"></script>
<style lang="scss" scoped>
.pc-realname-auth
{
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;

		.dialog-c-wrap
		{
			width: 560px;
			min-height: 205px;
			background: #191C34;
			position: relative;
			box-sizing: border-box;
			color: #fff;
			padding: 49px 70px 60px 70px;
			display: flex;
			flex-direction: column;

			.close {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 32px;
				height: 32px;
				position: absolute;
				right: 10px;
				top: 10px;
				cursor: pointer;

				img {
					width: 12px;
					height: 12px;
				}
			}

			.diag-c-title {
				color: #FFF;
				font-size: 21px;
				margin-bottom: 25px;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				.title-opt {
					display: flex;
					height: 44px;
					// width: 145px;
					padding: 0 16px;
					align-items: center;
					justify-content: center;
					border-radius: 6px;
					background: rgba(89, 224, 159, 0.03);
					color: #61F4AB;
					font-size: 14px;
					font-weight: 700;
					margin-left: 20px;

					a {
						color: #61F4AB;
					}
				}
			}

			.input-wrap {
				display: flex;
				width: 100%;
				height: 44px;
				border-bottom: 1px solid #3A34B0;
				margin-bottom: 10px;

				input {
					flex: 1;
					border: none;
					background: none;
					box-sizing: border-box;
					font-size: 17px;
				}

				.btn-sure {
					display: flex;
					width: 32px;
					height: 32px;
					justify-content: center;
					align-items: center;
					border-radius: 10px;
					background: #3A34B0;
					cursor: pointer;

					.icon-check {
						display: inline-block;
						vertical-align: middle;
						fill: currentColor;
						width: 14px;
						height: 10px;
						color: #fff;
						position: relative;
					}
				}

			}

			.tip {
				color: #FFA500;
				font-size: 14px;
				margin-top: 9px;
			}

			.bottom-btn {
				display: flex;
				width: 216px;
				height: 54px;
				justify-content: center;
				align-items: center;
				border-radius: 4px;
				background: #3A34B0;
				cursor: pointer;
				color: #FFF;
				font-size: 17px;
				font-weight: 700;
				margin: 35px auto 0;
			}

		}
	}

	.qrcode-verify-container
	{
		position: fixed;
		top: 400px;
		left: calc( 50% - 560px / 2 );
		width: 560px;
		height: 460px;
		background: #191C34;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-bottom: 64px;
		box-sizing: border-box;

		.header
		{
			padding: 49px 70px;
			color: #FFF;
			font-size: 21px;
			font-style: normal;
			font-weight: 400;
			line-height: 25.2px; /* 120% */
			position: relative;

			img
			{
				position: absolute;
				top: 20px;
				right: 20px;
			}
		}

		.body
		{
			display: flex;
			justify-content: center;
			align-items: center;

			#qrCode
			{
				width: 182px;
				height: 182px;
				border: 12px solid #fff;
			}
		}

		.footer
		{
			color: #FFF;
			text-align: center;
			font-size: 20px;
			font-style: normal;
			font-weight: 400;
			padding-top: 48px;

			span
			{
				color: #009FE8;
				font-size: 700;
			}
		}
	}

	input {
		&::placeholder {
			color: rgba($color: #fff, $alpha: .4);
		}
	}
}
</style>