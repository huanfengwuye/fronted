<script setup>
import i18n from "@/lang"
const t = i18n.global.t
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { getBannerList } from "@/network/api/index";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import useClipboard from "vue-clipboard3";
 
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/scss/autoplay"
import 'swiper/scss/pagination'

const modules = [ Autoplay, Pagination ]
const { toClipboard } = useClipboard();

const store = useStore();
const router = useRouter();
const banner = ref([]);

onMounted(() => {
	getBanner();
});

async function getBanner() {
	const res = await getBannerList({
		type: "PCBlindBox",
		platformId: store.state.platformId,
	});
	if (res.code === 0) {
		let items = res.data.items;
		items.sort((a, b) => a.sort - b.sort);
		banner.value = items;
	}
}

function onClickOpen(url) {
	// router.push( url )
	if (!url) return;
	if (url == "activity") {
		router.push("/p/activity");
		return;
	} else if (url.startsWith("copytext")) {
		let textArr = url.split("//");
		window.$dev && console.log(url, textArr);
		if (textArr[1]) {
			copy(textArr[1]);
		}
		return;
	}
	window.open(url, "_self");
}

async function copy(value) {
	try {
		await toClipboard(value);
		Success( { offset : 100, message : $t( common.copySuccess ) } )
	} catch (e) {
		Warn( { offset : 100, message : $t( common.copyFail ), customClass : 'error' } )
	}
}
</script>

<template>
	<div id="pc-bannerswiper">
		<swiper :pagination="{ clickable: true }" :modules="modules" :autoplay="{ delay : 3000 }" :loop="true">
			<swiper-slide v-for="(item, index) in banner" :key="index">
				<img :src="item.image" alt="" @click="onClickOpen(item.url)" />
			</swiper-slide>
		</swiper>
			<div class="swiper-pagination"></div>
		<!-- <van-swipe class="b-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(item, index) in banner" :key="index"
				><img :src="item.image" alt="" @click="onClickOpen(item.url)" />
			</van-swipe-item>
		</van-swipe> -->
	</div>
</template>

<style lang="scss">
#pc-bannerswiper {
	max-width: 1410px;
	height: 195px;
	margin: 15px auto;
	overflow: hidden;

	.swiper
	{
		overflow-y: visible !important;

		.swiper-pagination
		{
			bottom: -20px !important;

			.swiper-pagination-bullet
			{
				width: 8px !important;
				height: 8px !important;
				background-color: transparent;
				border: 1px solid #cccccc;

				&.swiper-pagination-bullet-active
				{
					background: #fff;
				}
			}
		}
	}

	.b-swipe {
		width: 100%;
		height: 195px;
		img {
			width: 100%;
			height: 174px;
		}
	}
	.van-swipe__indicators {
		bottom: 0px;
		position: absolute;
		z-index: 1000 !important;
		.van-swipe__indicator {
			width: 8px !important;
			height: 8px !important;
			background-color: transparent;
			border: 1px solid #cccccc;
			margin: auto 5px;
		}
		.van-swipe__indicator--active {
			background-color: #cccccc !important;
		}
	}
}
</style>
