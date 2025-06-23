<script setup>
import i18n from "@/lang"
const t = i18n.global.t
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const route = useRoute();

function goRoute(path) {
	router.push(path);
}

</script>
		
<template>
	<div id="pc-help-wrap">
		<div class="p-com-header">
			<div class="p-com-header-c">{{ t( 'menu.supportCenter' ) }}</div>
		</div>
		<div class="help-notice">
			<div class="notice-wrap">
				<p>{{ t( 'support.contactService' ) }}</p>
				<p>{{ t( 'support.textTip' ) }}</p>
			</div>
		</div>
		<div class="pc-common-tabs">
			<div class="tab-item" :class="{ 'active': route.name == 'p_regulations' }"
				v-if="store.state.moduleHelpRegulation" @click="goRoute('/p/me/help/regulations')">
				<svg class="icon">
					<use xlink:href="@/assets/fonts/icon.svg#gifts"></use>
				</svg>
				{{ t( 'router.regulations' ) }}
			</div>
			<div class="tab-item" :class="{ 'active': route.name == 'p_compliance' }"
				v-if="store.state.moduleHelpCompliance" @click="goRoute('/p/me/help/compliance')">
				<svg class="icon">
					<use xlink:href="@/assets/fonts/icon.svg#history"></use>
				</svg>{{ t( 'router.compliance' ) }}
			</div>
			<div class="tab-item" :class="{ 'active': route.name == 'p_privacy' }" v-if="store.state.moduleHelpPrivacy"
				@click="goRoute('/p/me/help/privacy')">
				<svg class="icon">
					<use xlink:href="@/assets/fonts/icon.svg#gift-3"></use>
				</svg>{{ t( 'router.privacy' ) }}
			</div>
			<div class="tab-item" :class="{ 'active': route.name == 'p_fandubo' }"
				v-if="store.state.moduleHelpFanDuBoNotice" @click="goRoute('/p/me/help/fandubo')">
				<svg class="icon">
					<use xlink:href="@/assets/fonts/icon.svg#gift-3"></use>
				</svg>{{ t( 'router.notice' ) }}
			</div>
			<!-- <div class="tab-item" :class="{ 'active': route.name == 'p_notarized' }"
				v-if="store.state.moduleHelpFanDuBoNotice" @click="goRoute('/p/me/help/notarized')">
				<Icon name="notarized" size="20" color="#9CA1C7"></Icon>{{ '公证书' }}
			</div> -->
		</div>
		<div class="help-main">
			<router-view class="router-view"></router-view>
		</div>
	</div>
</template>
		
<style lang="scss" scoped>
#pc-help-wrap {
	box-sizing: border-box;
	padding-top: 3px;
	width: 100%;
	min-height: 500px;
	padding-bottom: 50px;
	display: flex;
	align-items: center;
	flex-direction: column;

	.p-com-header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 5px;
		margin-bottom: 5px;

		.p-com-header-c {
			display: flex;
			justify-content: center;
			align-items: center;
			// width: 197px;
			height: 105px;
			background: url(@/assets/pcimg/me/header_bg.png) center no-repeat;
			background-size: 100% 100%;
			color: #FFF;
			font-size: 24px;
		}

	}

	.help-notice {
		display: flex;
		width: 1440px;
		height: 193px;
		background: url(@/assets/pcimg/help/bg.png) center no-repeat;
		// background-size: 100% 100%;
		padding-left: 150px;
		box-sizing: border-box;
		// transition: all 0.3s ease;
		&:hover
		{
			background: url( @/assets/pcimg/help/bg-hover.png ) center no-repeat;
			// background-size: 100% 100%;
		}

		.notice-wrap {
			display: flex;
			flex-direction: column;
			margin-top: 45px;

			p:first-child {
				color: #E6E6F1;
				font-size: 22px;
				font-weight: 700;
			}

			p:last-child {
				color: #8C8DA6;
				font-size: 17px;
				font-weight: 400;
			}
		}
	}

	

	.pc-common-tabs {
		background-color: #111324;
		font-size: 16px;
		color: #fff;
		display: flex;
		height: 80px;
		line-height: 80px;
		align-items: center;
		text-align: center;
		justify-content: flex-start;
		max-width: 1410px;
		width: 100%;
		margin: -50px auto 0;
		box-sizing: border-box;

		.tab-item
		{
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 12px;
			color: #9ca1c7;
			width: 300px;
			cursor: pointer;

			&.active
			{
				color: #fff;
    			border-bottom: solid 1px #4b56bc;
			}

			&:hover
			{
				border-bottom: solid 1px #4b56bc;
			}

			.icon
			{
				display: inline-block;
				vertical-align: middle;
				fill: currentColor;
				position: relative;
				top: -2px;
				width: 20px;
				height: 20px;
				color: #9ca1c7;
				// margin-right: 12px;
				font-size: 16px;
				text-transform: uppercase;
				flex-shrink: 0;
			}
		}
	}

	.help-main {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 500px;

		.router-view {
			width: 100%;
			overflow: hidden;
			box-sizing: border-box;
			font-size: 14px;
			color: #CBCCD6;
		}
	}
}
</style>