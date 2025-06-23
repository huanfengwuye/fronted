<script lang="ts">
import { Component } from 'vue-facing-decorator'
import Bag from '@/scripts/pages/me/bag'
import { watch } from 'vue';

@Component
export default class PCBag extends Bag {}
</script>
		
<template>
	<div id="pc-bag" @click.stop="onBaseClick">
		<div class="bag-header">
			<div class="bag-header-l">
				<p>{{ t( 'common.selectAll' ) }}</p>
				<van-switch v-model="selectAll" @change="onAllChooseChange" />
				<div class="all-price"> {{ t( 'common.selected' ) }}<span>{{ selectList.length }}</span></div>
				<div class="all-price">{{ t( 'battle.priceTotal' ) }}&nbsp;&nbsp;
					<!-- <img class="pc-price-coin" src="@/assets/pcimg/common/coin.png" alt="" />
					<span>{{ totalPrice }}</span> -->
					<Price
						size="16"
						color="#75DC9E"
						fontWeight="700"
						:currency="totalPrice"
					></Price>
				</div>
			</div>
			<!-- <div class="bag-header-c">{{ t( 'users.myGoods' ) }}</div> -->
			<div class="bag-header-r">
				<!-- <div class="btn-wrap" @click="markRucksackMaterials">{{ '转换材料' }}
					<img src="@/assets/pcimg/home/refining.png" alt="" />
				</div> -->
				<!-- <div class="btn-wrap" @click="sellGoods">{{ t( 'openbox.saleAll' ) }}
					<img src="@/assets/pcimg/me/icon_all.png" alt="" />
				</div> -->
				<div class="btn-wrap" @click="toCancelDraw">{{ t( 'bag.cancelExtract' ) }}
					<img src="@/assets/pcimg/me/icon_cancel.png" alt="" />
				</div>
				<div class="btn-wrap" @click="onClickExtract">{{ t( 'bag.extract' ) }}
					<img src="@/assets/pcimg/me/icon_tq.png" alt="" />
				</div>
			</div>
		</div>

		<!-- <div class="goods-title">
			<div class="title-btn" @click="switchBag(0)" :class="{active:bagType == 0}">
				我的背包
			</div>
			<div class="title-btn" @click="switchBag(1)" :class="{active:bagType == 1}">
				材料仓库
			</div>
		</div> -->

		<div class="goods-list-wrap">
			<!-- <van-list v-model:loading="loading"
				:finished="finished" :finished-text="t( 'common.noMore' )"
				@load="onLoad" :immediate-check="true"
				class="goods-list"
			> -->
			<List
				v-if="bagType == 0"
				:loading="loading"
				:finished="finished"
				:on-load="onLoad"
			>
				<div class="goods-list">
					<div class="goods-item" :style="`background-image: url(` + getImageBgPc(item) + `)`" v-for="(item, index) in goodsList" :key="index" :class="{ 'active': item.choose }">
						<div class="goods-item-opt" @click="chooseItem(item, index)"></div>
						<div class="choose"></div>
						<p v-show="item.statusType !== 1">{{ item.statusName }}</p>
						<div class="goods-img">
							<img :src="getImageIcon(item)" alt="">
						</div>
						<div class="item-info">
							<div class="price">
								<!-- <img class="pc-price-coin" src="@/assets/pcimg/common/coin.png" alt="" />{{ item.price }} -->
								<Price
									size="13"
									color="#75DC9E"
									fontWeight="700"
									:currency="item.price"
								></Price>
							</div>
							<div class="name hide">{{ getGoodsName(item) }}</div>
						</div>
						<div class="item-opt">
							<div class="opt-item" @click.stop="onExtractOne(item)">{{ t( 'bag.extract' ) }}</div>
							<div class="opt-item" v-if="item.statusType == 1" @click.stop="$router.push( '/p/replacement' )">{{ '置换' }}</div>
						</div>
					</div>
				</div>
			</List>
			<List
				v-if="bagType == 1"
				:loading="loading"
				:finished="finished"
				:on-load="onLoad"
			>
				<div class="goods-list">
					<div class="makings-title">
						<div class="type-num" v-for="(item,index) in makingsListTo.summary" :key="index">
							<Icon name="repository" :color="colorList[index]" :size="15"></Icon>
							{{ item.num }}
						</div>
					</div>
					<div class="goods-item" v-for="(item, index) in makingsList" :key="index" :class="{ 'active': item.choose }">
						<div class="goods-item-opt" @click="chooseItem(item, index)"></div>
						<div class="choose"></div>
						<p v-show="item.statusType !== 1">{{ item.statusName }}</p>
						<div class="goods-img" :style="`background-image: url(` + getImageBgPc(item) + `)`">
							<img :src="getImageIcon(item)" alt="">
						</div>
						<div class="item-info">
							<div class="price">
								<Price
									size="13"
									color="#75DC9E"
									fontWeight="700"
									:currency="item.price"
								></Price>
							</div>
							<div class="name hide">{{ getGoodsName(item) }}</div>
						</div>
					</div>
				</div>
			</List>
			<!-- <div class="loading" v-if="loading">加载中...</div>
			<div class="finish" v-if="finished">没有更多了</div> -->
			<!-- </van-list> -->
		</div>

	</div>
