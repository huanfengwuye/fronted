<script setup>
import i18n from "@/lang"
const t = i18n.global.t
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { getArticleList } from '@/network/api/index';
const store = useStore()
const infoText = ref(``);

onMounted(() => {
	let channelCode = localStorage.getItem('channelCode');
	if (!channelCode) {
		channelCode = 'DEFAULT'
	}
	getArticle(channelCode);
})
async function getArticle(channelCode) {
	let type = channelCode + '_HelpPrivacy'
	const res = await getArticleList({ type: type, platformId: store.state.platformId });
	if (res.code === 0) {
		let items = res.data.items ||[];
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
	<div id="privacy">
		<div class="privacy_wrap">
			<div class="ql-snow ">
				<div class="ql-editor" v-html="infoText">
				</div>
			</div>
		</div>
	</div>
</template>
						
<style lang="scss" scoped>
#privacy {
	box-sizing: border-box;
	width: 750px;

	.privacy_wrap {
		color: #fff;

	}

	&::-webkit-scrollbar {
		width: 0px;
	}
}
</style>