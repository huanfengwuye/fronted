<script setup>

import TopTitleBack from "@/components/h5/common/TopTitleBack.vue";
import { onMounted, ref, watch } from "vue";
import officialImage from "@/assets/romimg/roll/official.png";
import anchorImage from "@/assets/romimg/roll/anchor.png";
import fudaiImage from "@/assets/romimg/common/fudai.png";
import { GoodImageBgType } from "@/util/util";
import { getGoodsLevelColor, NotifyS, NotifyF } from '@/util/common';
import Tabs from "@/components/h5/home/Tabs.vue";
import weaponListCpt from "@/components/h5/weaponListCpt/Index.vue";
import QRDialog from "@/components/qr-dialog/qr-dialog.vue";

import {
	getResultList,
	getUserList,
	getGoodsList,
	joinRoll,
	getDetails,
	subscribe
} from "@/network/api/roll";
import { useStore } from "vuex";

import { useRoute,useRouter } from "vue-router";// import { useI18n } from 'vue-i18n'
// const { t } = useI18n({ legacy: false })

const route = useRoute();
const router = useRouter();
const rollId = Number(route.query.rollId);
const store = useStore();
const rollInfo = ref({});

const passwordShow = ref(false); //密码加入
const password = ref(""); //密码

const goodslist = ref([]); //奖品列表
const userlist = ref([]); //参与人员列表
const winninglist = ref([]);

const goodsPager = ref({ pageIndex: 1, limit: 12 });
const goodsLoading = ref(false);
const goodsFinished = ref(false);
const customGoodsLoading = ref(false);

const userPager = ref({ pageIndex: 1, limit: 20 });
const userLoading = ref(false);
const userFinished = ref(false);
const customUserLoading = ref(false);

const winningPager = ref({ pageIndex: 1, limit: 12 });
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

//roll房类别(官方/主播)
function getRollType(v) {
	if (v == 2) {
		return anchorImage;
	} else {
		return officialImage;
	}
}

