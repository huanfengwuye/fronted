<script lang="ts">
import { Component } from 'vue-facing-decorator'
import Header from '@/scripts/modules/header/header'

@Component
export default class PCHeader extends Header {}
</script>
<template>
	<div id="pc-top-header" v-if="store.state.showHeaderView">
		<div
			class="pc-header_top"
			:style="{ position: isHome ? 'relative' : 'fixed' }"
			:class="{ active: indexActive }"
		>
			<div class="opt-wrap">
				<div class="logo-wrap">
					<div class="logo" @click="jump('/')">
						<img src="@/assets/pcimg/activity/titleIcon.png" alt="" />
					</div>
				</div>
				<div class="tab-list">
					<!-- <div
						class="nav_item"
						:class="{ active: $route.name == 'p_home' }"
						@click="jump('/')"
					>
						<img
							class="icon-active"
							src="@/assets/pcimg/home/icon_home2.png"
							alt=""
						/>
						<img
							class="icon-common"
							src="@/assets/pcimg/home/icon_home.png"
							alt=""
						/>
						{{ t( 'menu.home' ) }}
					</div> -->
					<!-- <div
						class="nav_item"
						v-if="!store.state.beiAnExamine && store.state.moduleBattle"
						:class="{
							active:
								$route.name == 'p_battle_list' ||
								$route.name == 'p_battle_history' ||
								$route.name == 'p_battle' ||
								$route.name == 'p_battle_box_details' ||
								$route.name == 'p_battleDetail',
						}"
						@click="jump('/p/battle')"
					>
						<img
							class="icon-active"
							src="@/assets/pcimg/home/icon_battle2.png"
							alt=""
						/>
						<img
							class="icon-common"
							src="@/assets/pcimg/home/icon_battle.png"
							alt=""
						/>
						{{ t( 'menu.battle' ) }}
						<sup>NEW</sup>
					</div> -->
					<!-- <div
						class="nav_item"
						:class="{ active: $route.name == 'p_rank' }"
						@click.stop="jump('/p/rank')"
						v-if="store.state.moduleMall"
					>
						<img
							class="icon-active"
							src="@/assets/pcimg/home/icon_rank2.png"
							alt=""
						/>
						<img
							class="icon-common"
							src="@/assets/pcimg/home/icon_rank.png"
							alt=""
						/>
						排行榜
					</div>
					<div
						class="nav_item"
						:class="{
							active: $route.name == 'p_roll' || $route.name == 'p_roll_detail',
						}"
						v-if="!store.state.beiAnExamine && store.state.moduleRoll"
						@click="jump('/p/roll')"
					>
						<img
							class="icon-active"
							src="@/assets/pcimg/home/icon_roll2.png"
							alt=""
						/>
						<img
							class="icon-common"
							src="@/assets/pcimg/home/icon_roll.png"
							alt=""
						/>
						{{ t( 'menu.rollRoom' ) }}
					</div>
					<div
						class="nav_item"
						:class="{
							active:
								$route.name == 'p_lucky' || $route.name == 'p_lucky_details',
						}"
						v-if="store.state.moduleLucky"
						@click="jump('/p/lucky')"
					>
						<img
							class="icon-active"
							src="@/assets/pcimg/home/icon_lucky2.png"
							alt=""
						/>
						<img
							class="icon-common"
							src="@/assets/pcimg/home/icon_lucky.png"
							alt=""
						/>{{ t( 'menu.lucky' ) }}
					</div>

					<div
						class="nav_item"
						:class="{ active: $route.name == 'p_contract' }"
						@click="jump('/p/contract')"
						v-if="store.state.moduleContract && false"
					>
						<img
							class="icon-active"
							src="@/assets/pcimg/home/icon_lucky2.png"
							alt=""
						/>
						<img
							class="icon-common"
							src="@/assets/pcimg/home/icon_lucky.png"
							alt=""
						/>{{ t( 'menu.contract' ) }}
					</div>

					<div
						class="nav_item"
						:class="{ active: $route.name == 'p_grade' }"
						@click="jump('/p/grade')"
						v-if="store.state.moduleGrade"
					>
						<img
							class="icon-active"
							src="@/assets/pcimg/home/icon_grade2.png"
							alt=""
						/>
						<img
							class="icon-common"
							src="@/assets/pcimg/home/icon_grade.png"
							alt=""
						/>
						{{ t( 'menu.gradeBox' ) }}
					</div>
					<div
						class="nav_item"
						:class="{ active: $route.name == 'p_timebox' }"
						@click="jump('/p/timebox')"
						v-if="store.state.moduleTiming"
					>
						<img
							class="icon-active"
							src="@/assets/pcimg/home/icon_time2.png"
							alt=""
						/>
						<img
							class="icon-common"
							src="@/assets/pcimg/home/icon_time.png"
							alt=""
						/>{{ t( 'menu.timeBox' ) }}
					</div>
					<div
						class="nav_item"
						:class="{ active: $route.name == 'p_replacement' }"
						@click.stop="jump('/p/replacement')"
						v-if="store.state.moduleMall"
					>
						<img
							class="icon-active"
							src="@/assets/pcimg/home/replacement2.png"
							alt=""
						/>
						<img
							class="icon-common"
							src="@/assets/pcimg/home/replacement1.png"
							alt=""
						/>
						置换合约
					</div> -->
					<!-- <div
						class="nav_item"
						:class="{ active: $route.name == 'p_mall' }"
						@click.stop="jump('/p/mall')"
						v-if="store.state.moduleMall"
					>
						<img
							class="icon-active"
							src="@/assets/pcimg/home/icon_mall2.png"
							alt=""
						/>
						<img
							class="icon-common"
							src="@/assets/pcimg/home/icon_mall.png"
							alt=""
						/>
						{{ t( 'menu.goldMall' ) }}
					</div> -->
				</div>
			</div>


			<div
				class="user-action-area"
				:class="{ mini: isHome && isHide }"
				:style="{ top: `${isHome && isHide ? 0 - top : 0}px` }"
			>
				<div class="login-wrap" v-if="!hasLogin && !isHide">
					<!-- <img src="@/assets/pcimg/home/user-login-icon.png" />
					<span>{{ t( 'menu.signBtn' ) }}</span> -->
					<div class="login_btn" @click="onClickSign('1')">登录</div>
          			<div class="login2_btn" @click="onClickSign('2')">注册</div>
				</div>

				<div class="user-wrap" @click="setUserShow" v-else-if="hasLogin">
					<div class="add-balance" @click.stop="onRecharge">
						<img src="@/assets/pcimg/home/add_balance.png" alt="" />
					</div>
					<div
						class="user-info"
						@mouseenter="onMouseenterMenu"
						@mouseleave="onMouseleaveMenu"
					>
						<div class="user-info-wrap">
							<p>{{ userInfoBase.nickName }}</p>
							<div class="balance">
								<!-- <img src="@/assets/pcimg/common/coin.png" alt="" />
								<span> {{ userInfoAssets?.amount }}</span> -->
								<Price
									size="17"
									color="#75DC9E"
									fontWeight="700"
									:currency="userInfoAssets?.amount"
								></Price>
								<!-- <span class="balance-small">{{
									userInfoAssets?.amount?.split(".")[1] || "0"
								}}</span> -->
							</div>
						</div>
						<div class="user-header">
							<Avatar
								:userModel="userInfoBase"
								:size="'pc-home-header'"
							></Avatar>
							<div v-if="noReadMessages > 0" class="user-note"></div>
						</div>
					</div>
				</div>

				<div
					class="home-menu"
					:class="{ active: menuShow }"
					@mouseenter="onMouseenterMenu"
					@mouseleave="onMouseleaveMenu"
				>
					<div class="menu-wrap1">
						<!-- <div class="menu-item" @click.stop="jump('/p/mall')">
							<div class="menu-item-icon">
								<img src="@/assets/pcimg/home/icon-menu-mall.png" alt="" />
							</div>
							金币商城
						</div> -->
						<div class="menu-item" @click.stop="jump('/p/me')">
							<div class="menu-item-icon">
								<img src="@/assets/pcimg/home/icon-menu-me.png" alt="" />
							</div>
							{{ t( 'menu.userCenter' ) }}
						</div>
					</div>
					<div class="menu-wrap2">
						<div class="menu-item" @click="checkShow = true">
							<div class="menu-item-icon">
								<img src="@/assets/pcimg/home/icon-menu-check.png" alt="" />
							</div>
							每日签到
							<div class="new">
								NEW
							</div>
						</div>
						<div class="menu-item" @click.stop="jump('/p/task')">
							<div class="menu-item-icon">
								<img src="@/assets/pcimg/home/task.png" alt="" />
							</div>
							任务中心
						</div>
						<!-- <div class="menu-item" @click="popupsShow = true">
							<div class="menu-item-icon">
								<img src="@/assets/pcimg/home/icon-menu-turntable.png" alt="" />
							</div>
							幸运转盘
							<div class="new">
								NEW
							</div>
						</div> -->
						<div class="menu-item" @click.stop="jump('/p/me/record')">
							<div class="menu-item-icon">
								<img src="@/assets/pcimg/home/icon-menu-record.png" alt="" />
							</div>
							{{ t( 'menu.accountDetail' ) }}

						</div>
						<div class="menu-item" @click.stop="jump('/p/me/spreadUser')">
							<div class="menu-item-icon">
								<img src="@/assets/pcimg/home/icon-menu-spread.png" alt="" />
							</div>
							{{ t( 'menu.spread' ) }}
						</div>
						<div class="menu-item" @click.stop="jump('/p/me/information')">
							<div class="menu-item-icon">
								<img src="@/assets/pcimg/home/icon-menu-msg.png" alt="" />
							</div>
							{{ t( 'menu.message' ) }}
						</div>
						<div class="menu-item" @click.stop="jump('/p/me/help')">
							<div class="menu-item-icon">
								<img src="@/assets/pcimg/home/icon-menu-help.png" alt="" />
							</div>
							{{ t( 'menu.supportCenter' ) }}
						</div>
						<div class="menu-item logout" @click="onClickExitLogin">
							<div class="menu-item-icon">
								<img src="@/assets/pcimg/home/icon-menu-out.png" alt="" />
							</div>
							{{ t( 'menu.logout' ) }}
						</div>
					</div>
				</div>
			</div>
		</div>

			<div class="mini-wrap" v-show="isHide">
				<div class="to-top" @click="toTop()">
					<img src="@/assets/pcimg/home/to-top.png" />
				</div>
				<div class="fast-to">
					<div
						v-for="(item, index) in modules"
						:key="index"
						@click="scrollTo(index)"
						v-show="item.boxItems && item.boxItems.length > 0"
					>
						<div
							v-if="item.boxItems && item.boxItems.length > 0"
							:class="{ active: item.active }"
						>
							{{ item.name }}
						</div>
					</div>
				</div>
			</div>

			<div class="header_height"></div>
			<div class="check-bg" v-if="checkShow">
				<div class="checks-body">
					<div class="close" @click="checkShow = false">
						<img src="@/assets/pcimg/common/close.png" alt="">
					</div>
					<!-- 用户签到奖励展示区域 -->
					<div class="check-items">

						<!-- 循环遍历奖励列表 -->
						<div v-for="(item, index) in awardsList" :key="index" class="check-item">

						<!-- 奖励项的主体部分，根据条件是否高亮显示 -->
						<div class="check-body" :class="{'active': shouldHighlight(index)}">

							<!-- 根据条件决定是否显示印章 -->
							<!-- <img v-if="shouldShowStamp(index)" class="stamp" :class="{'active': isSignVariety && shouldShowActiveStamp(index)}" src="@/assets/pcimg/common/stamp-active.png" alt=""> -->
							<img v-if="shouldShowStamp(index)" class="stamp" :class="{'active': isSignVariety && shouldShowActiveStamp(index)}" src="@/assets/pcimg/common/stamp.png" alt="">
							
							<!-- 根据奖励类型显示对应的图标 -->
							<img v-if="item.goodsType === 1" :src="item.iconUrl" alt="">
							<img v-if="item.goodsType === 2" src="@/assets/romimg/common/fudai.png" alt="">

							<!-- 如果是实物奖励，显示价格 -->
							<Price v-if="item.goodsType === 1" size="16" font-weight="700" color="#7EF2AD" :currency="item.price"></Price>

							<!-- 如果是虚拟奖励，显示相关信息 -->
							<div class="text" v-if="item.goodsType === 2">
								<!-- 遍历用户签到记录，显示相应的虚拟奖励信息 -->
								<div v-for="(itemss, indexss) in signList" :key="indexss">
									<div v-if="shouldShowPrice(item, itemss, index)">
										<Price size="16" font-weight="700" color="#7EF2AD" :currency="itemss.price"></Price>
									</div>
								</div>
								<!-- 根据条件是否显示随机金额 -->
								<div v-if="shouldShowRandomAmount(index)">随机金额</div>
							</div>
						</div>
						</div>
					</div>
					<div class="check-btn" v-if="!isSign" @click="onClickOpen">
						签到
					</div>
					<div class="check-btns" v-else>
						今日已签到
					</div>
				</div>
			</div>
			<div class="success" v-if="successShow">
				<div class="success-body">
					<div class="close">
						<img
							src="@/assets/romimg/lucky/close.png"
							alt=""
							@click="successShow = false"
						/>
					</div>
					<div class="success-main">
						<img v-if="gunSkin.goodsType == 1" class="imgs" :src="gunSkin.iconUrl" alt="">
						<img v-else class="imgs" src="@/assets/romimg/common/fudai.png" alt="">
						<Price
							size="15"
							font-weight="700"
							color="#75DC9E"
							:currency="gunSkin.price"
						></Price>
						<img class="blinblin" src="@/assets/romimg/header/blinblin.png" alt="">
					</div>
					<div class="success-btn">
						<div class="btn-left" @click="successShow = false">
							放入背包
						</div>
						<!-- <div class="btn-right" @click="onClickSell">
							炼化
						</div> -->
					</div>
				</div>
			</div>
			<!-- <Turntable :overallShow="popupsShow" @update="updateOverallShow"></Turntable> -->
		</div>
