<script setup>
import i18n from "@/lang"
const t = i18n.global.t
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { onMounted } from "vue";
import { GoodImageBgType } from '@/util/util'
import { registerReward } from "@/network/api/user";
import { useRouter, useRoute } from "vue-router";
import { _isMobile } from '@/util/common';

const store = useStore();
const route = useRoute();
const prizeItems = [];
const router = useRouter();
const regPacket = computed(() => store.state.regPacket);
const hasLogin = computed(() => store.getters.hasLogin);
const hasRegisterPacket = computed(() => store.state.hasRegisterPacket);

function setRed(data) {
	store.commit("setRegPacket", data);
}

function close() {
	setRed({
		closeRed: false,
		openRed: false,
		leftSmall: true,
		money: 0,
	});
}

async function openPacket() {
	if (hasLogin.value) {
		let res = await registerReward();	
		if (res.code == 0) {
			setRed({
				closeRed: false,
				openRed: true,
				leftSmall: false,
				money: res.data.amount,
			});
			prizeItems.value = res.data;
		} else {
			setRed({
				closeRed: false,
				openRed: false,
				leftSmall: false,
				money: 0,
			});
		}
	} else {
		setRed({
			closeRed: false,
			openRed: false,
			leftSmall: false,
			money: 0,
		});
		// store.commit("setRegisterView", true);
		router.push("/m/register");
	}
}

function closeView() {
	setRed({
		closeRed: false,
		openRed: false,
		leftSmall: false,
		money: 0,
	});
	store.dispatch("getUserInfo");
	store.commit("setSwitchNotice", true);
}

function closeViewBag() {
	setRed({
		closeRed: false,
		openRed: false,
		leftSmall: false,
		money: 0,
	});
	store.dispatch("getUserInfo");
	store.commit("setSwitchNotice", true);
		router.push({
			path : "/m/personal",
		})
}

function getImageBg2(item) {
		return store.getters.getGoodsBgImage(GoodImageBgType.replace, item);
}

const noNeedShow = ["m_register", "m_sign", "m_forgetPW", 'm_reserve'];
//导航||返回
function isback() {
	return noNeedShow.includes(route.name);
}

function show() {
	if (isback()) {
		return;
	}
	let showView = false;
	window.$dev && console.log("route", route.name);

	if (!hasLogin.value || hasRegisterPacket.value) showView = true;
	setRed({
		closeRed: showView,
		openRed: false,
		leftSmall: false,
		money: 0,
	});
}

onMounted(() => {
	setTimeout(() => {
		show();
	}, 300);
});
</script>

<template>
	<div id="h5-reg-parket">
		<div class="reg-parket-wrap" v-if="regPacket.closeRed" :class="{ active: !hasLogin && regPacket.closeRed }">
			<div class="no-pk-pic">
				<div class="close" @click="close"></div>
				<div class="no-pk-btn" @click="openPacket"></div>
			</div>
		</div>

		<!-- <div class="reg-parket-wrap" v-if="regPacket.openRed " :class="{ active: regPacket.openRed }">
			<div class="receive-bg">
				<div class="receive-body">
					<div class="close" @click="closeView"></div>
					<div class="receive-top">
						获得物品
					</div>
					<div class="price-back">
						<Price
							size="17"
							color="#7EF2AD"
							:currency="prizeItems.value.price"
						></Price>
					</div>
					<div class="bg" :class="[ `level-${prizeItems.value.goodsType}` ]"></div>
					<div class="prize-item-back" >
						<div class="prize-item-pic" :style="'background-image: url(' + getImageBg2(prizeItems.value.goodsType) + ');'">
							<img :src="prizeItems.value.iconUrl" alt="">
						</div>
					</div>
					<div class="item-info">
						<p class="item-info1 ">{{ prizeItems.value.goodsName }}</p>
					</div>
					<div class="opt-wrap">
						<div class="btn-return" @click="closeViewBag">{{ t( 'openbox.putInBag' ) }}</div>
					</div>
				</div>
			</div>
		</div> -->

		<div
			class="h5-reg-left-Small"
			:class="{ active: regPacket.leftSmall }"
			@click="show"
		></div>
	</div>
</template>

<style lang="scss">
#h5-reg-parket {
	.reg-parket-wrap {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba($color: #000000, $alpha: 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: -1;
		opacity: 0;
		color: #fff;

		&.active {
			z-index: 202;
			opacity: 1;
		}

		.no-pk-pic {
			width: 520px;
			height: 790px;
			background: url(@/assets/pcimg/activity/activity-tu.png) no-repeat center;
			background-size: 100% 100%;
			position: relative;

			.close {
				position: absolute;
				width: 50px;
				height: 50px;
				right: 16px;
				top: 20px;
				cursor: pointer;
				// border: 1px solid red;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.no-pk-btn {
				width: 360px;
				height: 100px;
				margin: 670px auto 0;
				cursor: pointer;
				// border: 1px solid red;
			}
		}

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
					height: 80px;
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
	}

	.h5-reg-left-Small {
		width: 220px;
		height: 334px;
		background: url(@/assets/pcimg/activity/actibity-xiao.png) no-repeat center;
		background-size: contain;
		position: fixed;
		left: 0;
		bottom: 10px;
		z-index: -1;
		opacity: 0;
		transition: 0.3s;
		transform: scale(0.8);

		&.active {
			opacity: 1;
			z-index: 100;
		}
	}
}
</style>
