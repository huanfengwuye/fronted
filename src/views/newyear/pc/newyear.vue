<script lang="ts">
import { Component } from 'vue-facing-decorator'
import NewYear from '@/scripts/pages/newyear/newyear'
import { watch } from 'vue';

@Component
export default class PCNewYear extends NewYear {}
</script>
<template>
	<div id="pc-NewYear">
		<div id="pc-body-back" :style="{ height : `${height}px` }">

			<div class="close" 
				@click="$router.push( '/p/home' )"
				:style="{
					width : `${closeBtn.width * scale}px`,
					height : `${closeBtn.height * scale}px`,
					right : `${closeBtn.right * scale}px`
				}"
			></div>

			<div 
				class="navigation-bar"
				:style="{
					width : `${navigation.width * scale}px`,
					height : `${navigation.height * scale}px`,
					right : `${navigation.right * scale}px`,
					top : `${navigation.top * scale}px`
				}"
			>
				<div class="welfare" @click="scrollTo('targetLocation')"></div>
				<div class="welfare" @click="scrollTo('newYearCheck')"></div>
				<div class="welfare" @click="scrollTo('rollRoom')"></div>
				<div class="welfare" @click="scrollTo('rollRoom')"></div>
			</div>

			<div 
				class="notice"
				:style="{
					width : `${notice.width * scale}px`,
					height : `${notice.height * scale}px`,
					right : `${notice.right * scale}px`,
					top : `${notice.top * scale}px`
				}"	
				>
				<van-swipe v-if="winnerItem != null" :autoplay="3000" :height="60" vertical style="height: 100%;" :show-indicators="false">
					<van-swipe-item v-for="(item, index) in winnerItem" :key="index">恭喜玩家<p>{{ item.userNickname }}</p>点亮拼图成功获取了<p>{{ item.rewardAmount }}</p>的游戏红包</van-swipe-item>
				</van-swipe>
				<div v-else>
					暂无获奖信息
				</div>
			</div>

			<div class="rule-trigger" 
				@click="rule"
				:style="{
					width : `${triggerRule.width * scale}px`,
					height : `${triggerRule.height * scale}px`,
					right : `${triggerRule.right * scale}px`,
					top : `${triggerRule.top * scale}px`
				}"
			></div>

			<div class="rule-bakc" v-if="showDialog">
				<div class="rule-body" v-if="ruleShow">
					<div class="rule-close" @click="close"></div>
				</div>

				<div class="exchange-body" v-if="exchange">
					<div class="rule-close" @click="close"></div>
					<div class="price">
						<price :currency="exchangePrice" size="38" color="#FFF9C7"></price>
						<p>当前可领游戏币</p>
					</div>
					<div class="btoom-btn">
						<div class="get-right" @click="stickerRewards"></div>
						<div class="cancel" @click="close"></div>
					</div>
				</div>

				<div class="unlock-body" v-if="unlock">
					<div class="rule-close" @click="close"></div>
					<div class="fragment-type">
						<img :src="puzzleType()" alt="">
					</div>
					<div class="btoom-btn">
						<div class="get-right" @click="lightPuzzle"></div>
						<div class="cancel" @click="close"></div>
					</div>
				</div>
			</div>

			<div 
				class="puzzle-warp"
				:style="{
					width : `${puzzle.width * scale}px`,
					height : `${puzzle.height * scale}px`,
					right : `${puzzle.right * scale}px`,
					top : `${puzzle.top * scale}px`
				}"
			>
				<div class="consumption-tips-ji" v-if="fragmentsJiBright == 0">
					点亮该区域，需要消耗“龙年大吉”卡
				</div>
				<div class="consumption-tips-yun" v-if="fragmentsyunBright == 0">
					点亮该区域，需要消耗“好运龙龙”卡
				</div>
				<div class="consumption-tips-fu" v-if="fragmentsfuBright == 0">
					点亮该区域，需要消耗“龙年暴富”卡
				</div>

				<div class="puzzle-ji">
					<div 
						v-for="(item, index) in 6"
						:key="index"
						@click="receiveJi"
						class="puzzle-fragments"
					>
						<img :src="getJiImg(index)" alt="">
					</div>
				</div>

				<div class="puzzle-yun">
					<div 
						v-for="(item, index) in 6"
						:key="index"
						@click="receiveYun"
						class="puzzle-fragments"
					>
						<img :src="getYunImg(index)" alt="">
					</div>
				</div>
				
				<div class="puzzle-fu">
					<div 
						v-for="(item, index) in 6"
						:key="index"
						@click="receiveFu"
						class="puzzle-fragments"
					>
						<img :src="getFuImg(index)" alt="">
					</div>
				</div>
			</div>

			<img 
				class="get-button"
				src="@/assets/pcimg/newYear/getButton.png" alt=""
				@click="exchangeOn"
				:style="{
					width : `${getBtn.width * scale}px`,
					height : `${getBtn.height * scale}px`,
					right : `${getBtn.right * scale}px`,
					top : `${getBtn.top * scale}px`
				}"
			>

			<div 
				class="fragments"
				:style="{
					width : `${fragments.width * scale}px`,
					height : `${fragments.height * scale}px`,
					right : `${fragments.right * scale}px`,
					top : `${fragments.top * scale}px`
				}"
			>
				<div class="fragments-text">
					我的碎片：
				</div>	
				<div class="num-fragments">
					<img src="@/assets/pcimg/newYear/card-ji.png" alt="">
					<div class="quantity" v-if="(fragmentsJi - fragmentsJiBright) > 0">{{ fragmentsJi - fragmentsJiBright }}</div>
				</div>
				<div class="num-fragments">
					<img src="@/assets/pcimg/newYear/card-yun.png" alt="">
					<div class="quantity" v-if="(fragmentsyun - fragmentsyunBright) > 0">{{ fragmentsyun - fragmentsyunBright }}</div>
				</div>
				<div class="num-fragments">
					<img src="@/assets/pcimg/newYear/card-fu.png" alt="">
					<div class="quantity" v-if="(fragmentsfu - fragmentsfuBright) > 0">{{ fragmentsfu - fragmentsfuBright }}</div>
				</div>
			</div>

			<div 
				id="targetLocation"
				:style="{
					width : `${puzzleWelfare.width * scale}px`,
					height : `${puzzleWelfare.height * scale}px`,
					right : `${puzzleWelfare.right * scale}px`,
					top : `${puzzleWelfare.top * scale}px`
				}"
			></div>
			<div 
				id="newYearCheck"
				:style="{
					width : `${newYearCheck.width * scale}px`,
					height : `${newYearCheck.height * scale}px`,
					right : `${newYearCheck.right * scale}px`,
					top : `${newYearCheck.top * scale}px`
				}"
			></div>
			<div 
				id="rollRoom"
				:style="{
					width : `${rollRoom.width * scale}px`,
					height : `${rollRoom.height * scale}px`,
					right : `${rollRoom.right * scale}px`,
					top : `${rollRoom.top * scale}px`
				}"
			></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$border : none;//1px solid red;
