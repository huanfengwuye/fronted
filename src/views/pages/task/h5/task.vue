<script lang="ts">
import { Component } from 'vue-facing-decorator'
import Task from '@/scripts/pages/task/task'
import { watch } from 'vue';

@Component
export default class H5Task extends Task {}
</script>
<template>
	<div id="task-h5">
		<TopTitleBack :handler="showHelper" :title="t('task.missionCenter')"></TopTitleBack>
		<div class="task-bg"></div>
		<div class="top-text">
			<p>{{ t('task.missionAccomplished') }}</p>
		</div>
		<div 
			class="task-warp">
			<div 
				class="task-item"
				v-for="(item, index) in totalItems"
				:key="index"
			>
				<div class="item-text">
					{{ item.missionName }}
					<Icon v-if="item.isCompleted == 1" class="completion-prompt" name="completionPrompt" size="16"></Icon>
				</div>
				<img class="box-img-bg" :src="getImageBg(item)" alt="">
				<img class="box-img" :src="item.rewardGoodsIconUrl" alt="">
				<div class="box-price">
					<Price
						size="15"
						fontWeight="700"
						color="#7EF2AD"
						:currency="item.rewardGoodsPrice"
					></Price>
				</div>
				<div class="task-list">
					<div 
						class="list-item"
						:class="{active: totalcontent.isCompleted == 0}"
						v-for="(totalcontent, index) in item.items"
						:key="index"
					>
						{{ totalcontent.content }}
					</div>
				</div>
				<div class="task-btn" :class="{active: item.isCompleted == 1 && item.isRewarded == 0}" v-if="item.isCompleted == 1 && item.isRewarded == 0" @click="receiveMissionReward(item.missionId)">
					<Icon v-if="item.isRewarded == 1 || item.isCompleted == 1" name="unlock" color="#fff" size="12"></Icon>
					<p v-if="item.isRewarded == 0">领取</p>
				</div>
				<div class="task-btn" :class="{active: item.isCompleted == 1 && item.isRewarded == 0}" v-else>
					<Icon v-if="item.isRewarded == 1 || item.isCompleted == 1" name="unlock" color="#fff" size="12"></Icon>
					<p v-if="item.isRewarded == 0">领取</p>
					<Icon v-if="item.isRewarded == 0 && item.isCompleted == 0" name="noUnlock" color="rgba(255, 255, 255, 0.50)" size="12"></Icon>
					<span v-if="item.isRewarded == 1">已领取</span>
				</div>
			</div>
		</div>
		<ShowDialog
			:btn-type="-1"
			:title="t('task.missionCenter')"
			:show="detailScreenShow"
			@ok="detailScreenShow = false"
			@cancel="detailScreenShow = false"
		>
			<div class="dialog-x-content">
				<div class="dialog-row-wrap">
					{{ t( 'task.ruleText1' ) }}
				</div>
				<div class="dialog-row-wrap">
					{{ t( 'task.ruleText2' ) }}
				</div>
				<div class="dialog-row-wrap">
					{{ t( 'task.ruleText3' ) }}
				</div>
				<div class="dialog-row-wrap">
					{{ t( 'task.ruleText4' ) }}
				</div>
				<div class="dialog-row-wrap">
					{{ t( 'task.ruleText5' ) }}
				</div>
			</div>
		</ShowDialog>

		<div class="receive-bg" v-if="receiveShow">
			<div class="receive-body">
				<div class="close" @click="receiveShow = false"></div>
				<div class="receive-top">
					获得物品
				</div>
				<div class="price-back">
					<Price
						size="17"
						color="#7EF2AD"
						:currency="gunItems.rewardGoodsPrice"
					></Price>
				</div>
				<div class="bg" :class="[ `level-${gunItems.rewardGoodsLevel}` ]"></div>
				<div class="prize-item-back" >
					<div class="prize-item-pic">
						<img :src="gunItems.rewardGoodsIconUrl" alt="">
					</div>
				</div>
				<div class="item-info">
					<p class="item-info1 ">{{ gunItems.rewardGoodsName }}</p>
					<!-- <p class="item-info2">{{ getGoodsNameSec(gunItems.rewardGoodsName) }}</p> -->
				</div>
				<div class="opt-wrap">
					<div class="btn-recovery" @click="onSellOne">{{ '炼化' }}&nbsp;&nbsp;

					</div>
					<div class="btn-return" @click="receiveShow = false">{{ t( 'openbox.putInBag' ) }}</div>
				</div>
			</div>
		</div>
	</div>

</template>

