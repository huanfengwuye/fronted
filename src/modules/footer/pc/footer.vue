<template>
	<div id="pc-footer-wrap" v-if="store.state.showFooterView">
		<div class="site-info-container">
			<div class="info-wrap">
				<div class="logo"><img src="@/assets/logo.png"></div>
				<div class="box">
					<div class="f-title">{{ box }}</div>
					<div class="f-subtitle">{{ t( 'footer.openedBoxs' ) }}</div>
				</div>
				<div class="user">
					<div class="f-title">{{ users }}</div>
					<div class="f-subtitle">{{ t( 'common.users' ) }}</div>
				</div>
				<!-- <div class="battle">
					<div class="f-title">{{ battle }}</div>
					<div class="f-subtitle">{{ t( 'footer.battle' ) }}</div>
				</div> -->
			</div>
		</div>
		<div class="footer-content-container">
			<div class="content-wrap">
				<div class="copyright">
					<div class="site" v-if="is681"><!-- © 2020-2023 {{ site } --></div>
					<div class="site-subinfo">
						<p></p>
						<!-- <p>{{ companyName }}</p> -->
						<p>
							<!-- <img src="@/assets/romimg/footer/beian.png" /><a target="_blank" href="https://beian.miit.gov.cn">{{ filingNo }}</a> -->
						</p>
					</div>
				</div>
				<div class="link">
					<a href="#"><img src="@/assets/pcimg/common/link/z.png"></a>
					<a href="#"><img src="@/assets/pcimg/common/link/csgo.png"></a>
					<a href="#"><img src="@/assets/pcimg/common/link/dy.png"></a>
					<a href="#"><img src="@/assets/pcimg/common/link/he.png"></a>
					<a href="#"><img src="@/assets/pcimg/common/link/wb.png"></a>
					<!-- <a href="#"><img src="@/assets/pcimg/common/link/s.png"></a> -->
				</div>
				<div class="agreement">
					<p @click="go('/p/me/help/compliance')" v-if="store.state.moduleHelpCompliance">
						{{ t( 'footer.complianceStatement' ) }}
					</p>
					<p @click="go('/p/me/help/privacy')" v-if="store.state.moduleHelpPrivacy">
						{{ t( 'footer.privacyPolicy' ) }}
					</p>
					<p @click="go('/p/me/help/regulations')" v-if="store.state.moduleHelpRegulation">
						{{ t( 'footer.userAgreement' ) }}
					</p>
					<p @click="go('/p/me/help/fandubo')" v-if="store.state.moduleHelpFanDuBoNotice">
						{{ t( 'footer.announcement' ) }}
					</p>
					<!-- <p  v-if="is681" @click="go('download')">
						{{ t( 'common.appDownload' ) }}
					</p> -->
				</div>
				<div class="bank">
					<img v-if="is681" class="dongfang" src="@/assets/pcimg/common/bank/dongf.png">
					<img src="@/assets/pcimg/common/bank/cogo.png">
					<img src="@/assets/pcimg/common/bank/shangde.png">
					<img src="@/assets/pcimg/common/bank/weix.png">
					<img src="@/assets/pcimg/common/bank/zfb.png">
				</div>
			</div>
		</div>
		<!-- <div class="footer-content-wrap">
			<div class="footer_info">
				<p @click="go('/p/me/help/compliance')" v-if="store.state.moduleHelpCompliance">
					{{ t( 'footer.complianceStatement' ) }}
				</p>
				<p @click="go('/p/me/help/privacy')" v-if="store.state.moduleHelpPrivacy">
					{{ t( 'footer.privacyPolicy' ) }}
				</p>
				<p @click="go('/p/me/help/regulations')" v-if="store.state.moduleHelpRegulation">
					{{ t( 'footer.userAgreement' ) }}
				</p>
				<p @click="go('/p/me/help/fandubo')" v-if="store.state.moduleHelpFanDuBoNotice">
					{{ t( 'footer.announcement' ) }}
				</p>
			</div>
		</div> -->
		<!-- <div class=" " v-if="securityNo">
			<img src="@/assets/romimg/footer/beian.png" />{{ securityNo }}
		</div>
		<div class="record" v-if="filingNo">
			<a target="_blank" href="https://beian.miit.gov.cn">{{ filingNo }}</a>
		</div>
		<div class="copyright">{{ companyName }}</div> -->
	</div>
</template>
<script lang="ts" src="@/scripts/modules/footer/footer.ts"></script>
<style lang="scss">
@media ( max-width: 1280px )
{
	#pc-footer-wrap
	{
		.site-info-container
		{
			.info-wrap
			{
				width: 1280px !important;

				.logo
				{
					img
					{
						width: 80%;
					}
				}
			}
		}

		.footer-content-container
		{
			.content-wrap
			{
				width: 1280px !important;
				padding: 20px 60px !important;

				.link
				{
					a
					{
						padding: 10px !important;
					}
				}

				.bank
				{
					width: 216px !important;
					// img
					// {
					// 	// width: calc( 30px / 50px * 50px ) !important;
					// 	// height: calc(  );
					// }
				}
			}
		}
	}
}

#pc-footer-wrap {
	width: 100%;
	background-color: #0c0d19;
	margin: auto;
	color: #4e526c;
	overflow: hidden;

	.site-info-container
	{
		height: 234px;
		width: 100%;
		background: #101120;
		justify-content: center;
		display: flex;

		.info-wrap
		{
			height: 100%;
			width: 1440px;
			display: flex;
			justify-content: space-between;
			div
			{
				// border: 1px solid red;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 10px 0 0 50px;

				.f-title
				{
					color: #CBCCD6;
					font-family: Ubuntu;
					font-size: 38px;
					font-style: normal;
					font-weight: 300;
				}

				.f-subtitle
				{
					color: #4F5165;
					font-family: Microsoft YaHei;
					font-size: 15px;
					font-style: normal;
					font-weight: 400;
					text-transform: uppercase;
					padding-top: 0;
				}

				&.logo
				{
					background: url( @/assets/pcimg/common/footer-logo-bg.png ) no-repeat;
					background-position: left bottom;
					width: 25%;
					flex-direction: row;
					align-items: center;
					height: 100%;
					padding: 0;
					min-width: 320px;
					img{
						width: 60%;
					}
				}

				&.box
				{
					background: url( @/assets/pcimg/common/footer-box-bg.png ) no-repeat;
					background-position: 0px 50px;
					justify-content: center;
					height: 100%;
					min-width: 320px;
				}

				&.user
				{
					background: url( @/assets/pcimg/common/footer-user-bg.png ) no-repeat;
					background-position: 0px 30px;
					height: 100%;
					min-width: 320px;
				}

				&.battle
				{
					background: url( @/assets/pcimg/common/footer-battle-bg.png ) no-repeat;
					background-position: 0px 58px;
					height: 100%;
					min-width: 320px;
				}
			}
		}
	}

	.footer-content-container
	{
		display: flex;
		height: 258px;
		background: #0C0D19;
		justify-content: center;

		.content-wrap
		{
			display: flex;
			padding: 20px 86px;
			width: 1440px;
			box-sizing: border-box;
			height: 100%;
			align-items: center;
			justify-content: space-between;

			.link
			{
				display: flex;
				gap: 10px;

				a
				{
					display: flex;
					padding: 12px;
					border: 1px solid #17192A;
					border-radius: 50%;

					img
					{
						width: 16px;
						height: 16px;
					}
				}
			}

			.bank
			{
				display: flex;
				width: 340px;
				flex-wrap: wrap;
				gap: 5px;
				justify-content: flex-end;

				img
				{
					width: 50px;
					height: 40px;
					&.dongfang{
						width: 107px;
					}
				}
			}

			.agreement
			{
				display: flex;
				gap: 45px;

				p
				{
					font-family: Ubuntu;
					font-size: 14px;
					font-style: normal;
					font-weight: 400;
					color: #8386A5;
					border-bottom: 1px solid #21243D;
					padding: 25px 0;
					cursor: pointer;//鼠标变手

				}
			}

			.copyright
			{
				// width: 25%;

				.site
				{
					font-family: Ubuntu;
					font-size: 16px;
					font-style: normal;
					font-weight: 300;
					color: #CBCCD6;
				}

				.site-subinfo p,
				.site-subinfo p a
				{
					display: flex;
					// justify-content: center; /* 水平居中 */
					align-items: center; /* 垂直居中 */
					font-family: Ubuntu;
					font-size: 12px;
					font-style: normal;
					font-weight: 400;
					color: #57586C;
					gap: 5px;
					margin-top: 5px;
				}
			}
		}
	}
}
</style>