<script lang="ts">
import { Component } from 'vue-facing-decorator'
import Header from '@/scripts/modules/header/header'

@Component
export default class H5Header extends Header {}
</script>

<template>
	<!-- :class="[{ active: $route.name == 'm_home' }]" -->
	 <!-- noIndex: route.name != 'm_index_main' -->
	<div
		id="top-header"
		
		v-if="store.state.showHeaderView"
	>
		<div class="header_top" :class="{ active: indexActive, }">
			<div class="opt-wrap">
				<div class="nav-btn" v-if="false">
					<img
						class="back"
						v-if="isback()"
						src="@/assets/romimg/header/return.png"
						alt=""
						@click="routerReturn"
					/>
					<img
						v-else
						src="@/assets/romimg/header/left_nav_btn.png"
						alt=""
						@click="setNavShow"
					/>
				</div>
				<div class="logo-wrap">
					<div class="logo">
						<img src="@/assets/pcimg/activity/titleIcon.png" alt="" @click="jump('/')" />
						<!-- {{
							getTitle()
						}} -->
					</div>
				</div>
			</div>

			<div class="login-wrap" v-show="!hasLogin"  >
				<!-- @click="onH5ClickSign" -->
				<!-- <img src="@/assets/romimg/sign/login.png" alt="" srcset="" />
				{{ t( 'router.login' ) }} -->
        		<div class="login2_btn" @click="onClickSign('2')">注册</div>
				<div class="login_btn" @click="onClickSign('1')">登录</div>
			</div>

			<div class="user-wrap" @click="setH5UserShow" v-show="hasLogin">
				<div class="user-info-wrap">
					<div class="nickname">
						<!-- <span>{{ userInfoAssets.amount }}</span> -->
						{{ formatName(userInfoBase.nickName) }}
					</div>
					<!-- <div class="balance" v-html="showFloat(userInfoAssets.amount)"></div> -->
					<Price
						fontsize="12"
						font-weight="700"
						color="#75DC9E"
						:currency="userInfoAssets.amount"
					></Price>
				</div>
				<div class="user-header">
					<H5Avatar :userModel="userInfoBase" :size="'one'"></H5Avatar>
					<div v-if="noReadMessages > 0" class="user-note"></div>
				</div>
			</div>
		</div>
		<div class="header_height"></div>

		<van-popup
			v-model:show="navShow"
			position="left"
			:style="{ height: '100%' }"
		>
			<div
				v-for="(item, index) in leftMemuData"
				:key="index"
				class="nav_item"
				:class="{ active: item.active }"
				@click="item.clickHandler"
			>
				<Icon :name="item.icon" color="#FFF" :size="20"></Icon>
				<label style="margin-left: 12px;">{{ item.text }}</label>
				<div v-if="item.hot" class="hot"></div>
				<span class="icon iconfont">&#xe61e;</span>
			</div>
		</van-popup>
		<van-popup
			v-model:show="userShow"
			position="right"
			class="user-pop"
			:style="{ height: '100%' }"
		>
			<div class="user_area">
				<div class="user-header">
					<H5Avatar :userModel="userInfoBase" :size="'two'"></H5Avatar>
				</div>
				<div class="user-wrap">
					<div class="user_name hide">{{ userInfoBase.nickName }}</div>
					<div class="user_level">
						LV.{{ userInfoBase.userLevel }}
						<!-- <img
							v-for="index in userInfoBase.userLevel"
							:key="index"
							src="@/assets/romimg/header/stars.png"
							alt=""
						/> -->
					</div>
					<div class="user_level">ID:{{ store.state.userId }}</div>
				</div>
			</div>

			<div
				v-for="(item, index) in rightMemuData"
				:key="index"
				class="nav_item"
				:class="{ active: item.active }"
				@click="item.clickHandler"
			>
				<!-- <img :src="getAssetURL(item.icon)" /> -->
				<Icon :name="item.icon" color="#fff" :size="20"></Icon>
				<label style="margin-left: 12px;">{{ item.text }}</label>
				<div v-if="item.hot" class="hot"></div>
				<span class="icon iconfont">&#xe61e;</span>
				<div class="new" v-if=" item.text == '每日签到'">
					NEW
				</div>
			</div>
			<div class="nav_item" @click="onH5ClickExitLogin()">
				<Icon name="logout" color="#fff" :size="20"></Icon>
				<label style="margin-left: 12px;">{{ t( 'menu.logout' ) }}</label>
				<span class="icon iconfont">&#xe61e;</span>
			</div>
			<!-- 
			<div
				class="nav_item"
				:class="{ active: $route.name == 'm_personal' }"
				@click="jump('/m/personal')"
			>
				<img src="@/assets/romimg/nav/personal.png" alt="" />个人资料
			</div>
			<div
				class="nav_item"
				:class="{ active: $route.name == 'm_bag' }"
				@click="jump('/m/bag')"
				v-if="store.state.moduleRucksack"
			>
				<img src="@/assets/romimg/nav/bag.png" alt="" />我的背包
			</div>
			<div
				class="nav_item"
				:class="{ active: $route.name == 'm_recharge' }"
				@click="jump('/m/recharge')"
				v-if="store.state.moduleRecharge"
			>
				<img src="@/assets/romimg/nav/recharge.png" alt="" />账户充值
			</div>
			<div
				class="nav_item"
				:class="{ active: $route.name == 'm_record' }"
				@click="jump('/m/record')"
			>
				<img src="@/assets/romimg/nav/details.png" alt="" />个人明细
			</div>
			<div
				class="nav_item"
				:class="{ active: $route.name == 'm_spreadUser' }"
				@click="jump('/m/spreadUser')"
				v-if="store.state.userInfoBase.userType == UserType.anchor"
			>
				<img src="@/assets/romimg/nav/spread.png" alt="" />推广分红
			</div>
			<div
				class="nav_item"
				:class="{ active: $route.name == 'm_information' }"
				@click="jump('/m/information')"
			>
				<img src="@/assets/romimg/nav/infomation.png" alt="" />站内信息
				<div
					v-if="noReadMessages > 0"
					class="remind"
					:class="{ active: noReadMessages >= 10 }"
				>
					{{ noReadMessages < 100 ? noReadMessages : 99 }}
				</div>
			</div>
			<div
				class="nav_item"
				:class="{
					active:
						$route.name == 'm_contact' ||
						$route.name == 'm_problem' ||
						$route.name == 'm_privacy' ||
						$route.name == 'm_regulations',
				}"
				@click="jump('/m/help')"
			>
				<img src="@/assets/romimg/nav/help.png" alt="" />用户指南
			</div>
		 <div class="sign_out" @click="onClickExitLogin()">退出登录</div> -->
			<!-- <div class="userid-wrap">ID:{{ store.state.userId }}</div> -->
			<div class="tool-wrap">
				<div class="tool-item-wrap" @click="onClickRed">
					<img src="@/assets/romimg/header/red_icon.png" alt="" />
					{{ t( 'menu.redPack' ) }}
				</div>
				<div class="tool-item-wrap" @click="onClickGroup">
					<img src="@/assets/romimg/header/qq_icon.png" alt="" />
					{{ t( 'menu.groupChat' ) }}
				</div>
				<div class="tool-item-wrap" @click="onClickService">
					<img src="@/assets/romimg/header/kefu_icon.png" alt="" />
					{{ t( 'menu.costomerService' ) }}
				</div>
			</div>

			<!-- <div class="sign_out" @click="onH5ClickExitLogin()">
				<span class="icon iconfont">&#xe629;</span>
				{{ t( 'menu.logout' ) }}
			</div> -->
		</van-popup>
		<van-dialog
			v-model:show="qqGroupDialog"
			:showConfirmButton="false"
			:show-cancel-button="true"
		>
			<div class="qqGroup-list-dialog">
				<div
					class="qqGroup-item-wrap"
					v-for="(item, index) in store.state.otherConfig.qqGroup"
					:key="index"
					@click="onClickGroupItem(item)"
				>
					<img src="@/assets/romimg/sidebar/btn_qq.png" alt="" />
					<p>{{ t( 'menu.groupChat' ) }}{{ index + 1 }}</p>
				</div>
			</div>
		</van-dialog>
		<div class="check-bg" v-if="checkShow">
			<div class="check-body">
				<div class="close">
					<img
						src="@/assets/romimg/lucky/close.png"
						alt=""
						@click="checkShow = false"
					/>
				</div>
				<div class="check-main">
					<img class="img-pizz" src="@/assets/romimg/header/pizza.png" alt="">
					<!-- 循环遍历奖励列表 -->
					<div v-for="(item, index) in awardsList" :key="index" class="check-item">
					<!-- 奖励项的主体部分 -->
					<div class="item-body" :class="{active: shouldHighlight(index)}" v-if="index !== 6">
						<!-- 根据条件决定是否显示印章 -->
						<img v-if="shouldShowStamp(index)" class="stamp" :class="{'active': shouldShowActiveStamp(index)}" src="@/assets/pcimg/common/stamp.png" alt="">
						<!-- 根据奖励类型显示对应的图标 -->
						<img v-if="item.goodsType === 1" :src="item.iconUrl" alt="">
						<img v-else src="@/assets/romimg/common/fudai.png" alt="">
						<!-- 如果是实物奖励，显示价格 -->
						<Price v-if="item.goodsType === 1" size="15" font-weight="700" color="#7EF2AD" :currency="item.price"></Price>
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
					<!-- 奖励项的签到状态部分 -->
					<div class="check-status">
						<p v-if="shouldHighlight(index)"></p>
						<p v-else>签到</p>
					</div>
					</div>
					<div class="check-7" :class="{active: shouldHighlight(6)}">
						<div class="check-7-left">
							<p>签到七次</p>
							<Price
								v-if="lastItem.goodsType === 1"
								size="15"
								font-weight="700"
								color="#7EF2AD"
								:currency="lastItem.price"
							></Price>
							<div>
								<p v-if="signList != 7">随机金额</p>
								<Price
									v-else
									size="15"
									font-weight="700"
									color="#7EF2AD"
									:currency="lastItem.price"
								></Price>
							</div>
						</div>
						<img v-if="lastItem.goodsType === 1" :src="lastItem.iconUrl" alt="">
						<img v-else src="@/assets/romimg/common/fudai.png" alt="">
					</div>
				</div>
				<div class="check-btn" v-if="!isSign" @click="onClickOpen">
					立即签到
				</div>
				<div class="aaaaa" v-if="isSign">
					今日已签到
				</div>
				<div class="check-text">
					签到将于每周日晚 23：59：59 刷新
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
	</div>
