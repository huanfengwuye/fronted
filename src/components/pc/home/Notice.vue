<script setup>
import i18n from "@/lang"
const t = i18n.global.t
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { getArticleList } from "@/network/api/index";
import { onMounted } from "vue";

const store = useStore();
const noticeArr = ref([]);
const noticetxt = ref("");
const popType = ref(false);

const todayShowNotice = ref(false);

const testNotice = ref(false);

onMounted(() => {
	getNotice();
	initToday();
	popType.value = !todayShowNotice.value;
});

function initToday() {
	let day = localStorage.getItem("today_show_notice");
	let date = new Date();
	let nowday =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	todayShowNotice.value = nowday != day;
}

function onClickOpen() {
	store.commit("setSwitchNotice", true);
	todayShowNotice.value = true;
}

function onClickClose() {
	store.commit("setSwitchNotice", false);
	initToday();
}

//过滤
function filtersNotice(v) {
	return v.replace(/<[^>]+>/g, "");
}

function changeNoticeState(val) {
	if (val) {
		let date = new Date();
		let day =
			date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
		localStorage.setItem("today_show_notice", day);
	} else {
		localStorage.removeItem("today_show_notice");
	}
}

async function getNotice() {
	const res = await getArticleList({
		type: "Notice",
		platformId: store.state.platformId,
	});
	if (res.code === 0) {
		let items = res.data.items;
		if (items.length > 0) {
			items.sort((a, b) => a.sort - b.sort);
			noticetxt.value = items[0].content;
			noticeArr.value = items;
		}
	}
}

const showDetail = ref( false )

</script>

<template>
	<div id="pc-notice">
		<div class="notify-dialog-container" v-if="showDetail">
			<div class="notify-dialog">
				<div class="header">
					{{ t( 'common.notify' ) }}
					<img src="@/assets/pcimg/common/close.png" @click="showDetail = false">
				</div>
				<div class="body">
					<div class="item" v-for="( item, index ) in noticeArr" :key="index">
						<div class="content" v-html="item.content"></div>
						<div class="datetime">{{ item.createTime }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="notice-wrap">
			<div class="notice-wrap-icon">
				<img src="@/assets/pcimg/home/icon_notice.png" alt="" />
				<div class="ql-editor" v-html="noticetxt"></div>
			</div>
			<div class="more" @click="showDetail = true">{{ t( 'common.loadmore' ) }}</div>
		</div>
	</div>
</template>

<style lang="scss">
#pc-notice {
	max-width: 1410px;
	width: 100%;
	height: 40px;
	margin: 15px auto 0;
	position: relative;

	.notify-dialog-container
	{
		position: fixed;
		background: rgba( 0, 0, 0, .7 );
		display: flex;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		z-index: 200;

		.notify-dialog
		{
			width: 590px;
			height: 520px;
			// border: 1px solid red;
			background: #16182E;

			.body
			{
				display: flex;
				padding: 32px 16px;
				flex-wrap: wrap;
				.item
				{
					padding: 15px;
					border-radius: 8px;
					border: 1px solid #1C1F39;
					display: flex;
					flex-direction: column;
					gap: 10px;

					.content
					{
						color: #B4B6C8;
						font-family: Microsoft YaHei;
						font-size: 16px;
						font-weight: 400;
					}

					.datetime
					{
						color: #62636E;
						font-family: Microsoft YaHei;
						font-size: 14px;
						font-style: normal;
						font-weight: 400;
					}
				}
			}

			.header
			{
				background: #1C1F39;
				height: 94px;
				display: flex;
				align-items: center;
				padding-left: 38px;
				color: #CCCBDE;
				font-family: Microsoft YaHei;
				font-size: 16px;
				font-style: normal;
				font-weight: 700;
				position: relative;

				img
				{
					position: absolute;
					top: 14px;
					right: 14px;
					cursor: pointer;//鼠标变手s
				}
			}
		}
	}

	.notice-wrap {
		height: 40px;
		line-height: 40px;
		// background-color: #191c34;
		background: rgba( 25, 28,52, .3 );
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		overflow: hidden;
		margin: 5px auto;
		text-align: center;
		font-size: 14px;
		padding-right: 15px;

		.notice-wrap-icon {
			width: calc( 100% - 100px );
			height: 40px;
			// background-color: #1C203C;
			display: flex;
			// justify-content: center;
			justify-content: flex-start;
			align-items: center;
			gap: 18px;
			img {
				width: 18px;
				height: 18px;
			}

			p
			{
				width: calc( 100% - 36px );
				text-overflow: ellipsis;
				overflow: hidden;
				word-break: break-all;
				white-space: nowrap;
			}
		}
		.more {
			color: #6A77FF;
			// width: 100px;
		}
		.ql-editor {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 14px;
			padding: 0px;
			color: #fff;
			width: calc( 100% - 100px );
			white-space: nowrap !important;
			// margin-top: 15px;
		}
	}
}
</style>
