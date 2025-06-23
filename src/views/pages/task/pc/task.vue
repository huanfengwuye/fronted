<script lang="ts">
import { Component } from 'vue-facing-decorator'
import Task from '@/scripts/pages/task/task'

@Component
export default class PCTask extends Task {
[x: string]: any;
}
</script>
<template>
	<div id="task-pc">
		<div class="top-tile">
			<div class="tile-left">
				<Icon name="task" color="#7349CA" size="28"></Icon>
				任务中心
			</div>
			<div class="tile-right" @click="onClickHelp">
			</div>
		</div>
		<div class="task-bg"></div>
		<div class="top-text">
			<span>{{ t('task.taskList') }}</span>
			<p>{{ t('task.missionAccomplished') }}</p>
		</div>
		<div 
			class="task-warp">
			<div 
				class="task-item"
				v-for="(item, index) in totalItems"
				:key="index"
			>
				<div class="item-left">
					<div class="left-tile">
						{{ item.missionName }}
					</div>
					<div class="left-list">
						<div 
							class="missionDetails" 
							v-for="(totalcontent, index) in item.items"
							:key="index"
							:class="{active : totalcontent.isCompleted == 0 }"
						>
							<img v-if="totalcontent.isCompleted == 0" src="@/assets/pcimg/task/notTriggered.png" alt="">
							<img v-else src="@/assets/pcimg/task/trigger.png" alt="">
							{{ totalcontent.content }}
						</div>
					</div>
				</div>
				<div class="item-right">
					<div class="bg-img">
						<img :src="getImageBg(item)" alt="">
					</div>
					<div class="gun-img">
						<img :src="item.rewardGoodsIconUrl" alt="">
					</div>
					<div class="gun-price">
						<Price
							size="17"
							fontWeight="700"
							color="#7EF2AD"
							:currency="item.rewardGoodsPrice"
						></Price>
					</div>
					<div class="btn" :class="{active: item.isCompleted == 1 && item.isRewarded == 0}" v-if="item.isCompleted == 1 && item.isRewarded == 0" @click="receiveMissionReward(item.missionId)">
						<Icon v-if="item.isRewarded == 1 || item.isCompleted == 1" name="unlock" color="#fff" size="12"></Icon>
						<p v-if="item.isRewarded == 0">领取</p>
					</div>
					<div class="btn" v-else>
						<Icon v-if="item.isRewarded == 1 || item.isCompleted == 1" name="unlock" color="#fff" size="12"></Icon>
						<p v-if="item.isRewarded == 0">领取</p>
						<Icon v-if="item.isRewarded == 0 && item.isCompleted == 0" name="noUnlock" color="rgba(255, 255, 255, 0.50)" size="12"></Icon>
						<span v-if="item.isRewarded == 1">已领取</span>
					</div>
				</div>
			</div>
		</div>

		<div class="receive-bg" v-if="receiveShow">
			<div class="receive-body">
				<div class="close" @click="receiveShow = false"></div>
				<div class="receive-top">
					获得物品
				</div>
				<div class="bg" :class="[ `level-${gunItems.rewardGoodsLevel}` ]"></div>
				<div class="prize-item-back">
					<div class="prize-item-pic" :style="'background-image: url(' + getImageBg2(gunItems) + ');'">
						<img :src="gunItems.rewardGoodsIconUrl" alt="">
					</div>
				</div>
				<div class="item-info">
					<p class="item-info1 ">{{ gunItems.rewardGoodsName }}</p>
					<!-- <p class="item-info2">{{ getGoodsNameSec(gunItems.rewardGoodsName) }}</p> -->
				</div>
				<div class="opt-wrap">
					<div class="btn-recovery" @click="onSellOne">{{ '炼化' }}&nbsp;&nbsp;
						<Price
							size="17"
							fontWeight="700"
							:currency="gunItems.rewardGoodsPrice"
						></Price>
					</div>
					<div class="btn-return" @click="receiveShow = false">{{ t( 'openbox.putInBag' ) }}</div>
				</div>
			</div>
		</div>

	</div>
