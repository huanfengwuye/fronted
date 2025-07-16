<script setup>
import i18n from "@/lang"
const t = i18n.global.t
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { tokenName } from "../../../config"
import { computed } from "@vue/reactivity";
import nav_index from '@/assets/pcimg/activity/nav_index.png'
import nav_index_active from '@/assets/pcimg/activity/nav_index_active.png'
import nav_jx from '@/assets/pcimg/activity/nav_jx.png'
import nav_jx_active from '@/assets/pcimg/activity/nav_jx_active.png'
import nav_wf from '@/assets/pcimg/activity/nav_wf.png'
import nav_wf_active from '@/assets/pcimg/activity/nav_wf_active.png'
import nav_fl from '@/assets/pcimg/activity/nav_fl.png'
import nav_fl_active from '@/assets/pcimg/activity/nav_fl_active.png'
import nav_my from '@/assets/pcimg/activity/nav_my.png'
// import nav_my_active from '@/assets/pcimg/activity/nav_my_active.png'
// import wv from '@/util/webview'


const store = useStore();
const router = useRouter();
const route = useRoute()
const navaBarList = ref([
	{
		name: '首页',
		path: '/m/index',
		icon: nav_index,
		icon_active:nav_index_active
	},
	{
		name: '旗开',
		path: '/m/home',
		icon: nav_jx,
		icon_active:nav_jx_active,
	},
	{
		name: '后福',
		path: '/m/roll',
		icon: nav_wf,
		icon_active:nav_wf_active,

	},{
		name: '旗鼓',
		path: '/m/battle/list',
		icon: nav_fl,
		icon_active:nav_fl_active,

	},{
		name: '我的',
		path: '/m/personal',
		icon: nav_my,
		icon_active:nav_my,

	}
])
const active = computed(() => {
	return route.path
})
</script>

<template>
	<div class="navaBarbox"  :class="{ active: active }">
		<div id="navaBar">
			<div v-for="(item, index) in navaBarList" :key="index" class="navaBarItem" @click="() => {router.push(item.path)}">
				<img v-if="item.path == active" :src="item.icon_active" alt="">
				<img v-else :src="item.icon" alt="">
				<span class="navtitle" :class="{ active: item.path == active }">{{ item.name }}</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.navaBarbox{
	height: 1.48rem;
	width: 100%;
	#navaBar{
		height: 1.48rem;
		width: 100%;
		position: fixed;
		bottom: 0;
		background: url(@/assets/pcimg/activity/navbar_bg.webp) no-repeat center center / 100% 100%;
		z-index: 100;
		display: flex;
		justify-content: space-around;
		.navaBarItem{
			height: 1.48rem;
			width: 1.48rem;
			display: flex;
			align-content: center;
			position: relative;
			.navtitle{
				position:  absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				font-size: 0.29rem;
    			z-index: 1;
				color: #FFF5E5;
				text-shadow: 0.56px 0 #5F3A16, -0.56px 0 #5F3A16, 0 0.56px #5F3A16, 0 -0.56px #5F3A16, 0.56px 0.56px #5F3A16, -0.56px -0.56px #5F3A16, 0.56px -0.56px #5F3A16, -0.56px 0.56px #5F3A16;
				.active{
					color: FFF5E5;
				}
			}
			img{
				margin:auto
			}
		}
	}
}
</style>
