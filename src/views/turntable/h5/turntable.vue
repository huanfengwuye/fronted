<script lang="ts">
import { Component } from 'vue-facing-decorator'
import TurnTable from '@/scripts/pages/turntable/turntable'

@Component
export default class H5TurnTable extends TurnTable {}
</script>
<template>
	<div id="turntable-h5">
		<TopTitleBack :handler="showHelper" :title="t('turntable.LuckyTurntable')"></TopTitleBack>
		<div class="turntable-top" :class="{active: extractionStatus}">
			<div class="moreDays-code">
				<div class="invite">
					<p>
						我的邀请码	
					</p>
					<div class="code">
						{{spreadCode}}
					</div>
				</div>
				<div class="countdown">
					本轮剩余：{{countdown}}
				</div>
			</div>
			<div class="turntable-big" v-if="!extractionStatus">
				<div class="turntable-outside"></div>
				<div class="turntable-glare" v-if="btnActive"></div>
				<div class="turntable-Inside">
					<img :class="{spin:aaa}" :style="{ transform: 'rotate(' + angle + 'deg)' }" @transitionend="a" src="@/assets/romimg/turntable/turntableLnside.png">
				</div>
				<div class="turntable-btn" :class="{active:btnActive}" @click="start"></div>
				<div class="turntable-base"></div>
			</div>

			<div class="extract-body" v-if="extractionStatus">
				<div class="withdraw-amount">
					<p>{{t('turntable.withdrawAmount')}}</p>
					<div class="withdraw-price">
						<img src="@/assets/romimg/turntable/gold.png" alt="">
						<span>100.00</span>
					</div>
				</div>
				<div class="progress-wrap">
					<van-progress :percentage="progress" pivot-text="" track-color="#373845"
					color="linear-gradient(270deg, #FDCF58 0%, #5890FD 31.41%, #5049D1 80.81%)"/>
					<div :style="{ left: progress + '%' }" class="probability-tooltip">{{ progress }}%</div>
					<Icon :style="{ left: progress + '%' }" class="probability-icon" name="down-fill" color="#5990FD" size="12"></Icon>
				</div>
				<div class="remaining-progress">
					<div class="avatar"></div>
					<div class="re-text">
						<span>邀请好友注册助力</span>
						<p>{{ 100-progress }}%</p>
						<span>就可以领取了</span>
					</div>
				</div>
				<div class="amount-btn" >
					<div class="amount-text" v-if="progress != 100" @click="copy(ownerInvitation)">
						<Icon class="icon-right" name="shares" color="#fff" :size="18"></Icon>
						<span>邀请好友助力领取</span>
						<p>100</p>
						<span>币</span>
					</div>
					<div class="amount-text" v-if="progress == 100">
						<span>恭喜你领取成功</span>
						<img src="@/assets/romimg/turntable/withdrawn.png" alt="">
					</div>
				</div>
			</div>
		</div>
		<div class="activity-rules" v-if="!extractionStatus">
			<p>{{t('turntable.wheelRules1')}}</p><br/>
			<p>{{t('turntable.wheelRules2')}}</p>
			<p>{{t('turntable.wheelRules3')}}</p><br/>
			<p>{{t('turntable.wheelRules4')}}</p><br/>
		</div>
		<div class="invite-rebate"></div>

		<div class="get-amount" v-if="grayPopShow">
			<div class="amount-body" v-if="prizeShow">
				<!-- <div class="close">
					<img
						class="closes"
						src="@/assets/romimg/lucky/close.png"
						alt=""
						@click="grayPopShow = false"
					/>
				</div> -->
				<img v-if="!btnPrize" class="img-light" src="@/assets/romimg/turntable/backgroundLight.png" alt="">
				<div v-if="!btnPrize" class="prize">
					<img :src="prizePictures" alt="">
				</div>

				<div v-if="btnPrize">
					<img class="img-animation" src="@/assets/romimg/turntable/goldSmall.png" alt="">
					<img class="img-animation1" src="@/assets/romimg/turntable/goldSmall.png" alt="">
					<img class="img-animation2" src="@/assets/romimg/turntable/goldSmall.png" alt="">
				</div>

				<div class="prize-amount">
					<Price
						v-if="!thankParticipation"
						size="18"
						color="#75DC9E"
						fontWeight="700"
						:currency="awardAmout"
					></Price>
					<p v-if="awardType == 2">{{t('turntable.withdrawalQualifications')}}</p>
					<p v-if="awardAmout == 0">{{t('turntable.thankParticipation')}}</p>
				</div>

				<div class="amount-btn" v-if="awardType == 2" @click="inviteFriends">
					<div class="amount-text">
						<Icon name="shares" color="#fff" :size="18"></Icon>
							<div class="shares-text">
								<span>邀请好友助力领取</span>
								<p>100</p>
								<span>币</span>
							</div>
					</div>
				</div>

				<div class="amount-btn" v-if="awardType == 1 && !btnPrize" @click="withdrawCoins">
					<div class="amount-text">
						<span v-html="t( 'notify.confirm' ) "></span>
					</div>
				</div>
			</div>

			<div class="activity-ends" v-if="!prizeShow">
				<div class="ends-text">
					{{ t('turntable.activityEnds') }}
				</div>
				<div class="amount-btn" @click="$router.push( '/m/home' )">
					<div class="amount-text">
						<span v-html="t( 'notify.confirm' ) "></span>
					</div>
				</div>
			</div>
		</div>

		<div class="weekly-benefits" v-if="successShow">
			<div class="pop-ups">
				<div class="close">
					<img
						class="closes"
						src="@/assets/romimg/lucky/close.png"
						alt=""
						@click="successShow = false"
					/>
				</div>
				<div v-if="!systemAssistance">
					<div class="gold"></div>
					<div class="welfare-text">
						<img src="@/assets/romimg/turntable/winningText.png" alt="">
					</div>
				</div>
				<div class="help-img" v-if="systemAssistance">
					<img class="img-top" src="@/assets/romimg/turntable/top-img.png" alt="">
					<img class="welfare-bottom" src="@/assets/romimg/turntable/bottom-img.png" alt="">
				</div>

				<div class="automatic-shutdown">
					当前页面将在<p>{{threeCountdown}}s</p>后自动关闭
				</div>
			</div>
		</div>
		<ShowDialog
			:btn-type="-1"
			:title="t('turntable.LuckyTurntable')"
			:show="detailScreenShow"
			@ok="detailScreenShow = false"
			@cancel="detailScreenShow = false"
		>
			<div class="dialog-x-content">
				<div class="dialog-row-wrap">
					{{ t( 'turntable.ruleText1' ) }}
				</div>
				<div class="dialog-row-wrap">
					{{ t( 'turntable.ruleText2' ) }}
				</div>
				<div class="dialog-row-wrap">
					{{ t( 'turntable.ruleText3' ) }}
				</div>
				<div class="dialog-row-wrap">
					{{ t( 'turntable.ruleText4' ) }}
				</div>
				<div class="dialog-row-wrap">
					{{ t( 'turntable.ruleText5' ) }}
				</div>
			</div>
		</ShowDialog>
	</div>
