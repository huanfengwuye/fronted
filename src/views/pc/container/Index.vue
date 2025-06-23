<script setup>
import Header from "@/modules/header/pc/header.vue"
import Footer from "@/modules/footer/pc/footer.vue"
import introduce from "@/components/pc/introduce/Index.vue";
// import sign from "@/components/pc/login/Sign.vue";
import recharge from "@/components/pc/recharge/Index.vue";
import bindPhone from "@/components/pc/login/BindPhone.vue";
import BackToTop from "@/components/pc/common/BackToTop.vue";
import PasswordRed from "@/components/pc/pwred/Index.vue";
import RegRed from "@/components/pc/regred/Index.vue";
import UpdateNotice from "@/views/pc/download/UpdateNotice.vue";
import sidebar from "@/components/pc/sidebar/Index.vue";
import RecordSwiper from "@/components/pc/home/RecordSwiper.vue";
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UserType } from "@/util/util";
import { useStore } from "vuex";
import { _isMobile, isPCFunc } from "@/util/common";

// import ActivityMiniDialog from '@/views/pc/activity/ActivityMiniDialog.vue'
// import ActivityDialog from "@/views/pc/activity/ActivityDialog.vue";
import Sign from '@/modules/sign/pc/sign.vue'
import ActivityDialog from '@/components/activity-dialog/pc/dialog.vue'
import ActivityMiniDialog from '@/components/activity-dialog/pc/mini-dialog.vue'
import RealnameAuth from '@/modules/realname-auth/pc/realname-auth.vue'
import i18n from "@/lang"

// import register from "@/components/pc/login/Register.vue";
// import forgetPW from "@/components/pc/login/ForgetPW.vue";
const t = i18n.global.t

const route = useRoute();
const router = useRouter();
const store = useStore();

onMounted(() => {
	if (route.query.qhclickid) {
		let bz = _isMobile() ? 2 : 1;
		let snnid = route.query.qhclickid + "," + bz;
		localStorage.setItem("bd_vid", snnid);
	}
	if (route.query.bd_vid) {
		localStorage.setItem("bd_vid", route.query.bd_vid);
	}

	if (!isPCFunc()) {
		let params = { path: "/m/home" };
		if (route.query.code) {
			params.query = { code: route.query.code };
		}
		router.replace(params);

		// let url="http://test.199skins.com/"
		// if (route.query.code) {
		//	 url+="?code="+route.query.code;
		// }
		// window.open(url, "_self");
	}
});

watch(route, (newRoute, oldRoute) => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
});
</script>

<template>
	<div id="pc-container">
		<Header />
		<RecordSwiper />
		<router-view />
		<Footer />
		<recharge />
		<sidebar />
		<introduce />
		<BackToTop v-if="false"></BackToTop>
		<PasswordRed></PasswordRed>
		<RegRed></RegRed>

		<Sign />
		<ActivityDialog />
		<ActivityMiniDialog />
		<RealnameAuth />
		<!-- <sidebar /> -->

		<!-- 组建已被替换不再使用 -->
		<!--
			<register />
			<forgetPW />
		-->
		<!-- /被替换的组建 -->

		<bindPhone />
		<UpdateNotice />
		<div
			v-if="store.state.userInfoBase.userType == UserType.anchor && false"
			class="pc-live_tip"
		>
			{{ t( 'common.liveTip' ) }}
		</div>
	</div>
</template>

<style lang="scss">
#pc-container {
	// background: url(@/assets/pcimg/base_back.png) no-repeat center top, #201E2C;
	// background-size: 100%;
	background-color: #15172c;
	.pc-live_tip {
		position: fixed;
		right: 6px;
		bottom: 20px;
		z-index: 100000;
		width: 12px;
		color: #fff;
		opacity: 1;
		font-size: 14px;
		letter-spacing: 2px;
		writing-mode: vertical-rl;
		font-weight: bold;
	}
}
</style>
