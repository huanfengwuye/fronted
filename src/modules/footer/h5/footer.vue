<template>
	<div id="footer-wrap" v-if="store.state.showFooterView">
		<div class="site-info-container">
			<div class="info-wrap">
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


			<div class="agreement">
				<p @click="go('/m/help/regulations')">{{ t( 'footer.userAgreement' ) }}</p>
				<p @click="go('/m/help/compliance')">{{ t( 'footer.complianceStatement' ) }}</p>
				<p @click="go('/m/help/privacy')">{{ t( 'footer.privacyPolicy' ) }}</p>
				<p @click="go('/m/help/privacy')">{{ t( 'footer.announcement' ) }}</p>
				<!-- <p @click="go('/m/help/notarized')">{{ '公证书' }}</p> -->
			</div>

			<div class="bank">
				<img v-if="is681" class="dongfang" src="@/assets/pcimg/common/bank/dongf.png">
				<img src="@/assets/pcimg/common/bank/cogo.png">
				<img src="@/assets/pcimg/common/bank/shangde.png">
				<img src="@/assets/pcimg/common/bank/weix.png">
				<img src="@/assets/pcimg/common/bank/zfb.png">
			</div>

			<div class="link">
					<a href="#"><img src="@/assets/pcimg/common/link/z.png"></a>
					<a href="#"><img src="@/assets/pcimg/common/link/csgo.png"></a>
					<a href="#"><img src="@/assets/pcimg/common/link/dy.png"></a>
					<a href="#"><img src="@/assets/pcimg/common/link/he.png"></a>
					<a href="#"><img src="@/assets/pcimg/common/link/wb.png"></a>
			</div>

			<div class="copyright">
				<div class="site" v-if="is681"><!-- © 2020-2023 {{ site }} --></div>
				<div class="site-subinfo">
					<p></p>
						<!-- <p>{{ companyName }}</p> -->
						<p>
							<!-- <img src="@/assets/romimg/footer/beian.png" /><a target="_blank" href="https://beian.miit.gov.cn">{{ filingNo }}</a> -->
						</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" src="@/scripts/modules/footer/footer.ts"></script>
<style lang="scss">
#footer-wrap
{
	width: 100%;
	background-color: #111324;
	background-size: contain;
	// overflow: hidden;
	display: flex;
	justify-content: start;
	flex-direction: column;
	align-items: center;
	

	.site-info-container
	{
		display: flex;
		flex-direction: column;
		justify-content: center; /* 水平居中 */
		padding: 40px;
		width: 100%;
		box-sizing: border-box;

		.copyright
		{
			display: flex;
			flex-direction: column;

			.site
			{
				font-family: Ubuntu;
				font-size: 32px;
				font-style: normal;
				font-weight: 300;
				color: #CBCCD6;
				padding: 20px 0;
			}

			.site-subinfo
			{
				gap: 5px;
				p
				{
					display: flex;
					// justify-content: center; /* 水平居中 */
					align-items: center; /* 垂直居中 */
					margin-bottom: 5px;
					color: #57586C;
					font-family: Ubuntu;
					font-size: 22px;
					font-style: normal;
					font-weight: 400;
				}
				a{
					display: flex;
					// justify-content: center; /* 水平居中 */
					align-items: center; /* 垂直居中 */
					margin-bottom: 5px;
					color: #57586C;
					font-family: Ubuntu;
					font-size: 22px;
					font-style: normal;
					font-weight: 400;
				}
			}
		}

		.bank{
			display: flex;
			width: 654px;
			flex-wrap: wrap;
			gap: 5px;
			justify-content: space-evenly;

			img
			{
				width: 100px;
				height: 70px;
				&.dongfang{
					width: 214px;
				}
			}
		}

		.agreement
		{
			display: flex;
			gap: 40px;
			justify-content: center;
			padding: 40px 0 40px 0;
			width: 100%;

			p
			{
				font-family: Ubuntu;
				font-size: 24px;
				font-style: normal;
				font-weight: 400;
				color: #8386A5;
			}
		}

		.link
		{
			display: flex;
			padding: 40px 0;
			justify-content: space-between;
			width: 80%;
			margin: auto;

			a
			{
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 28px;
				border: 2px solid #17192A;
				border-radius: 50%;
				
				img
				{
					width: 32px;
					height: 32px;
				}
			}
		}

		.info-wrap
		{
			display: flex;
			height: 164px;

			div
			{
				display: flex;
				flex-direction: column;
				// border: 1px solid red;
				justify-content: flex-end;
				width: 33%;
				align-items: center;

				.f-title
				{
					color: #CBCCD6;
					font-family: Muller;
					font-size: 26px;
					font-style: normal;
					font-weight: 300;
					width: 100%;
				}

				.f-subtitle
				{
					width: 100%;
					color: #4F5165;
					font-family: Microsoft YaHei;
					font-size: 24px;
					font-style: normal;
					font-weight: 400;
					text-transform: uppercase;
				}
			}
			
			.box
			{
				background: url( @/assets/romimg/common/footer-box-bg.png ) no-repeat;
				background-size: 102px;
				background-position: top center;
				gap: 10px;
			}

			.user
			{
				background: url( @/assets/romimg/common/footer-users-bg.png ) no-repeat;
				background-size: 102px;
				background-position: top center;
				gap: 10px;
			}

			.battle
			{
				background: url( @/assets/romimg/common/footer-battle-bg.png ) no-repeat;
				background-size: 102px;
				background-position: top center;
				gap: 10px;
			}
		}
	}
}
</style>