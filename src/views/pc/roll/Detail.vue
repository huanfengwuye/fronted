<script setup>
import i18n from "@/lang"
const t = i18n.global.t
import { onMounted, ref, watch } from "vue";
import fudaiImage from "@/assets/romimg/common/fudai.png";
import { GoodImageBgType } from "@/util/util";
import {
	getResultList,
	getUserList,
	getGoodsList,
	joinRoll,
	getDetails,
	subscribe
} from "@/network/api/roll";
import { useStore } from "vuex";

import { useRoute, useRouter } from "vue-router";
import { getGoodsNamePre, getGoodsNameSec, Success } from '@/util/common';
import useClipboard from "vue-clipboard3";
import QRDialog from '@/components/qr-dialog/qr-dialog.vue'

const { toClipboard } = useClipboard();

const route = useRoute();
const router = useRouter();
const rollId = Number(route.query.rollId);
const store = useStore();
const rollInfo = ref({});
const tabType = ref(0); //0奖池，1参与人员，2获奖名单
const tabnavType = ref(0);
const passwordShow = ref(false); //密码加入
const password = ref(""); //密码

const goodslist = ref([]); //奖品列表
const userlist = ref([]); //参与人员列表
const winninglist = ref([]);

const goodsPager = ref({ pageIndex: 1, limit: 18 });
const goodsLoading = ref(false);
const goodsFinished = ref(false);
const customGoodsLoading = ref(false);

const userPager = ref({ pageIndex: 1, limit: 32 });
const userLoading = ref(false);
const userFinished = ref(false);
const customUserLoading = ref(false);

const winningPager = ref({ pageIndex: 1, limit: 20 });
const winningLoading = ref(false);
const winningFinished = ref(false);
const customWinningLoading = ref(false);

const hasInfo = ref(false);

const btnOpenActive = ref(true); //防快速点击

onMounted(() => {
	getRollInfo();
});

watch(
	() => store.state.openResultRollId,
	(newRollId, preRollId) => {
		getRollInfo();
	}
);

async function getRollInfo() {
	let res = await getDetails({ rollId: rollId });
	if (res.code == 0) {
		rollInfo.value = res.data.item || {};
		rollInfo.value.inRoll = res.data.inRoll;
		rollInfo.value.hasPassword = res.data.hasPassword;
		hasInfo.value = true;
		goodsPager.value.pageIndex = 1;
		goodsFinished.value = false;
		getRollGoods();

		userPager.value.pageIndex = 1;
		userFinished.value = false;
		isSubscribed.value = res.data.isSubscribe
		console.log( isSubscribed.value )
		getRollUser();

		if (rollInfo.value.isSettle) {
			winningPager.value.pageIndex = 1;
			winningFinished.value = false;
			getRollwinning();
		}
	} else {
		hasInfo.value = false;
		goodsLoading.value = false;
		goodsFinished.value = true;
		userLoading.value = false;
		userFinished.value = true;
		winningLoading.value = false;
		winningFinished.value = true;
	}
}

async function getRollGoods() {
	customGoodsLoading.value = true;
	let res = await getGoodsList({
		page: goodsPager.value.pageIndex,
		limit: goodsPager.value.limit,
		rollId: rollId,
	});
	if (res.code == 0) {
		let items = res.data.items || [];
		let preList = goodslist.value;
		if (res.data.page == 1) {
			preList = [];
		}
		goodslist.value = [...preList, ...items];
		goodsLoading.value = false;

		if (items.length < res.data.limit) {
			goodsFinished.value = true;
		}
	} else {
		goodsLoading.value = false;
		goodsFinished.value = true;
	}
	customGoodsLoading.value = false;
}

async function getRollUser() {
	customUserLoading.value = true;
	let res = await getUserList({
		page: userPager.value.pageIndex,
		limit: userPager.value.limit,
		rollId: rollId,
	});
	if (res.code == 0) {
		let items = res.data.items || [];
		let preList = userlist.value;
		if (res.data.page == 1) {
			preList = [];
		}
		userlist.value = [...preList, ...items];
		userLoading.value = false;

		if (items.length < res.data.limit) {
			userFinished.value = true;
		}
	} else {
		userLoading.value = false;
		userFinished.value = true;
	}
	customUserLoading.value = false;
}

