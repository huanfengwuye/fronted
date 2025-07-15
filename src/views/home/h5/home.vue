<script lang="ts" src="@/scripts/pages/home/home.ts"></script>
<template>
	<div class="home-wrap">
		<div class="home-bg" v-if="false"></div>
		<div class="home-top-wrap" v-if="false">
			<H5RecordSwiper></H5RecordSwiper>
			<H5Notice></H5Notice>
			<!-- <TimeBoxSwiper></TimeBoxSwiper> -->

			<H5Banner />
			<!-- <SpringTimeBox /> -->
		</div>
		<H5HomeList />
		<div class="customerService" @click="onClickService">
			<img src="@/assets/romimg/home/kefu.png" alt="">
		</div>
		<!-- <TimeCountDown /> -->
	</div>
</template>

<style lang="scss" scoped>
.home-wrap {
	// background: #10271f;
	background-size: 100%;
	padding-bottom: 50px;
	position: relative;

	.home-bg {
		// background: url('@/assets/romimg/base_back.png') no-repeat center top;
		// background-size: 100%;
		position: absolute;
		height: 1135px;
		width: 750px;
	}
	.home-top-wrap {
		width: 750px;
		// padding-top: 0px;
		//padding-bottom: 24px;
		position: relative;

		#recordswiper {
			// margin-top: 12px;
		}

		#bannerswiper {
			margin-top: 5px;
		}
	}
	.customerService{
		position: fixed;
		bottom: 160px;
		right: 30px;
		img{
			width: 72px;
		}
	}
}
</style>
