<script lang="ts">
import { Component } from 'vue-facing-decorator'
import TurnTable from '@/scripts/pages/turntable/turntable'

@Component
export default class PCTurnTable extends TurnTable {}
</script>
<template>
	<div id="turntable-pc" v-if="overallShow">
		<div class="turntable-bg">
			<div class="turntable-body">
				<div class="help-rank" @click="onClickHelp">
					<img src="@/assets/pcimg/turntable/helpRank.png" alt="">
				</div>
				<div class="close">
					<img
						src="@/assets/romimg/lucky/close.png"
						alt=""
						@click="closeOverallShow"
					/>
				</div>
				<div class="countdown">
					本轮剩余：{{countdown}}
					<!-- {{ ownerInvitation }} -->
				</div>
				<div class="lottery-before" v-if="!extractionStatus">
					<div class="turntable-big" :class="{active:pcTurntable}">
						<div class="turntable-outside"></div>
						<div class="turntable-glare" v-if="btnActive"></div>
						<div class="turntable-Inside">
							<img :class="{spin:aaa}" :style="{ transform: 'rotate(' + angle + 'deg)' }" @transitionend="a" src="@/assets/romimg/turntable/turntableLnside.png">
						</div>
						<div class="turntable-btn" :class="{active:btnActive}" @click="start"></div>
						<div class="turntable-base"></div>
					</div>
					<div class="activity-rules" v-if="!pcTurntable">
						<p>{{t('turntable.wheelRules1')}}</p><br/>
						<p>{{t('turntable.wheelRules2')}}</p>
						<p>{{t('turntable.wheelRules3')}}</p><br/>
						<p>{{t('turntable.wheelRules4')}}</p><br/>
					</div>
					<div class="activity-end" v-if="pcTurntable">
						<p>{{t('turntable.activityEnds')}}</p>
					</div>
				</div>
				<div class="after-extraction"  v-if="extractionStatus">
					<div class="invite">
						<p>
							我的邀请码	
						</p>
						<div class="code">
							{{spreadCode}}
						</div>
					</div>
					<div class="extraction-progress">
						<div class="get-gold">
							<p>{{t('turntable.withdrawAmount')}}</p>
							<div class="img-price">
								<img src="@/assets/romimg/turntable/gold.png" alt="">
								<span>100.00</span>
							</div>
						</div>
						<div class="schedule">
							<van-progress :percentage="progress" pivot-text="" track-color="#373845"
							color="linear-gradient(270deg, #FDCF58 0%, #5890FD 31.41%, #5049D1 80.81%)"/>
							<div :style="{ left: progress + '%' }" class="probability-tooltip">{{ progress }}%</div>
							<Icon :style="{ left: progress + '%' }" class="probability-icon" name="down-fill" color="#5990FD" size="12"></Icon>
							<div class="invitation-progress">
								<div class="avatar"></div>
								<div class="amount-text">
									<span>邀请好友注册助力</span>
									<p>{{ 100-progress }}%</p>
									<span>就可以提取了</span>
								</div>
							</div>
						</div>
						<div class="amount-btn" @click="pcCopy(ownerInvitation)">
							<div class="amount-text" v-if="progress != 100">
								<Icon name="shares" color="#fff" :size="18"></Icon>
								<div class="shares-text">
									<span>邀请好友助力提现</span>
									<p>100</p>
									<span>币</span>
								</div>

							</div>
							<div class="amount-text" v-if="progress == 100">
								<span>恭喜你提现成功</span>
								<img src="@/assets/romimg/turntable/withdrawn.png" alt="">
							</div>
						</div>
					</div>
					<div class="activity-rules">
						
					</div>
				</div>
			</div>
		</div>
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
						<span v-html="t( 'turntable.invitePrice', { money : 100 } ) "></span>
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
				<div class="pop-bg">

				</div>
				<div class="close" @click="close()">
					<img
						class="closes"
						src="@/assets/romimg/lucky/close.png"
						alt=""
					/>
				</div>
				<div v-if="!systemAssistance && !pcCopyLink">
					<div class="gold"></div>
					<div class="welfare-text">
						<img src="@/assets/romimg/turntable/winningText.png" alt="">
					</div>
				</div>
				<div class="help-img" v-if="systemAssistance&& !pcCopyLink">
					<img class="img-top" src="@/assets/romimg/turntable/top-img.png" alt="">
					<img class="welfare-bottom" src="@/assets/romimg/turntable/bottom-img.png" alt="">
				</div>
				<div class="help-img" v-if="pcCopyLink">
					<img class="copied-successfully" src="@/assets/pcimg/turntable/copiedSuccessfully.png" alt="">
					<img class="invite-registration" src="@/assets/pcimg/turntable/InviteRegistration.png" alt="">
				</div>
				<div class="automatic-shutdown">
					当前页面将在<p>{{threeCountdown}}s</p>后自动关闭
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
#turntable-pc{
	.turntable-bg{
		display: flex;
		justify-content: center; /* 水平方向居中对齐 */
		align-items: center; /* 垂直方向居中对齐 */
		position: fixed;//创建弹窗背景
		width: 100%;
		height: 100%;
		background: rgba( 0, 0, 0, .7 );
		left: 0;
		top: 0;
		// opacity: .1;
		z-index: 50;
		.turntable-body{
			width: 1064px;
			height: 400px;
			background: url("@/assets/pcimg/turntable/turntable-bg.png");
			position: relative;
			.help-rank{
				position: absolute;
				top: 19px;
				right: 59px;
			}
			.close {
				position: absolute;
				right: 20px;
				top: 20px;
				img {
					width: 15px;
					height: 15px;
				}
			}
			.countdown{
				top: 55px;
				left: 450px;
				position: absolute;
				color: #B4B6C8;
				text-align: center;
				font-family: Roboto;
				font-size: 14px;
				font-style: normal;
				font-weight: 400;
			}
			.lottery-before{
				display: flex;
				justify-content: center; /* 水平方向居中对齐 */
				align-items: center; /* 垂直方向居中对齐 */
				gap: 50px;
				width: 100%;
				height: 100%;
				.turntable-big
				{
					width: 313px;
					height: 334px;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					background: url("@/assets/romimg/turntable/turntableBase.png") no-repeat;
					background-size: 100% 164px;
					background-position: 0px 195px;

					.turntable-base
					{
						z-index: 0;
						position: absolute; /* 使用绝对定位 */
						width: 100%;
						height: 164px;
					}

					.turntable-outside
					{
						z-index: 2;
						position: absolute; /* 使用绝对定位 */
						width: 100%;
						height: 100%;
						background: url("@/assets/romimg/turntable/turntableOutside.png") no-repeat;
						background-size: 280px 289px;
						background-position: center 14px;
					}

					.turntable-glare{
						z-index: 1;
						position: absolute; /* 使用绝对定位 */
						width: 110%;
						height: 110%;
						background: url("@/assets/romimg/turntable/glare-bg.png") no-repeat;
						background-size: 100% 100%;
						background-position: 5px -10px;
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
							width: 260px;
							height: 260px;
							position: absolute;
							top: 35px;
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
						background-size: 97px 107px;
						background-position: center 110px;
						&.active{
							background: url("@/assets/romimg/turntable/turntableBtnActive.png") no-repeat;
							background-size: 180px 180px;
							background-position: center 70px;
							border-radius: 6px;
						}
					}
					&.active{
						opacity: 0.2;
					}
				}
				.activity-rules{
					display: flex;
					justify-content: center; /* 水平方向居中对齐 */
					// align-items: center; /* 垂直方向居中对齐 */
					flex-direction: column; /* 子元素垂直排列 */
					box-sizing:border-box;
					width: 610px;
					height: 201px;
					padding: 30px 0 0 15px;
					margin-top: 20px;
					background: url("@/assets/pcimg/turntable/activity-rules.png");
					p{
						color: #B4B6C8;
						font-family: Roboto;
						font-size: 16px;
						font-style: normal;
						font-weight: 500;
						line-height: normal;
					}
				}
				.activity-end{
					display: flex;
					justify-content: center; /* 水平方向居中对齐 */
					flex-direction: column; /* 子元素垂直排列 */
					box-sizing:border-box;
					width: 610px;
					height: 201px;
					padding: 30px 0 0 45px;
					margin-top: 20px;
					p{
						color: #FFF;
						// text-align: center;
						font-family: Roboto;
						font-size: 18px;
						font-style: normal;
						font-weight: 700;
					}
				}
			}	
			.after-extraction{
				display: flex;
				// justify-content: center; /* 水平方向居中对齐 */
				// align-items: center; /* 垂直方向居中对齐 */
				flex-direction: column; /* 子元素垂直排列 */
				// gap: 50px;
				width: 100%;
				height: 100%;
				// border: 1px solid red;
				padding: 50px 32px 15px;
				box-sizing:border-box;
				.invite{
					overflow: hidden;//隐藏溢出内容
					width: 181px;
					height: 33px;
					border-radius: 0px 12px 12px 0px;   
					background: #2F325D;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-left: 10px;
					box-sizing:border-box;
					color: #FFF;
					font-size: 14px;
					.code{
						display: flex;
						justify-content: center; /* 水平方向居中对齐 */
						align-items: center; /* 垂直方向居中对齐 */
						width: 86px;
						height: 100%;
						background: #15172C;
						font-size: 12px;
					}
				}
				.extraction-progress{
					margin: 23px 0 18px;
					display: flex;
					align-items: center;
					width: 1000px;
					height: 107px;
					padding-right: 15px;
					gap: 25px;
					border-radius: 6px;
					background: #202341;
					.get-gold{
						display: flex;
						width: 230px;
						height: 100%;
						padding: 20px 0px;
						box-sizing:border-box;
						flex-direction: column;
						align-items: center;
						gap: 10px;
						border-radius: 4px 0px 0px 4px;
						background: linear-gradient(96deg, #202341 0%, #373B6A 98.68%);
						.img-price{
							display: flex;
							gap: 5px;
							img{
								width: 54px;
								height: 45px;
							}
							span{
								color: #7EF2AD;
								text-align: center;
								leading-trim: both;
								text-edge: cap;
								font-family: Roboto;
								font-size: 34px;
								font-style: normal;
								font-weight: 700;
								line-height: normal;
							}
						}
						p{
							color: #B4B6C8;
							text-align: center;
							font-family: Roboto;
							font-size: 14px;
							font-style: normal;
							font-weight: 500;
						}
					}
					.schedule{
						width: 435px;
						height: 73px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: flex-start;
						position: relative;
						gap: 15px;
						.probability-tooltip {
							display: flex;
							justify-content: center;
							align-items: center;
							position: absolute;
							width: 35px;
							height: 19px;
							top: -15px; /* Adjust the distance from the progress bar */
							left: 90%;
							transform: translateX(-50%);
							color: #fff;
							font-size: 12px;
							border-radius: 4px;
							background: #5990FD;
							padding: 5px;
							box-sizing:border-box;
							z-index: 2;
						}
						.probability-icon{
							position: absolute;
							top: 0px; /* Adjust the distance from the progress bar */
							left: 90%;
							transform: translateX(-50%);
							z-index: 1;
						}
						.van-progress{
							width: 100%;
							height: 10px;
							border-radius: 30px;
						}
						.invitation-progress{
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							align-self: stretch;
							.avatar{
								width: 58px;
								height: 24px;
								background: url("@/assets/romimg/turntable/avatar.png") center/cover;
							}
							.amount-text{
								display: flex;
								p{
									color: #72D89F;
									font-family: Roboto;
									font-size: 14px;
									font-style: normal;
									font-weight: 500;
									line-height: 12px;
									margin: 0 3px;
								}
								span{
									display: flex;
									align-items: center; /* 垂直方向居中对齐 */
									color: #B4B6C8;
									text-align: center;
									font-family: Roboto;
									font-size: 14px;
									font-style: normal;
									font-weight: 500;
									line-height: 12px; /* 85.714% */
								}
							}
						}
					}
					.amount-btn{
						// margin-top: 40px ;
						display: flex;
						justify-content: center; /* 水平方向居中对齐 */
						align-items: center; /* 垂直方向居中对齐 */
						width: 270px;
						height: 45px;
						background: #4B58C9;
						border-radius: 40px;
						gap: 10px;
						.amount-text{
							display: flex;
							align-items: center;
							position: relative;
							gap: 10px;
							.shares-text{
								display: flex;
								align-items: center;
							}
							img{
								top: -50px;
								right: -70px;
								width: 72px;
								position: absolute; /* 使用绝对定位 */
							}
							p{
								color: #FFE86B;
								text-align: center;
								font-family: Roboto;
								font-size: 18px;
								font-style: normal;
								font-weight: 700;
								margin: 0 3px;
							}
							span{
								display: flex;
								align-items: center; /* 垂直方向居中对齐 */
								color: #FFF;
								font-family: Roboto;
								font-size: 18px;
								font-style: normal;
								font-weight: 700;
							}
						}
					}
				}
				.activity-rules{
					width: 1000px;
					height: 156px;
					background: url("@/assets/pcimg/turntable/activityRules.png") center/cover;
				}
			}	
		}
	}
	.get-amount{
		display: flex;
		justify-content: center; /* 水平方向居中对齐 */
		align-items: center; /* 垂直方向居中对齐 */
		position: fixed;//创建弹窗背景
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.90);
		left: 0;
		top: 0;
		z-index: 51;
		.amount-body{
			display: flex;
			// justify-content: center; /* 水平方向居中对齐 */
			align-items: center; /* 垂直方向居中对齐 */
			flex-direction: column; /* 子元素垂直排列 */
			width: 280px;
			height: 395px;
			position: relative;
			padding: 95px 0 0 0;
			box-sizing:border-box;
			.img-light{
				position: absolute;
				top: 0px;
				width: 272px;
				height: 265px;
				right: 4px;
				img{
					width: 272px;
					height: 265px;
				}
				// transform: translate(0%, -50%);
			}
			.img-animation {
				position: absolute;
				width: 150px;
				height: 150px;
				animation: rotateAnimation0 1.5s forwards;
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
				img{
					width: 80px;
					// height: 100px;
				}
				// border: 1px solid red;
				z-index: 2;
			}
			.prize-amount{
				display: flex;
				// justify-content: center; /* 水平方向居中对齐 */
				align-items: center; /* 垂直方向居中对齐 */
				flex-direction: column; /* 子元素垂直排列 */
				margin: 43px 0 40px;
				// border: 1px solid red;
				gap: 15px;
				p{
					color: #F6F2E8;
					text-align: center;
					font-family: Roboto;
					font-size: 22px;
					font-style: normal;
					font-weight: 700;
				}
			}
			.amount-btn{
				display: flex;
				justify-content: center; /* 水平方向居中对齐 */
				align-items: center; /* 垂直方向居中对齐 */
				width: 280px;
				height: 45px;
				background: #4B58C9;
				border-radius: 40px;
				gap: 10px;
				.amount-text{
					display: flex;
					gap: 5px;
					p{
						color: #FFE86B;
						text-align: center;
						font-family: Roboto;
						font-size: 18px;
						font-style: normal;
						font-weight: 700;
						margin: 0 3px;
					}
					span{
						display: flex;
						align-items: center; /* 垂直方向居中对齐 */
						color: #FFF;
						font-family: Roboto;
						font-size: 18px;
						font-style: normal;
						font-weight: 700;
					}
				}
			}
			.close {
				position: absolute;
				right: -77px;
				top: 15px;
				img {
					width: 15px !important;
					height: 15px !important;
				}
			}
		}
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
		z-index: 51;
		.pop-ups{
			display: flex;
			justify-content: center; /* 水平方向居中对齐 */
			// align-items: center; /* 垂直方向居中对齐 */
			flex-direction: column; /* 子元素垂直排列 */
			// width: 700px;
			// height: 700px;
			// background: url("@/assets/romimg/turntable/weeklyBenefits.png") center/cover;
			position: relative;
			padding: 282px 108px 166px;
			box-sizing:border-box;
			gap: 80px;
			.pop-bg{
				top: 250px;
				right: -20px;
				position: absolute;
				width: 508px;
				height: 120px;
				background: url("@/assets/pcimg/turntable/pop-bg.png") ;
			}
			.close {
				position: absolute;
				right: 30px;
				top: 130px;
				img {
					width: 15px;
					height: 15px;
				}
			}
			.help-img{
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				gap: 5px;
				.img-top{
					width: 96px;
					height: 39px;
					animation: slideleft 1s forwards;

				}
				.welfare-bottom{
					width: 205px;
					height: 27px;
					animation: slideRight 1s forwards;

				}
				.invite-registration{
					width: 288px;
					height: 29px;
					animation: slideleft 1s forwards;
				}
				.copied-successfully{
					width: 208px;
					// height: 35px;
					animation: slideRight 1s forwards;
				}
			}
			.gold{
				position: absolute; /* 使用绝对定位 */
				right: 104px;
				top: 264px;
				width: 52px;
				height: 43px;
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
					width: 241px;
					height: 69px;
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
				font-size: 12px;
				font-style: normal;
				font-weight: 400;
				text-transform: uppercase;
				p{
					color: #F5E0A3;
					font-family: Inter;
					font-size: 12px;
					font-style: normal;
					font-weight: 400;
					text-transform: uppercase;
				}
			}
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
	@keyframes rotateAnimation0 {
		from {
			transform: translate(0%, 0%) scale(.5);
		}
		to {
			transform: translate(1200%, -800%) scale(.05);;
		}
	}
	@keyframes rotateAnimation1 {
		from {
			transform: translate(0%, 0%) scale(.5);
		}
		to {
			transform: translate(1080%, -800%) scale(.1);;
		}
	}
	@keyframes rotateAnimation2 {
		from {
			transform: translate(0%, 0%) scale(.5);
		}
		to {
			transform: translate(1270%, -800%) scale(.1);;
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