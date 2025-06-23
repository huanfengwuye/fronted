<script lang="ts">
import { Component } from 'vue-facing-decorator'
import Replacement from '@/scripts/pages/replacement/replacement'

@Component
export default class H5Replacement extends Replacement {
[x: string]: any;
}
</script>
<template>
	<div id="replacement-h5">

		<TopTitleBack :handler="showHelper" :title="t('replacement.title')"></TopTitleBack>

		<div class="replacement-body">

			<div class="title-top">
				<div class="title-text">
					{{ t( 'replacement.jewelryProcess' ) }}
				</div>
				<div class="rule">
					<div class="simple-rule">
						<div class="round">1</div>	
						<p>{{ t( 'replacement.ruleSimple1' ) }}</p>
					</div>
					<div class="simple-rule">
						<div class="round">2</div>	
						<p>{{ t( 'replacement.ruleSimple2' ) }}</p>
					</div>
					<div class="simple-rule">
						<div class="round">3</div>	
						<p>{{ t( 'replacement.ruleSimple3' ) }}</p>
					</div>
				</div>
			</div>

			<div class="top-my" id="bottom">

				<div class="my-top">
					<div class="left-title">
						<p>{{ t( 'replacement.myJewelry' ) }}</p>
						<Icon class="icon" :class="{active:sortList}" @click="sort" name="sort" color="#FFF" size="20"></Icon>
					</div>
					<div class="right-select-all">
						<span>{{ t( 'replacement.totalValue' ) }}{{ priceList.toFixed(2) }}</span>

						<div class="select-btn" @click="onAllChooseChange">
							<p v-if="!selectAll">{{ t( 'replacement.selectAll' ) }}</p>
							<p v-else>{{ t( 'replacement.cancelSelection' ) }}</p>
						</div>

						<div class="select-btn" :class="{active:selectList.length < 3}" @click="exchangeThing">
							<p>提交</p>
						</div>

					</div>
				</div>

				<List
					:loading="loading"
					:finished="finished"
					:on-load="onLoad"
					:offset="600"
					id="list-a"
					parent="#bottom"
					class="good-top"
				>					
						<div class="good-item"  v-for="(item, index) in goodsList" :key="index" :class="{ 'active': item.choose }" @click="chooseItem(item)">
					 	<Price :currency="item.price" size="12" color="#7BDCA2"></Price>
						<div v-if="item.choose" class="yes"></div>
						<div class="pic">
							<img :src="item.iconUrl" alt="" />
							</div>
							<img class="pic-bg" :src="getImageBg(item.goodsLevel)">
							<p>{{ getGoodsNamePre(item.goodsName) }}</p>
							<span>{{ getGoodsNameSec(item.goodsName, 1) }}</span>
					</div>
				</List>

				<div v-if="goodsList.length == 0" class="inventory" @click="router.push( '/m/home' )"></div>

			</div>

			<div class="bottom-btn" :class="{active:exchangeItem.length != 0}" @click="confirmExtraction">
				<Icon v-if="false" name="replacement" color="#8E8E8E" size="25"></Icon>
				<Icon v-if="true" name="replacement" color="#FFFFFF" size="25"></Icon>
				<p>{{ t( 'replacement.confirmUpgrade' ) }}</p>
			</div>

			<div class="replacement-middle">
				<div class="left-exchange" id="left" v-if="exchangeItem.length == 0">
					<div class="body-top">
						<p>{{ t( 'replacement.redeemableAccessories' ) }}</p>
						<!-- <div class="search-wrap">
							<input type="text" v-model="selectName" :placeholder="t( 'mall.searchText' )" />
							<div class="search-btn" @click="exchangeThing()">
								<svg class="icon-search">
									<use
										xlink:href="@/assets/fonts/icon.svg#search"
										ng-href="@/assets/fonts/icon.svg#search"
									></use>
								</svg>
							</div>
						</div> -->
					</div>
					<div v-if="exchangeList.length == 0"  class="unselected">
						<img src="@/assets/pcimg/replacement/gun.png" alt="">
						<span>选中3-9件饰品进行置换</span>
					</div>
					<List
						:loading="goodLoading"
						:finished="goodFinished"
						:on-load="onExLoad"
						:offset="400"
						id="list-b"
						parent="#left"
						class="good-lists"
					>
						<div class="good-item" v-for="(item, index) in exchangeList" :key="index" @click="chooseExchange(item)">
							<Price size="12" :currency="item.price" color="#7BDCA2"></Price>
							<div class="pic">
								<img :src="item.iconUrl" alt="" />
							</div>
							<img class="pic-bg" :src="getImageBg(item.goodsLevel)">
							<p>{{ getGoodsNamePre(item.goodsName) }}</p>
							<span>{{ getGoodsNameSec(item.goodsName, 1) }}</span>
						</div>
					</List>
				</div>

				<div class="right-selected" v-if="exchangeItem.length != 0" :class="{active:false}">

					<div class="body-top">
						<p>{{ t( 'replacement.selectJewelry' ) }}</p>
						<div class="top-title">
							<div class="select-btn" @click="close">
								<p>返回</p>
							</div>
							<span>{{ t( 'replacement.totalValue' ) }}{{ totalItemsValue.toFixed(2) }}</span>
						</div>

					</div>

					<div class="good-lists">

						<div class="good-item">
							<Price size="12" :currency="exchangeItem.price" color="#7BDCA2"></Price>
							<div class="pic">
								<img :src="exchangeItem.iconUrl" alt="" />
							</div>
							<img class="pic-bg" :src="getImageBg(exchangeItem.goodsLevel)">
							<p>{{ getGoodsNamePre(exchangeItem.goodsName) }}</p>
							<span>{{ getGoodsNameSec(exchangeItem.goodsName, 1) }}</span>
						</div>

						<div class="good-item">
							<Price size="12" :currency="exchangeItem.tokenPrice" color="#7BDCA2"></Price>
							<div class="pic">
								<img src="@/assets/romimg/common/fudai.png" alt="">
							</div>
							<img class="pic-bg" :src="getImageBg(6)">
							<p>福袋</p>
						</div>

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
				<div class="price-back">
					<Price
						size="17"
						color="#7EF2AD"
						:currency="exchangeItem.price"
					></Price>
				</div>
				<div class="bg" :class="[ `level-${exchangeItem.goodsLevel}` ]"></div>
				<div class="prize-item-back" >
					<div class="prize-item-pic">
						<img :src="exchangeItem.iconUrl" alt="">
					</div>
				</div>
				<div class="item-info">
					<p class="item-info1 ">{{ exchangeItem.goodsName }}</p>
					<!-- <p class="item-info2">{{ getGoodsNameSec(exchangeItem.rewardGoodsName) }}</p> -->
				</div>
				<div class="opt-wrap">
					<!-- <div class="btn-recovery" @click="onSellOne">{{ '炼化' }}&nbsp;&nbsp;

					</div> -->
					<div class="btn-return" @click="closure">{{ t( 'openbox.putInBag' ) }}</div>
				</div>
			</div>
		</div>

		<ShowDialog
			:btn-type="-1"
			:title="t('replacement.title')"
			:show="detailScreenShow"
			@ok="detailScreenShow = false"
			@cancel="detailScreenShow = false"
		>
			<div class="dialog-x-content">
				<div class="dialog-row-wrap">
					{{ t( 'replacement.rule1' ) }}
				</div>
				<div class="dialog-row-wrap">
					{{ t( 'replacement.rule2' ) }}
				</div>
				<div class="dialog-row-wrap">
					{{ t( 'replacement.rule3' ) }}
				</div>
				<div class="dialog-row-wrap">
					{{ t( 'replacement.rule4' ) }}
				</div>
				<div class="dialog-row-wrap">
					{{ t( 'replacement.rule5' ) }}
				</div>
				<div class="dialog-row-wrap">
					{{ t( 'replacement.rule6' ) }}
				</div>
			</div>
		</ShowDialog>
	</div>