</template>

<style lang="scss" scoped>
#pc-top-header {
	width: 100%;
	background: rgba($color: #191c34, $alpha: 1);
	font-family: "";
	display: flex;
	justify-content: center;
	position: relative;
	z-index: 99;
	.check-bg{
		display: flex;
		justify-content: center;
		align-items: center;		
		position: fixed;//创建弹窗背景
		width: 100%;
		height: 100%;
		background: rgba( 0, 0, 0, .7 );
		left: 0;
		top: 0;
		z-index: 1000;
		.checks-body{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column; /* 子元素垂直排列 */
			position: fixed;//创建弹窗背景
			width: 1163px;
			height: 400px;
			padding-top: 30px;
			border-radius: 10px;
			background: url( @/assets/pcimg/common/check-bg.png ) no-repeat;
			// gap: 30px;
			// background: url( @/assets/pcimg/common/check-bg-active.png ) no-repeat;
			gap: 40px;
			background-size: cover; /* 将背景图等比例缩放，保持完全填充容器 */
			background-position: center; /* 将背景图放置在容器中央 */
			background-repeat: no-repeat; /* 禁止背景图重复 */

			.check-items{
				display: flex;
				justify-content: center; /* 水平方向居中对齐 */
				align-items: center; /* 垂直方向居中对齐 */
				// justify-content: space-between; /* 子元素均匀分布，第一个元素在起始位置，最后一个元素在结束位置 */
				gap: 30px;
				width: 1051px;
				// height: 165px;
				// border: 1px solid red;
				.check-item{
					display: flex;
					justify-content: center; /* 水平方向居中对齐 */
					align-items: center; /* 垂直方向居中对齐 */
					flex-direction: column; /* 子元素垂直排列 */
					width: 120px;
					// height: 165px;
					gap: 10px;
					.check-body{
						display: flex;
						justify-content: center; /* 水平方向居中对齐 */
						align-items: center; /* 垂直方向居中对齐 */
						flex-direction: column; /* 子元素垂直排列 */
						width: 120px;
						height: 120px;
						background: #1F2240;
						// background: linear-gradient(180deg, #FFDFA5 0%, #FFC574 81.67%, #FDDCAF 100%);
						position: relative;
						border-radius: 6px;
						gap: 10px;
						.stamp{
							width: 50px;
							height: 50px;
							position: absolute; /* 使用绝对定位 */
							top: -20px;
							right: -20px;
							&.active{
								animation: stampAnimation 0.3s ease-in-out;
							}
						}
						@keyframes stampAnimation {
							0% {
								transform: scale(2) translate(25%, -25%);
							}
							50% {
								transform: scale(1.3);
							}
							100% {
								transform: scale(1) translate(0, 0);
							}
						}
						&.active{
							box-shadow: 0px 0px 10px 1px #958EFF inset;
							// background: linear-gradient(143deg, #FFE1A7 12.84%, #DB8440 92.91%);
						}
						.text{
							color: #B4B6C8;
							text-align: center;
							font-family: Microsoft YaHei;
							font-size: 16px;
							font-style: normal;
							font-weight: 400;
							line-height: normal;
							margin-bottom: 0px;
						}
						img{
							// width: 80px;
							height: 60px;
						}
						&.active{
							// background: linear-gradient(143deg, #FFE1A7 12.84%, #DB8440 92.91%);
							box-shadow: 0px 0px 10px 1px #958EFF inset;
						}
					}
					.check-qiandao{
						display: flex;
						justify-content: center; /* 水平方向居中对齐 */
						align-items: center; /* 垂直方向居中对齐 */
						width: 120px;
						height: 35px;
						background: #262A4C;
						border-radius: 4px;
						color: #B4B6C8;
						text-align: center;
						font-family: Microsoft YaHei;
						font-size: 14px;
						font-style: normal;
						font-weight: 700;
						line-height: normal;
						cursor: pointer;//鼠标变手
						&.active{
							color: #FFF;
							background: #4B58C9;
						}
					}
				}
			}
			.check-btn{
				display: flex;
				justify-content: center; /* 水平方向居中对齐 */
				align-items: center; /* 垂直方向居中对齐 */
				cursor: pointer;
				width: 380px;
				height: 45px;
				background: #4B58C9;
				border-radius: 4px;
				color: #FFF;
				text-align: center;
				font-family: Microsoft YaHei;
				font-size: 14px;
				font-style: normal;
				font-weight: 700;
				line-height: normal;
			}
			.check-btns{
				display: flex;
				justify-content: center; /* 水平方向居中对齐 */
				align-items: center; /* 垂直方向居中对齐 */
				width: 380px;
				height: 45px;
				// background: linear-gradient(180deg, #FFEC7D 0%, #FD9845 100%);
				background: #32365A;
				border-radius: 4px;
				color: #5C5D69;
				text-align: center;
				font-family: Microsoft YaHei;
				font-size: 18px;
				font-style: normal;
				font-weight: 700;
				line-height: normal;
			}
			.close {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 20px;
				height: 20px;
				position: absolute;
				right: 20px;
				top: 20px;
				cursor: pointer;

				img {
					width: 12px;
					height: 12px;
				}
			}
		}
	}	

		.success{
		display: flex;
		justify-content: center;
		align-items: center;		
		position: fixed;//创建弹窗背景
		width: 100%;
		height: 100%;
		background: rgba( 0, 0, 0, .7 );
		left: 0;
		top: 0;
		z-index: 1001;
		.success-body{
			display: flex;
			// justify-content: center; /* 水平方向居中对齐 */
			align-items: center; /* 垂直方向居中对齐 */
			flex-direction: column; /* 子元素垂直排列 */
			position: fixed;//创建弹窗背景
			width: 510px;
			height: 460px;
			background: url( @/assets/pcimg/common/success-bg.png ) no-repeat;
			background-size: cover;
			gap: 30px;
			padding: 90px 0 10px;
			box-sizing:border-box;
			.success-main{
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column; /* 子元素垂直排列 */
				width: 440px;
				height: 250px;
				// border: 1px solid red;
				gap: 20px;
				position: relative;
				.blinblin{
					position: absolute; /* 使用绝对定位 */
					width: 270px;
					height: 270px;
					animation: rotate 3s linear infinite; /* 使用 rotate 动画，2秒一次，线性变化，无限循环 */
					opacity: 0.3;//透明度设置
				}
				@keyframes rotate {
				from {
					transform: rotate(0deg); /* 起始状态：0度旋转 */
				}
				to {
					transform: rotate(360deg); /* 结束状态：360度旋转，一圈完整旋转 */
				}
				}
				.imgs{
					z-index: 3;
					width: 104px;
					height: 110px;
				}
			}

			.success-btn{
				display: flex;
				justify-content: center; /* 水平方向居中对齐 */
				width: 440px;
				height: 50px;
				gap: 30px;
				.btn-right{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 180px;
					height: 100%;
					background: #7D51DF;
					border-radius: 8px;
					color: #FFF;
					text-align: center;
					font-family: Muller;
					font-size: 14px;
					font-style: normal;
					font-weight: 700;
					line-height: 21px; /* 150% */
				}
				.btn-left{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 180px;
					height: 100%;
					background: #3A34B0;
					border-radius: 8px;
					color: #FFF;
					text-align: center;
					font-family: Muller;
					font-size: 14px;
					font-style: normal;
					font-weight: 700;
					line-height: 21px; /* 150% */
				}
			}

			.close {
				position: absolute;
				right: 30px;
				top: 30px;
				img {
					width: 15px;
					height: 15px;
				}
			}
		}
	}

	.mini-wrap {
		position: fixed;
		display: flex;
		width: 100%;
		height: 50px;
		z-index: 100;
		background: #191c34;
		box-shadow: 0px 14px 101px 0px rgba(0, 0, 0, 0.27);
		align-items: center;
		gap: 24px;
		padding-left: 12px;
		box-sizing: border-box;

		.to-top {
			img {
				width: 26px;
			}
		}

		.fast-to {
			display: flex;
			height: 100%;
			align-items: center;
			gap: 24px;
			font-size: 16px;
			color: #7e829f;

			div {
				cursor: pointer;
			}

			.active {
				color: #fff;
			}
		}
	}
	
	.pc-header_top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		// position: fixed;
		width: 100%;
		height: 92px;
		// background: #191c34;
		opacity: 1;
		z-index: 90;
		background: url(@/assets/pcimg/activity/bg_top.png) no-repeat 100% 100%;
    	background-size: 100% auto; /* 以宽度为准铺满 */
		&.active {
			z-index: 99;
		}

		.opt-wrap {
			display: flex;
			align-items: center;
			height: 100%;

			.logo-wrap {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 196px;
				height: 100%;
				// background: #101120;

				.logo {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 92px;
					cursor: pointer;
					width: 196px;

					img {
						height: 100%;
						// width: 161px;
						// height: 72px;
						// margin-right: 20px;
					}
				}
			}

			.tab-list {
				display: flex;
				align-items: center;
				height: 100%;

				.nav_item {
					padding: 0px 30px;
					height: 100%;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 15px;
					font-weight: bold;
					color: #fff;
					background: none;
					cursor: pointer;
					position: relative;
					font-family: MullerM;
					font-weight: 700;

					sup {
						background: #c92c54;
						font-size: 12px;
						color: #fff;
						position: absolute;
						top: 20px;
						right: 14px;
						padding: 0 4px;
						border-radius: 1px;
						font-weight: 300;
					}

					img {
						width: 24px;
						margin-right: 5px;
					}

					.icon-active {
						display: none;
					}

					.icon-common {
						display: block;
					}

					&.active {
						color: #8792f1;
						background-color: #1c203c;

						.icon-active {
							display: block;
						}

						.icon-common {
							display: none;
						}
					}

					&:hover {
						background-color: #232749;
						border-top-color: #232749;
					}
				}
			}
		}
	}

	.user-action-area {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 100;
		height: 92px;
		// background: #191c34;
		padding-left: 24px;

		&.mini {
			position: fixed;
			top: 0 !important;
			right: -25px !important;
			z-index: 101;
			transform: scale(0.75);
			height: 50px;

			.home-menu {
				transform: scale(1.2);
				// right: 0 !important;
			}
		}

		.login-wrap {
			cursor: pointer;
			height: 92px;
			width: 231px;
			color: #fff;
			// background: url(@/assets/pcimg/home/login_bg.png) center no-repeat;
			// background: url(@/assets/pcimg/home/login-btn-bg-hover.png) center
			// 	no-repeat;
			// background-size: 100% 100%;
			opacity: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 14px;

			.login_btn{
				height: 35px;
				width: 95px;
				text-align: center;
				line-height: 35px;
				font-size: 21px;
				background: url('@/assets/pcimg/activity/denlu.png') center center / 100% 100% no-repeat;
			}
			.login2_btn{
				height: 35px;
				width: 95px;
				text-align: center;
				line-height: 35px;
				font-size: 21px;
				background: url('@/assets/pcimg/activity/zhuce.png') center center / 100% 100% no-repeat;
			}
		}

		.user-wrap {
			display: flex;
			height: 100%;
			align-items: center;

			.user-info {
				display: flex;
				height: 100%;
				align-items: center;
			}

			.user-info-wrap {
				margin-right: 15px;
				cursor: pointer;
				align-items: flex-end;
				display: flex;
				flex-direction: column;

				p {
					font-size: 14px;
					color: #ffffff;
					font-weight: bold;
					margin-bottom: 6px;
				}

				.balance {
					display: flex;
					align-items: center;

					img {
						width: 14px;
						height: 14px;
						margin-right: 4px;
						margin-bottom: 1px;
					}
					span {
						color: #75dc9e;
						font-size: 17px;
						font-family: MullerM;
					}

					.balance-small {
						font-size: 12px;
						margin-top: 3px;
					}
				}
			}

			.user-header {
				position: relative;
				margin-right: 25px;
				cursor: pointer;

				.user-note {
					position: absolute;
					width: 14px;
					height: 14px;
					background: #fa2b37;
					border: #191c33 3px solid;
					border-radius: 50%;
					right: -10px;
					bottom: -5px;
				}
			}

			.add-balance {
				cursor: pointer;
				margin-right: 20px;
				height: 92px;
				margin-top: 1px;

				img {
					width: 46px;
					height: 92px;
				}
			}
		}
		.home-menu {
			height: 296px !important;
			top: 92px;
			position: absolute;
			width: 232px;
			height: 0;
			background: #111222;
			// box-shadow: 0px 11px 59px 0px rgba(15, 17, 33, 0.76);
			display: flex;
			flex-direction: column;
			align-items: center;
			z-index: 99;
			right: 0;
			box-sizing: border-box;
			// padding-left: 40px;
			transition: all 0.6s;
			// height: 0;
			opacity: 0;
			z-index: -1;
			visibility: hidden;

			.menu-wrap1 {
				display: flex;
				flex-direction: column;
				// align-items: center;
				background: #0f101f;
				width: 100%;
				height: 58px;
				// padding-top: 20px;
				box-sizing: border-box;
				// padding-left: 40px;
				justify-content: space-between;
				padding: 20px 0px 20px 0px;
			}

			.menu-wrap2 {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 100%;
				// height: 233px;
				box-sizing: border-box;
				// padding-top: 20px;
				// padding-left: 40px;
				justify-content: space-between;
				padding: 20px 0 20px 0px;
			}

			.menu-item {
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #979cc4;
				width: 100%;
				height: 44px;
				// margin-bottom: 22px;
				box-sizing: border-box;
				padding-left: 40px;
				cursor: pointer;
				background: #111222;

				&.logout {
					background: #0f101f !important;
					height: 69px;
					// margin-top: 10px;
					padding-left: 44px;

					img {
						height: 20px;
						width: auto !important;
					}
				}

				&:hover {
					color: #fff;
				}

				.new{
					padding-bottom: 2px;
					box-sizing:border-box;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 28px;
					height: 14px;
					background: #FF0000;
					margin-left: 6px;
					color: #FFF;
					font-family: Microsoft YaHei;
					font-size: 9px;
					font-style: normal;
					font-weight: 400;
				}

				.menu-item-icon {
					width: 24px;
					margin-right: 10px;

					img {
						width: 24px;
					}
				}
			}

			&.active {
				// height: 329px;
				opacity: 1;
				z-index: 1;
				visibility: visible;
			}
		}
	}

	.header_height {
		height: 92px;
	}
}

@media ( max-width: 1600PX ) {
	.nav_item
	{
		font-size: 14px !important;
		padding: 0 20px !important;
	}
}

@media ( max-width: 1400PX ) {
	.nav_item
	{
		font-size: 12px !important;
		padding: 0 16px !important;
	}
}
</style>