async function getRollwinning() {
	customWinningLoading.value = true;
	let res = await getResultList({
		page: winningPager.value.pageIndex,
		limit: winningPager.value.limit,
		rollId: rollId,
	});
	if (res.code == 0) {
		let items = res.data.items || [];
		let preList = winninglist.value;
		if (res.data.page == 1) {
			preList = [];
		}
		winninglist.value = [...preList, ...items];
		winningLoading.value = false;

		if (items.length < res.data.limit) {
			winningFinished.value = true;
		}
	} else {
		winningLoading.value = false;
		winningFinished.value = true;
	}
	customWinningLoading.value = false;
}

function onGoodsLoad() {
	if (customGoodsLoading.value) return;
	goodsPager.value.pageIndex += 1;
	getRollGoods();
}

function onUserLoad() {
	if (customUserLoading.value) return;
	userPager.value.pageIndex += 1;
	getRollUser();
}

function onWinningLoad() {
	if (customWinningLoading.value) return;
	winningPager.value.pageIndex += 1;
	getRollwinning();
}

function onClickTab(type) {
	tabType.value = type;
	if (!hasInfo.value) return;
	if (type == 0) {
		goodsPager.value.pageIndex = 1;
		goodsFinished.value = false;
		getRollGoods();
	} else if (type == 1) {
		userPager.value.pageIndex = 1;
		userFinished.value = false;
		getRollUser();
	} else if (type == 2) {
		winningPager.value.pageIndex = 1;
		winningFinished.value = false;
		getRollwinning();
	}
}

async function onClickJoin() {
	if (rollInfo.value.hasPassword) {
		if (!passwordShow.value) {
			passwordShow.value = true;
			return;
		} else {
			if (!password.value) {
				Warn({ offset: 100, message: t( 'sign.enterPassword' ), customClass: "error" });
				return;
			}
		}
	}
	let params = {};
	params.rollId = rollId;
	if (password.value) {
		params.joinPassword = password.value;
	}
	if (!btnOpenActive.value) return;
	btnOpenActive.value = false;

	let res = await joinRoll(params);

	btnOpenActive.value = true;
	if (res.code == 0) {
		Success({ offset: 100, message: t( 'battle.joinSuccess' ) });
		getRollInfo();
		passwordShow.value = false;
	}
}

function onClickPWCancel() {
	passwordShow.value = false;
	password.value = "";
}

function onClickPWJoin() {
	onClickJoin();
}

function getImageBg(item) {
	let level = item.goodsLevel;
	if (item.goodsLevel == 0) {
		level = 1;
	}
	return store.getters.getGoodsBgImage(GoodImageBgType.roll, level);
}

function getImageIcon(item) {
	if (item.goodsType == 2) {
		return fudaiImage;
	} else {
		return item.iconUrl;
	}
}

function onClickRollTab(index) {
	router.push({
		path: "/p/roll",
		query: {
			tabIndex: index,
		},
	});
}
function onClickCopy() {
	copy(location.href);
}
async function copy(value) {
	try {
		await toClipboard(value);
		Success({ offset: 100, message: t('common.copySuccess' ) });
	} catch (e) {
		Warn({ offset: 100, message: t('common.copyFail' ), customClass: "error" });
	}
}
const truncatedNickName = (nickName) => {
	const maxLength = 6;
	return nickName.length > maxLength
		? `${nickName.slice(0, maxLength)}...`
		: nickName;
};

const isSubscribed = ref( false )
const showMpQRCode = ref( false )

async function toSubscribe()
{
	if( isSubscribed.value ) return

	window.$dev && console.log( rollId )
	let res = await subscribe( { rollId : rollId } )
	if( res.code === 0 )
	{
		console.log( res )
		// NotifyS( '订阅成功' )
		// isSubscribed.value = true
		if( res.data.subscribeStatus === 0 )
		{
			return showMpQRCode.value = true
		}

		if( res.data.subscribeStatus === 1 )
		{
			window.Success( '预约成功' )
			return isSubscribed.value = true
		}
	}
	else
	{
		window.Warn( '订阅失败，请重试' )
	}
}

function closeQRCode()
{
	showMpQRCode.value = false
}
</script>