</template>

<style lang="scss" scoped>
#task-pc {
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column; /* 子元素垂直排列 */
	width: 100%;
	max-width: 1440px;
	height: 100%;
	position: relative;
	.receive-bg{
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;//创建弹窗背景
		width: 100%;
		height: 100%;
		background: rgba( 0, 0, 0, .7 );
		left: 0;
		top: 0;
		z-index: 200;
		.receive-body{
			display: flex;
			// justify-content: center;
			flex-direction: column; /* 子元素垂直排列 */
			width: 575px;
			height: 695px;
			background-color: #0D0E1C;
			padding-top: 60px;
			box-sizing: border-box;
			position: relative;
			.close{
				position: absolute;
				top: 20px;
				right: 20px;
				width: 20px;
				height: 20px;
				cursor: pointer;
				background: url("@/assets/pcimg/common/close.png");
				background-size: 100% 100%;
			}
			.receive-top{
				color: #FFF;
				text-align: center;
				font-family: "Microsoft YaHei";
				font-size: 27px;
				font-style: normal;
				font-weight: 400;
				line-height: 32.4px; /* 120% */
				text-transform: capitalize;
			}

			.prize-item-back {
				width: 360px;
				height: 360px;
				margin: 56px auto 0;
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
				position: relative;

				.prize-item-pic {
					width: 360px;
					height: 360px;
					display: flex;
					justify-content: center;
					align-items: center;
					transform: scale(0);
					transform: scale(1);
					transition: all 2s ease-out;
					background-size: 100% 100%;
					img {
						max-width: 350px;
						max-height: 262px;
						z-index: 8;
					}
				}
			}


		.item-info {
			display: flex;
			align-items: center;
			flex-direction: column;
			margin-top: 3px;
			position: relative;

			.item-info1 {
				color: #EFF0F5;
				text-align: center;
				font-size: 18px;
				font-style: normal;
				font-weight: 500;
				line-height: 21.6px;
			}

			.item-info2 {
				color: #EFF0F5;
				text-align: center;
				font-size: 21px;
				font-style: normal;
				font-weight: 700;
				line-height: 25.2px;
			}
		}

		.opt-wrap {
			display: flex;
			justify-content: center;
			position: relative;
			margin-top: 45px;

			.btn-return {
				display: flex;
				max-width: 316px;
				padding: 2px 25px 0px 25px;
				justify-content: center;
				align-items: center;
				color: #FFF;
				text-align: center;
				font-size: 17px;
				font-style: normal;
				font-weight: 700;
				line-height: 25.5px;
				cursor: pointer;
				border-radius: 4px;
				background: #3A34B0;
			}

			.btn-recovery {
				display: flex;
				max-width: 316px;
				padding: 17.25px 24.8px 16.25px 25px;
				justify-content: center;
				align-items: center;
				color: #FFF;
				text-align: center;
				font-size: 17px;
				font-style: normal;
				font-weight: 700;
				line-height: 25.5px;
				cursor: pointer;
				border-radius: 4px;
				background: #7D51DF;
				margin-right: 18px;

				img{
					margin-left: 5px;
				}
			}
		}

			.bg {
				position: absolute;
				top: 80px;
				left: 40px;
				animation: ani-rotate 14s linear infinite;
				width: 507px;
				height: 483px;
				// background: url(@/assets/pcimg/openbox/result_bg.png) no-repeat center;
				background-size: cover;

				&.level-1
				{
					background: url(@/assets/pcimg/openbox/result_bg_1.png) no-repeat center;
				}

				&.level-2
				{
					background: url(@/assets/pcimg/openbox/result_bg_2.png) no-repeat center;
				}

				&.level-3
				{
					background: url(@/assets/pcimg/openbox/result_bg_3.png) no-repeat center;
				}

				&.level-4
				{
					background: url(@/assets/pcimg/openbox/result_bg_4.png) no-repeat center;
				}

				&.level-5
				{
					background: url(@/assets/pcimg/openbox/result_bg_5.png) no-repeat center;
				}

				&.level-6
				{
					background: url(@/assets/pcimg/openbox/result_bg_6.png) no-repeat center;
				}

				&.level-7
				{
					background: url(@/assets/pcimg/openbox/result_bg_7.png) no-repeat center;
				}
			}
		}
	}
	.top-tile{
		margin: 38px 0 33px;
		height: 60px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		justify-content: space-between;
		.tile-left{
			gap: 14px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFF;
			text-align: center;
			font-family: Microsoft YaHei;
			font-size: 27px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
		.tile-right{
			width: 60px;
			height: 60px;
			background: url("@/assets/pcimg/common/help.png") center no-repeat;
			cursor: pointer;
			&:hover
			{
				background: url("@/assets/pcimg/common/help2.png") center no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	.task-bg{
		top: 130px;
		width:100%;
		height: 350px;
		position: absolute;
		background: url("@/assets/pcimg/task/task-bg.png") center/cover;
		z-index: 0;
	}
	.top-text{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column; /* 子元素垂直排列 */
		position: relative;
		z-index: 1;
		margin: 80px 0 60px;
		p{
			color: #B4B6C8;
			text-align: center;
			font-family: Microsoft YaHei;
			font-size: 24px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
		span{
			color: #FFF;
			text-align: center;
			font-family: Microsoft YaHei;
			font-size: 28px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
	}
	.task-warp{
		position: relative;
		z-index: 1;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		align-content: center;
		gap: 20px;
		flex-wrap: wrap;
		margin: auto;
		.task-item{
			display: flex;
			padding: 15px 20px;
			box-sizing:border-box;
			// justify-content: center;
			align-items: center;
			justify-content: space-between;
			width: 680px;
			height: 280px;
			gap: 114px;
			border-radius: 5.28px;
			background: rgba(31, 34, 64, 0.70);
			.item-left{
				display: flex;
				min-width: 276px;
				padding: 50px 20px;
				box-sizing:border-box;
				height: 100%;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				gap: 35px;
				background: linear-gradient(90deg, #262A4C 0%, rgba(38, 42, 76, 0.00) 100%);
				.left-tile{
					color: var(--skin_club_zh-CN_missions_1872x866_default-Electric-Violet, #FBFFFE);
					font-family: Roboto;
					font-size: 24px;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
				}
				.left-list{
					display: flex;
					flex-direction: column; /* 子元素垂直排列 */
					gap: 15px;
					.missionDetails{
						display: flex;
						gap: 10px;
						color: #C8CBE1;
						font-family: Roboto;
						font-size: 14px;
						font-style: normal;
						font-weight: 400;
						&.active{
							color: #6A6D81;
						}
					}
				}
			}
			.item-right{
				display: flex;
				flex-direction: column; /* 子元素垂直排列 */
				justify-content: space-between;
				align-items: center;
				padding: 20px 0 0 0;
				box-sizing: border-box;
				width: 200px;
				height: 235px;
				position: relative;
				.bg-img{
					z-index: 1;
					position: absolute;
					width: 232px;
					height: 232px;
					left: 50%; /* 将left设置为50% */
					transform: translate(-50%,0); /* 使用transform平移来实现居中 */
					top: -25px;
					// border: 1px solid red;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.gun-img{
					width: 80%;
					z-index: 3;
					height: 115px;
					// border: 1px solid #fff;
					img{
						width: 100%;
					}
				}
				.gun-price{

				}
				.btn{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 116px;
					height: 38px;
					border-radius: 4px;
					gap: 5px;
					background: #15172C;
					color: #6D6E7B;
					text-align: center;
					font-family: Microsoft YaHei;
					font-size: 12px;
					font-style: normal;
					font-weight: 400;
					cursor: pointer;
					&.active{
						color: #FFF;
						background: #3A34B0;
						// cursor: alias;
					}
				}
			}
		}
	}

}
</style>