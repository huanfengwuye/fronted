<script setup>
import Header from '@/modules/header/h5/header.vue'
import Footer from '@/modules/footer/h5/footer.vue'
// import mfooter from "@/components/h5/mfooter/Index.vue";
import introduce from "@/components/h5/introduce/Index.vue";
import sidebar from "@/components/h5/sidebar/Index.vue";
// import sign from "@/components/h5/login/Sign.vue";
import Sign from '@/modules/sign/pc/sign.vue'
import register from "@/components/h5/login/Register.vue";
import forgetPW from "@/components/h5/login/ForgetPW.vue";
import bindPhone from "@/components/h5/login/BindPhone.vue";
import BackToTop from "@/components/h5/common/BackToTop.vue";
import PasswordRed from "@/components/h5/pwred/Index.vue";
import RegRed from "@/components/h5/regred/Index.vue";
import UpdateNotice from "@/views/h5/download/UpdateNotice.vue";
import RecordSwiper from "@/components/h5/home/RecordSwiper.vue";
import navaBar from  '@/components/h5/navaBar/index.vue'
// import ActivityDialog from "@/views/h5/activity/ActivityDialog.vue";
import { onMounted, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UserType } from "@/util/util";
import { useStore } from "vuex";
import { _isMobile, isPCFunc, isWechat } from "@/util/common";
import i18n from "@/lang"

import ActivityDialog from '@/components/activity-dialog/h5/dialog.vue'
import ActivityMiniDialog from '@/components/activity-dialog/h5/mini-dialog.vue'

const t = i18n.global.t
const route = useRoute();
const router = useRouter();
const store = useStore();
const showBrowserTip = ref( false )
const showRecordSwiper = ref(true)
const notshowRecordSwiperList = ['/m/home','/m/openbox','/m/roll','/m/roll_detail']
if(notshowRecordSwiperList.includes(route.path)){
	showRecordSwiper.value = false
}
onMounted(() => {
	window.$dev && console.log( 'weixin >>>>>>>>>>>>', isWechat(), route.name )
	showBrowserTip.value = isWechat() && route.name !== 'm_reserve'

	if (route.query.qhclickid) {
		let bz = _isMobile() ? 2 : 1;
		let snnid = route.query.qhclickid + "," + bz;
		localStorage.setItem("bd_vid", snnid);
	}
	if (route.query.bd_vid) {
		localStorage.setItem("bd_vid", route.query.bd_vid);
	}

	if (isPCFunc()) {
		let params = { path: "/p/home" };
		if (route.query.code) {
			params.query = { code: route.query.code };
		}
		router.replace(params);
		// let url="https://pc.199skins.com"
		// if (route.query.code) {
		//	 url+="?code="+route.query.code;
		// }
		// window.open(url, "_self");
	}
});

watch(route, (newRoute, oldRoute) => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
	if(notshowRecordSwiperList.includes(route.path)){
		showRecordSwiper.value = false
	}else {
		showRecordSwiper.value = true
	}
});
</script>

<template>
	<div id="container">
		<div v-if="showBrowserTip" class="wechat"></div>
		<Header/>
		<RecordSwiper v-if="showRecordSwiper&&false" />
		<router-view/>
		<!-- <Footer/> -->
		<introduce/>
		<BackToTop></BackToTop>
		<PasswordRed></PasswordRed>
		<RegRed></RegRed>
		<navaBar />
		<!-- <sidebar /> -->
		
		<!-- <register /> -->
		<!-- <forgetPW /> -->
		<bindPhone />
		<UpdateNotice />
		<Sign />
		<ActivityDialog />
		<ActivityMiniDialog />
		<div
			v-if="store.state.userInfoBase.userType == UserType.anchor"
			class="live_tip"
		>
		{{ t('common.liveTip') }}
		<!-- 直播内容仅供参考&nbsp;切勿随意模仿&nbsp; -->
		</div>
	</div>
</template>

<style lang="scss">
#container {
	// background: url('@/assets/romimg/base_back.png') no-repeat center top, #201E2C;
	// background: url('@/assets/romimg/spring/bg.png') no-repeat center top, #270204;

	// background-size: 100%;
	--baseWidth: 750px;
	background-color: #15172c;
	width: 750px;
	position: relative;
	margin: 0% auto;
	.wechat
	{
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-image: url( '@/assets/romimg/common/wechat-tip-active.png' );
		background-size: 100% auto;
		background-position: center 72px;
		background-repeat: no-repeat;
		background-color: rgba( 0, 0, 0, .9 );
		z-index: 100000;
	}

	.live_tip {
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
