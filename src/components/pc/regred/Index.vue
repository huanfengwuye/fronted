<script setup>
import i18n from "@/lang"
const t = i18n.global.t
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { onMounted } from "vue";
import { registerReward } from "@/network/api/user";
import { routeLocationKey } from "vue-router";
import { GoodImageBgType } from '@/util/util'
import { useRouter, useRoute } from "vue-router";
const store = useStore();
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
				money: res.data.price,
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
		store.commit("setSignViewTab", 2);
		store.commit("setSignView", true);
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
	console.log("进入逼逼方法")
	router.push({
		path : "/p/me/bag",
	})
}

function getImageBg2(item) {
		return store.getters.getGoodsBgImage(GoodImageBgType.replace, item);
}

function show() {
	let showView = false;
	// window.$dev && console.log("route", route.name);
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
	<div id="pc-reg-parket">
		<div class="reg-parket-wrap" v-if=" regPacket.closeRed " :class="{ active: !hasLogin && regPacket.closeRed }">
			<div class="no-pk-pic">
				<div class="close" @click="close"></div>
				<div class="no-pk-btn" @click="openPacket"></div>
			</div>
		</div>

		<div
			class="pc-reg-left-Small"
			:class="{ active: regPacket.leftSmall }"
			@click="show"
		></div>
	</div>
</template>

<style lang="scss">
#pc-reg-parket {
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
			width: 658px;
			height: 528px;
			background: url(@/assets/pcimg/regred/center_reg.png) no-repeat center;
			// background-size: 100% 100%;
			background-size: contain;
			position: relative;

			.close {
				position: absolute;
				width: 50px;
				height: 50px;
				right: -6px;
				top: 58px;
				cursor: pointer;
				// border: 1px solid red;
				img {
					width: 100%;
					height: 100%;
				}
			}

			.no-pk-btn {
				position: absolute;
				width: 220px;
				height: 60px;
				top: 376px;
				right: 84px;
				// margin: 425px 0px 0 205px;
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

			.receive-price{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 20px;
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

			.item-info1 {
				color: #EFF0F5;
				text-align: center;
				font-size: 18px;
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
				width: 316px;
				height: 50px;
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
	}

	.pc-reg-left-Small {
		width: 172px;
		height: 263px;
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
