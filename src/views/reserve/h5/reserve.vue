<script lang="ts">
import { Component } from 'vue-facing-decorator'
import Reserve from '@/scripts/pages/reserve/reserve'

@Component
export default class H5Reserve extends Reserve {}
</script>
<template>
  <div id="reserve">
	<H5TopTitleBack title="预约提醒"></H5TopTitleBack>
	<div class="signup-main">
		<van-form @submit="onAccountLogin" v-if="!binded">
			<van-field
				:autofocus="true"
				v-model="accountSign.account"
				name="account"
				:left-icon="username_icon"
				label-width="0"
				:placeholder="t( 'sign.enterAccount' )"
				@onclick="scrollToElement"
			>
			</van-field>

			<van-field
				v-model="accountSign.password"
				type="password"
				name="password"
				:left-icon="userpassword_icon"
				label-width="0"
				:placeholder="t( 'battle.enterPassword' )"
				maxlength="16"
				@onclick="scrollToElement"
			>
			</van-field>
			<div class="buttom">
				<van-button
					class="buttn"
					round
					block
					type="default"
					native-type="submit"
					>绑定授权</van-button
				>
			</div>
		</van-form>
		<div class="success-tip" v-else>
			<div class="icon">
				<icon name="success" :size="32" color="#75BC2A"></icon>
			</div>
			<strong>恭喜您完成公众号绑定</strong>
			<span>您参与的roll房即将开奖时，系统会提前通过公众号告知，防止遗漏开奖信息。</span>
		</div>
	</div>
  </div>
</template>

<style lang="scss" scoped>
#reserve {
	width:100%;
	height:100vh;
	background: #15172C;
	background: url("@/assets/romimg/reserve/reserve-bg.png") no-repeat;
	background-size: 100% auto;
	background-position: center bottom;

	.success-tip
	{
		display: flex;
		width: 100%;
		height: 700px;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #fff;
		font-size: 28px;
		line-height: 2;
		gap: 20px;

		.icon
		{
			width: 140px;
			height: 140px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 2px solid #75BC2A;
			border-radius: 50%;
		}

		strong
		{
			font-size: 30px;
			font-weight: 700;
			line-height: 60px;
		}

		span
		{
			font-size: 28px;
			color: #AEAEAE;
			width: 500px;
			text-align: center;
		}
	}

	.van-form {
		width: 100%;
		margin: 0 auto;
		min-height: 500px;
		::v-deep(.van-cell) {
			display: flex;
			align-items: center;
			width: 660px;
			background: none;
			border-radius: 4px;
			overflow: visible;

			height: 100px;
			padding: 0;
			// border-bottom: 1px solid #ecebee;
			background-color: #232749;
			margin: 0 auto;

			resize: none; /* 禁用用户调整大小的功能 */
			vertical-align: middle;
			color: #7a7e89;

			font-size: 26px;
			font-style: normal;
			font-weight: 400;
			margin-bottom: 10px;
			// &:first-child {
			//	 border-top-left-radius: 10px;
			//	 border-top-right-radius: 10px;
			// }

			&::after {
				border-bottom: 1px solid #232749;
			}

			.van-cell__title {
				label {
					display: none;
				}
			}

			.van-field__control {
				resize: none; /* 禁用用户调整大小的功能 */
				color: #dcdcdc;

				font-size: 26px;
				font-style: normal;
				font-weight: 400;
			}
			.van-field__left-icon {
				display: flex;
				align-items: center;
				box-sizing: border-box;
				.van-icon {
					font-size: 36px;
					line-height: 36px;
					margin-right: 10px;
					margin-left: 30px;
				}
			}
			.van-cell__value {
				position: relative;
				.van-field__error-message {
					width: 25%;
					position: absolute;
					// margin-top: 20px;
					// left: 10px;
					font-size: 24px;
					z-index: 1;
				}
			}

			.btn-verification {
				// width: 1.97rem;
				// height: 0.681rem;
				background: none;
				/* 添加 #3F8BEA 颜色的描边效果 */
				border-bottom: 2px solid #4af1b8;
				display: flex;
				align-items: center;
				justify-content: center;
				// border-radius: 0.37rem; /* 设置按钮圆角 */
				color: #4af1b8;
				font-size: 20px;
				// text-align: right;
				line-height: 38px;
				margin-right: 30px;
				// margin-top: 15px;
			}
		}

		.button_out {
			display: flex;
			justify-content: center;
			position: relative;
			width: 100%;
			margin: 0 auto; /* 水平居中 */
			height: 0.925rem;
			margin-top: 0.555rem;

			.van-button {
				width: 660px;
				height: 80px;
				border-radius: 4px;
				background: #3a34b0;
				font-size: 30px;
				color: #fff;
				// font-weight: bold;
				margin: 0 20px;
				border: none;
			}
		}
	}
	.buttom{
		display: flex;
		align-content: center;
		justify-content: center;
		padding-top: 112px;
		box-sizing: border-box;
		width:100%;
		height:944px;
		.van-button{
			width: 660px;
			height: 90px;
			border-radius: 4px;
			background: #3a34b0;
			font-size: 30px;
			color: #fff;
			// font-weight: bold;
			margin: 0 20px;
			border: none;
		}
	}
}
</style>
