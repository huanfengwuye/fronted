<script setup>
import i18n from "@/lang"
const t = i18n.global.t
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { tokenName } from "../../../config";


const store = useStore();
const router = useRouter();
const active = ref(false);
const taskShow = ref(true);
const qqGroupDialog = ref(false);
const hasLogin = computed(() => store.getters.hasLogin);

function onClickRed() {
	store.commit("setPassRed", true);
}

function onClickGroup() {
	if (navigator.userAgent.indexOf("UCBrowser") > -1) {
	alert( t( 'menu.browserNotSupport' ) );
	} else {
		// let item = store.state.otherConfig.qqGroup[0];
		let qqGroupLink = store.getters.getConfigItem("GroupChatUrl");
		window.open(qqGroupLink);
	}
}

function onClickService() {
	if (localStorage.getItem(tokenName)) {
	let channelId = store.getters.getConfigItem("CustomerServiceUrl") || "A12fdC";

	if (!window._AIHECONG) {
		(function (d, w, c) {
		if (w[c]) return;
		var s = d.createElement("script");
		w[c] = function () {
			(w[c].z = w[c].z || []).push(arguments);
		};
		s.async = true;
		s.src = "https://static.ahc.ink/hecong.js";
		if (d.head) d.head.appendChild(s);
		})(document, window, "_AIHECONG");

		_AIHECONG("ini", {
		channelId: channelId,
		uniqueId: `mskins${store.state.userInfoBase.account}`,
		button: false,
		});
		_AIHECONG("customer", {
			名称: store.state.userInfoBase.nickName,
			手机: store.state.userInfoBase.mobile,
			终端: "MODILE",
			会员账号: store.state.userInfoBase.account,
		});
		_AIHECONG("showChat");
	} else {
		_AIHECONG("showChat");
	}
	} else {
	store.commit("setSignView", true);
	}
}

/// 验证勾选 变化
function onRecharge()
{
	store.commit( "setRechargeView", true )
}  

</script>

<template>
	<div id="pc-sidebar" :class="{ active: active }" v-if="hasLogin && taskShow">
		<div class="sidebar-item" @click="onRecharge">
			<Icon name="mall" color="#8792F1" :size="23"></Icon>
			<p>充值</p>
		</div>
		<div class="sidebar-item" @click="$router.push( '/p/me/bag' )">
			<Icon name="stock" color="#8792F1" :size="23"></Icon>
			<p>库存</p>
		</div>
		<!-- <div class="sidebar-item" @click="$router.push( '/p/refining' )">
			<Icon name="refining" color="#8792F1" :size="23"></Icon>
			<p>炼化</p>
		</div> -->
		<div class="sidebar-item" @click="onClickService">
			<Icon name="customerService" color="#8792F1" :size="23"></Icon>
			<p>客服</p>
		</div>
		<div class="sidebar-item" @click="onClickRed">
			<Icon name="red-packet" color="#8792F1" :size="23"></Icon>
			<p>红包</p>
		</div>
		<div class="sidebar-item" @click="onClickGroup">
			<Icon name="group" color="#8792F1" :size="23"></Icon>
			<p>群聊</p>
		</div>
		<!-- <img class="img-lantern" src="@/assets/pcimg/sidebar/lantern.png" alt=""> -->
		<img @click="taskShow = false" class="close" src="@/assets/pcimg/sidebar/close-active.png" alt="">
	</div>
	<div v-if="!taskShow" class="expand" @click="taskShow = true">
	</div>
</template>

<style lang="scss" scoped>
.expand{
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	gap: 30px;
	position: fixed;
	right: 0px;
	top: 50%;
	z-index: 100;
	width: 24px;
	height: 75px;
	color: #fff;
	background: url("@/assets/pcimg/sidebar/expand.png");
	background-size: 100% 100%;
	cursor: pointer;
}
#pc-sidebar {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	gap: 25px;
	position: fixed;
	right: 65px;
	top: 35%;
	z-index: 100;
	width: 70px;
	height: 480px;
	color: #fff;
	background: url("@/assets/pcimg/sidebar/pc-sidebar.png");
	// background: url("@/assets/pcimg/sidebar/pc-sidebar-active.png");
	background-size: 100% 100%;
	.img-lantern{
		position: absolute;
		bottom: -70px;
	}
	.close{
		position: absolute;
		top: -25px;
		right: 0px;
		width: 16px;
		height: 16px;
		cursor: pointer;
	}
	.sidebar-item{
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		gap: 6px;
		cursor: pointer;
		p{
			font-size: 14px;
		}
	}

}
</style>