</template>

<style lang="scss">
#top-header {
	// background: rgba($color: #191c34, $alpha: 1);
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
		.check-body{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column; /* 子元素垂直排列 */
			position: fixed;//创建弹窗背景
			width: 710px;
			height: 1100px;
			background: url( @/assets/romimg/header/check-bg.png ) no-repeat;
			background-size: cover;
			gap: 30px;
			padding-top: 90px;
			box-sizing:border-box;
			.check-main{
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-content: flex-start;
				padding: 40px 0 30px;
				box-sizing:border-box;
				gap: 30px;
				position: relative;
				width: 670px;
				height: 754px;
				border-radius: 12px; 
				background: linear-gradient(201deg, #484E7B 5.1%, #31355A 88.55%);
				overflow: hidden;//隐藏溢出内容
				.check-7{
					padding: 0 41px;
					display: flex;
					align-items: center; /* 垂直方向居中对齐 */
					position: absolute; /* 使用绝对定位 */
					width: 390px;
					height: 180px;
					background: #1C1F39;
					border-radius: 12px;
					border: 1px solid #1E2037;
					bottom: 30px;
					left: 36px;
					gap: 40px;
					img{
						width: 176px;
						// height: 130px;
					}
					&.active{
						box-shadow: 0px 0px 20px 2px #958EFF inset;
					}
					.check-7-left{
						display: flex;
						align-items: center; /* 垂直方向居中对齐 */
						flex-direction: column; /* 子元素垂直排列 */
						gap: 10px;
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
				}
				.check-item{
					display: flex;
					flex-direction: column; /* 子元素垂直排列 */
					width: 180px;
					height: 222px;
					gap: 10px;
					.item-body{
						display: flex;
						justify-content: center;
						align-items: center;
						position: relative;
						flex-direction: column; /* 子元素垂直排列 */
						width: 180px;
						height: 180px;
						background: #1C1F39;
						border-radius: 12px;
						// border: 1px solid #1E2037;
						gap: 5px;
						.stamp{
							width: 90px;
							height: 90px;
							position: absolute; /* 使用绝对定位 */
							bottom: -20px;
							right: -20px;
							opacity: 3;//透明度设置
							&.active{
								animation: stampAnimation 0.3s ease-in-out;
							}
						}
						@keyframes stampAnimation {
							0% {
								transform: scale(2) translate(-25%, -25%);
							}
							50% {
								transform: scale(1.3);
							}
							100% {
								transform: scale(1) translate(0, 0);
							}
						}
						&.active{
							box-shadow: 0px 0px 20px 2px #958EFF inset;
							// border: 2px solid
						}
						.text{
							color: #B4B6C8;
							text-align: center;
							font-family: Microsoft YaHei;
							font-size: 24px;
							font-style: normal;
							font-weight: 400;
							line-height: normal;
							margin-bottom: 0px;
						}
						img{
							width: 100px;
							// height: 100px;
						}
					}
					.check-status{
						display: flex;
						justify-content: center;
						align-items: center;
						// height: 100%;
						width: 100%;
						color: #B4B6C8;
						text-align: center;
						font-family: Microsoft YaHei;
						font-size: 24px;
						font-style: normal;
						font-weight: 400;
						line-height: normal;
					}
				}
				.img-pizz{
					width: 300px;
					height: 244px;
					position: absolute; /* 使用绝对定位 */
					overflow: hidden;//隐藏溢出内容
					z-index: 2;
					bottom: -0px;
					right: -15px;
				}
			}
			.check-btn{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 670px;
				height: 100px;
				border-radius: 8px;
				background: #4B58C9;
				color: #FFF;
				text-align: center;
				font-family: Microsoft YaHei;
				font-size: 32px;
				font-style: normal;
				font-weight: 700;
				line-height: normal;
			}
			.aaaaa{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 670px;
				height: 100px;
				border-radius: 8px;
				background: #32365A;
				color: #5C5D69;
				text-align: center;
				font-family: Microsoft YaHei;
				font-size: 32px;
				font-style: normal;
				font-weight: 700;
				line-height: normal;
			}
			.check-text{
				color: #B4B6C8;
				text-align: center;
				font-family: Montserrat;
				font-size: 24px;
				font-style: normal;
				font-weight: 400;
				// line-height: 20px; /* 166.667% */
			}
			.close {
				position: absolute;
				right: 30px;
				top: 30px;
				img {
					width: 30px;
					height: 30px;
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
			width: 670px;
			height: 660px;
			background: url( @/assets/romimg/header/success.png ) no-repeat;
			background-size: cover;
			gap: 30px;
			padding: 160px 0 30px;
			box-sizing:border-box;
			.success-main{
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column; /* 子元素垂直排列 */
				width: 540px;
				height: 350px;
				// border: 1px solid red;
				gap: 20px;
				position: relative;
				.blinblin{
					position: absolute; /* 使用绝对定位 */
					width: 340px;
					height: 340px;
					animation: rotate 3s linear infinite; /* 使用 rotate 动画，2秒一次，线性变化，无限循环 */

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
					width: 208px;
					height: 220px;
				}
			}

			.success-btn{
				display: flex;
				justify-content: center; /* 水平方向居中对齐 */
				width: 540px;
				height: 100px;
				gap: 30px;
				.btn-right{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 240px;
					height: 100%;
					background: #7D51DF;
					border-radius: 8px;
					color: #FFF;
					text-align: center;
					font-family: Muller;
					font-size: 28px;
					font-style: normal;
					font-weight: 700;
					line-height: 21px; /* 150% */
				}
				.btn-left{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 240px;
					height: 100%;
					background: #3A34B0;
					border-radius: 8px;
					color: #FFF;
					text-align: center;
					font-family: Muller;
					font-size: 28px;
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
					width: 30px;
					height: 30px;
				}
			}
		}
	}

	.header_top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		position: fixed;
		width: 100%;
		height: 124px;
		// background: #191c34;
		opacity: 1;
		padding-left: 20px;
		background: url(@/assets/pcimg/activity/bg_top.png) no-repeat center center/100% 100%;
    	// background-size: 100% auto; /* 以宽度为准铺满 */
		left: 0;
		top: 0;
		z-index: 190;
		&.noIndex{
			background: url(@/assets/pcimg/activity/header_bg_2.webp) no-repeat center center/100% 100%;
		}
		&.active {
			z-index: 200;
		}

		.opt-wrap {
			display: flex;
			align-items: center;
			display: flex;
			justify-content: center;

			.nav-btn {
				width: 65px;
				height: 64px;
				display: flex;
				align-items: center;
				justify-content: start;

				img {
					width: 65px;
					height: 64px;
				}

				.back {
					width: 65px;
				}
			}

			.logo-wrap {
				// margin-left: 14px;
				display: flex;
				align-items: center;

				.logo
				{
					display: flex;
					align-items: center;
					img {
						height: 1.05rem;
						margin-left: 8px;
					}
				}
			}
		}

		.login-wrap {
			display: flex;
			align-items: center;
			justify-content: center;

			height: 124px;
			width: 312px;

			color: #fff;

			font-size: 32px;
			font-style: normal;
			font-weight: 300;
			font-family: HongLei;
			margin-right: 0.4rem;
			gap: 0.4rem;
			// border-bottom: 2px solid #373ab7;
			// background: #1f2447;
			.login_btn{
				height: .74rem;
				width: 1.7rem;
				text-align: center;
				line-height: .74rem;
				font-size: 0.39rem;
				margin-right: 10px;
				font-family: HongLei;
				flex-shrink: 0;
				background: url('@/assets/pcimg/activity/denlu.png') center center / 100% 100% no-repeat;
			}
			.login2_btn{
				height: .74rem;
				width: 1.7rem;
				text-align: center;
				line-height: .74rem;
				font-size: 0.39rem;
				font-family: HongLei;
				flex-shrink: 0;
				background: url('@/assets/pcimg/activity/zhuce.png') center center / 100% 100% no-repeat;
			}
			img {
				width: 64px;
				height: 64px;
				margin-right: 35px;
			}

			// background: url(@/assets/romimg/header/login_bg.png) no-repeat center;
			// background-size: 100% 100%;
		}

		.user-wrap {
			display: flex;
			height: 100%;
			align-items: center;

			.user-info-wrap {
				display: flex;
				flex-direction: column;
				align-items: end;
				justify-content: center;

				.nickname {
					color: #edeef3;
					font-size: 24px;
					font-style: normal;
					font-weight: 700;
					width: 120px;
					text-align: right;
					margin-bottom: 12px;
					// line-height: 50px;
				}
				// .balance {
				// height: 42px;
				// display: flex;
				// width: 100px;
				// color: #75dc9e;

				// line-height: 42px;
				// font-size: 28px;

				// height: 14px;
				// flex-direction: column;
				// justify-content: center;
				// flex-shrink: 0;
				// }
			}

			.user-header {
				position: relative;
				// margin-left: 12px;

				padding-right: 34px;
				padding-left: 24px;

				.user-note {
					box-sizing: border-box;
					position: absolute;
					width: 28px !important;
					height: 28px !important;
					background: #fa2b37;
					border: #191c34 6px solid;
					border-radius: 50%;
					right: 20px;
					bottom: -10px;
				}
			}
		}
	}

	.header_height {
		height: 124px;
	}

	.van-popup {
		z-index: 199 !important;
		background: #1b313f;
		color: #fff;
		width: 460px;

		.nav_item {
			width: 100%;
			height: 120px;
			padding-left: 60px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;

			font-size: 28px;
			color: #feffff;
			font-weight: 400;
			position: relative;
			border-bottom: 1px solid #233e4f;

			img {
				width: 50px;
				height: 50px;
				margin-left: 20px;
				margin-right: 20px;
				// font-size: 40px;
				// margin: 0px 30px;
				// color: #02f1f2;
			}

			span {
				transform: rotate(180deg);
				position: absolute;
				left: 400px;
				font-size: 30px;
				color: #8ba0b1;
			}

			// img {
			//	 width: 32px;
			//	 margin-bottom: 2px;
			//	 margin-left: 20px;
			//	 margin-right: 36px;
			// }

			&:first-child {
				margin-top: 124px;
			}

			.hot {
				position: absolute;
				left: 374px;
				top: 52px;
				width: 20px;
				height: 20px;
				background-color: red;
				border-radius: 50%;
			}

			// &::before {
			//	 display: block;
			//	 content: "＞";
			//	 position: absolute;
			//	 right: 10px;
			//	 color: #02f1f2;
			// }

			&.active {
				background: rgba($color: #1b313f, $alpha: 0.04);
				color: #fff;

				// &::after {
				//	 display: block;
				//	 content: "";
				//	 position: absolute;
				//	 left: 0;
				//	 top: 0;
				//	 width: 8px;
				//	 height: 100%;
				//	 background: #3a33ac;
				// }
				// &::before {
				//	 display: block;
				//	 content: "＞";
				//	 position: absolute;
				//	 right: 10px;
				//	 color: #02f1f2;
				// }
			}
		}

		&.user-pop {
			width: 460px;
			z-index: 201 !important;
			overflow: hidden;
			// background-color: rgba($color: #141221, $alpha: 1);
			background: #1b313f;
			.nav_btn {
				margin-top: 124px;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: rgba($color: #11222c, $alpha: 1);
				color: #1a1c24;
				font-size: 20px;
				font-weight: 580;
				height: 90px;

				.nav_btn_mall {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 160px;
					height: 50px;
					background-color: rgba($color: #4e9af9, $alpha: 1);
					border-radius: 10px;
					margin: 10px;
					text-align: center;
					line-height: 50px;
				}

				.nav_btn_recharge {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 160px;
					height: 50px;
					background-color: rgba($color: #eee131, $alpha: 1);
					margin: 10px;
					border-radius: 10px;
					text-align: center;
					line-height: 50px;
				}
			}

			.nav_item {
				position: relative;
				display: flex;
				padding-left: 30px;
				align-items: center;
				background-color: #1b313f;

				.new{
					display: flex;
					justify-content: center; /* 水平方向居中对齐 */
					align-items: center; /* 垂直方向居中对齐 */
					width: 56px;
					height: 28px;
					background: #FF0000;
					margin-left: 20px;
					color: #FFF;
					// font-family: Microsoft YaHei;
					font-size: 18px;
					font-style: normal;
					font-weight: 400;
					// line-height: 13.5px; /* 150% */
				}

				img {
					width: 50px;
					height: 50px;
				}

				span {
					transform: rotate(180deg);
					position: absolute;
					left: 400px;
					font-size: 30px;
					color: #8ba0b1;
				}

				&.active {
					background: rgba($color: #fff, $alpha: 0.04);
					color: #fff;
					&::after {
						display: none;
					}
				}

				.remind {
					position: absolute;
					width: 30px;
					height: 30px;
					right: 100px;
					top: 50%;
					transform: translateY(-50%);
					background: rgb(229, 94, 88);
					border-radius: 50%;
					color: #fff;
					text-align: center;
					line-height: 32px;
					font-size: 20px;

					&.active {
						width: 34px;
						border-radius: 40%;
					}
				}
			}
		}

		.user_area {
			text-align: center;
			display: flex;
			align-items: center;
			height: 228px;
			padding: 0px 40px;
			background-color: #11222c;
		}
		.user-wrap {
			margin-left: 20px;
			text-align: left;
			.user_name {
				font-size: 26px;
				font-weight: bold;
				text-align: center;
				text-align: left;
				padding-left: 10px;
			}
			.user_level {
				padding-left: 10px;
				margin-top: 15px;
				text-align: left;
			}

			.user_balance {
				display: inline-block;
				color: #eee131;
				font-size: 26px;
				margin-top: 40px;
				text-align: left;

				p {
					margin-top: -20px;
					font-weight: bold;

					img {
						width: 40px;
						height: 40px;
						vertical-align: middle;
						margin-bottom: 4px;
					}

					.arrow {
						width: 20px;
						height: 22px;
						margin-left: 4px;
					}
				}
			}
		}

		.tool-wrap {
			width: 460px;
			height: 300px;
			// background-color: rgb(8, 28, 40);
			text-align: center;
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: #fff;
			font-size: 28px;
			font-weight: 400;
			padding: 0 50px;

			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			box-sizing: border-box;
			bottom: 72px;

			.tool-item-wrap {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 30px;
				img {
					width: 86px;
					height: 86px;
					// margin-bottom: 20px;
				}
			}
		}

		.sign_out {
			width: 460px;
			height: 120px;
			background-color: rgb(8, 28, 40);
			text-align: center;
			color: #fff;
			font-size: 28px;
			font-weight: 400;
			line-height: 120px;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			box-sizing: border-box;
			bottom: 0px;
			span {
				font-size: 36px;
				color: #79faff;
				margin-right: 20px;
				vertical-align: middle;
			}
		}

		.fire {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 36px;
			margin-left: 10px;

			img {
				width: 36px;
				height: 48px;
				margin-bottom: 18px;
			}
		}

		.userid-wrap {
			position: absolute;
			bottom: 120px;
			text-align: center;
			width: 100%;
			color: #fff;
			font-size: 24px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
	}

	.qqGroup-list-dialog {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 80px;

		.qqGroup-item-wrap {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin: 0 50px;

			img {
				width: 55px;
				height: 55px;
				margin-bottom: 5px;
			}

			p {
				font-size: 20px;
				color: #fff;
			}
		}
		.van-hairline--top {
			.van-button {
				display: unset !important;
			}
		}
	}
	.van-dialog__footer {
		height: 96px;
		.van-button {
			display: unset !important;
		}
		.van-dialog__cancel {
			width: 250px !important;
			height: 76px !important;
			// line-height: 66px;
			// display: unset !important;
			// .van-button__content {
			// 	// height: 96px !important;
			// 	// display: flex !important;
			// 	// justify-content: center !important;
			// 	// align-items: center;
			// }
			// display: flex !important;
			// justify-content: center !important;
			// align-items: center;
		}
		// display: flex !important;
		// justify-content: center !important;
		// align-items: center;
	}
}
</style>
