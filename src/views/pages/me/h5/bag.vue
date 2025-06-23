<script lang="ts">
import { Component } from 'vue-facing-decorator'
import Bag from '@/scripts/pages/me/bag'

@Component
export default class H5Bag extends Bag {}
</script>

<template>
	<div id="bag" class="min-wrap-height" @click.stop="onBaseClick">
		<div class="goods-wrap" v-show="tabType == 'goods'">
			<!-- <van-notice-bar scrollable text="注：多次拒收或超时收货的玩家，将被暂停取回功能！" color="#ffffff" style=" background:transparent;"
								:key="barIndex" /> -->

			<div class="head">
				<div
					class="bag-1"
					:class="{ active: isSearchActive }"
				>
					<div class="bag-1">
						<p>
							{{ t( 'bag.total' ) }}<span>{{ totalRows }}</span>
						</p>
						<div class="div-sum">
							<p>{{ t( 'bag.priceTotal' ) }}</p>&nbsp;
							<!-- <img class="img" src="../../../assets/romimg/bag/coins.svg.png" />
							<div class="span-1">{{ totalPrice }}</div> -->
							<Price size="12" color="#75DC9E" font-weight="700" :currency="totalPrice"></Price>

						</div>
					</div>

				</div>

				<div class="bag-sort-wrap">
					<div class="opt-wrap">
						<p @click="onClickExtract">{{ t( 'bag.extract' ) }}</p>
						<!-- <p @click="markRucksackMaterials">{{ '转换材料' }}</p> -->
						<p v-if="store.state.reserveStatus == 1" @click="sellGoods">{{ t( 'bag.sale' ) }}</p>
						<p @click="toCancelDraw">{{ t( 'bag.cancelExtract' ) }}</p>
					</div>

					<div class="bag-opt-wrap">
						<div class="opt-select">
							<div
								class="all"
								@click="allChoose"
								:class="{ active: selectAll }"
							>
								<p>{{ t( 'common.selectAll' ) }}</p>
								<div class="all-img"></div>
							</div>
						</div>
					</div>

					<div class="bag-opt-wrap">
						<div class="opt-select">
							<div class="select-num">
								<p>{{ t( 'common.selected' ) }}</p>
								<span>{{ selectList.length }}</span>
							</div>
						</div>
					</div>
				</div>

				<div class="arrange">
					<div v-if="!showSearch" class="drop-down-1" @click="onSelGoodDown()">
						{{ dropState.text }}
						<img class="img" src="@/assets/romimg/bag/Frame.png" alt="" />
					</div>
					<div v-if="!showSearch" class="ic_search_container" @click="toSearch()">
						<span class="icon iconfont">&#xe643;</span>
					</div>
					<div class="bag-search-wrap" v-if="showSearch">
						<input
							type="text"
							v-model="keyword"
							:placeholder="t( 'bag.searchText' )"
							@keyup.enter="toSearch"
						/>
						<div class="ic_search_container" @click="toSearch()">
							<span class="icon iconfont">&#xe643;</span>
						</div>
					</div>
				</div>


			</div>

			<!-- <div class="bagType">
				<div class="left">
					<div class="type-btn" @click="switchBag(0)" :class="{active:bagType == 0}">
						我的背包
					</div>
					<div class="type-btn" @click="switchBag(1)" :class="{active:bagType == 1}">
						材料仓库
					</div>
				</div>
			</div> -->

			<div class="goods-list-wrap">

				<van-list
					v-if="bagType == 0"
					v-model:loading="loading"
					:finished="finished"
					:finished-text="t( 'common.noMore' )"
					@load="onLoad"
					:immediate-check="false"
				>
					<div class="goods-list" :key="choosekey">
						<div
							class="goods-item"
							v-for="(item, index) in goodsList"
							:key="index"
							:class="{ active: item.choose }"
							:style="`background-image: url(` + getImageBg(item) + `)`"
						>
							<div
								class="goods-item-opt"
								@click="chooseItem(item, index)"
							></div>
							<div class="choose"></div>
							<!-- <p v-show="item.statusType !== 1">{{ item.statusName }}</p> -->
							<div class="price">
								<!-- ${{ item.price }} -->
								<Price color="#7EF2AD" size="14" :currency="item.price"></Price>
							</div>
							<div class="goods-img">
								<img :src="getImageIcon(item)" alt="" />
							</div>
							<div class="weap-name" @click.stop="onClickItemName(index)">
								{{ FormatNickname(getGoodsNamePre(item.goodsName), 20) }}
							</div>
							<div class="weap-name2" @click.stop="onClickItemName(index)">
								{{ FormatNickname(getGoodsNameSec(item.goodsName), 20) }}
							</div>

							<!-- <div class="text" :class="{ show: showIndex == index }">
								{{ item.goodsName }}
							</div>	-->
							<div
								v-if="item.statusType !== 1"
								class="item-extract"
								:class="{ active: item.choose }"
								@click.stop="sellGoodItem(item)"
							>
								{{ item.statusName }}
							</div>
							<div
								v-else
								class="item-sell"
								:class="{ active: item.choose }"
								@click.stop="sellGoodItem(item)"
							>
								{{ t( 'bag.sale' ) }}
							</div>
						</div>
					</div>
				</van-list>

				<van-list
					v-if="bagType == 1"
					v-model:loading="loading"
					:finished="finished"
					:finished-text="t( 'common.noMore' )"
					@load="onLoad"
					:immediate-check="false"
				>
					<div class="makings-list" :key="choosekey">
						<div class="makings-title">
							<div class="type-num" v-for="(item,index) in makingsListTo.summary" :key="index">
								<Icon name="repository" :color="colorList[index]" :size="15"></Icon>
								{{ item.num }}
							</div>
						</div>
						<div class="repository-bag">
							<div 
								v-for="(item,index) in makingsList"
								:key="index"
								class="bag-bg"
							>
								<div class="good-info">
									<div class="quantities">
										<span :style="{ 'color': colorList[item.refineLevel-1] }" class="icon iconfont">&#xe649;</span>
									</div>
									<img :src="item.iconUrl" alt="">
									<Price
										size="12"
										color="#7EF2AD"
										:currency="item.price"
									></Price>
									<!-- <div class="quantities">
										x12
									</div> -->
								</div>
							</div>
						</div>
					</div>
				</van-list>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
