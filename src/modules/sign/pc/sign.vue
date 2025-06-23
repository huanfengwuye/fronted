<script lang="ts" src="@/scripts/modules/sign/sign.ts"></script>
<template>
	<div id="pc-sign-wrap">
		<van-overlay
			:show="showSignView"
			style="background-color: rgba(0, 0, 0, 0.7)"
			:z-index="201"
		>
			<div class="sign-container" ref="signContainer" @keypress="submit">
				<div class="close-btn" @click="onClickClose">
					<!-- <img src="@/assets/pcimg/sign/close.png" /> -->
					<span class="icon iconfont" style="color: #c3c3e2">&#xe65f;</span>
				</div>
				<div class="sign-header">
					<div class="title">{{ getTitle() }}</div>
				</div>
				<div class="sign-body">
					<div :class="['error-message', showErrorMsg ? 'active' : '']">
						{{ errorMsg }}
					</div>

					<!-- 登录模块 -->
					<div class="sign-form" v-if="type == 'login'">
						<div :class="['form-item', accountError ? 'error' : '']">
							<input
								@keyup="checkInput"
								maxlength="11"
								type="tel"
								v-model="accountSign.account"
								:placeholder="t( 'sign.enterAccount' )"
								ref="account"
								@keypress="accountError = false"
							/>
						</div>

						<div :class="['form-item', passwordError ? 'error' : '']">
							<input
								maxlength="16"
								v-model="accountSign.password"
								:type="showPwd ? 'text' : 'password'"
								:placeholder="t( 'sign.enterPassword' )"
								ref="password"
								@keypress="passwordError = false"
							/>
							<button class="pwd-switch" @click="showPwd = !showPwd">
								<img src="@/assets/pcimg/sign/show-pwd.png" v-if="showPwd" />
								<img src="@/assets/pcimg/sign/hide-pwd.png" v-else />
							</button>
						</div>

						<button class="button" @click="onAccountLogin">{{ t( 'sign.loginBtn' ) }}</button>
						<div class="to-reg">
							<p @click="changeType('register')">{{ t( 'sign.toRegisterText' ) }}</p>
						</div>
					</div>
					<!-- /登录模块 -->

					<!-- 注册模块 -->
					<div class="sign-form" v-if="type == 'register'">
						<div :class="['form-item', mobileError ? 'error' : '']">
							<!-- <el-select v-model="country" placeholder="请选择"></el-select> -->
							<div class="country">
								<img src="@/assets/pcimg/sign/CH.png" />
							</div>
							<input
								v-model="accountSign.mobile"
								maxlength="11"
								type="tel"
								@keyup="checkInput"
								:placeholder="t( 'sign.enterPhoneNumber' )"
								ref="mobile"
								@keypress="mobileError = false"
								@change="checkInput"
							/>
						</div>

						<div :class="['form-item', passwordError ? 'error' : '']">
							<input
								maxlength="16"
								v-model="accountSign.password"
								@keyup="checkInput"
								@change="checkInput"
								:type="showPwd ? 'text' : 'password'"
								:placeholder="t( 'sign.enterPassword' )"
								ref="password"
								@keypress="passwordError = false"
							/>
							<button class="pwd-switch" @click="showPwd = !showPwd">
								<img src="@/assets/pcimg/sign/show-pwd.png" v-if="showPwd" />
								<img src="@/assets/pcimg/sign/hide-pwd.png" v-else />
							</button>
						</div>

						<div class="form-item" v-show="showDragVerify">
							<DragVerify
								@passing="dragResult"
								:is-passing="isPassing"
							></DragVerify>
						</div>

						<div :class="['form-item', verifyCodeError ? 'error' : '']">
							<input
								v-model="accountSign.verifyCode"
								:disabled="!sended"
								maxlength="6"
								:placeholder="t( 'sign.enterVCode' )"
								ref="verifyCode"
								@keypress="verifyCodeError = false"
							/>
							<button class="send-sms" :disabled="sending" @click="sendSMS">
								{{ countDownText }}
							</button>
						</div>

						<div class="form-item">
							<input
								v-model="accountSign.nickname"
								@keyup="checkInput"
								:placeholder="t( 'sign.enterNicknameOptional' )"
								ref="nickname"
							/>
						</div>

						<div class="form-item">
							<input
								v-model="accountSign.inviteCode"
								:placeholder="t( 'sign.enterInviteCodeOptional' )"
							/>
						</div>
						<button class="button" @click="onAccountRegister()">{{ t( 'sign.registerBtn' ) }}</button>
						<div class="to-reg">
							<p @click="changeType('login')">{{ t( 'sign.toLoginText' ) }}</p>
						</div>
					</div>
					<!-- /注册模块 -->

					<!-- 忘记密码 -->
					<div class="sign-form" v-if="type == 'forget'">
						<div :class="['form-item', mobileError ? 'error' : '']">
							<!-- <el-select v-model="country" placeholder="请选择"></el-select> -->
							<div class="country">
								<img src="@/assets/pcimg/sign/CH.png" />
							</div>
							<input
								v-model="accountSign.mobile"
								maxlength="11"
								type="tel"
								@keyup="checkInput"
								:placeholder="t( 'sign.enterPhoneNumber' )"
								ref="mobile"
								@keypress="mobileError = false"
								@change="checkInput"
							/>
						</div>

						<div :class="['form-item', passwordError ? 'error' : '']">
							<input
								maxlength="16"
								v-model="accountSign.password"
								@keyup="checkInput"
								@change="checkInput"
								:type="showPwd ? 'text' : 'password'"
								:placeholder="t( 'sign.enterPassword' )"
								ref="password"
								@keypress="passwordError = false"
							/>
							<button class="pwd-switch" @click="showPwd = !showPwd">
								<img src="@/assets/pcimg/sign/show-pwd.png" v-if="showPwd" />
								<img src="@/assets/pcimg/sign/hide-pwd.png" v-else />
							</button>
						</div>

						<div class="form-item" v-show="showDragVerify">
							<DragVerify
								@passing="dragResult"
								:is-passing="isPassing"
							></DragVerify>
						</div>

						<div :class="['form-item', verifyCodeError ? 'error' : '']">
							<input
								v-model="accountSign.verifyCode"
								:disabled="!sended"
								maxlength="6"
								:placeholder="t( 'sign.enterVCode' )"
								ref="verifyCode"
								@keypress="verifyCodeError = false"
							/>
							<button class="send-sms" :disabled="sending" @click="sendSMS">
								{{ countDownText }}
							</button>
						</div>
						<button class="button" @click="onAccountReset()">{{ t( 'sign.modifyBtn' ) }}</button>
						<div class="to-reg" style="margin-bottom: 20px">
							<p @click="changeType('login')">{{ t( 'sign.backAndLogin' ) }}>>></p>
						</div>
					</div>
					<!-- /忘记密码 -->
				</div>
				<div class="sign-footer" v-if="type != 'forget'">
					<div
						:class="['footer-item', remember ? 'active' : '']"
						v-if="type == 'login'"
					>
						<div class="remember" @click="remember = !remember">
							<img src="@/assets/pcimg/sign/checkbox.png" v-if="!remember" />
							<img src="@/assets/pcimg/sign/checked.png" v-else />
							{{ t( 'sign.rememberPassword' ) }}
						</div>
						<div class="forget" @click="changeType('forget')">{{ t( 'sign.forgetPassword' ) }}</div>
					</div>
					<div
						:class="[
							'footer-item',
							'agreement',
							agreementChecked ? 'active' : '',
						]"
					>
						<div
							class="agreement"
							@click="agreementChecked = !agreementChecked"
						>
							<img
								src="@/assets/pcimg/sign/checked.png"
								v-if="agreementChecked"
							/>
							<img src="@/assets/pcimg/sign/checkbox.png" v-else />
							<p>
								{{ t( 'sign.over18YearsOldPc' ) }}
								<span @click="toRoute('/p/help/regulations')">"{{ t( 'sign.userAgreement' ) }}"</span>
								{{ t( 'sign.and' ) }}
								<span @click="toRoute('/p/help/privacy')">"{{ t( 'sign.privacyPolicy' ) }}"</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</van-overlay>
	</div>
