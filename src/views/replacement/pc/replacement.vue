<script lang="ts">
import { Component } from 'vue-facing-decorator'
import Replacement from '@/scripts/pages/replacement/replacement'

@Component
export default class PCReplacement extends Replacement {}
</script>
<template>
	<div id="replacement-pc">
		<div class="top-tile">
			<div class="tile-left">
				<Icon name="replacement" color="#7349CA" size="28"></Icon>
				{{ t( 'replacement.title' ) }}
			</div>
			<div class="tile-right" @click="onClickHelp">
			</div>
		</div>

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

			<div class="replacement-middle">
				<div class="left-exchange" id="leftExchange">
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

					<div v-if="exchangeList.length == 0" class="unselected">
						<img src="@/assets/pcimg/replacement/gun.png" alt="">
						<span>选中3-9件饰品进行置换</span>
					</div>
					
					<List
						:loading="goodLoading"
						:finished="goodFinished"
						:on-load="onExLoad"
						:offset="800"
						id="list-a"
						parent="#leftExchange"
						class="good-list"
					>
						<div class="good-item" v-for="(item, index) in exchangeList" :key="index" :class="{ active: item.choose }" @click="chooseExchange(item)">
							<Price :currency="item.price" color="#7BDCA2"></Price>
							<div class="pic">
								<img :src="item.iconUrl" alt="" />
							</div>
							<div v-if="item.choose" class="yes"></div>
							<img class="pic-bg" :src="getImageBg(item.goodsLevel)">
							<p>{{ getGoodsNamePre(item.goodsName) }}{{ selectList.length }}</p>
							<span>{{ getGoodsNameSec(item.goodsName, 1) }}</span>
						</div>
					</List>
				</div>
				<div class="right-selected" :class="{active:exchangeItem.length != 0}">

					<div class="body-top">
						<p>{{ t( 'replacement.selectJewelry' ) }}</p>
						<span>{{ t( 'replacement.totalValue' ) }}{{ totalItemsValue.toFixed(2) }}</span>
					</div>

					<div v-if="exchangeItem.length == 0" class="unselected">
						<img src="@/assets/pcimg/replacement/gun.png" alt="">
						<p>暂无选中饰品</p>
						<span>最低金额不得低于1币</span>
					</div>
					
					<div class="bottom-btn" :class="{active:exchangeItem.length != 0}" @click="confirmExtraction">
						<Icon v-if="false" name="replacement" color="#8E8E8E" size="25"></Icon>
						<Icon v-if="true" name="replacement" color="#FFFFFF" size="25"></Icon>
						<p>{{ t( 'replacement.confirmUpgrade' ) }}</p>
					</div>

					<div class="good-list" v-if="exchangeItem.length != 0">

						<div class="good-item">
							<Price :currency="exchangeItem.price" color="#7BDCA2"></Price>
							<div class="pic">
								<img :src="exchangeItem.iconUrl" alt="" />
							</div>
							<img class="pic-bg" :src="getImageBg(exchangeItem.goodsLevel)">
							<p>{{ getGoodsNamePre(exchangeItem.goodsName) }}</p>
							<span>{{ getGoodsNameSec(exchangeItem.goodsName, 1) }}</span>
						</div>

						<div class="good-item">
							<Price :currency="exchangeItem.tokenPrice" color="#7BDCA2"></Price>
							<div class="pic">
								<img src="@/assets/romimg/common/fudai.png" alt="">
							</div>
							<img class="pic-bg" :src="getImageBg(6)">
							<p>福袋</p>
							<!-- <span>{{ getGoodsNameSec(exchangeItem.goodsName, 1) }}</span> -->
						</div>
					</div>

				</div>
			</div>

			<div class="bottom-my" id="bottomMy">

				<div class="my-top">
					<div class="left-title">
						<Icon name="user-line" color="#FFF" size="18"></Icon>
						<p>{{ t( 'replacement.myJewelry' ) }}</p>
						<Icon class="icon" :class="{active:sortList}" @click="sort" name="sort" color="#FFF" size="24"></Icon>
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
						id="list-b"
						parent="#bottomMy"
						class="good-lists"
						v-if="goodsList.length != 0"
					>
							<div  
								class="good-item" 
								v-for="(item, index) in goodsList" 
								:key="index" :class="{ 'active': item.choose }" 
								@click="chooseItem(item)"
								v-show="item.goodsType != 2"
							>
								<Price :currency="item.price" color="#7BDCA2"></Price>
								<div v-if="item.choose" class="yes"></div>
								<div class="pic">
									<img :src="item.iconUrl" alt="" />
								</div>
								<img class="pic-bg" :src="getImageBg(item.goodsLevel)">
								<p>{{ getGoodsNamePre(item.goodsName) }}</p>
								<span>{{ getGoodsNameSec(item.goodsName, 1) }}</span>
							</div>
				</List>

				<div v-if="goodsList.length == 0" class="inventory" @click="$router.push( '/p/home' )">
					<div class="open-box" ></div>
				</div>

				<!-- <div class="extract"  v-if="selectList.length >= 3">
					<div @click="exchangeThing" class="extract-btn">
						<Icon name="extract" color="#FFFFFF" size="26"></Icon>
						提交选择
					</div>
				</div> -->

			</div>
		</div>

		<div class="receive-bg" v-if="receiveShow">
			<div class="receive-body">
				<div class="close" @click="receiveShow = false"></div>
				<div class="receive-top">
					获得物品
				</div>
				<div class="bg" :class="[ `level-${exchangeItem.goodsLevel}` ]"></div>
				<div class="prize-item-back">
					<div class="prize-item-pic" :style="'background-image: url(' + getImageBg2(exchangeItem.goodsLevel) + ');'">
						<img :src="exchangeItem.iconUrl" alt="">
					</div>
				</div>
				<div class="item-info">
					<p>{{ getGoodsNamePre(exchangeItem.goodsName) }}</p>
					<span>{{ getGoodsNameSec(exchangeItem.goodsName, 1) }}</span>
				</div>
				<div class="opt-wrap">
					<!-- <div class="btn-recovery" @click="onSellOne">{{ '炼化' }}&nbsp;&nbsp;
						<Price
							size="17"
							fontWeight="700"
							:currency="exchangeItem.price"
						></Price>
					</div> -->
					<div class="btn-return" @click="closure">{{ t( 'openbox.putInBag' ) }}</div>
				</div>
			</div>
		</div>

	</div>