</template>

<style lang="scss" scoped>
#turntable-h5 {
	display: flex;
	align-items: center; /* 垂直方向居中对齐 */
	flex-direction: column; /* 子元素垂直排列 */
	width: 750px;
	background-color: #15172c;
	// min-height: calc(100vh);
	.turntable-top{
		display: flex;
		justify-content: center; /* 水平方向居中对齐 */
		align-items: center; /* 垂直方向居中对齐 */
		flex-direction: column; /* 子元素垂直排列 */
		gap: 30px;
		width: 710px;
		height: 774px;
		background: url("@/assets/romimg/turntable/turntable-bg.png")center/cover;
		padding-top: 20px;
		&.active{
			height: 646px;
			border-radius: 12px 12px 0px 0px;
			background: linear-gradient(180deg, #282B51 0%, rgba(40, 43, 81, 0.05) 73.15%, rgba(40, 43, 81, 0.00) 107.38%);
		}
		.moreDays-code{
			width: 100%;
			height: 56px;
			padding: 0px 10px;
			box-sizing:border-box;
			display: flex;
			justify-content: center; /* 水平方向居中对齐 */
			align-items: center; /* 垂直方向居中对齐 */
			justify-content: space-between; /* 子元素均匀分布，第一个元素在起始位置，最后一个元素在结束位置 */
			.invite{
				overflow: hidden;//隐藏溢出内容
				width: 266px;
				height: 100%;
				border-radius: 0px 12px 12px 0px;   
				background: #2F325D;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-left: 10px;
				box-sizing:border-box;
				color: #FFF;
				font-size: 28px;
				.code{
					display: flex;
					justify-content: center; /* 水平方向居中对齐 */
					align-items: center; /* 垂直方向居中对齐 */
					width: 106px;
					height: 100%;
					background: #15172C;
					font-size: 24px;
				}
			}
			.countdown{
				display: flex;
				justify-content: center; /* 水平方向居中对齐 */
				align-items: center; /* 垂直方向居中对齐 */
				width: 322px;
				height: 56px;
				border-radius: 8px 0px 0px 8px;
				border-top: 2px solid #2F325D;
				border-bottom: 2px solid #2F325D;
				border-left: 2px solid #2F325D;
				background: rgba(61, 65, 110, 0.20);
				color: #B4B6C8;
				font-size: 24px;
				font-weight: 400;
			}
		}
		.turntable-big
		{
			width: 626px;
			height: 668px;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			background: url("@/assets/romimg/turntable/turntableBase.png") no-repeat;
			background-size: 100% 328px;
			background-position: 0px 390px;

			.turntable-base
			{
				z-index: 0;
				position: absolute; /* 使用绝对定位 */
				width: 100%;
				height: 328px;
			}

			.turntable-outside
			{
				z-index: 2;
				position: absolute; /* 使用绝对定位 */
				width: 100%;
				height: 100%;
				background: url("@/assets/romimg/turntable/turntableOutside.png") no-repeat;
				background-size: 560px 578px;
				background-position: center 0;
			}

			.turntable-glare{
				z-index: 1;
				position: absolute; /* 使用绝对定位 */
				width: 110%;
				height: 110%;
				background: url("@/assets/romimg/turntable/glare-bg.png") no-repeat;
				background-size: 100% 100%;
				background-position: 10px -50px;
				animation: glareBackground .5s forwards;

			}

			.turntable-Inside
			{
				z-index: 1;
				position: absolute; /* 使用绝对定位 */
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100%;

				img
				{
					width: 520px;
					height: 520px;
					position: absolute;
					top: 40px;
					// border: 1px solid red;
					border-radius: 50%;
					box-sizing: border-box;
					transition: transform 5s cubic-bezier(.57,.54,0,.88);

					&.spin
					{
						// transform: rotate(3600deg);
					}
				}
			}

			.turntable-btn
			{
				z-index: 3;
				position: absolute; /* 使用绝对定位 */
				width: 100%;
				height: 100%;
				background: url("@/assets/romimg/turntable/turntableBtn.png") no-repeat;
				background-size: 194px 214px;
				background-position: center 194px;
				&.active{
					background: url("@/assets/romimg/turntable/turntableBtnActive.png") no-repeat;
					background-size: 360px 360px;
					background-position: center 110px;
					border-radius: 12px;
				}
				// animation: rotateAnimation1 1.3s forwards;
			}
		}
		.extract-body{
			display: flex;
			// justify-content: center; /* 水平方向居中对齐 */
			// align-items: center; /* 垂直方向居中对齐 */
			flex-direction: column; /* 子元素垂直排列 */
			align-items: center;
			width: 710px;
			height: 540px;
			border-radius: 12px;
			background: #202341;	
			.withdraw-amount{
				width: 640px;
				height: 244px;
				display: flex;
				justify-content: center; /* 水平方向居中对齐 */
				align-items: center; /* 垂直方向居中对齐 */
				flex-direction: column; /* 子元素垂直排列 */
				border-radius: 8px;
				background: linear-gradient(180deg, #353965 0%, rgba(53, 57, 101, 0.00) 100%);
				gap: 20px;
				p{
					color: #B4B6C8;
					text-align: center;
					font-family: Roboto;
					font-size: 28px;
					font-style: normal;
					font-weight: 500;
				}
				.withdraw-price{
					display: flex;
					justify-content: center; /* 水平方向居中对齐 */
					align-items: center; /* 垂直方向居中对齐 */
					gap: 10px;
					img{
						width: 108px;
						height: 90px;
					}
					span{
						color: #7EF2AD;
						text-align: center;
						leading-trim: both;
						text-edge: cap;
						font-family: Roboto;
						font-size: 68px;
						font-style: normal;
						font-weight: 700;
						line-height: normal;
					}
				}
			}
			.progress-wrap {
				display: flex;
				width: 620px;
				// height: 51px;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				// margin-top: 00px;
				position: relative;
				border-radius: 30px;
				.probability-tooltip {
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					width: 66px;
					height: 38px;
					top: -30px; /* Adjust the distance from the progress bar */
					left: 90%;
					transform: translateX(-50%);
					color: #fff;
					font-size: 24px;
					border-radius: 4px;
					background: #5990FD;
					padding: 10px;
					box-sizing:border-box;
					z-index: 2;
				}
				.probability-icon{
					position: absolute;
					top: -5px; /* Adjust the distance from the progress bar */
					left: 90%;
					transform: translateX(-50%);
					z-index: 1;
				}
				.van-progress{
					margin-top: 20px;
					width: 620px;
					height: 20px;
					border-radius: 30px;
					.van-progress__portion{
						animation: progressBarAnimation 5s linear infinite; /* 缓慢前进的动画，时长为5秒，可以根据需要调整 */
					}
				}
			}
			.remaining-progress{
				display: flex;
				justify-content: space-between;
				align-items: center; /* 垂直方向居中对齐 */
				width: 620px;
				margin-top: 30px;
				// gap: 64px;
				.avatar{
					width: 112px;
					height: 48px;
					background: url("@/assets/romimg/turntable/avatar.png") center/cover;
				}
				.re-text{
					display: flex;
				}
				span{
					display: flex;
					align-items: center; /* 垂直方向居中对齐 */
					color: #B4B6C8;
					text-align: center;
					font-family: Roboto;
					font-size: 28px;
					font-style: normal;
					font-weight: 500;
				}
				p{
					display: flex;
					align-items: center; /* 垂直方向居中对齐 */
					justify-content: center; /* 水平方向居中对齐 */
					color: #72D89F;
					font-family: Roboto;
					font-size: 28px;
					font-style: normal;
					font-weight: 500;
					margin: 0 5px;
				}

			}
			.amount-btn{
				margin-top: 40px ;
				display: flex;
				justify-content: center; /* 水平方向居中对齐 */
				align-items: center; /* 垂直方向居中对齐 */
				width: 620px;
				height: 90px;
				background: #4B58C9;
				border-radius: 80px;
				gap: 20px;
				.amount-text{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					position: relative;
					.icon-right{
						margin-right: 10px;
					}
					img{
						top: -100px;
						right: -140px;
						width: 144px;
						position: absolute; /* 使用绝对定位 */
					}
					p{
						color: #FFE86B;
						text-align: center;
						font-family: Roboto;
						font-size: 36px;
						font-style: normal;
						font-weight: 700;
						margin: 0 5px;
					}
					span{
						display: flex;
						align-items: center; /* 垂直方向居中对齐 */
						color: #FFF;
						font-family: Roboto;
						font-size: 36px;
						font-style: normal;
						font-weight: 700;
					}
				}
			}
		}
	}
	.activity-rules{
		margin: 40px 0 20px 0;
		width: 700px;
		// height: 436px;
		padding: 30px;
		padding-top: 120px;
		box-sizing:border-box;
		background: url("@/assets/romimg/turntable/activityRules.png") center/cover;
		p{
			color: #B4B6C8;
			font-family: Roboto;
			font-size: 28px;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
		}
	}

	.get-amount{
		display: flex;
		justify-content: center; /* 水平方向居中对齐 */
		align-items: center; /* 垂直方向居中对齐 */
		position: fixed;//创建弹窗背景
		width: 100%;
		height: 100%;
		background-color: rgba(16, 16, 30, 0.95); /* 使用RGBA表示法添加透明度 */
		left: 0;
		top: 0;
		z-index: 200;
		.amount-body{
			display: flex;
			// justify-content: center; /* 水平方向居中对齐 */
			align-items: center; /* 垂直方向居中对齐 */
			flex-direction: column; /* 子元素垂直排列 */
			width: 560px;
			height: 790px;
			position: relative;
			padding: 150px 0 0 0;
			box-sizing:border-box;
			.img-light{
				width: 544px;
				height: 530px;
				position: absolute;
				top: 0px;
				right: 8px;
			}
			.img-animation {
				position: absolute;
				width: 150px;
				height: 150px;
				animation: rotateAnimation 1.5s forwards;
			}
			.img-animation1 {
				position: absolute;
				right: 100px;
				top: 170px;
				width: 150px;
				height: 150px;
				animation: rotateAnimation1 1.3s forwards;
			}
			.img-animation2 {
				position: absolute;
				right: 250px;
				top: 200px;
				width: 150px;
				height: 150px;
				animation: rotateAnimation2 1s forwards;
			}

			.prize{
				display: flex;
				justify-content: center; /* 水平方向居中对齐 */
				align-items: center; /* 垂直方向居中对齐 */
				width: 240px;
				height: 200px;
				// border: 1px solid red;
				img{
					width: 130px;
					// height: 200px;
				}
				z-index: 2;
			}
			.prize-amount{
				display: flex;
				// justify-content: center; /* 水平方向居中对齐 */
				align-items: center; /* 垂直方向居中对齐 */
				flex-direction: column; /* 子元素垂直排列 */
				margin: 86px 0 150px;
				// border: 1px solid red;
				p{
					color: #F6F2E8;
					text-align: center;
					font-family: Roboto;
					font-size: 40px;
					font-style: normal;
					font-weight: 700;
				}
			}

			.close {
				position: absolute;
				right: 30px;
				top: 30px;
				z-index: 10;
				img {
					width: 30px !important;
					height: 30px !important;
				}
			}
		}
		.activity-ends{
			display: flex;
			flex-direction: column;
			gap: 300px;
			.ends-text{
				color: #FFF;
				text-align: center;
				font-family: Roboto;
				font-size: 36px;
				font-style: normal;
				font-weight: 700;
			}
		}
		.amount-btn{
			display: flex;
			justify-content: center; /* 水平方向居中对齐 */
			align-items: center; /* 垂直方向居中对齐 */
			width: 560px;
			height: 90px;
			background: #4B58C9;
			border-radius: 80px;
			gap: 20px;
			.amount-text{
				display: flex;
				align-items: center;
				gap: 20px;
				.shares-text{
					display: flex;
					align-items: center;
				}
				p{
					color: #FFE86B !important;
					text-align: center;
					font-family: Roboto;
					font-size: 36px;
					font-style: normal;
					font-weight: 700;
					margin: 0 5px;
				}
				span{
					display: flex;
					align-items: center; /* 垂直方向居中对齐 */
					color: #FFF;
					font-family: Roboto;
					font-size: 36px;
					font-style: normal;
					font-weight: 700;
				}
			}
		}
	}

	.invite-rebate{
		width: 700px;
		height: 488px;
		margin-bottom: 52px;
		background: url("@/assets/romimg/turntable/inviteRebate.png") center/cover;
	}
	.weekly-benefits{
		display: flex;
		justify-content: center; /* 水平方向居中对齐 */
		align-items: center; /* 垂直方向居中对齐 */
		position: fixed;//创建弹窗背景
		width: 100%;
		height: 100%;
		opacity: 0.95;
		background: #10101E;
		left: 0;
		top: 0;
		z-index: 200;
		.pop-ups{
			display: flex;
			justify-content: center; /* 水平方向居中对齐 */
			// align-items: center; /* 垂直方向居中对齐 */
			flex-direction: column; /* 子元素垂直排列 */
			width: 700px;
			height: 700px;
			background: url("@/assets/romimg/turntable/weeklyBenefits.png") center/cover;
			position: relative;
			padding: 282px 108px 166px;
			box-sizing:border-box;
			gap: 80px;
			.close {
				position: absolute;
				right: 30px;
				top: 30px;
				img {
					width: 30px;
					height: 30px;
				}
			}
			.help-img{
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				.img-top{
					width: 192px;
					height: 78px;
					animation: slideleft 1s forwards;

				}
				.welfare-bottom{
					width: 410px;
					height: 54px;
					animation: slideRight 1s forwards;

				}
			}
			.gold{
				position: absolute; /* 使用绝对定位 */
				right: 104px;
				top: 264px;
				width: 104px;
				height: 86px;
				background: url("@/assets/romimg/turntable/gold.png") center/cover;
				animation: slideleft 1s forwards;
			}
			.welfare-text{
				display: flex;
				justify-content: center; /* 水平方向居中对齐 */
				align-items: center; /* 垂直方向居中对齐 */
				flex-direction: column; /* 子元素垂直排列 */
				animation: slideRight 1s forwards;
				img{
					width: 482px;
					height: 128px;
				}
			}
			.automatic-shutdown{
				display: flex;
				justify-content: center; /* 水平方向居中对齐 */
				align-items: center; /* 垂直方向居中对齐 */
				display: flex;
				color: #787A95;
				text-align: center;
				font-family: Inter;
				font-size: 24px;
				font-style: normal;
				font-weight: 400;
				text-transform: uppercase;
				p{
					color: #F5E0A3;
					font-family: Inter;
					font-size: 24px;
					font-style: normal;
					font-weight: 400;
					text-transform: uppercase;
				}
			}
		}
	}
	@keyframes progressBarAnimation {
		0% {
			width: 0;
		}
		100% {
			width: 100%;
		}
	}
	@keyframes slideRight {
		0% {
			transform: translateX(-500px);
			animation-timing-function: ease-in; /* 初始时快速 */
		}
		20% {
			transform: translateX(-200px);
			animation-timing-function: ease-out; /* 中间时慢速 */
		}
		50% {
			transform: translateX(-50px);
			animation-timing-function: ease-out; /* 中间时慢速 */
		}
		100% {
			transform: translateX(0px); /* 目标位置，根据需要调整 */
			animation-timing-function: ease-in; /* 初始时快速 */
		}
	}
	@keyframes slideleft {
		0% {
			transform: translateX(300px);
			animation-timing-function: ease-in; /* 初始时快速 */
		}
		20% {
			transform: translateX(100px);
			animation-timing-function: ease-out; /* 中间时慢速 */
		}
		50% {
			transform: translateX(50px);
			animation-timing-function: ease-out; /* 中间时慢速 */
		}
		100% {
			transform: translateX(0px); /* 目标位置，根据需要调整 */
			animation-timing-function: ease-in; /* 初始时快速 */
		}
	}
	@keyframes rotateAnimation {
		from {
			transform: translate(0%, 0%) scale(1);
			// transform: rotate(360deg);
		}
		to {
			// transform: rotate(0deg);
			transform: translate(300%, -800%) scale(.3);;
		}
	}
	@keyframes rotateAnimation1 {
		from {
			transform: translate(0%, 0%) scale(1);
			// transform: rotate(360deg);
		}
		to {
			// transform: rotate(0deg);
			transform: translate(180%, -800%) scale(.2);;
		}
	}
	@keyframes rotateAnimation2 {
		from {
			transform: translate(0%, 0%) scale(1);
			// transform: rotate(360deg);
		}
		to {
			// transform: rotate(0deg);
			transform: translate(300%, -800%) scale(.1);;
		}
	}
	@keyframes glareBackground {
		from {
			transform: scale(.5);
			opacity: 0; /* 透明度从 0.5 开始 */
			// transform: rotate(360deg);
		}
		to {
			// transform: rotate(0deg);
			transform: tscale(1);;
			opacity: 1; /* 透明度从 0.5 开始 */
		}
	}
}
</style>