</template>

<style lang="scss">
#pc-sign-wrap {
	.sign-container {
		display: flex;
		position: fixed;
		width: 500px;
		// height: 511px;
		top: calc(50% - 511px / 2);
		left: calc(50% - 500px / 2);
		border-radius: 5px;
		// padding: 40px 0;
		flex-direction: column;
		box-sizing: border-box;
		overflow: hidden;

		.close-btn {
			position: absolute;
			right: 10px;
			top: 10px;
			// border: 1px solid red;
			width: 32px;
			height: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;//鼠标变手
			img {
				width: 14px;
			}

			&:hover {
				img {
					width: 18px;
				}
				span {
					font-size: 18px;
				}
			}
		}

		.sign-header {
			width: 100%;
			display: flex;
			justify-content: center;
			background: #2a2f56;
			padding: 40px 40px 0 40px;
			box-sizing: border-box;

			.title {
				font-family: Microsoft YaHei;
				font-size: 22px;
				font-style: normal;
				font-weight: 700;
				line-height: 35px;
				color: #fff;
				// width: 200px;
				display: flex;
				justify-content: center;
				position: relative;

				&::after
				{
					content: "";
					width: 120px;
					position: absolute;
					bottom: 0;
					// left: calc( ( 100px - 120px ) / 2 );
					border-bottom: 2px solid #0985ed;
				}
			}
		}

		.sign-body {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 20px;
			background: #2a2f56;
			padding: 0 40px 30px 40px;
			box-sizing: border-box;

			.error-message {
				border-radius: 5px;
				background: rgba(255, 92, 92, 0.2);
				color: #ff5c5c;
				height: 0px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				box-sizing: border-box;
				padding: 0 16px;
				font-size: 14px;
				overflow: hidden;
				transition: 0.5s;

				&.active {
					height: 48px;
				}
			}

			.sign-form {
				display: flex;
				gap: 13px;
				flex-direction: column;

				.form-item {
					width: 100%;
					border-radius: 5px;
					background: #191c33;
					height: 44px;
					display: flex;
					box-sizing: border-box;
					border: 1px solid #191c33;
					align-items: center;

					.country {
						width: 88px;
						height: 28px;
						border-right: 1px solid #2b2d38;
						padding: 0 20px;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						position: relative;

						img{
							width: 30px;
						}

						&::after {
							content: "";
							position: absolute;
							width: 10px;
							height: 5px;
							right: 16px;
							background: url(@/assets/pcimg/sign/arrow-down.png) no-repeat;
						}
					}

					&.error {
						border: 1px solid red !important;
					}

					&:focus-within {
						border: 1px solid #0985ed;
					}

					input {
						border: none;
						outline: none;
						background: transparent;
						padding: 10px 13px;
						font-size: 14px;
						color: #fff;
						height: 100%;
						box-sizing: border-box;
						font-weight: 200;
						flex: 1;
						width: 100%;

						&::placeholder {
							color: rgba(255, 255, 255, 0.6);
						}

						&:-internal-autofill-selected {
							background-color: #191c33 !important;
							border-radius: 5px !important;
							border: none !important;
							color: #fff !important;
							transition: background-color 5000s ease-in-out 0s,
								color 5000s ease-in-out 0s !important;
						}
					}

					.pwd-switch {
						background: transparent;
						border: none;
						outline: none;
						padding: 0 12px;
						display: flex;
						align-items: center;
						width: 48px;
					}

					.send-sms {
						background: transparent;
						border: none;
						outline: none;
						padding: 0 12px;
						display: flex;
						align-items: center;
						color: #c3c3e2;
						font-size: 14px;
						font-weight: 200;
					}
				}

				.button {
					border-radius: 5px;
					background: #0985ed;
					color: #fff;
					width: 100%;
					height: 44px;
					border: none;
					font-size: 16px;
					font-weight: 700;
					margin-top: 28px;
					cursor: pointer;//鼠标变手
				}

				.to-reg {
					color: #848492;
					font-size: 16px;
					width: 100%;
					display: flex;
					justify-content: center;
					cursor: pointer;//鼠标变手

					p {
						&:hover {
							color: #fff;
						}
					}
				}
			}
		}

		.sign-footer {
			display: flex;
			flex-direction: column;
			background: #191c33;
			width: 100%;
			padding: 28px 40px;
			box-sizing: border-box;
			gap: 22px;

			.footer-item {
				display: flex;
				justify-content: space-between;
				color: #848492;
				font-size: 14px;
				font-weight: 400;
				align-items: center;
				line-height: 22px;

				&.active {
					color: #0985ed;
				}

				&.agreement {
					justify-content: flex-start;
					gap: 12px;

					&:hover {
						color: #fff;

						span {
							color: #fff;
						}
					}
				}

				div {
					display: flex;
					align-items: center;
					// height: 19px;
					gap: 12px;

					&.agreement,
					&.remember {
						cursor: pointer;

						&:hover {
							color: #fff;
						}
					}

					&.agreement
					{
						align-items: flex-start;

						span
						{
							// padding: 6px;
							margin: 0 !important;
						}
					}

					&.forget {
						color: #848492;
						cursor: pointer;//鼠标变手

						&:hover {
							color: #fff;
						}
					}

					img {
						width: 18px;
						height: 18px;
					}

					span {
						color: #b4b4cf;
						margin: 0 -6px;
						text-decoration: underline;
						cursor: default;
					}
				}
			}
		}
	}
}
</style>