%button
{
	position: absolute;
	border: $border;
	background: rgba( 255, 255, 255, .01 );
	box-sizing: border-box
}
%div
{
	@extend %button;
	width: 113px;
	height: 46px;
	left: 274px;
}
#pc-NewYear {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background: #a92c19;
	#pc-body-back{
		max-width: 1990px;
		width: 100%;
		max-height: 4800px;
		background: url("@/assets/pcimg/newYear/pc-bg.jpg");
		background-size: contain;
		position: relative;
		.close{
			width: 80px;
			height: 80px;
			// border: 1px solid #fff;
			position: absolute;
			right: 25px;
			top: 20px;
		}
		.navigation-bar{
			display: flex;
			gap: 4%;
			position: absolute;
			// border: 1px solid #fff;
			.welfare{
				width: 22.5%;
				height: 100%;
				// border: 1px solid red;
			}
		}
		.notice{
			position: absolute;
			// border: 1px solid #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #333333;
			font-size: 18px;
			.van-swipe-item{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 18px;
				color: #333333;
				p{
					color: #b7181b;
					margin: 0 5px;
				}
			}
		}
		.rule-trigger{
			
			// height: 270px;
			position: absolute;
			// border: 1px solid #fff;
			// top: 1410px;
			// right: 152px;
		}
		.rule-bakc{
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
			.rule-body{
				position: relative;
				width: 1200px;
				height: 530px;
				background: url("@/assets/pcimg/newYear/ruleBody.png")center no-repeat;
				background-size: 100% 100%;
				.rule-close{
					position: absolute;
					right: 25px;
					top: 25px;
					width: 50px;
					height: 50px;
					// border: 1px solid #fff;
				}
			}
			.exchange-body{
				position: relative;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				width: 1280px;
				padding: 220px 0 0;
				box-sizing: border-box;
				height: 530px;
				background: url("@/assets/pcimg/newYear/exchange.png")center no-repeat;
				background-size: 100% 100%;
				.rule-close{
					display: flex;
					position: absolute;
					right: 20px;
					top: 25px;
					width: 50px;
					height: 50px;
					// border: 1px solid #fff;
				}
				.price{
					display: flex;
					flex-direction: column; /* 子元素垂直排列 */
					// height: 100px;
					align-items: center;
					margin-right: 70px;
					p{
						color: #FFEEB9;
						font-size: 20px;
					}
				}
				.btoom-btn{
					display: flex;
					height: 110px;
					width: 100%;
					// align-items: center;
					justify-content: center;
					// border: 1px solid #fff;
					padding-right: 52px;
					gap: 23px;
					.get-right{
						width: 280px;
						height: 80px;
						// border: 1px solid red;
					}
					.cancel{
						width: 280px;
						height: 80px;
						// border: 1px solid red;
					}
				}
			}
			.unlock-body{
				position: relative;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				width: 1544px;
				padding: 282px 0 0;
				box-sizing: border-box;
				height: 704px;
				background: url("@/assets/pcimg/newYear/unlock.png")center no-repeat;
				background-size: 100% 100%;
				.rule-close{
					display: flex;
					position: absolute;
					right: 165px;
					top: 75px;
					width: 50px;
					height: 50px;
					// border: 1px solid #fff;
				}
				.fragment-type{
					width: 64px;
					height: 62px;
					// border: 1px solid #fff;
					margin-right: 5px;
					img{
						width: 100%;
						width: 100%;
					}
				}
				.btoom-btn{
					display: flex;
					height: 240px;
					width: 100%;
					// align-items: center;
					justify-content: center;
					// border: 1px solid #fff;
					padding-right: 52px;
					gap: 23px;
					.get-right{
						width: 280px;
						height: 80px;
						// border: 1px solid red;
					}
					.cancel{
						width: 280px;
						height: 80px;
						// border: 1px solid red;
					}
				}
			}
		}
		.puzzle-warp{
			display: flex;
			position: absolute;
			// border: 1px solid red;
			.consumption-tips-ji{
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				bottom: 0px;
				width: 33%;
				height: 7%;
				background-color: rgba(38, 38, 38, 0.8);
				color: #f8c082;
				font-size: 16px;
			}
			.consumption-tips-yun{
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				left: 33.5%;
				bottom: 0px;
				width: 33%;
				height: 7%;
				background-color: rgba(38, 38, 38, 0.8);
				color: #f8c082;
				font-size: 16px;
			}
			.consumption-tips-fu{
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				right: 0%;
				bottom: 0px;
				width: 33%;
				height: 7%;
				background-color: rgba(38, 38, 38, 0.8);
				color: #f8c082;
				font-size: 16px;
			}
			.puzzle-ji{
				display: flex;
				flex-wrap: wrap;
				width: 33.33%;
				height: 100%;
				.puzzle-fragments{
					width: 50%;
					height: 33.33%;					
					img{
						width: 100%;
						height: 100%;
						// filter: grayscale(100%);
					}
				}
			}
			.puzzle-yun{
				display: flex;
				flex-wrap: wrap;
				width: 33.33%;
				height: 100%;
				.puzzle-fragments{
					width: 50%;
					height: 33.33%;					
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
			.puzzle-fu{
				display: flex;
				flex-wrap: wrap;
				width: 33.33%;
				height: 100%;
				.puzzle-fragments{
					width: 50%;
					height: 33.33%;					
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.get-button{
			position: absolute;
		}
		.fragments{
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			gap: 20px;
			.fragments-text{
				display: flex;
				align-items: center;
				justify-content: center;
				color: #7D3C02;
				font-size: 16px;
			}
			.num-fragments{
				display: flex;
				position: relative;
				.quantity{
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					font-size: 14px;
					color: #f8c082;
					top: -13px;
					right: -13px;
					width: 30px;
					height: 30px;
					border-radius: 42px;
					background: #E2190C;
				}
			}
		}
		#targetLocation{
			position: absolute;
		}
		#newYearCheck{
			position: absolute;
		}
		#rollRoom{
			position: absolute;
		}
	}
}
</style>