</template>
		
<style lang="scss" >
#pc-bag {
	box-sizing: border-box;
	padding-top: 3px;
	width: 100%;
	min-height: 500px;
	padding-bottom: 50px;
	position: relative;

	.bag-header {
		height: 105px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 5px;
		color: #8488A6;
		font-size: 16px;

		.bag-header-l {
			display: flex;
			align-items: center;
			flex: 1;

			p {
				color: #2AE1BC;
				font-size: 15px;
				margin-right: 8px;
			}

			.van-switch {

				.van-switch__node {
					top: 5px;
				}
			}

			.all-price {
				display: flex;
				align-items: center;
				margin-left: 90px;

				img {
					margin-bottom: 0px;
					margin-left: 5px;
					margin-right: 0px;
				}

				span {
					color: #7BDCA2;
					font-family: MullerM;
					font-size: 16px;
					font-weight: 700;
					margin-bottom: -2px;
					margin-left: 5px;
				}
			}
		}

		.bag-header-c {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 197px;
			height: 105px;
			background: url(@/assets/pcimg/me/header_bg.png) center no-repeat;
			background-size: 100% 100%;
			color: #FFF;
			font-size: 24px;
		}


		.bag-header-r {
			display: flex;
			justify-content: flex-end;
			flex: 1;
		}


		.btn-wrap {
			display: inline-flex;
			width: 146px;
			height: 48px;
			justify-content: center;
			align-items: center;
			background: #181A31;
			margin-left: 10px;
			cursor: pointer;

			img {
				width: 16px;
				height: auto;
				margin-left: 12px;
			}

			&:hover {
				background: #4854C9;
				color: #fff;
			}
		}

	}

	.goods-title{
		width: 100%;
		display: flex;
		margin-bottom: 20px;
		justify-content: center;
		gap: 40px;
		.title-btn{
			width: 65px;
			height: 20px;
			color: #AAACC0;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			cursor: pointer;
			&.active{
				color: #7EF2AD;
				border-bottom: 1px solid #7EF2AD;
			}
		}
	}

	.goods-list-wrap {
		display: flex;
		width: 100%;
		position: relative;
		flex-direction: column;

		.loading,
		.finish
		{
			display: flex;
			justify-content: center;
			padding: 24px 0 0 0;
		}

		.goods-list {
			// display: grid;
			// grid-template-columns: repeat(auto-fill, 198px);
			// column-gap: 4px;
			// row-gap: 4px;
			display: flex;
			gap: 4px;
			flex-wrap: wrap;
			width: 100%;
			position: relative;

			.makings-title{
				width: 100%;
				display: flex;
				justify-content: center;
				gap: 50px;
				.type-num{
					display: flex;
					gap: 3px;
					color: #B4B6C8;
					font-size: 14px;
					font-weight: 400;
				}
			}

			.goods-item {
				width: 198px;
				height: 263px;
				background-size: 100% 100%;
				position: relative;
				cursor: pointer;
				background: #15172C;

				.goods-item-opt {
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					z-index: 1;
				}

				.choose {
					width: 100%;
					height: 100%;
					background: url(@/assets/pcimg/openbox/choose.png) no-repeat center;
					background-size: 100% 100%;
					position: absolute;
					right: 0;
					top: 0;
					opacity: 0;
					transition: .3;
				}

				p {
					position: absolute;
					// width: 100%;
					font-size: 12px;
					color: #FBFA02;
					text-align: center;
					right: 10px;
					top: 10px;
				}

				.goods-img {
					width: 160px;
					height: 130px;
					margin: 40px auto 0;
					display: flex;
					justify-content: center;
					align-items: center;
					background-position: center;
					background-repeat: no-repeat;

					img {
						max-width: 100%;
						max-height: 100%;
					}
				}

				.item-info {
					display: flex;
					flex-direction: column;
					position: absolute;
					bottom: 56px;
					left: 16px;
					width: 80%;

					.name {
						color: #CBCCD6;
						font-size: 11px;
					}

					.price {
						margin-bottom: 2px;
						color: #7BDCA2;
						font-family: MullerM;
						font-size: 13px;
						font-weight: 700;
						display: flex;
						align-items: center;
					}
				}

				.item-opt {
					display: flex;
					position: absolute;
					bottom: 0;
					width: 90%;
					color: #A4A6C5;
					font-size: 13px;
					justify-content: space-between;
					z-index: 2;
					padding: 10px;
    				gap: 8px;

					.opt-item {
						display: flex;
						width: 195px;
						height: 38px;
						justify-content: center;
						align-items: center;
						border-right: 0.8px solid #15172C;
						background: #181A31;
						cursor: pointer;
					}
				}


				&.active {
					.choose {
						opacity: 1;
					}
				}
			}


			// .van-list__finished-text {
			// 	grid-column-start: 1;
			// 	grid-column-end: 8;
			// }
		}
	}

}
</style>