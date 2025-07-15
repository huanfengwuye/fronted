<script lang="ts" src="@/scripts/pages/home/home.ts"></script>
<template>
	<div class="pc-home-wrap">
		<!-- <div class="home-top-wrap">
			<Notice></Notice>
			<Banner />
		</div> -->
		<HomeList />
		<!-- <sidebar /> -->
	</div>
</template>

<style lang="scss" scoped>
.pc-home-wrap {
	// background: url('@/assets/romimg/spring/bg.png') no-repeat center top, #270204;
	background-size: 100%;
	// padding-bottom: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: url(@/assets/pcimg/activity/box_bg.webp) center center/100% 100%;
	.home-top-wrap {
		width: 100%;
		padding-top: 0px;
		padding-bottom: 24px;

		#recordswiper {
			margin-top: 10px;
		}

		#bannerswiper {
			margin-top: 5px;
		}
	}
}
</style>
