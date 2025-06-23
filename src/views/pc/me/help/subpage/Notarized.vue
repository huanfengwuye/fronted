<script setup>
import i18n from "@/lang"
const t = i18n.global.t
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { getArticleList } from '@/network/api/index';
const store = useStore()
const infoText = ref('');

onMounted(() => {
	let channelCode = localStorage.getItem('channelCode');
	if (!channelCode) {
	channelCode = 'DEFAULT'
	}
	getArticle(channelCode);
})
async function getArticle(channelCode) {
	let type = channelCode + '_HelpFanDuBoNotice'
	const res = await getArticleList({ type: type, platformId: store.state.platformId });
	if (res.code === 0) {
		let items = res.data.items	||[];
		if (items.length > 0) {
			items.sort((a, b) => (a.sort - b.sort));
			infoText.value = items[0].content;
		}else{
		if(channelCode != 'DEFAULT'){
		getArticle('DEFAULT');
		}
	}
	}
}

</script>
		
<template>
	<div id="pc-notarized">
		<img class="notarized-img" src="@/assets/pcimg/help/g-001.png" alt="">
		<img class="notarized-img" src="@/assets/pcimg/help/g-002.png" alt="">
		<img class="notarized-img" src="@/assets/pcimg/help/g-003.png" alt="">
		<img class="notarized-img" src="@/assets/pcimg/help/g-004.png" alt="">
	</div>
</template>
		
<style lang="scss" scoped>
#pc-notarized {
	padding-top: 32px;
	display: flex;
	align-items: center;
	gap: 10px;
	flex-direction: column;
	.notarized-img{
		width: 550px;
		height: 785px;
	}
}
</style>