<style lang="scss" scoped>
#task-h5 {
	width: 100%;
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
			width: 90%;
			height: 882px;
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
				font-size: 32px;
				font-style: normal;
				font-weight: 400;
				line-height: 32.4px; /* 120% */
				text-transform: capitalize;
			}

			.price-back{
				width: 100%;
				display: flex;
				justify-content: center;
				margin: 20px 0 20px;
			}

			.prize-item-back {
				width: 360px;
				height: 360px;
				margin: 0px auto 0;
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
				margin: 40px 0 30px;
				color: #EFF0F5;
				text-align: center;
				font-size: 32px;
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
				width: 200px;
				padding: 2px 25px 0px 25px;
				justify-content: center;
				align-items: center;
				color: #FFF;
				text-align: center;
				font-size: 30px;
				font-style: normal;
				font-weight: 700;
				line-height: 25.5px;
				cursor: pointer;
				border-radius: 8px;
				background: #3A34B0;
			}

			.btn-recovery {
				display: flex;
				width: 200px;
				height: 50px;
				padding: 17.25px 24.8px 16.25px 25px;
				justify-content: center;
				align-items: center;
				color: #FFF;
				text-align: center;
				font-size: 30px;
				font-style: normal;
				font-weight: 700;
				line-height: 25.5px;
				cursor: pointer;
				border-radius: 8px;
				background: #7D51DF;
				margin-right: 38px;

				img{
					margin-left: 5px;
				}
			}
		}

			.bg {
				position: absolute;
				top: 70px;
				left: 40px;
				animation: ani-rotate 14s linear infinite;
				width: 607px;
				height: 583px;
				// background: url(@/assets/pcimg/openbox/result_bg.png) no-repeat center;
				background-size: contain;

				&.level-1
				{
					background: url(@/assets/pcimg/openbox/result_bg_1.png) no-repeat center;
					background-size: 100% 100%;

				}

				&.level-2
				{
					background: url(@/assets/pcimg/openbox/result_bg_2.png) no-repeat center;
					background-size: 100% 100%;
				}

				&.level-3
				{
					background: url(@/assets/pcimg/openbox/result_bg_3.png) no-repeat center;
					background-size: 100% 100%;
				}

				&.level-4
				{
					background: url(@/assets/pcimg/openbox/result_bg_4.png) no-repeat center;
					background-size: 100% 100%;
				}

				&.level-5
				{
					background: url(@/assets/pcimg/openbox/result_bg_5.png) no-repeat center;
					background-size: 100% 100%;
				}

				&.level-6
				{
					background: url(@/assets/pcimg/openbox/result_bg_6.png) no-repeat center;
					background-size: 100% 100%;
				}

				&.level-7
				{
					background: url(@/assets/pcimg/openbox/result_bg_7.png) no-repeat center;
					background-size: 100% 100%;
				}
			}
		}
	}

	.task-bg{
		width:100%;
		height: 368px;
		position: absolute;
		background: url("@/assets/romimg/task/task-bg.png") center/cover;
		z-index: 0;
	}
	.top-text{
		position: relative;
		z-index: 1;
		margin: 70px 0;
		p{
			color: #B4B6C8;
			text-align: center;
			font-family: Microsoft YaHei;
			font-size: 24px;
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
		gap: 40px 20px;
		flex-wrap: wrap;
		margin: auto;
		.task-item{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column; /* 子元素垂直排列 */
			width: 340px;
			padding: 20px 0;
			box-sizing:border-box;
			border-radius: 12px;
			background: rgba(31, 34, 64, 0.70);
			position: relative;
			.item-text{
				color: #FBFFFE;
				font-family: Roboto;
				font-size: 32px;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				position: relative;
				.completion-prompt{
					position: absolute;
					top: -10px;
					right: -90px;
				}
			}
			.box-img-bg{
				width: 286px;
				height: 286px;
				position: absolute;
				top: 53px;
			}
			.box-img{
				position: relative;
				width: 240px;
				height: 180px;
				top: 20px;
			}
			.box-price{
				margin: 10px 0 0;
			}
			.task-list{
				display: flex;
				flex-direction: column; /* 子元素垂直排列 */
				margin-top: 28px;
				width: 100%;
				padding: 30px 10px;
				box-sizing:border-box;
				gap: 10px;
				background: linear-gradient(180deg, #262A4C 0%, rgba(38, 42, 76, 0.00) 100%);
				.list-item{
					padding: 10px;
					box-sizing:border-box;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					border-radius: 4px;
					background: #2D3259;
					color: #FFF;
					font-family: Roboto;
					font-size: 24px;
					font-style: normal;
					font-weight: 400;
					&.active{
						background: #15172C;
						color: #8A8B95;
					}
				}
			}
			.task-btn{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 182px;
				height: 64px;
				border-radius: 8px;
				background: #3A34B0;
				gap: 10px;
				color: #6D6E7B;
				background: #15172C;
				font-family: Microsoft YaHei;
				font-size: 24px;
				font-style: normal;
				font-weight: 400;
				&.active{
					color: #FFF;
					text-align: center;
					background: #3A34B0;
				}
			}
		}
	}

}
</style>