#bag {
	display: flex;
	justify-content: center; /* 水平居中 */
	// align-items: center; /* 垂直居中 */
	padding: 40px 60px;
	padding-bottom: 0px;
	box-sizing: border-box;
	// margin: 40px 0px;
	// height: 100%;
	width: 750px;
	// background: url(@/assets/romimg/personal/bg.png) no-repeat center;
	background-size: contain;
	min-height: 100%;
	.div-sum {
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		font-size: 24px;
	}

	.img {
		width: 24px;
		height: 24px;
		margin-left: 6px;
		margin-right: 10px;
	}

	.head {
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		flex-direction: column; /* 子元素垂直排列 */
		border-radius: 12px;
		width: 706px;
		padding: 10px 0;
		// height: 170px;
		background-color: #1c203c;
	}

	.span-1 {
		color: #7ef2ad;
		font-size: 24px;
		font-weight: bold; /* 加粗字体 */
	}

	.bag-1 {
		display: flex;
		// justify-content: space-between; /* 子元素两端对齐 */
		width: 666px;
		height: 50px;
		gap: 140px;
		// justify-content: center; /* 水平居中 */
		align-items: center;

		p {
			color: #b4b8cd;
			font-size: 24px;
			// margin-right: 110px;

			span {
				color: #ffffff;
				margin-left: 6px;
				margin-right: 30px;
			}
		}
	}

	.goods-wrap {
		// margin-bottom: 30px;
		// display: flex;
		// justify-content: center; /* 水平居中 */
		// align-items: center; /* 垂直居中 */
		height: 100%;

		.van-notice-bar {
			width: 100%;
			background-color: rgba($color: #fff, $alpha: 0.07);
			background-size: contain;
			box-sizing: border-box;
			font-size: 24px;
		}

		.arrange{
			display: flex;
			width: 100%;
			justify-content: space-between;
			.drop-down-1 {
				display: flex;
				align-items: center;
				margin-left: 30px;
				height: 52px;
				box-sizing: border-box;
				font-size: 24px;
				color: #b4b8cd;

				img {
					margin-left: 3px;
					width: 24px;
					margin-right: 5px;
				}
			}
			.ic_search_container {
				display: flex;
				align-items: center;
				box-sizing: border-box;
				margin-left: 36px;

				.icon.iconfont {
					font-size: 32px;
					color: #626476;
				}
			}
			.bag-search-wrap {
				display: flex;
				align-items: center;
				width: 666px;
				padding-left: 20px;
				box-sizing: border-box;
				input {
					box-sizing: border-box;
					padding-right: 97px;
					width: 100%;
					height: 50px;
					background: transparent;
					border: transparent;
					font-size: 24px;
					font-family: Roboto-Regular, Roboto;
					font-weight: 300;
					color: #b4b8cd;
					line-height: 50px;
				}
			}
		}
		
		.bag-sort-wrap {
			display: flex;
			width: 666px;
			justify-content: center; /* 水平居中 */
			flex-wrap: wrap;
			color: #B4B6C8;
			padding: 0 10px;
			justify-content: space-between; /* 子元素均匀分布，第一个元素在起始位置，最后一个元素在结束位置 */
			align-items: center;

			.opt-wrap {
				height: 50px;
				display: flex;

				p {
					display: flex;
					justify-content: center; /* 水平居中 */
					align-items: center; /* 垂直居中 */
					// width: 120px;
					padding: 0 20px;
					height: 60px;
					background: #1c203c;
					border: 2px solid #2d2d67;
					border-radius: 8px;
					text-align: center;
					line-height: 48px;
					color: #B4B6C8;
					font-size: 24px;
					box-sizing: border-box;
					margin-right: 17px;
				}
				/* 元素被点击时的样式 */
				p:active {
					background: #554bf7; /* 你可以自定义点击后的颜色 */
					color: #B4B6C8; /* 你可以自定义点击后的文本颜色 */
				}
			}

			.drop-down {
				display: flex;
				align-items: center;
				height: 52px;
				box-sizing: border-box;
				font-size: 24px;
				color: #00f0ff;

				img {
					width: 24px;
					margin-right: 5px;
				}
			}
		}

		.bag-opt-wrap {
			margin-top: 20px;

			.bag-info {
				p {
					display: flex;
					align-items: center;
					color: #fff;
					font-size: 24px;
					margin-right: 20px;

					span {
						color: #fbfa02;
						margin-left: 5px;
					}
				}
			}

			.opt-select {
				// margin-left: 30px;
				display: flex;
				height: 50px;
				align-items: center;
				color: #fff;

				.all {
					display: flex;
					align-items: center;

					p {
						font-size: 20px;
						line-height: 50px;
						text-align: center;
					}

					.all-img {
						width: 38px;
						height: 38px;
						background: url(@/assets/romimg/bag/span.checkbox__box.png)
							no-repeat center;
						background-size: contain;
						margin-left: 10px;
					}

					&.active {
						.all-img {
							background: url(@/assets/romimg/bag/span.png) no-repeat center;
							background-size: contain;
						}
					}
				}

				.select-num {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 20px;

					p {
						height: 50px;
						line-height: 50px;
						font-size: 20px;
						text-align: center;
					}

					span {
						// display: block;
						// width: 70px;
						// text-align: center;
						margin-left: 10px;
						height: 50px;
						line-height: 50px;
						color: #7ef2ad;
						font-size: 24px;
					}
				}
			}
		}

		.bagType{
			margin-top: 30px;
			display: flex;
			justify-content: space-between;
			width: 710px;
			.left{
				display: flex;
				gap: 40px;
				.type-btn{
					height: 50px;
					color: #AAACC0;
					font-size: 24px;
					font-weight: 400;
					&.active{
						border-bottom: 2px solid #7EF2AD;
						color: #7EF2AD;
					}
				}
			}

			.right{
				display: flex;
				span{
					color: #AAACC0;
					font-size: 24px;
					font-weight: 400;
				}
				p{
					color: #7EF2AD;
					font-size: 24px;
					font-weight: 400;
				}
			}

		}

		.goods-list-wrap {
			display: flex;
			flex-direction: column;
			max-height: 1225px;
			overflow-y: scroll;
			margin-top: 20px;

			&::-webkit-scrollbar {
				width: 0px;
			}
			.makings-list{
				border-radius: 12px;
				padding: 30px 0px;
				box-sizing: border-box;
				border: 2px solid #2D2D67;
				.makings-title{
					display: flex;
					justify-content: center;
					gap: 50px;
					.type-num{
						display: flex;
						gap: 8px;
						color: #B4B6C8;
						font-size: 24px;
						font-weight: 400;
					}
				}
				.repository-bag{
					display: flex;
					padding: 30px 15px;
					width: 100%;
					box-sizing: border-box;
					gap: 10px;
					flex-wrap: wrap;
					.bag-bg{
						width: 160px;
						height: 160px;
						border-radius: 4px;
						background: #1C203C;
						.good-info{
							width: 100%;
							height: 100%;
							gap: 10px;
							display: flex;
							justify-content: center;
							align-items: center;
							position: relative;
							flex-direction: column;
							img{
								width: 120px;
							}
							.quantities{
								display: flex;
								justify-content: center;
								align-items: center;
								top: 10px;
								right: 10px;
								padding: 0 10px;
								box-sizing: border-box;
								height: 32px;
								border-radius: 20px;
								color: #FFF;
								span{
									font-size: 30px;
								}
								font-size: 24px;
								position: absolute;
								// background: #4CC5CD;
							}

						}
					}
				}
			}
			.goods-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-bottom: 0px;

				.goods-item {
					width: 344px;
					height: 520px;
					background-size: contain;
					background-position: center;
					background-repeat: no-repeat;
					// margin-right: 25px;
					margin-bottom: 15px;
					position: relative;
					background-color: #1b1e38;
					border-radius: 10px;
					position: relative;

					.goods-item-opt {
						width: 100%;
						height: 100%;
						position: absolute;
						left: 0;
						top: 0;
						z-index: 1;
					}

					.item-extract{
						position: absolute;
						top: 450px;
						height: 70px;
						background-color: #181a31;
						text-align: center;
						line-height: 70px;
						box-sizing: border-box;
						color: #7EF2AD;
						font-size: 26px;
						box-sizing: border-box;
						left: 0;
						width: 100%;
						border-bottom-left-radius: 12px;
						border-bottom-right-radius: 12px;
						z-index: 2;
						&.active {
							border-bottom: #2d2d67 solid 1px;
						}
					}


					.item-sell {
						position: absolute;
						top: 450px;
						height: 70px;
						background-color: #181a31;
						text-align: center;
						line-height: 70px;
						box-sizing: border-box;
						color: #a4a6c5;
						font-size: 26px;
						box-sizing: border-box;
						left: 0;
						width: 100%;
						border-bottom-left-radius: 12px;
						border-bottom-right-radius: 12px;
						z-index: 2;
						&.active {
							border-bottom: #2d2d67 solid 1px;
						}
					}

					.choose {
						width: 36px;
						height: 36px;
						background: url(@/assets/romimg/openbox/selected.png) no-repeat
							center;
						background-size: contain;
						position: absolute;
						opacity: 0;
					}

					p {
						position: absolute;
						width: 100%;
						font-size: 24px;
						color: #7ef2ad;
						text-align: center;
						left: 0;
						top: 10px;
					}

					.goods-img {
						width: 160px;
						height: 130px;
						margin: 100px auto 0;
						display: flex;
						justify-content: center;
						align-items: center;

						img {
							max-width: 100%;
							max-height: 100%;
						}
					}

					.weap-name {
						box-sizing: border-box;
						text-align: center;
						color: #cbccd6;
						font-size: 24px;
						position: absolute;
						width: 100%;
						font-weight: 300;
						z-index: 2;
						top: 330px;
					}
					.weap-name2 {
						box-sizing: border-box;
						text-align: center;
						color: #fff;
						font-size: 24px;
						position: absolute;
						width: 100%;
						font-weight: 700;
						z-index: 2;
						top: 370px;
					}

					.price {
						margin-top: 30px;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 26px;
						color: #7ef2ad;

						img {
							width: 30px;
						}
					}

					.text {
						position: absolute;
						left: 20px;
						bottom: 130px;
						height: 40px;
						background: #353748;
						color: #fff;
						line-height: 40px;
						font-size: 16px;
						padding: 0 20px;
						border-radius: 8px;
						white-space: nowrap;
						z-index: 2;
						box-sizing: border-box;
						display: none;

						&::after {
							display: block;
							content: "";
							width: 33px;
							height: 27px;
							background: url(@/assets/romimg/common/arrow_top.png) no-repeat
								center;
							background-size: contain;
							position: absolute;
							left: 40px;
							top: 30px;
							transform: rotate(180deg);
						}

						&.show {
							display: block;
						}
					}

					&.active {
						.choose {
							opacity: 1;
						}
						box-sizing: border-box;
						border: 1px solid #2d2d67;
					}

					&:nth-child(3n) {
						margin-right: 0;

						.text {
							left: auto;
							right: 30px;

							&::after {
								left: auto;
								right: 40px;
							}
						}
					}

					&:nth-child(3n - 1) {
						.text {
							left: 50%;
							transform: translateX(-50%);

							&::after {
								left: 50%;
								transform: translateX(-50%) rotate(180deg);
							}
						}
					}
				}
			}
		}
	}
}
</style>