</template>

<style lang="scss" scoped>
#replacement-h5 {
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
	
	.replacement-body{
		width: 100%;
		display: flex;
		flex-direction: column; /* 子元素垂直排列 */

		.title-top{
			background: url("@/assets/pcimg/replacement/replacement-bg.png") no-repeat;
			background-size: cover;
			padding: 40px 0px 62px 0px;
			display: flex;
			flex-direction: column; /* 子元素垂直排列 */
			gap: 40px;
			.title-text{
				color: #FFF;
				font-size: 30px;
				text-align: center;
			}
			.rule{
				display: flex;
				// align-items: center;
				justify-content: center;
				flex-direction: column; /* 子元素垂直排列 */
				gap: 10px;
				.simple-rule{
					display: flex;
					align-items: center;
					justify-items: center;
					gap: 20px;
					padding-left: 30px;
					p{
						color: #D3D3D3;
						font-family: "Microsoft YaHei";
						font-size: 24px;
						font-style: normal;
						font-weight: 400;
						line-height: normal;
					}
					.round{
						display: flex;
						align-items: center;
						justify-content: center;
						color: #FFF;
						width: 36px;
						height: 36px;
						background: #3A34B0;
						border-radius: 50%;
						text-align: center;
						font-size: 18px;
					}
				}
			}
		}
		.bottom-btn{
			margin: auto;
			margin-bottom: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			right: 135px;
			bottom: 50px;
			width: 700px;
			height: 128px;
			border-radius: 4px;
			background: #181A31;
			border: 2px solid #2F3048;
			P{
				color: #8E8E8E;
				text-align: center;
				font-family: "Microsoft YaHei";
				font-size: 32px;
				font-style: normal;
				font-weight: 700;
				line-height: normal;
			}
			&.active{
				background: #4B58C9;
				P{
					color: #fff;
					text-align: center;
					font-family: "Microsoft YaHei";
					font-size: 32px;
					font-style: normal;
					font-weight: 700;
					line-height: normal;
				}
			}
		}
		.replacement-middle{
			height: 788px;
			display: flex;
			justify-content: center;
			gap: 50px;
			.left-exchange{
				position: relative;
				padding: 18px 0px;
				border-radius: 8px;
				box-sizing: border-box;
				width: 100%;
				max-width: 700px;
				height: 800px;
				background: url("@/assets/pcimg/replacement/right-bg.png");
				background-size: cover;
				.unselected{
					display: flex;
					justify-content: center; /* 水平方向居中对齐 */
					align-items: center; /* 垂直方向居中对齐 */
					// justify-content: space-between; /* 子元素均匀分布，第一个元素在起始位置，最后一个元素在结束位置 */
					flex-direction: column; /* 子元素垂直排列 */
					gap: 2px;
					position: absolute;
					cursor: pointer;
					position: absolute;
					top: 282px;
					right: 164px;
					width: 372px;
					height: 266px;
					img{
						width: 240px;
						height: 120px;
						margin-bottom: 16px;
					}
					p{
						color: #FFF;
						text-align: center;
						font-family: "Microsoft YaHei";
						font-size: 24px;
						font-style: normal;
						font-weight: 700;
						line-height: normal;
					}
					span{
						color: #C3C3C4;
						text-align: center;
						font-family: "Microsoft YaHei";
						font-size: 24px;
						font-style: normal;
						font-weight: 400;
						line-height: normal;
					}
				}
			}
			.right-selected{
				position: relative;
				padding: 18px 0px 0px 0px;
				box-sizing: border-box;
				border-radius: 8px;
				width: 100%;
				max-width: 700px;
				height: 100%;
				background: url("@/assets/pcimg/replacement/right-bg.png");
				background-size: cover;
				&.active{
					border: 1px solid rgba(75, 88, 201, 0.60);
					box-shadow: 0px 0px 30px 0px rgba(75, 88, 201, 0.80);
				}
				.unselected{
					display: flex;
					justify-content: center; /* 水平方向居中对齐 */
					align-items: center; /* 垂直方向居中对齐 */
					// justify-content: space-between; /* 子元素均匀分布，第一个元素在起始位置，最后一个元素在结束位置 */
					flex-direction: column; /* 子元素垂直排列 */
					gap: 2px;
					right: 180px;
					bottom: 320px;
					position: absolute;
					width: 310px;
					height: 191px;
					img{
						width: 240px;
						height: 120px;
					}
					p{
						color: #FFF;
						text-align: center;
						font-family: "Microsoft YaHei";
						font-size: 16px;
						font-style: normal;
						font-weight: 700;
						line-height: normal;
					}
					span{
						color: #C3C3C4;
						text-align: center;
						font-family: "Microsoft YaHei";
						font-size: 12px;
						font-style: normal;
						font-weight: 400;
						line-height: normal;
					}
				}
			}

			.good-lists{
				width: 100%;
				display: grid;
				grid-template-columns: repeat(auto-fill, 319px);
				grid-template-rows: repeat(auto-fill, 372px);
				column-gap: 12px;
				row-gap: 12px;
				padding: 25px;
				box-sizing: border-box;
				// height: 550px;
				height: calc( 100% - 150px );
				overflow-y: scroll;
				.good-item{
					position: relative;
					z-index: 1;
					padding: 20px 0 16px 0;
					box-sizing: border-box;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column; /* 子元素垂直排列 */
					width: 320px;
					height: 372px;
					background: #15172C;
					&.active{
						border: 2px solid #444C8C;
					}
					.img-bg{
						width: 122px;
						height: 122px;
					}
					.pic-bg{
						width: 270px;
						height: 270px;
						position: absolute;
						display: flex;
						z-index: 0;
					}
					.pic{
						display: flex;
						z-index: 1;
						align-items: center;
						justify-content: center;
						width: 200px;
						height: 200px;
						margin: 5px 0 15px 0;
						img{
							width: 162px;
						}
					}
					p{
						color: #8F9096;
						font-family: "Microsoft YaHei";
						font-size: 24px;
						font-style: normal;
						font-weight: 400;
						line-height: 15.6px; /* 130% */
						margin-bottom: 20px;
					}
					span{
						color: #FFF;
						font-family: "Microsoft YaHei";
						font-size: 24px;
						font-style: normal;
						font-weight: 400;
						line-height: 15.6px; /* 130% */
					}
				}
			}

			.body-top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 40px 0 88px 0;
				padding: 0 20px;
				.top-title{
					display: flex;
					align-items: center;
					gap: 20px;
				}
				p{
					font-size: 24px;
					font-weight: 700;
					color: #FFF;
				}
				span{
					color: #BFBFBF;
					text-align: center;
					font-family: "Microsoft YaHei";
					font-size: 24px;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					text-transform: uppercase;
				}
				.search-wrap {
					display: flex;
					align-items: center;
					width: 400px;
					height: 84px;
					border-radius: 4px;
					background: #212340;
					box-sizing: border-box;
					padding-left: 28px;
					padding-right: 15px;
					position: relative;

					input {
						box-sizing: border-box;
						flex: 1;
						border: none;
						background: none;
						color: #fff;
						font-size:26px;

						&::placeholder {
							color: #878b91;
						}
					}

					.search-btn {
						display: flex;
						align-items: center;
						justify-content: center;
						position: relative;
						width: 40px;
						height: 40px;
						cursor: pointer;

						.icon-search {
							display: inline-block;
							vertical-align: middle;
							fill: currentColor;
							width: 20px;
							height: 20px;
							color: #9c9eac;
							position: relative;
						}
					}
				}
			}
		}

		.good-top{
			width: 100%;
			display: grid;
			grid-template-columns: repeat(auto-fill, 322px);
			grid-template-rows: repeat(auto-fill, 372px);
			column-gap: 12px;
			row-gap: 12px;
			padding: 20px;
			box-sizing: border-box;
			// height: 550px;
			height: calc( 100% - 50px );
			overflow-y: scroll;
			.good-item{
				position: relative;
				padding: 20px 0 16px 0;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column; /* 子元素垂直排列 */
				width: 324px;
				height: 372px;
				background: #15172C;
				overflow: hidden;
				.yes{
					position: absolute;
					top: -3px;
					left: -3px;
					width: 44px;
					height: 44px;
					background: url("@/assets/pcimg/replacement/h5-yes.png");
					background-size: 100% 100%;
					z-index: 10;
					z-index: 10;
				}
				&.active{
					border: 2px solid #444C8C;
				}
				.pic-bg{
					width: 100%;
					// height: 270px;
					position: absolute;
					display: flex;
					z-index: 0;
				}
				.img-bg{
					width: 122px;
					height: 122px;
					z-index: 10;
				}
				.pic{
					z-index: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 200px;
					height: 200px;
					margin: 5px 0 15px 0;
					z-index: 10;
					// background-size: cover;
					img{
						width: 162px;
					}
				}
				p{
					color: #8F9096;
					font-family: "Microsoft YaHei";
					font-size: 24px;
					font-style: normal;
					font-weight: 400;
					line-height: 15.6px; /* 130% */
					margin-bottom: 20px;
					box-sizing: border-box;
					z-index: 10;
				}
				span{
					color: #FFF;
					font-family: "Microsoft YaHei";
					font-size: 24px;
					font-style: normal;
					font-weight: 400;
					z-index: 10;
					line-height: 15.6px; /* 130% */
				}
			}
		}

		.select-btn{
			display: flex;
			width: 148px;
			height: 62px;
			max-width: 276px;
			padding: 2px 25px;
			box-sizing: border-box;
			justify-content: center;
			align-items: center;
			border-radius: 4px;
			background: #3A34B0;
			&.active{
				background: #181A31;
			}
			p{
				color: #FFF;
				text-align: center;
				font-family: "Microsoft YaHei";
				font-size: 24px;
				font-style: normal;
				font-weight: 700;
				line-height: 21px; /* 150% */
			}
		}


		.top-my{
			display: flex;
			flex-direction: column; /* 子元素垂直排列 */
			box-sizing: border-box;
			position: relative;
			margin: auto;
			margin-top: 30px;
			margin-bottom: 30px;
			width: 95%;
			max-width: 700px;
			height: 800px;
			border-radius: 4px;
			border: 1px solid #28283B;
			background: #10101E;
			.my-top{
				position: relative;
				padding: 0 15px;
				width: 100%;
				height: 172px;
				background: linear-gradient(180deg, #15172C 0%, #0D0E1C 68.29%);
				display: flex;
				box-sizing: border-box;
				justify-content: space-between;
				align-items: center;
				background: url("@/assets/pcimg/replacement/right-bg.png");
				background-size: cover;
				.left-title{
					display: flex;
					gap: 10px;
					p{
						color: #FBFFFE;
						font-weight: 700;
						font-size: 24px;
					}
				}
				.icon{
					&.active{
						transform: rotateX(180deg);
					}
				}
				.right-select-all{
					display: flex;
					align-items: center;
					gap: 20px;
					span{
						color: #7BDCA2;
						font-weight: 700;
						font-size: 24px;
					}

				}
			}
			.inventory{
				cursor: pointer;
				position: absolute;
				top: 282px;
				right: 164px;
				width: 372px;
				height: 266px;
				background: url("@/assets/pcimg/replacement/zeroInventory-h5.png");
				background-size: cover;
			}
			.extract{
				z-index: 2;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: absolute;
				width: 100%;
				bottom: 0px;
				right: 0px;
				height: 145px;
				background: rgba(0, 0, 0, 0.60);
				.extract-btn{
					z-index: 2;
					display: flex;
					width: 240px;
					height: 74px;
					padding: 28px 0px;
					box-sizing: border-box;
					justify-content: center;
					align-items: center;
					gap: 10px;
					border-radius: 4px;
					background: #4B58C9;
					color: #FFF;
					text-align: center;
					font-family: "Microsoft YaHei";
					font-size: 26px;
					font-style: normal;
					font-weight: 700;
					line-height: normal;
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
}
</style>