</template>

<style lang="scss" scoped>
#replacement-pc {
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

			p {
				color: #EFF0F5;
				text-align: center;
				font-size: 18px;
				font-style: normal;
				font-weight: 500;
				line-height: 21.6px;
			}

			span {
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
	
	.replacement-body{
		width: 100%;
		background: url("@/assets/pcimg/replacement/replacement-bg.png") no-repeat;
		// display: flex;
		// justify-content: center; /* 水平方向居中对齐 */
		// align-items: center; /* 垂直方向居中对齐 */
		// justify-content: space-between; /* 子元素均匀分布，第一个元素在起始位置，最后一个元素在结束位置 */
		// flex-direction: column; /* 子元素垂直排列 */
		.title-top{
			padding: 53px 0 48px 0 ;
			gap: 20px;
			.title-text{
				color: #FFF;
				font-size: 30px;
				text-align: center;
			}
			.rule{
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 55px;
				.simple-rule{
					display: flex;
					align-items: center;
					justify-items: center;
					gap: 20px;
					p{
						color: #D3D3D3;
						font-family: "Microsoft YaHei";
						font-size: 14px;
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
		.replacement-middle{
			height: 600px;
			display: flex;
			justify-content: center;
			gap: 50px;
			.left-exchange{
				position: relative;
				padding: 18px 20px;
				box-sizing: border-box;
				width: 100%;
				max-width: 670px;
				height: 100%;
				background: url("@/assets/pcimg/replacement/left-bg.png");
			}
			.unselected{
					display: flex;
					justify-content: center; /* 水平方向居中对齐 */
					align-items: center; /* 垂直方向居中对齐 */
					// justify-content: space-between; /* 子元素均匀分布，第一个元素在起始位置，最后一个元素在结束位置 */
					flex-direction: column; /* 子元素垂直排列 */
					gap: 2px;
					right: 180px;
					bottom: 220px;
					position: absolute;
					width: 310px;
					height: 191px;
					img{
						width: 240px;
						height: 120px;
						margin-bottom: 8px;
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
			.right-selected{
				position: relative;
				padding: 18px 20px 160px 20px;
				box-sizing: border-box;
				width: 100%;
				max-width: 670px;
				height: 100%;
				background: url("@/assets/pcimg/replacement/right-bg.png");
				&.active{
					border: 1px solid rgba(75, 88, 201, 0.60);
					box-shadow: 0px 0px 30px 0px rgba(75, 88, 201, 0.80);
				}

				.bottom-btn{
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 10px;
					position: absolute;
					right: 135px;
					bottom: 50px;
					width: 360px;
					height: 80px;
					border-radius: 4px;
					background: #181A31;
					P{
						color: #8E8E8E;
						text-align: center;
						font-family: "Microsoft YaHei";
						font-size: 22px;
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
							font-size: 22px;
							font-style: normal;
							font-weight: 700;
							line-height: normal;
						}
					}
				}
			}

			.good-list{
				width: 100%;
				display: grid;
				grid-template-columns: repeat(auto-fill, 200px);
				grid-template-rows: repeat(auto-fill, 230px);
				column-gap: 12px;
				row-gap: 12px;
				// padding: 15px;
				box-sizing: border-box;
				// height: 550px;
				height: calc( 100% - 50px );
				overflow-y: scroll;
				.good-item{
					padding: 20px 0 16px 0;
					box-sizing: border-box;
					display: flex;
					position: relative;
					justify-content: center;
					align-items: center;
					flex-direction: column; /* 子元素垂直排列 */
					width: 200px;
					height: 230px;
					background: #15172C;

					.img-bg{
						width: 122px;
						height: 122px;
					}
					.pic{
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 122px;
						height: 122px;
						// margin: 5px 0 15px 0;
						z-index: 2;
						img{
							width: 100px;
							// height: 75px;
						}
					}
					&.active{
						border: 1px solid #444C8C;
					}
					.yes{
						position: absolute;
						top: 0px;
						left: 0px;
						width: 22px;
						height: 22px;
						background: url("@/assets/pcimg/replacement/yes.png");
						background-size: 100% 100%;
					}
					.pic-bg{
						width: 182px;
						height: 182px;
						position: absolute;
						display: flex;
						z-index: 0;
					}
					p{
						color: #8F9096;
						font-family: "Microsoft YaHei";
						font-size: 12px;
						font-style: normal;
						font-weight: 400;
						line-height: 15.6px; /* 130% */
						margin-bottom: 2px;
					}
					span{
						color: #FFF;
						font-family: "Microsoft YaHei";
						font-size: 12px;
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
				margin-bottom: 15px;
				p{
					font-size: 18px;
					font-weight: 700;
					color: #FFF;
				}
				span{
					color: #BFBFBF;
					text-align: center;
					font-family: "Microsoft YaHei";
					font-size: 14px;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					text-transform: uppercase;
				}
				.search-wrap {
					display: flex;
					align-items: center;
					width: 300px;
					height: 42px;
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
						font-size: 16px;

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

		.good-lists{
			width: 100%;
			display: grid;
			grid-template-columns: repeat(auto-fill, 215px);
			grid-template-rows: repeat(auto-fill, 250px);
			column-gap: 12px;
			row-gap: 12px;
			// padding: 15px;
			padding: 0px 15px;
			box-sizing: border-box;
			// height: 550px;
			height: calc( 100% - 100px );
			overflow-y: scroll;
			.good-item{
				padding: 20px 0 16px 0;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column; /* 子元素垂直排列 */
				width: 220px;
				height: 250px;
				background: #15172C;
				position: relative;
				cursor: pointer;
				overflow: hidden;
				&.active{
					border: 1px solid #444C8C;
				}
				.yes{
					position: absolute;
					top: 0px;
					left: 0px;
					width: 22px;
					height: 22px;
					background: url("@/assets/pcimg/replacement/yes.png");
					background-size: 100% 100%;
					z-index: 10;
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
					width: 122px;
					height: 122px;
					margin: 5px 0 15px 0;
					img{
						width: 100px;
					}
				}
				.pic-bg{
					// width: 182px;
					width: 100%;
					// height: 182px;
					position: absolute;
					display: flex;
					z-index: 0;
				}
				p{
					color: #8F9096;
					font-family: "Microsoft YaHei";
					font-size: 12px;
					font-style: normal;
					font-weight: 400;
					line-height: 15.6px; /* 130% */
					margin-bottom: 2px;
					z-index: 10;
				}
				span{
					color: #FFF;
					font-family: "Microsoft YaHei";
					font-size: 12px;
					font-style: normal;
					font-weight: 400;
					line-height: 15.6px; /* 130% */
					z-index: 10;
				}
			}
		}

		.bottom-my{
			box-sizing: border-box;
			position: relative;
			margin: auto;
			margin-top: 30px;
			margin-bottom: 120px;
			width: 100%;
			max-width: 1390px;
			height: 700px;
			border-radius: 4px;
			border: 1px solid #28283B;
			background: #0D0E1C;
			.my-top{
				width: 100%;
				height: 82px;
				padding: 0px 15px;
				background: linear-gradient(180deg, #15172C 0%, #0D0E1C 68.29%);
				display: flex;
				box-sizing: border-box;
				justify-content: space-between;
				align-items: center;
				.left-title{
					display: flex;
					gap: 10px;
					p{
						color: #FBFFFE;
						font-weight: 700;
						font-size: 18px;
					}
				}
				.icon{
					cursor: pointer;
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
						font-size: 13.5px;
					}
					.select-btn{
						cursor: pointer;
						display: flex;
						width: 140px;
						height: 48px;
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
							font-size: 14px;
							font-style: normal;
							font-weight: 700;
							line-height: 21px; /* 150% */
						}
					}
				}
			}
			.inventory{
				cursor: pointer;
				position: absolute;
				top: 300px;
				right: 580px;
				width: 230px;
				height: 164px;
				background: url("@/assets/pcimg/replacement/zeroInventory.png");
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
					width: 300px;
					padding: 28px 0px;
					justify-content: center;
					align-items: center;
					gap: 10px;
					border-radius: 4px;
					background: #4B58C9;
					color: #FFF;
					text-align: center;
					font-family: "Microsoft YaHei";
					font-size: 22px;
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