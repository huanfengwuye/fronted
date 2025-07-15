<script lang="ts" src="@/scripts/pages/openbox/openbox.ts"></script>
<template>
	<div id="pc-openbox" class="min-wrap-height">
		<van-overlay :show="ensureShow" style="background-color: rgba(0,0,0,.7);" :z-index="200" :lock-scroll="false">
			<div class="ensure-container">
				<div class="header">
					<p>{{ t( 'openbox.fairTitle' ) }}</p>
					<img src="@/assets/pcimg/recharge/close-tip.png" class="close-ensure-container" @click="ensureShow = false">
				</div>
				<div class="body" v-html="t( 'openbox.fairContent' )"></div>
			</div>
		</van-overlay>

		<div class="pc-openbox-content">
			<div class="left">
				<div @click="back()" class="back">
					<img src="@/assets/pcimg/activity/goback.webp" alt="">
					<span>返回</span>
				</div>
				<div class="open-layer" v-show="layer"></div>
				<div class="sound-switch" :class="{ 'active': !isAnimation }" @click="switchSound"></div>
				<div class="box-info-wrap">
					<div class="open-title">{{ boxData.name }}</div>
					<div class="open-price" v-if="false"> <img class="pc-price-coin" src="@/assets/pcimg/common/coin.png"
							alt="" />
							{{ (boxData.price * boxNum).toFixed(2) }}</div>
				</div>
	
				<div class="box-back" v-show="!doingAnimation">
					<div class="box-pic" :style="'background-image: url(' + boxData.imageUrl + ')'">
						<img :src="boxData.weaponImageUrl" :alt="boxData.name">
					</div>
				</div>
				<div class="open-safe" v-show="!doingAnimation" @click="ensureShow = true">
					<img src="@/assets/pcimg/openbox/safe.png"/>
					<p>{{ t( 'openbox.ensureFairness' ) }}</p>
				</div>
				<OpenBoxMultAni v-if="doingAnimation" :goodsList="goodsList" @onAnimationEnd="onAnimationEnd"
					@onRandEnd="onRandEnd" ref="animationyRef"></OpenBoxMultAni>
				<div class="load-wrap" v-show="doingAnimation">OPENING <img src="@/assets/pcimg/openbox/loader.png" alt="" />
				</div>
	
				<div v-show="!doingAnimation" class="opt-content-wrap">
					<div class="opt-wrap">
						<div class="opt-btn" v-for="(item, index) in openArr" :key="index" :class="{ 'active': boxNum == item }"
							@click="setBoxNum(item)">x {{ item }}</div>
					</div>
					<!-- <div class="open-price">  -->
						<!-- <img class="pc-price-open-pricecoin" src="@/assets/pcimg/common/coin.png" alt="" />
						{{(boxData.price * boxNum).toFixed(2) }}&nbsp; -->
						<!-- <Price
							v-if="Number(boxData.price) < Number(boxData.originalPrice)"
							size="20"
							color="#75DC9E"
							fontWeight="700"
							:currency="(boxData.price * boxNum).toFixed(2)"
						></Price>
						<Price
							v-else
							size="20"
							color="#75DC9E"
							fontWeight="700"
							:currency="(boxData.originalPrice * boxNum).toFixed(2)"
						></Price> -->
					<!-- </div> -->
					<div class="open-btn-box" v-show="!doingAnimation">
						<div class="open-btn" @click="onClickOpen()">
							<span>
								<Price
									v-if="Number(boxData.price) < Number(boxData.originalPrice)"
									size="20"
									color="#75DC9E"
									fontWeight="700"
									:currency="(boxData.price * boxNum).toFixed(2)"
								></Price>
								<Price
									v-else
									size="20"
									color="#75DC9E"
									fontWeight="700"
									:currency="(boxData.originalPrice * boxNum).toFixed(2)"
								></Price>
							</span>
							<span>
								{{ openText }}
							</span>
						</div>
						<div v-if="false" class="switch" :class="{ 'active': isAnimation }" @click="isAnimation = !isAnimation">
						</div>
					</div>
				</div>

			</div>
			<div class="right">
				<div class="open_List_box">
					<div class="column">
						<div class="tab-wrap">
							<div class="tab-item" :class="{ 'active': tabType == 0 }" @click="onClickTab(0)">
								<!-- <img class="icon-common" src="@/assets/pcimg/openbox/icon_box.png" alt="" />
								<img class="icon-active" src="@/assets/pcimg/openbox/icon_box2.png" alt="" /> -->
								{{ t( 'openbox.boxIncludes' ) }}
							</div>
							<div class="tab-item" :class="{ 'active': tabType == 1 }" @click="onClickTab(1)">
								<!-- <img class="icon-common" src="@/assets/pcimg/openbox/icon_history.png" alt="" />
								<img class="icon-active" src="@/assets/pcimg/openbox/icon_history2.png" alt="" /> -->
								{{ t( 'openbox.latestDrop' ) }}
							</div>
							<div class="fliter-tab" v-if="tabType == 1">
								<div class="fliter-item" :class="{ 'active': !isAchorDrop }" @click="onClickFilterTab(false)">{{ t( 'battle.member' ) }}
								</div>
								<div class="fliter-item" :class="{ 'active': isAchorDrop }" @click="onClickFilterTab(true)"> {{ t( 'battle.anchor' ) }}
								</div>
							</div>
							<div class="presentation" v-if="tabType == 0">
								<div class="probability_main">
									<div class="probability_item" v-for="(item, index) in rarityList" :key="index">
										 <div v-if="item.probability != 0">
											<img :src="item.icon" alt="">
											<p>{{ item.probability }}%</p>
										 </div>
									</div>
								</div>
							</div>
						</div>
					</div>
		
					<weaponListCpt :list="goodsList" v-show="tabType == 0" class="box_item_list"></weaponListCpt>
		
					<div class="drop-wrap" v-show="tabType == 1" >
						<div class="drop-title">
							<p class="area1">{{ t( 'common.users' ) }}</p>
							<p class="area1">{{ t( 'battle.goodsName' ) }}</p>
							<p class="area1">{{ t( 'battle.price' ) }}</p>
							<p class="time">{{ t( 'openbox.time' ) }}</p>
						</div>
						<div class="drop-item" v-for="(item, index) in dropData" :key="index">
							<div class="area1">
								<Avatar :userModel='item' :size="'pc-openbox-header'" :hide-frame="true"></Avatar>
								<p>{{ item.nickName }}</p>
							</div>
							<div class="area2">{{ item.goodsName }}</div>
							<div class="area3">
								<!-- <img class="pc-price-coin" src="@/assets/pcimg/common/coin.png" alt="" />
								{{ item.price }} -->
								<Price
									size="15"
									color="#75DC9E"
									fontWeight="700"
									:currency="item.price"
								></Price>
							</div>
		
							<div class="time">{{ item.createTime }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<ResultLayer :goodsList="goodsList" @onClose="onResultClose" ref="resultRef" v-if="goodsList.length != 0"></ResultLayer>
	</div>
</template>
		
<style lang="scss">
#pc-openbox {
	margin-bottom: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	color: #fff;
	width: 100%;
	margin: 0 auto;
	box-sizing: border-box;
	background-color: #0D0E1C;
	position: relative;

	.ensure-container
	{
		position: fixed;
		// top: 410px;
		top: calc( 50% - 540px / 2 );
		height: 540px;
		width: 590px;
		background: #16182E;
		left: calc( 50% - 590px / 2 );
		display: flex;
		flex-direction: column;

		.header
		{
			width: 100%;
			height: 108px;
			background: #191C34;
			padding: 46px 70px;
			font-size: 24px;
			box-sizing: border-box;

			img
			{
				position: absolute;
				top: 20px;
				right: 35px;
			}
		}

		.body
		{
			padding: 31px 62px 43px 70px;
			color: #A5A8BD;
			font-size: 15px;
			font-style: normal;
			font-weight: 400;
			line-height: 25.5px;
			display: flex;
			flex-direction: column;
			gap: 16px;
		}
	}


	.pc-openbox-content {
		display: flex;
		// flex-direction: column;
		// align-items: center;
		box-sizing: border-box;
		color: #fff;
		// max-width: 1440px;
		width: 100%;
		// margin: 0 auto;
		background: url(@/assets/pcimg/activity/openbox_bg.webp) center center / 100% 100% no-repeat;
		position: relative;
		.left{
			position: relative;
			flex: 1;
			.back{
				cursor: pointer;
				position: absolute;
				top: 20px;
				left: 20px;
				font-size: 19px;
				line-height: 20px;
				display: flex;
				gap: 10px;
				align-items: center;
				font-family: Honglei;
				color: #FFDFAD;
				img{
					width: 20px;
					height: 20px;
				}
			}
		}
		.right{
			width: 778px;
			.open_List_box{
				padding-top: 40px;
				height: 467px;
				overflow: auto;
				background: url(@/assets/pcimg/activity/openlist_bg.webp) no-repeat center center/ 100% 100%;
				.box_item_list{
					height: calc( 100% - 60px);
					overflow: auto
				}
			}
		}
	}

	.open-layer {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
	}

	.box-info-wrap {
		position: absolute;
		z-index: 5;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 324px;
		.open-title {
			margin-top: 35px;
			font-size: 26px;
			height: 102px;
			text-align: center;
			line-height: 102px;
			font-family: 'MullerM';
			color: #fef1b3;
			background: url(@/assets/pcimg/activity/name_bg.png) no-repeat center center/ 100% 100%;
		}

		.open-price {
			height: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 20px;
			color: #75DC9E;
			font-size: 20px;
			font-family: MullerM;
			line-height: 20px;
			gap: 8px;

			img {
				width: 18px;
				height: 18px;
				margin-bottom: 3px;
			}
		}


		.open-ammon-price {
			height: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #75DC9E;
			font-size: 20px;
			font-family: MullerM;
			line-height: 20px;
			margin-top: 20px;

		}
	}



	.sound-switch {
		width: 40px;
		height: 40px;
		background: url(@/assets/pcimg/activity/openvideo_bg.webp) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		right:350px;
		top: 58px;
		cursor: pointer;
		&.active {
			background: url(@/assets/pcimg/activity/closevideo_bg.webp) no-repeat center;
			background-size: 100% 100%;
		}
	}

	.box-back {
		// width: 624px;
		height: 422px;
		background: url(@/assets/pcimg/openbox/case_bg.png) no-repeat center;
		background-size: contain;
		margin-top: 30px;
		overflow: hidden;

		.box-pic {
			width: 320px;
			height: 320px;
			margin: 80px auto 0;
			background-position: center;
			background-size: contain;
			background-repeat: no-repeat;
			display: flex;
			justify-content: center;
			align-items: center;

			img {
				max-width: 80%;
				max-height: 80%;
				margin-top: -50px;
			}
		}
	}

	.open-safe {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		color: #7B7BE0;
		margin-top: -3px;
		cursor: pointer;

		img {
			width: 10px;
			height: 13px;
			margin-right: 5px;
		}

		p {
			text-decoration: underline;
		}
	}

	.opt-content-wrap {
		position: relative;
		width: 100%;

		.opt-wrap {
			width: 100%;
			margin: 5px auto 0;
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			position: relative;
			gap: 10px;
			// border-bottom: 1px solid #14162A;

			.opt-btn {
				width: 50px;
				height: 40px;
				border: none;
				// margin: 0 17px;
				text-align: center;
				line-height: 40px;
				font-size: 17px;
				position: relative;
				color: #3A3958;
				font-family: 'MullerM';
				cursor: pointer;
				background-color: #0d0d0c;
				&.active {
					color: #CFCEE9;
					border-bottom: 1px solid #3A34B0;
					background: url(@/assets/pcimg/activity/checkNum_bg.webp) no-repeat center center / 100% 100%;
				}
			}

		}

		.open-price {
			height: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 25px;
			color: #75DC9E;
			font-weight: 700;
			font-size: 20px;
			font-family: MullerM;
			line-height: 20px;
			gap: 8px;

			p{
				color: #5E5E5E;
				font-family: MullerM;
				font-size: 20px;
				font-style: normal;
				line-height: 14px;
				text-decoration-line: strikethrough;
				text-transform: uppercase;
				text-decoration: line-through solid;
				// padding: 0 8px;							
			}

			img {
				width: 18px;
				height: 18px;
				// margin-bottom: 3px;
			}
		}


		.open-btn-box {
			margin-top: 24px;
			width: 100%;
			position: relative;


			.open-btn {
				width: 316px;
				height: 64px;
				background: #3A34B0;
				border-radius: 4px;
				text-align: center;
				line-height: 64px;
				color: #FFF7BE;
				font-size: 17px;
				font-weight: bold;
				margin: 0 auto;
				cursor: pointer;
				display: flex;
				justify-content: center;
				gap: 10px;
				background: url(@/assets/pcimg/activity/openbox_openBtn_bg.webp) no-repeat center center/ 100% 100%;
			}

			.switch {
				width: 60px;
				height: 60px;
				background: url(@/assets/romimg/openbox/animation_close.png) no-repeat center;
				background-size: contain;
				position: absolute;
				right: 380px;
				top: 10px;

				&.active {
					background: url(@/assets/romimg/openbox/animation.png) no-repeat center;
					background-size: contain;
				}
			}
		}

	}


	.load-wrap {
		display: flex;
		align-items: center;
		font-size: 17px;
		font-weight: bold;
		color: #A6A4B5;

		img {
			width: 36px;
			height: 36px;
			animation: ani-rotate 2s linear infinite;
			margin-left: 16px;
		}
	}

	.column {
		box-sizing: border-box;
		max-width: 1410px;
		width: 100%;
		// margin: 80px auto 10px;
		margin-bottom: 10px;
		position: relative;
		// background-color: #0D0E1A;


		.tab-wrap {
			display: flex;
			align-items: center;
			// height: 96px;

			.tab-item {
				width: 140px;
				height: 26px;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 16px;
				font-weight: bold;
				color: #EFEDEB;
				background: none;
				cursor: pointer;
				// border-bottom: 1px solid #0D0E1A;
				background: url(@/assets/pcimg/activity/boxlist_tab_bg.webp) no-repeat center center / 100% 100%;
				&:hover
				{
					// border-bottom: 1px solid #4638AD;
				}

				img {
					width: 28px;
					height: 25px;
					margin-right: 10px;
				}

				.icon-active {
					display: none;
				}

				.icon-common {
					display: block;
				}

				&.active {
					color: #fff;
					// border-bottom: 1px solid #4638AD;
					background: url(@/assets/pcimg/activity/boxlist_tab_active_bg.webp) no-repeat center center / 100% 100%;

					.icon-active {
						display: block;
					}

					.icon-common {
						display: none;
					}

				}
			}

			.fliter-tab {
				display: flex;
				align-items: center;
				margin-left: 36px;

				.fliter-item {
					width: 96px;
					height: 40px;
					border: 1px solid #1E2037;
					border-radius: 12px;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 18px;
					color: #545774;
					cursor: pointer;
					margin-right: 10px;

					&:hover
					{
						border: 1px solid #434997;

					}


					&.active {
						color: #fff;
						border: 1px solid #434997;
						-moz-box-shadow: 0px 0px 26px rgba($color: #29228B, $alpha: .25) inset;
						-webkit-box-shadow: 0px 0px 26px rgba($color: #29228B, $alpha: .25) inset;
						box-shadow: 0px 0px 26px rgba($color: #29228B, $alpha: .25) inset;

					}
				}
			}
		}
	}

	.presentation {
		position: absolute;
		top: 40px;
		right: 30px;
		box-sizing: border-box;


		.probability_main {
			display: flex;
			align-items: center;
			flex-direction: row-reverse;

			.probability_item {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 18px;

				div
				{
					display: flex;
					align-items: center;
					height: 100%;
					img {
						width: 14px;
						height: 14px;
					}

					p {
						font-size: 13px;
						font-weight: 500;
						margin-left: 5px;
					}

				}

			}
		}
	}

	.drop-wrap {
		max-width: 1410px;
		width: 100%;
		height: calc( 100% - 80px);
		margin: 0 auto;
		box-sizing: border-box;
		// min-height: 500px;
		overflow: auto;
		background-color: #15172C;


		.drop-title {
			display: flex;
			align-items: center;
			width: 100%;
			height: 65px;
			box-sizing: border-box;
			background-color: #111324;
			font-size: 13px;
			font-weight: bold;
			color: #5D5F72;
			padding: 0 30px;

			.area1 {
				flex: 1;
			}

			.time {
				width: 180px;
			}
		}

		.drop-item {
			height: 56px;
			display: flex;
			align-items: center;
			background-color: #131528;
			box-sizing: border-box;
			width: 100%;
			padding: 0 30px;
			margin-bottom: 2px;

			.area1 {
				display: flex;
				align-items: center;
				flex: 1;

				p {
					margin-left: 10px;
					// color: #6A77FF;
					color: #fff;
				}
			}

			.area2 {
				flex: 1;
				font-size: 15px;
				font-family: MediumM;
				font-weight: 500;
				color: #FFFFFF;
			}

			.area3 {
				flex: 1;
				font-size: 15px;
				font-family: MediumM;
				font-weight: 500;
				color: #75DC9E;

				img {
					margin-bottom: -1px;
				}
			}

			.time {
				width: 180px;
				font-size: 15px;
				font-family: MullerS;
				font-weight: 300;
				color: #C6C7D3;
			}


		}
	}

}</style>