async function onClickJoin() {
	if (rollInfo.value.hasPassword) {
		if (!passwordShow.value) {
			passwordShow.value = true;
			return;
		} else {
			if (!password.value) {
				NotifyF( t('battle.enterPassword') );
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
		NotifyS( t('battle.joinSuccess') );
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
	return store.getters.getGoodsBgImage(GoodImageBgType.box, level);
}
function getColor(v) {
	return "color:" + getGoodsLevelColor(v);
}
function getImageIcon(item) {
	if (item.goodsType == 2) {
		return fudaiImage;
	} else {
		return item.iconUrl;
	}
}
function getGoodsName(item) {
	if (item.goodsType == 2) {
		return	t('common.luckyBag');
	} else {
		return item.goodsName;
	}
}

//倒计时过滤
function TimeFilter(time) {
	let date = new Date(time);
	let curTime = new Date();
	return date.getTime() - curTime.getTime();
}
let tabIndex = ref(0);
function tabChangedEvent(event) {
	tabIndex.value = event;
}

const isSubscribed = ref( false )
const showMpQRCode = ref( false )

async function toSubscribe()
{
	if( isSubscribed.value ) return

	window.$dev && console.log( rollId )
	let res = await subscribe( { rollId : rollId } )
	if( res.code === 0 )
	{
		// NotifyS( '订阅成功' )
		// isSubscribed.value = true
		if( res.data.subscribeStatus == 0 )
		{
			return showMpQRCode.value = true
		}

		if( res.data.subscribeStatus == 1 )
		{
			return isSubscribed.value = true
		}
	}
	else
	{
		NotifyF( '订阅失败，请重试' )
	}
}

function closeQRCode()
{
	showMpQRCode.value = false
}
</script>

<template>
	<div id="roll_details">
		<!-- <TopTitleBack :title="t('router.roll')"> -->
			<!-- <div class="reserve" :class="{ subscribed : isSubscribed }" @click="toSubscribe()">
				<icon name="clock"></icon>
				{{ !isSubscribed ? '提醒' : '已预约' }}
			</div> -->
		<!-- </TopTitleBack> -->
		<div class="backBox" @click="router.go(-1)"><span class="back" ></span></div>
		<div class="roll_room_title">
			<div class="rollname hide">{{ rollInfo.rollName }}{{ rollInfo.anchorUser }}</div>
		</div>
		<QRDialog :show="showMpQRCode" @close="closeQRCode"/>
		<div class="roll_details_box">
			<div class="roll-details-info">
				<div class="roll-detail-top" :class="{ active: rollInfo.rollType == 2 }">
					<!-- <div class="rollname hide">{{ rollInfo.rollName }}{{ rollInfo.anchorUser }}</div> -->
					<div class="detail_logo">
						<img
							v-if="rollInfo.rollType == 2"
							src="@/assets/romimg/roll/anchor_icon.png"
							alt=""
						/>
						<img v-else src="@/assets/pcimg/activity/h5room_icon.png" alt="" />
						<div class="desc" :class="{ active: rollInfo.rollType == 2 }">
							{{ rollInfo.rollType == 2 ? t( 'battle.anchor' ) : t( 'battle.official' ) }}
						</div>
					</div>
					<div class="details_right_box">
						<div
							class="roll-detail-time"
							v-if="rollInfo.startTime && rollInfo.endTime"
							>
							<!-- <img src="@/assets/romimg/roll/time.png" alt="" srcset="" /> -->
							&nbsp;{{ t('battle.rewardTime') }}: {{ rollInfo.startTime.substring(0, 16) }} -
							{{ rollInfo.endTime.substring(0, 16) }}
						</div>
					<div class="details-btn-wrap">
						<div
							v-show="rollInfo.inRoll && !rollInfo.isSettle"
							class="details-btn join"
						>
							{{ t('timebox.joined') }}
						</div>
						<div
							v-show="!rollInfo.inRoll && !rollInfo.isSettle"
							class="details-btn"
							@click="onClickJoin"
						>
						{{ t('battle.join') }}
						</div>
						<div v-show="rollInfo.isSettle" class="details-btn join">{{ t('battle.finished') }}</div>
					</div>
					</div>
				</div>
				<div class="roll-detail-bottom">
					<div class="roll-detail-row" v-if="false">
						<div class="roll-detail-item">
							{{ t('battle.goodsNameTitle') }} <span class="item_span">{{ rollInfo.goodsNum }}</span>
						</div>
						<div class="roll-detail-item">
							{{ t( 'battle.priceTotal' ) }}:
							<span>
								<Price :currency="rollInfo.priceNum"></Price>
								<!-- ${{ rollInfo.priceNum }} -->
							</span>
						</div>
					</div>
					<div class="roll-detail-desc" v-html="rollInfo.rollDesc"></div>
					
				</div>
				<!-- <div class="roll-type">
					<img :src="getRollType(rollInfo.rollType)" alt="" />
				</div> -->
				<div class="roll-detail-content" v-if="false">
					<div class="details-info-top">
						<!-- <div class="name hide">{{ rollInfo.rollName }}</div> -->
					</div>
					<div class="details-rule">
						<div class="details-rule-content" v-html="rollInfo.rollDesc"></div>
					</div>
					<div class="details-info-bottom">
						<div
							class="details-info-time"
							v-if="rollInfo.startTime && rollInfo.endTime"
						>
						{{ t('battle.rewardTime') }}<span>{{ rollInfo.endTime }}</span>
						</div>
						<div class="open-time" v-if="!rollInfo.isSettle">
							<van-count-down :time="TimeFilter(rollInfo.endTime)">
								<template #default="timeData">
									<div class="count-item">
										<span class="count-bk">{{
											timeData.days >= 10 ? timeData.days : "0" + timeData.days
										}}</span>
										<div class="count-txt">{{ t('timebox.days') }}</div>
									</div>
									<div class="count-item">
										<span class="count-bk">{{
											timeData.hours >= 10 ? timeData.hours : "0" + timeData.hours
										}}</span>
										<div class="count-txt">{{ t('timebox.hours') }}</div>
									</div>
									<div class="count-item">
										<span class="count-bk">{{
											timeData.minutes >= 10
												? timeData.minutes
												: "0" + timeData.minutes
										}}</span>
										<div class="count-txt">{{ t('timebox.min') }}</div>
									</div>
									<div class="count-item">
										<span class="count-bk">{{
											timeData.seconds >= 10
												? timeData.seconds
												: "0" + timeData.seconds
										}}</span>
										<div class="count-txt">{{ t('timebox.sec') }}</div>
									</div>
								</template>
							</van-count-down>
						</div>
						<div
							v-show="rollInfo.inRoll && !rollInfo.isSettle"
							class="details-btn"
						>
						{{ t('timebox.joined') }}
						</div>
						<div
							v-show="!rollInfo.inRoll && !rollInfo.isSettle"
							class="details-btn"
							@click="onClickJoin"
						>
						{{ t('battle.join') }}
						</div>
						<div v-show="rollInfo.isSettle" class="details-btn">{{ t('battle.finished') }}</div>
					</div>
				</div>
			</div>
			<div class="split"></div>
			<!-- <Tabs
				:items="[t('battle.rollRewardPrize'), t('battle.participant'), t('battle.rewardUsers')]"
				@tabChangedEvent="tabChangedEvent"
			></Tabs> -->
			<div class="tabs">
				<div
					class="tab-item"
					:class="{ active: tabIndex == 0 }"
					@click="tabChangedEvent(0)"
				>
					 <span>
						 {{ t('battle.rollRewardPrize') }}
					 </span>
				</div>
				<div
					class="tab-item"
					:class="{ active: tabIndex == 1 }"
					@click="tabChangedEvent(1)"
				>
					 <span>
						 {{ t('battle.participant') }}
					 </span>
				</div>
			</div>
			<div v-if="tabIndex == 0">
				<div class="my_number">奖品件数：{{ rollInfo.goodsNum }}</div>
				<weaponListCpt class="my_weaponListCpt" :list="goodslist" :showBaolv="false"></weaponListCpt>
	
				<!-- <div class="weapon-list">
					<div
						class="weapon-item"
						v-for="(item, index) in goodslist"
						:key="index"
						:style="`background-image: url(` + getImageBg(item) + `)`"
					>
						<div class="weapon-item-pic">
							<img :src="getImageIcon(item)" :alt="item.goodsName" />
						</div>
						<div class="weapon-item-name hide" :style="getColor(item.goodsLevel)">
							{{ getGoodsName(item) }}
						</div>
						<div class="weapon-item-price">
							<img src="@/assets/romimg/common/gold.png" alt="" />{{ item.price }}
						</div>
					</div>
				</div> -->
				<div class="btn-more" v-if="!goodsFinished" @click="onGoodsLoad">
					{{ t('common.loadmore') }}
				</div>
			</div>
			<div v-else-if="tabIndex == 1">
				<div class="count-text">
					{{ t('battle.participant') }}: <span>{{ rollInfo.userNum }}</span>
				</div>
				<div class="join-user-list">
					<div
						class="join-user-item"
						v-for="(item, index) in userlist"
						:key="index"
					>
						<div class="join-user-img">
							<H5Avatar :userModel="item" :size="'item_pic'"></H5Avatar>
						</div>
						<p class="hide">{{ item.nickName }}</p>
					</div>
				</div>
				<div class="btn-more" v-if="!userFinished" @click="onUserLoad">
					{{ t('common.loadmore') }}
				</div>
			</div>
			<div v-else-if="tabIndex == 2">
				<!-- <div class="title">中奖名单</div> -->
				<div class="wait-open-wrap" v-if="!rollInfo.isSettle">
					<img src="@/assets/romimg/roll/wait.png" alt="" />
					{{ t('battle.notArrivedTime') }}
				</div>
				<div class="drop-list">
					<div
						class="drop-item"
						v-for="(item, index) in winninglist"
						:key="index"
						:style="`background-image: url(` + getImageBg(item) + `)`"
					>
						<!-- <div class="weapon-item-pic">
							<img :src="getImageIcon(item)" :alt="item.goodsName" />
						</div>
						<div class="join-user-wrap">
							<div class="join-user-price">
		
								<Price :currency="item.price"></Price>
							</div>
							<div class="join-user-info">
								<H5Avatar
									class="head-wrap"
									:userModel="item.user"
									:size="'main_data'"
								>
								</H5Avatar>
								<p class="hide">{{ item.user.nickName }}</p>
							</div>
						</div> -->
	
						<div class="price">
							<!-- <Price :currency="item.price"></Price> -->
						</div>
						<div class="pic">
							<!-- <img :src="item.iconUrl" :alt="item.goodsName" /> -->
	
							<img :src="getImageIcon(item)" :alt="item.goodsName" />
						</div>
						<div class="bottom">
							<p>
								<H5Avatar
									:userModel="item.user"
									:size="'main_data'"
								></H5Avatar>
							</p>
							<div class="right">
								<div style="display: flex">
									<Price :font-weight="700" :currency="item.price"></Price>
								</div>
								<p class="hide">{{ item.user.nickName }}</p>
							</div>
						</div>
					</div>
				</div>
				<div
					class="btn-more"
					v-if="!winningFinished && rollInfo.isSettle"
					@click="onWinningLoad"
				>
				{{ t('common.loadmore') }}
				</div>
			</div>
		</div>

		<div class="join-pw" :class="{ active: passwordShow }">
			<div class="pw-join-box">
				<p>{{ t('battle.enterPassword') }}</p>
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
#roll_details {
	box-sizing: border-box;
	width: 750px;
	padding-top: 0.372rem;
	background: url(@/assets/pcimg/activity/h5open_bg.webp) no-repeat center center / 100% 100%;
	position: relative;
	height: 100vh;
	overflow: auto;
	.backBox{
		position: absolute;
		top: 0.372rem;
		left: 0;
		display: flex;
		padding-left:0.248rem;
	}
	.back{
		width: 1.066rem;
		height: 0.47rem;
		position: relative;
		background: url(data:image/webp;base64,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) center center / 100% 100% no-repeat;
		cursor: pointer;
		margin-left: 0.372rem;
		transition: transform 0.2s;
		z-index: 102;
		&::before{
			content: "";
			position: absolute;
			width: 0.347rem;
			height: 0.446rem;
			background: url(data:image/webp;base64,UklGRlYEAABXRUJQVlA4WAoAAAAQAAAAGwAAIwAAQUxQSLsCAAABmWWI6H8ECQLApm0kyXaw3DEz7/9fOebieEvjkKVB4Z4QMQEK3LZRdmM6/gQEiwdCCAAAGBD/40EKQkA4wllIBCmKomkKKxVKjM3PAIhoii/g8xgo8ShVYvOJKJoRaQiFVrQ4T776pSDm99B8RsMKoixjN248ylhMzPO+k6dtXSnXYKU++QpsWmGgWV0hRsDXsSF1J+CAsT9KnrYmjcyemKJFfEs2POkxGBCWFSIEaGiGNCMWWLbizm9AACAAYQ4gs6dp+GKRrmVjQwIAIJSQlitVpqPvFIrElrXcuDezyIamR6UCm74CIxSr64q8eIY0ICpIE75l6E7JEQARxROrqenwWC88GhAFYBCAaiK3GACCkECorqUNFSZC6J1QBAlQeZLp8BEAiBFo6mhzKlYEvBOJIWBNPPqn7lBEQYBosRVbrJwVAwAUQEwBpTv/PIltqwtoCBAS2BapPPsg5vg0ICZe5AotId/0iTsZEkIMAQCQM/VwEHKcqQfFmPXb2LUtltAAMUoZjcQ62iJDL6yCAwQrpR70Fc5tyzADaUqq4NNaVnVpvzyYYAwwJ/Pi2Z3MvgNOxYOMdzQ8nsgh9IlVEYI5pVzi2b3UljMgFyCGkqlojBiIMSHAB2ZSiQcvll3wWAHFUByBnDupdVNlTDilgpV48KDtQsgKaQQJlLjha/KQDxRMFAqZ1INbsUuxVMwASDxLNHi0KQCAsUopZT0Z8Z2JWU0eIHKVKZp6wwKwSiWTetbnORGwOgKICEQAEwJMoRBOJZN51qMcIqk1DYGIU3FYZfbPCOY4udyTHrSpklu16UAXutGTA7MAmHAyhRc9Tkcis+naqUDfyPx/yBxRyiXGMp4nqZqA1rVKQws+NtE8vkAo5FPExKOEVVn464mmGZpGWKlUqDgALFaIQhBwGHMEAIsVgND0eQoAVlA4IHQBAAAwCACdASocACQAPtFcokyoJSMiKqwBABoJbAC0bdFWz5NFsoLPvI8mAfpmJoBrKfNGS6aCSVd67WMHwz2Gf89PqCslBZT0Gu6DAAD+93mahAalMn9cyg3GmdZ2vEvmuDIcBShkvo/tVBhCTMm+Rr3GiOL+OwzXNQFibYyq3kK00K5LN/bSUS+Ic8zpxvULZrwXOXDzJdDa+DsnWDBEulJqvbZXbA+x9UzGz6ZxAD+ntnMHUFPIsIWA2MJjvxJ7lrNn3mxe5FsDDhPnVbIvH9H21CkoHq6v0dlcYmP/y7cuziRlbkS908ShCwMyREw6ir/xs9lIpzwMSQbyzrGdsKPv8gqtUNxBIk1hK/uqnpbMASewLHSNGpee+79hfbmB8BIrLPNwMFRxRK7eELXNHiRCa8PHmBYWDrTXzx//+6QF/t8bwnM8b8PZ/8TAPp/L2M0bSYD9ATuJ7uOEqC5EHAe12KlxCynwIucSIApyXGiENfNwAAA=) center center / 100% 100% no-repeat;
			position: absolute;
			top: 50%;
			left: -0.372rem;
			transform: translateY(-50%);
		}
	}
	.roll_room_title{
		width: 100%;
		height: 3.12rem;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		padding-bottom: 0.208rem;
		background: url(@/assets/pcimg/activity/h5rollDetail_title-bg.webp) no-repeat center center / 100% 100%;
		box-sizing: border-box;
		.rollname{
			max-width: 3.325rem;
			font-size: 0.347rem;
			color: #fff;
			text-shadow: .0248rem 0 #5E3C0F, -.0248rem 0 #5E3C0F, 0 .0248rem #5E3C0F, 0 -.0248rem #5E3C0F, .0248rem .0248rem #5E3C0F, -.0248rem -.0248rem #5E3C0F, .0248rem -.0248rem #5E3C0F, -.0248rem .0248rem #5E3C0F;
		}
	}
	.roll_details_box{
		width: 86%;
		margin: 0 auto;
		position: relative;
		&::after,&::before{
			display: block;
			content: "";
			width: 0.0248rem;
			height: 100%;
			position: absolute;
			top: 0px;
			z-index: 1;
			background: linear-gradient(rgb(95, 69, 51), rgba(95, 69, 51, 0));
		}
		&::after{
			left: 0;
		}
		&::before{
			right: 0;
		}
	}
	.reserve
	{
		color: #000;
		border-radius: 4px;
		background: #FFE063;
		display: flex;
		height: 60px;
		width: 120px;
		align-items: center;
		justify-content: center;
		font-size: 28px;

		&.subscribed
		{
			opacity: .7;
		}
	}
	.split{
		width: 92%;
		height: 0.471rem;
		margin: .248rem auto;
		background: url(@/assets/pcimg/activity/h5rollroom_split_bg.webp) no-repeat center center/ 100% 100%;
	}
	.tabs {
		display: flex;
		align-items: center;
		// justify-content: space-around;
		justify-items: center;
		box-sizing: border-box;
		width: 100%;
		position: relative;
		font-size: 0.297rem;
		font-weight: 500;
		padding: 0 0.4rem;
		// height: 160px;

		.tab-item {
			margin: 0.2px;
			// margin-top: 0.49rem;
			display: flex;
			align-items: center;
			justify-content: center;
			// flex: 1;
			width: 2.345rem;
			height: 0.62rem;
			color: #9ca1c7;
			// background-color: #111324;
			background: url(@/assets/pcimg/activity/h5boxlist_tab_bg.webp) no-repeat center center / 100% 100%;
			span:first-child {
				// font-size: 40px;
				// margin-right: 20px;
			}
			&.active {
				color: #fff;
				background: url(@/assets/pcimg/activity/h5boxlist_tab_active_bg.webp) no-repeat center center / 100% 100%;

				// background-size: 100% 100%;
			}
		}
	}
	.my_number{
		color: #ffcf98;
		text-align: right;
		padding-right: 0.248rem;
	}
	.my_weaponListCpt{
		.weapon-list{
			gap: 0.248rem !important;
		}
		// :deep(.weapon-list){
		// 	gap: 0.496rem !important;
		// }
		.weapon-item{
			width: calc((100% - 0.496rem) / 3 ) !important;
			height: calc((100% - 0.496rem) / 3 ) !important;
			margin: 0;
			.weapon-item-pic{
				width: 100%;
			}
		}
	}
	.roll-details-info {
		width: 100%;
		border: 1px solid #2d2d67;

		box-shadow: 0px 0px 59px 1px rgba(41, 34, 139, 0.15) inset;
		box-sizing: border-box;
		margin: auto;
		.roll-detail-top {
			box-sizing: border-box;
			display: flex;
			width: 100%;
			height: 2.68rem;
			// padding: 60px;
			// flex-direction: column;
			// justify-content: space-between;
			justify-content: center;
			align-items: center;
			// background: url(@/assets/romimg/roll/roll_detail_gf_bg.png) no-repeat top;
			// background-size: 710px 512px;
			&.active {
				background: url(@/assets/romimg/roll/roll_detail_zhubo_bg.png) no-repeat
					top;
				background-size: 710px 512px;
			}

			.rollname {
				color: #fff;
				text-align: center;

				font-size: 48px;
				font-style: normal;
				font-weight: 400;
				width: 600px;
			}
			.detail_logo {
				margin-top: 20px;
				position: relative;
				img {
					position: relative;
					width: 1.91rem;
					height: 1.91rem;
					// border-radius: 44px;
				}
				.desc {
					position: absolute;
					left: 50%;
					top: 9%;
					transform: translateX(60%);
					width: 0.694rem;
					height: 1.091rem;
					background: url(@/assets/pcimg/activity/h5rollroom_item_type_bg.webp)no-repeat center center / 100% 100%;
					font-size: 0.372rem;
					writing-mode: vertical-lr;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #ffe2b7;
					// background: #cb8928;
					// &.active {
					// 	background: #7349ca;
					// }
				}
			}
			.details_right_box{
				padding-left: 0.992rem;
				box-sizing: border-box;
				.roll-detail-time{
					display: flex;
					color: #ffebc4;
					height: 1.625rem;
					padding-top: 0.625rem;
					box-sizing: border-box;
				}
			}
			.details-btn-wrap {
				display: flex;
				justify-content: center;
				.details-btn {
					box-sizing: border-box;
					display: flex;
					// width: 400px;
					// height: 100px;

					width: 2.60rem;
					height: 0.694rem;

					// padding: 20px 0px;
					justify-content: center;
					align-items: center;
					flex-shrink: 0;
					border-radius: 8px;
					// background: #3a33ac;
					color: #fff;
					text-align: center;
					font-size: 0.372rem;
					font-style: normal;
					// font-weight: 700;
					text-transform: uppercase;
					background: url(@/assets/pcimg/activity/openbox_openBtn_bg.webp) no-repeat center center / 100% 100%;
					&.join {
						background: #121322;
					}
				}
			}
		}
		.roll-detail-bottom {
			box-sizing: border-box;
			.roll-detail-row {
				display: flex;
				// justify-content: space-between;
				align-items: center;
				color: #fff;
				font-size: 28px;
				font-style: normal;
				font-weight: 400;
				text-transform: uppercase;
				padding: 5px 20px;
				box-sizing: border-box;
				align-items: center;
				justify-content: space-between;
				.roll-detail-item {
					// flex: 1;
					display: flex;
					align-items: center;

					.item_span {
						margin-left: 10px;
						color: #f9a328;
						font-size: 30px;
						font-style: normal;
						font-weight: 500;
					}

					#currency-wrap {
						margin-left: 10px;
						color: #f9a328;
					}
				}
			}
			.roll-detail-desc {
				width: 88%;
				margin: 0 auto;
				padding: .198rem .297rem;
				color: #ffebc4;
				background-color: rgba(0, 0, 0, 0.5);
				font-size: .297rem;
				font-style: normal;
				font-weight: 400;
				line-height: 1.8;
				margin-top: .222rem;
				box-sizing: border-box;
				border-radius: 0.248rem;
			}

			.roll-detail-time {
				display: flex;
				align-items: center;
				color: #8d91ae;
				padding: 5px 20px 15px 20px;
				font-size: 24px;
				font-style: normal;
				font-weight: 500;
				box-sizing: border-box;
				img {
					width: 32px;
					height: 32px;
				}
			}
		}

		.roll-type {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 103px;
			height: 103px;
			border: 2px solid #fbfa02;
			border-radius: 50%;

			img {
				width: 78px;
				height: 27px;
			}
		}

		.roll-detail-content {
			display: flex;
			flex-direction: column;
			width: 495px;
			margin-left: 20px;
			position: relative;

			.details-info-top {
				display: flex;

				.name {
					color: #fff;
					font-size: 30px;
					text-align: left;
					width: 520px;
					font-weight: bold;
				}
			}

			.details-rule {
				width: 520px;
				margin: 20px auto;
				display: flex;
				height: 80px;
				box-sizing: border-box;

				.details-rule-content {
					display: flex;
					width: 100%;
					color: #fff;
					font-size: 22px;
				}
			}

			.details-info-bottom {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				position: absolute;
				left: 0;
				bottom: 0px;

				.details-info-time {
					box-sizing: border-box;
					font-size: 20px;
					color: #00f0ff;
					margin-top: 10px;

					span {
						color: #00f0ff;
						font-size: 20px;
					}
				}

				.open-time {
					margin-top: 12px;
					.van-count-down {
						display: flex !important;
						align-items: center;

						.count-item {
							display: flex;
							align-items: center;

							.count-bk {
								display: flex;
								align-items: center;
								justify-content: center;
								width: 40px;
								height: 40px;
								background: #01f0ff;
								border-radius: 8px;
								font-size: 26px;
								color: #000000;
								font-weight: bold;
							}

							.count-txt {
								font-size: 24px;
								color: #00f0ff;
								margin: 0 8px;
							}
						}
					}
				}

				// .details-btn {
				//	 width: 208px;
				//	 height: 63px;
				//	 background: url(@/assets/romimg/roll/join.png) no-repeat center;
				//	 background-size: 100% 100%;
				//	 text-align: center;
				//	 line-height: 63px;
				//	 font-size: 24px;
				//	 margin-left: 80px;
				//	 color: #141221;
				//	 margin-top: 40px;
				// }
			}
		}
	}

	.title {
		margin-top: 60px;
	}

	.count-text {
		// padding: 20px 46px;
		text-align: right;
		color: #ffcf98;
		// font-size: 28px;
		font-style: normal;
		font-weight: 400;
		box-sizing: border-box;
		// span {
		// }
	}

	.wait-open-wrap {
		height: 500px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		color: #545774;
		font-size: 28px;
		font-weight: 500;
		img {
			width: 376px;
			height: 130px;
			margin-bottom: 50px;
		}
	}
	.btn-more {
		// width: 208px;
		// height: 63px;
		// background: url(@/assets/romimg/roll/join.png) no-repeat center;
		// background-size: 100% 100%;
		// text-align: center;
		// line-height: 63px;
		// font-size: 24px;
		// color: #141221;
		// margin: 25px auto;

		width: 208px;
		height: 63px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		text-align: center;
		// background: #3a34b0;
		font-size: 24px;
		color: #fff;
		margin: 25px auto;
	}

	.join-user-list {
		width: 100%;
		padding: 10px 30px;
		box-sizing: border-box;
		justify-content: flex-start;
		display: flex;

		flex-wrap: wrap;

		.join-user-item {
			width: 135px;
			height: 180px;
			margin-top: 20px;
			// margin-right: 28px;
			// margin-top: 26px;
			// padding-bottom: 30px;

			.join-user-img {
				margin: auto;
				width: 130px;
				height: 130px;
				// border-radius: 50%;
				// margin: 0 auto;
			}

			p {
				// font-size: 20px;
				// color: #fff;
				// text-align: center;
				// padding: 0 20px;
				// box-sizing: border-box;
				margin: auto;
				width: 110px;
				margin-top: -10px;
				color: #545774;
				text-align: center;
				font-size: 26px;
				font-style: normal;
				font-weight: 400;
			}
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
			border: 1px solid #fbfa02;

			p {
				font-size: 32px;
				text-align: center;
				margin: 40px 0;
			}

			input {
				width: 477px;
				height: 61px;
				border: 2px solid #fbfa02;
				background: none;
				padding: 0 20px;
				box-sizing: border-box;
				font-size: 28px;
			}

			.pw-join-btns {
				display: flex;
				height: 80px;
				border-top: 2px solid #fbfa02;
				margin-top: 26px;

				p {
					width: 50%;
					height: 80px;
					text-align: center;
					line-height: 80px;
					margin: 0;
					color: #fbfa02;
					font-size: 32px;

					&:first-child {
						border-right: 2px solid #fbfa02;
					}
				}
			}
		}
	}

	.head-wrap {
		margin-right: 4px;
	}

	.drop-list {
		box-sizing: border-box;
		justify-content: space-between;
		padding: 0 20px;
		display: flex;
		flex-wrap: wrap;

		.drop-item {
			height: 496px;
			width: 348px;
			border-radius: 10px;
			margin-bottom: 20px;
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
			// background-color: rgba(25, 28, 53, 0.41);
			background-color: #1b1e38;
			.price {
				text-align: center;
				font-size: 16.393px;
				font-style: normal;
				font-weight: 700;
				line-height: normal;
				margin-top: 38px;
				height: 20px;
			}
			.pic {
				width: 265px;
				height: 200px;
				flex-shrink: 0;
				margin: 40px auto;
				img {
					max-width: 100%;
					max-height: 100%;
				}
			}

			.bottom {
				margin: auto;
				padding-top: 30px;
				width: 336px;
				height: 102px;
				display: flex;
				justify-content: center;
				padding-left: 50px;
				.right {
					margin-left: 30px;
					text-align: left;
					width: 356px;
					height: 102px;
					color: #cbccd6;
					padding-top: 15px;
					box-sizing: border-box;
					p {
						color: #cbccd6;
						font-size: 24px;
						font-style: normal;
						font-weight: 300;

						height: 40px;
						text-align: left;
						width: 150px;
						margin-top: 10px;
					}
					// p:last-child {
					//	 display: flex;
					//	 height: 50px;
					//	 color: #cbccd6;
					//	 text-align: left;
					//	 // padding-top: 10px;
					//	 font-size: 24px;
					//	 font-style: normal;
					//	 font-weight: 500;
					//	 width: 150px;
					//	 // line-height: 15.368px; /* 125% */

					//	 // .m-head-timing {
					//	 //	 width: 68px !important;
					//	 //	 height: 68px !important;
					//	 // }
					// }
				}
			}

			//	 &::after {
			//		 display: block;
			//		 position: absolute;
			//		 content: "";
			//		 width: 100%;
			//		 height: 2px;
			//		 border-bottom: 1px solid #fff;
			//		 left: 0;
			//		 bottom: 0;
			//	 }

			//	 p {
			//		 width: 236px;
			//		 text-align: center;
			//		 line-height: 124px;
			//		 font-size: 20px;
			//		 color: #ffffff;

			//		 &:nth-child(2) {
			//			 display: flex;
			//			 justify-content: center;
			//			 align-items: center;
			//		 }
			//	 }
		}
	}
}
</style>