<template>
	<div id="pc-roll-details" class="min-wrap-height">
		<div class="pc-tabs" v-if="false">
			<div class="tab-item" @click="onClickRollTab(1)">
				<svg class="icon">
					<use xlink:href="@/assets/fonts/icon.svg#gifts"></use></svg>
					{{ t( 'battle.allRoom' ) }}
			</div>
			<div class="tab-item" @click="onClickRollTab(2)">
				<svg class="icon">
					<use xlink:href="@/assets/fonts/icon.svg#gift-3"></use>
				</svg>
				{{ t( 'battle.myRoom' ) }}
			</div>
		</div>

		<QRDialog :show="showMpQRCode" @close="closeQRCode"/>

		<div class="roll-wrap">
			<div class="roll-details-info">
				<div class="roll-left" v-if="false">
					<div class="roll-head" v-if="rollInfo.rollType == 1">
						<img src="@/assets/pcimg/roll/anc_head.png" alt="" />
						<div>{{ t( 'battle.officialRoom' ) }}</div>
					</div>
					<div class="roll-head" v-if="rollInfo.rollType == 2">

						<img src="@/assets/pcimg/roll/off_head.png" alt="" v-if="!rollInfo.anchorUser"/>
						<img :src="rollInfo.anchorUser.avater" alt="" v-else/>
						<div class="anchor">{{ t( 'battle.anchorRoom' ) }}</div>
					</div>
					<div class="roll-state">
						{{ rollInfo.isSettle ? t( 'battle.finished' ) : t( 'battle.inProgress' ) }}
					</div>
				</div>
				<div class="roll-right">
					<div class="info-name">{{ rollInfo.rollName }}</div>
					<div class="bottom-info">
						<div class="info-item" v-if="false">
							<img src="@/assets/pcimg/roll/door.png" alt="" />
							<p>{{ t( 'battle.roomId' ) }}:{{ rollInfo.id }}</p>
							<svg class="icon-copy" @click="onClickCopy">
								<use xlink:href="@/assets/fonts/icon.svg#copy"></use>
							</svg>
						</div>
						<div class="info-item">
							<img src="@/assets/pcimg/roll/time.png" alt="" />
							<p>{{ t( 'battle.startTime' ) }}:{{ rollInfo.startTime }}</p>
						</div>
						<div class="info-item">
							<img src="@/assets/pcimg/roll/time.png" alt="" />
							<p>{{ t( 'battle.endTime' ) }}:{{ rollInfo.endTime }}</p>
						</div>
					</div>
					<div class="roll-img">
						<div class="roll-head" v-if="rollInfo.rollType == 1">
							<img src="@/assets/pcimg/roll/anc_head.png" alt="" />
							<div class="anchor">{{ t( 'battle.officialRoom' ) }}</div>
						</div>
						<div class="roll-head" v-if="rollInfo.rollType == 2">

							<img src="@/assets/pcimg/roll/off_head.png" alt="" v-if="!rollInfo.anchorUser"/>
							<img :src="rollInfo.anchorUser.avater" alt="" v-else/>
							<div class="anchor">{{ t( 'battle.anchorRoom' ) }}</div>
						</div>
					</div>
					<div class="details-rule">
						<div class="details-rule-content" v-html="rollInfo.rollDesc"></div>
					</div>
					<div class="btn-group">
						<div
							v-show="rollInfo.inRoll && !rollInfo.isSettle"
							class="details-btn"
						>
							{{ t( 'battle.joined' ) }}
						</div>
						<div
							v-show="!rollInfo.inRoll && !rollInfo.isSettle"
							class="details-btn"
							@click="onClickJoin"
						>
							{{ t( 'battle.join' ) }}
						</div>

						<!-- <div class="reserve" :class="{ subscribed : isSubscribed }" @click="toSubscribe()">
							<icon name="clock" v-if="!isSubscribed"></icon>
							<icon name="right" color="#fff" v-else></icon>
							{{ !isSubscribed ? '预约提醒' : '已预约' }}
						</div> -->
					
						<div v-show="rollInfo.isSettle" class="details-btn">{{ t( 'battle.finished' ) }}</div>
					</div>
				</div>
			</div>
			<div class="common-nav" v-if="false">
				<div
					class="common-nav-item"
					:class="{ active: tabType == 0 }"
					@click="onClickTab(0)"
				>
					{{ t( 'battle.rollRewardPrize' ) }}
				</div>
				<div
					class="common-nav-item"
					:class="{ active: tabType == 1 }"
					@click="onClickTab(1)"
				>
					{{ t( 'battle.participant' ) }}
				</div>
				<div
					class="common-nav-item"
					v-show="rollInfo.isSettle"
					:class="{ active: tabType == 2 }"
					@click="onClickTab(2)"
				>
					{{ t( 'battle.rewardUsers' ) }}
				</div>
			</div>
			<div class="roll-pool" v-if="winninglist.length > 0&&false">
				<div class="pool-header">
					<div class="item">
						<p>{{ t( 'battle.rewardRecord' ) }}</p>
					</div>
				</div>
				<div class="pool-items">
					<div
						class="pool-item"
						v-for="(item, index) in winninglist"
						:key="index"
					>
						<div class="item-card award">
							<div class="card-label" v-if="false">
								<!-- <p>饰品价格</p> -->
								<span
									><img
										class="pc-price-coin"
										src="@/assets/pcimg/common/coin.png"
										alt=""
									/>{{ item.price }}</span
								>
							</div>
							<div
								class="weapon-item-pic"
								:style="`background-image: url(` + getImageBg(item) + `)`"
							>
								<img :src="getImageIcon(item)" :alt="item.goodsName" />
							</div>
							<div class="user-info">
								<Avatar
									:userModel="item.user"
									:size="'pc-openbox-header'"
								>
								</Avatar>
								<p class="hide">{{ truncatedNickName(item.user.nickName) }}</p>
							</div>
							<!-- <div class="item-info">
																<p class="item-info1">{{ getGoodsNamePre(item.goodsName) }}</p>
																<p class="item-info2">{{ getGoodsNameSec(item.goodsName, item.goodsType) }}</p>
														</div> -->
						</div>
					</div>
				</div>
				<div class="btn-more" v-if="!winningFinished" @click="onWinningLoad">
					{{ t( 'common.loadmore' ) }}
				</div>
			</div>
			<div class="roll-pool-box">
				<div class="tab-wrap">
					<div class="tab-item" :class="{ 'active': tabnavType == 0 }" @click="tabnavType = 0">
						{{'包含奖品' }}
					</div>
					<div class="tab-item" :class="{ 'active': tabnavType == 1 }" @click="tabnavType = 1">
						{{ '参与用户' }}
					</div>
					<div class="num_box">
						<div v-if="tabnavType==0">奖品件数：{{ rollInfo.goodsNum  }}</div>
						<div v-else-if="tabnavType==1">参与人数：{{ rollInfo.userNum }}</div>
					</div>
				</div>
				<div class="roll-pool" v-if="tabnavType==0">
					<div class="pool-header" v-if="false">
						<div class="item">
							<p>{{ t( 'battle.goodsNameTitle' ) }}</p>
							<span>{{ rollInfo.goodsNum }}</span>
						</div>
						<div class="item line-item">
							<p>{{ t( 'battle.priceTotal' ) }}：</p>
							<!-- <img
								class="pc-price-coin"
								src="@/assets/pcimg/common/coin.png"
								alt=""
							/><span>{{ rollInfo.priceNum }}</span> -->
							<Price
								:currency="rollInfo.priceNum"
								fontWeight="700"
								color="#f9a328"
								size="18"
								
							></Price>
						</div>
					</div>
					<div class="pool-items" >
						<div
							class="pool-item"
							v-for="(item, index) in goodslist"
							:key="index"
						>
							<div class="item-card">
								<div class="card-label" v-if="false">
									<p>{{ t( 'battle.price' ) }}</p>
									<span
										><img
											class="pc-price-coin"
											src="@/assets/pcimg/common/coin.png"
											alt=""
										/>{{ item.price }}</span
									>
								</div>
								<div>{{ item.goodsType }}</div>
								<div
									class="weapon-item-pic"
									:style="`background-image: url(` + getImageBg(item) + `)`"
								>
									<img :src="getImageIcon(item)" :alt="item.goodsName" />
								</div>
								<div class="item-info">
									<p class="item-info1">{{ getGoodsNamePre(item.goodsName) }}</p>
									<p class="item-info2">
										{{ getGoodsNameSec(item.goodsName, item.goodsType) }}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="btn-more" v-if="!goodsFinished" @click="onGoodsLoad">
						{{ t( 'common.loadmore' ) }}
					</div>
				</div>
				<div class="roll-pool" v-else-if="tabnavType==1">
					<div class="pool-header" v-if="false">
						<div class="item">
							<p>{{ t( 'battle.participant' ) }}</p>
							<span>{{ rollInfo.userNum }}</span>
						</div>
					</div>
					<div class="pool-players">
						<div
							class="pool-player"
							v-for="(item, index) in userlist"
							:key="index"
						>
							<Avatar
								:userModel="item"
								:size="'pc-roll-player'"
								:hide-frame="true"
							></Avatar>
						</div>
					</div>
					<div class="btn-more" v-if="!userFinished" @click="onUserLoad">
						{{ t( 'common.loadmore' ) }}
					</div>
				</div>
			</div>
		</div>
		<div class="join-pw" :class="{ active: passwordShow }">
			<div class="pw-join-box">
				<p>{{ t( 'sign.enterPassword' ) }}</p>
				<input type="text" v-model="password" ref="input" maxlength="10" />
				<div class="pw-join-btns">
					<p @click="onClickPWCancel">{{ t( 'notify.cancel' ) }}</p>
					<p @click="onClickPWJoin">{{ t( 'notify.confirm' ) }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
#pc-roll-details {
	box-sizing: border-box;
	width: 100%;
	padding-bottom: 30px;
	width: 100%;
	border-top: 1px solid transparent;
	background: url(@/assets/pcimg/roll/roll_bg.png) center center/100% 100%;
	.pc-tabs {
		background-color: #111324;
		font-size: 16px;
		color: #fff;
		display: flex;
		height: 80px;
		line-height: 80px;
		align-items: center;
		text-align: center;
		justify-content: flex-start;
		max-width: 1440px;
		width: 100%;
		margin: 50px auto 0;
		box-sizing: border-box;

		.tab-item {
			color: #9ca1c7;
			width: 300px;
			cursor: pointer;

			.icon {
				display: inline-block;
				vertical-align: middle;
				fill: currentColor;
				position: relative;
				top: -2px;
				width: 20px;
				height: 20px;
				color: #9ca1c7;
				margin-right: 12px;
				font-size: 16px;
				text-transform: uppercase;
				flex-shrink: 0;
			}

			&.active {
				color: #fff;
				border-bottom: solid 1px #4b56bc;

				.icon {
					color: #4b56bc;
				}
			}
		}
	}

	.roll-wrap {
		width: 100%;
		max-width: 1440px;
		box-sizing: border-box;
		margin: 40px auto 0;
		background: url(@/assets/pcimg/roll/Roll_room_bg.webp) no-repeat center center/100% 100%;
		display: flex;
		padding: 100px 61px 15px;

	}

	.roll-details-info {
		position: relative;
		display: flex;
		flex-direction: column;
		max-width: 1440px;
		width: 245px;
		height: 334px;
		align-items: flex-start;
		// border: 1px solid #2d2d67;
		// background: #15172c;
		// box-shadow: 0px 0px 59px 1px rgba(41, 34, 139, 0.15) inset;
		box-sizing: border-box;
		flex-shrink: 0;

		.roll-left {
			display: flex;
			// width: 300px;
			height: 100%;
			padding: 40px 30px;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			// background: #1a1d37;
			box-sizing: border-box;
			position: relative;

			
			.roll-state {
				display: flex;
				height: 44px;
				width: 240px;
				justify-content: center;
				align-items: center;
				border-radius: 4px;
				background: #121322;
				position: absolute;
				bottom: 40px;
				color: #8589a5;
				text-align: center;
				font-size: 15px;
				font-weight: 700;
			}
		}

		.roll-right {
			display: flex;
			height: 100%;
			// padding: 45px;
			padding: 20px 20px 20px 15px;
			box-sizing: border-box;
			flex-direction: column;
			align-items: flex-start;
			box-sizing: border-box;
			width: 100%;
			position: relative;
			.info-name {
				width: 100%;
				color: #5562e2;
				font-size: 22px;
				font-style: normal;
				line-height: 46px;
				max-width: 1000px;
				flex-shrink: 0;
				font-weight: bold;
				text-align: center;
			}

			.details-rule {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-top: 5px;

				.details-rule-content {
					width: 100%;
					color: #fff;
					font-size: 14x;
					width: 100%;
					background-color: rgb(235, 220, 209);
					padding: 20px 15px;
					border-radius: 6px;
					margin-bottom: 15px;
					color: rgb(66, 43, 32);
					font-weight: 600;
					overflow-y: auto;
					box-sizing: border-box;
					max-height:100px;
				}
			}

			.btn-group
			{
				display: flex;
				gap: 12px;

				.reserve,
				.details-btn {
					display: flex;
					height: 50px;
					width: 200px;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					color: #fff;
					font-size: 22px;
					font-weight: 700;
					margin-top: 20px;
					border-radius: 4px;
					// background: #3a33ac;
					background: url(@/assets/pcimg/activity/openbox_openBtn_bg.webp) no-repeat center center / 100% 100%;
				}

				.reserve
				{
					width: 132px;
					background-color: #FFE063;
					color: #15172C;
					font-size: 16px;
					font-weight: 400;
					gap: 8px;

					&.subscribed
					{
						background-color: #78C326 !important;
						color: #fff;
					}
				}
			}

			.bottom-info {
				// position: absolute;
				display: flex;
				// bottom: 45px;
				flex-direction: column;
				margin-bottom: 20px;
				.info-item {
					display: flex;
					align-items: center;
					font-size: 13px;
					color: #8d91ae;
					margin-right: 44px;
					position: relative;

					img {
						position: relative;
						top: -1px;
						margin-right: 10px;
						width: 20px;
					}

					.icon-copy {
						display: inline-block;
						vertical-align: middle;
						fill: currentColor;
						position: relative;
						top: 0px;
						width: 40px;
						height: 20px;
						color: #707290;
					}
				}
			}
			.roll-img{
				width: 90px;
				height: 90px;
				border-radius: 50%;
				overflow: hidden;
				margin:  0 auto;
				flex-shrink: 0;
				.roll-head {
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;
				background: url(@/assets/pcimg/roll/head_bg.png) no-repeat center;
				background-size: 100% 100%;
				// width: 300px;
				// height: 334px;
				height: 100%;

				img {
					width: 100%;
					height: 100%;
					// margin-top: 50px;
					// border-radius: 12px;
				}

				div {
					display: flex;
					width: 100px;
					height: 30px;
					justify-content: center;
					align-items: center;
					border-radius: 10px;
					background: #cb8928;
					position: absolute;
					top: 142px;
					color: #fff;
					font-size: 12px;
					line-height: 19.5px;
					box-sizing: border-box;
				}

				.anchor {
					position: absolute;
					top: 0;
					right: 0px;
					background: #7349ca;
				}
			}

			}
		}
	}
	.roll-pool-box{
		padding: 20px 20px 20px 45px;
		flex: 1;
		.tab-wrap {
			display: flex;
			align-items: center;
			position: relative;
			// height: 96px;
			margin-bottom: 20px;

			.tab-item {
				width: 140px;
				height: 26px;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 16px;
				font-weight: bold;
				color: #EFEDEB;
				background: none;
				cursor: pointer;
				// border-bottom: 1px solid #0D0E1A;
				background: url(@/assets/pcimg/activity/boxlist_tab_bg.webp) no-repeat center center / 100% 100%;
				&:hover
				{
					// border-bottom: 1px solid #4638AD;
				}

				img {
					width: 28px;
					height: 25px;
					margin-right: 10px;
				}

				.icon-active {
					display: none;
				}

				.icon-common {
					display: block;
				}

				&.active {
					color: #fff;
					// border-bottom: 1px solid #4638AD;
					background: url(@/assets/pcimg/activity/boxlist_tab_active_bg.webp) no-repeat center center / 100% 100%;

					.icon-active {
						display: block;
					}

					.icon-common {
						display: none;
					}

				}
			}

			.fliter-tab {
				display: flex;
				align-items: center;
				margin-left: 36px;

				.fliter-item {
					width: 96px;
					height: 40px;
					border: 1px solid #1E2037;
					border-radius: 12px;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 18px;
					color: #545774;
					cursor: pointer;
					margin-right: 10px;

					&:hover
					{
						border: 1px solid #434997;

					}


					&.active {
						color: #fff;
						border: 1px solid #434997;
						-moz-box-shadow: 0px 0px 26px rgba($color: #29228B, $alpha: .25) inset;
						-webkit-box-shadow: 0px 0px 26px rgba($color: #29228B, $alpha: .25) inset;
						box-shadow: 0px 0px 26px rgba($color: #29228B, $alpha: .25) inset;

					}
				}
			}
			.num_box{
				position: absolute;
				top: 0px;
				right: 70px;
				font-size: 18px;
				font-family: SourceHan;
				font-weight: bold;
				color: rgb(254, 241, 179);
			}
		}
	}
	.roll-pool {
		height: 400px;
		overflow-y: auto;
		overflow-x: hidden;
		padding-right: 20px;
		&::-webkit-scrollbar{
			width: 6px;
		}
		&::-webkit-scrollbar-thumb{
			background-color: #fab15c;
		}
		.pool-header {
			display: flex;
			font-size: 18px;
			padding-left: 36px;
			margin-top: 40px;
			margin-bottom: 40px;

			.item {
				display: flex;
				align-items: center;

				p {
					color: #fff;
					font-size: 18px;
					font-style: normal;
					font-weight: 700;
					line-height: 27px;
				}

				span {
					display: inline-block;
					margin-left: 5px;
					color: #f9a328;
					font-weight: 700;
				}
			}

			.line-item {
				&::before {
					content: "|";
					margin-left: 15px;
					margin-right: 13px;
					color: #4b56bc;
				}

				img {
					width: 18px;
					height: 18px;
				}
			}
		}

		.pool-items {
			display: flex;
			flex-wrap: wrap;
			margin: -4px;
			gap: 10px;
			.pool-item {
				padding: 4px;
				// flex: 0 0 12.5%;
				// max-width: 12.5%;
				box-sizing: border-box;

				.item-card {
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					background-color: #1b1e38;
					width: 160px;
					height: 150px;
					.card-label {
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-top: 40px;

						p {
							color: #4b4d5f;
							font-size: 12px;
							line-height: 18px;
						}

						span {
							display: flex;
							align-items: center;
							color: #7bdca2;
							font-family: MullerM;
							font-size: 13px;
							font-style: normal;
							font-weight: 700;
							line-height: 18.75px;

							img {
								width: 12px;
								height: 12px;
								margin-bottom: 2px;
							}
						}
					}

					.weapon-item-pic {
						display: flex;
						align-items: center;
						justify-content: center;
						position: relative;
						max-width: 100%;
						height: 78px;
						background-size: contain;
						background-position: center;
						background-repeat: no-repeat;

						img {
							max-width: 90%;
							max-height: 90%;
						}
					}

					.user-info {
						display: flex;
						justify-content: center; /* 水平居中 */
						align-items: center; /* 垂直居中 */
						// margin-top: -5px;
						width: 100%;
						height: 70px;
						background-color: #202447;
						margin-top: 15px;
						border-bottom-left-radius: 5px;
						border-bottom-right-radius: 5px;
						p {
							color: #fff;
							font-size: 13px;
							height: 19.5px;
							line-height: 19.5px;
							margin-left: 10px;
						}
					}

					.item-info {
						display: flex;
						align-items: center;
						flex-direction: column;
						margin-top: 10px;

						.item-info1 {
							color: rgba(255, 255, 255, 0.6);
							font-size: 13px;
							height: 19.5px;
							line-height: 19.5px;
						}

						.item-info2 {
							color: #fff;
							font-size: 13px;
							line-height: 19.5px;
						}
					}

					&.award {
						height: 260px;
						border-radius: 5px;
					}
				}
			}
		}

		.pool-players {
			display: flex;
			flex-wrap: wrap;
			margin: -15px;

			.pool-player {
				width: 90px;
				height: 96px;
				padding: 6px;
				box-sizing: border-box;
			}
		}

		.btn-more {
			display: flex;
			height: 40px;
			width: 100px;
			justify-content: center;
			align-items: center;
			border-radius: 4px;
			background: #3a33ac;
			color: #fff;
			font-size: 12px;
			margin: 20px auto 0;
		}
	}

	.join-pw {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		box-sizing: border-box;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		padding-bottom: 100px;
		background: rgba($color: #000000, $alpha: 0.8);
		opacity: 0;
		z-index: -1;
		transition: 0.2s;
		color: #fff;
		text-align: center;

		&.active {
			opacity: 1;
			z-index: 202;
		}

		.pw-join-box {
			width: 552px;
			height: 294px;
			background: #20222b;

			p {
				font-size: 32px;
				text-align: center;
				margin: 40px 0;
			}

			input {
				width: 477px;
				height: 61px;
				border: 2px solid #3a33ac;
				background: none;
				padding: 0 20px;
				box-sizing: border-box;
				font-size: 28px;
			}

			.pw-join-btns {
				display: flex;
				justify-content: center;
				height: 80px;
				margin-top: 26px;

				p {
					display: flex;
					height: 60px;
					width: 150px;
					justify-content: center;
					align-items: center;
					border-radius: 4px;
					background: #3a33ac;
					color: #fff;
					font-size: 16px;
					margin: 0 20px;
				}
			}
		}
	}
}
</style>
