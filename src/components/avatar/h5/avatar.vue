<template>
	<div :class="changeMyClass()" v-if="isMobile">
		<img
			v-if="userModel"
			class="icon_img"
			:src="userModel.avater || defaultIcon"
			:style="hasFrame() ? 'border:none' : ''"
			alt=""
		/>
		<!-- icon_img_frame_bg: !userModel.isAnchor, -->
		<img
			v-if="userModel.isAnchor || size == 'battleDetail'"
			:class="{
				icon_img_bg: userModel.isAnchor,
			}"
			:src="
				userModel.isAnchor ? anchorImgUrl : userModel.avaterFrame
			"
			alt=""
		/>
	</div>
	<div :class="changeMyClass()" v-else>
		<img class="icon_img" :src="userModel.avater || defaultIcon" :style="hasFrame() ? 'border:none' : ''" alt="">
		<img v-show="hasFrame() && !hideFrame" class="icon_img_bg" :src="userModel.avaterFrame"	alt="">
		<img v-if="userModel.isAnchor" class="tv-flag" :src="anchorImgUrl" />
	</div>
</template>
<script lang="ts" src="@/scripts/components/avatar/avatar.ts"></script>
<style lang="scss" scoped>
.head_header {
	// padding-right: 48px;
	// padding-left: 24px;
	.icon_img {
		width: 60px;
		height: 60px;
		border: 1px solid #fbfa02;
		border-radius: 18px;
		overflow: hidden;
		box-sizing: border-box;
	}
}
.head_n_one {
	width: 80px;
	height: 80px;
	position: relative;
}
.head_120 {
	width: 120px;
	height: 120px;
	position: relative;

	.icon_img {
		border-radius: 20px;
		width: 100%;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}
}

.head_n_one .icon_img {
	position: absolute;
	width: 100%;
	height: 100%;
	// border: 0.026667rem solid #fbfa02;
	border-radius: 20px;
	overflow: hidden;
	box-sizing: border-box;
}

.head_n_one .icon_img_bg {
	position: absolute;
	width: 160px;
	height: 160px;
	transform: translate(-42px, -42px);
}

.head_n_rank_t {
	width: 186px;
	height: 186px;
	position: relative;
}

.head_n_rank_t .icon_img {
	position: absolute;
	width: 100%;
	height: 100%;
	border: 0.026667rem;
	border-radius: 50%;
	overflow: hidden;
	box-sizing: border-box;
}

.head_n_rank_t .icon_img_bg {
	position: absolute;
	width: 245px;
	height: 245px;
	transform: translate(-32px, -32px);
}

.m-head-one {
	width: 72px;
	height: 72px;
	// margin-left: 20px;
	position: relative;

	.icon_img {
		position: absolute;
		width: 100%;
		height: 100%;
		// border: 1px solid #fbfa02;
		border-radius: 16px;
		overflow: hidden;
		box-sizing: border-box;
	}

	.icon_img_bg {
		position: absolute;
		display: none;
		width: 126px;
		height: 126px;
		transform: translate(-30px, -30px);
	}
}

.m-head-two {
	width: 116px;
	height: 116px;
	position: relative;

	.icon_img {
		position: absolute;
		left: 0;
		// border: 1px solid #fbfa02;
		border-radius: 20px;
		width: 100%;
		height: 100%;
	}

	.icon_img_bg {
		// display: none;
		position: absolute;
		width: 220px;
		height: 200%;
		transform: translate(-110px, -60px);
	}
}

.m-head-three {
	width: 26px;
	height: 26px;
	position: relative;

	.icon_img {
		position: absolute;
		left: 0;
		border: 1px solid #19162b;
		border-radius: 50%;
		width: 100%;
		height: 100%;
	}

	.icon_img_bg {
		position: absolute;
		width: 34px;
		height: 34px;
		transform: translate(-5px, -5px);
	}
}

.m-head-four {
	width: 96px;
	height: 96px;
	position: relative;

	.icon_img {
		position: absolute;
		// border: 0.026667rem solid #fbfa02;
		border-radius: 20px;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.icon_img_bg {
		position: absolute;
		width: 180px;
		height: 180px;
		transform: translate(-45px, -45px);
	}
}

.m-head-five {
	//已调整
	width: 76px;
	height: 76px;
	position: relative;

	.icon_img {
		position: absolute;
		left: 0;
		border-radius: 20px;
		width: 100%;
		height: 100%;
	}

	.icon_img_bg {
		position: absolute;
		width: 40px;
		height: 28px;
		bottom: 0;
		left: 0;
	}
}

.m-head-history {
	width: 64px;
	height: 64px;
	margin-right: 22px;
	position: relative;

	// .icon_img {
	//	 position: absolute;
	//	 left: 0;
	//	 border: 0.026667rem solid #fff;
	//	 border-radius: 16px;
	//	 width: 100%;
	//	 height: 100%;
	// }

	// .icon_img_bg {
	//	 position: absolute;
	//	 width: 1.2rem;
	//	 height: 1.2rem;
	//	 transform: translate(-0.18rem, -0.2rem);
	// }

	.icon_img {
		position: absolute;
		width: 100%;
		height: 100%;
		// border: 1px solid #fbfa02;
		border-radius: 16px;
		overflow: hidden;
		box-sizing: border-box;
	}

	.icon_img_bg {
		display: none;
		position: absolute;
		width: 120px;
		height: 120px;
		transform: translate(-30px, -30px);
	}
}

.m-head-battleDetail {
	width: 72px;
	height: 72px;
	// margin-right: 0.266667rem;
	position: relative;

	.icon_img {
		position: absolute;
		left: 0;
		border-radius: 20px;
		width: 100%;
		height: 100%;
	}

	.icon_img_frame_bg {
		position: absolute;
		width: 142px;
		height: 142px;
		top: -35px;
		left: -35px;
	}
	.icon_img_bg {
		position: absolute;
		width: 33px;
		height: 28px;
		bottom: 0px;
		left: 0px;
	}
}

.m-head-timing {
	width: 64px;
	height: 64px;
	position: relative;
	top: 20px;

	.icon_img {
		position: absolute;
		left: 0;
		border-radius: 12px;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.icon_img_bg {
		position: absolute;
		width: 136px;
		height: 146px;
		transform: translate(-99.5px, -40px);
	}
}

.m-head-open {
	width: 0.746667rem;
	height: 0.746667rem;
	position: relative;

	.icon_img {
		position: absolute;
		left: 0;
		// border: 0.013333rem solid #fbfa02;
		border-radius: 50%;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.icon_img_bg {
		position: absolute;
		width: 1.066667rem;
		height: 1.066667rem;
		transform: translate(-0.143333rem, -0.17rem);
	}
}

.head_n_lucky_tab_his {
	width: 52px;
	height: 52px;
	position: relative;

	.icon_img {
		position: absolute;
		left: 0;
		// border: 1px solid #fbfa02;
		border-radius: 8px;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.icon_img_bg {
		position: absolute;
		width: 52px;
		height: 52px;
		transform: translate(-14px, -13px);
	}
}

.head_n_lucky_detail {
	width: 47px;
	height: 47px;
	position: relative;

	.icon_img {
		position: absolute;
		left: 0;
		// border: 1px solid #fbfa02;
		border-radius: 50%;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.icon_img_bg {
		position: absolute;
		width: 65px;
		height: 65px;
		transform: translate(-10px, -10px);
	}
}

.m-head-itempic {
	//已
	width: 96px;
	height: 96px;
	margin: 0 auto;
	position: relative;
	.icon_img {
		position: absolute;
		left: 0;
		border-radius: 28px;
		width: 96px;
		height: 96px;
		box-sizing: border-box;
	}

	.icon_img_bg {
		display: none;
		position: absolute;
		width: 190px;
		height: 190px;
		transform: translate(-45px, -45px);
	}
}

.m-head-maindata {
	width: 64px;
	height: 64px;
	position: relative;
	top: 20px;

	.icon_img {
		position: absolute;
		left: 0;
		border-radius: 12px;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.icon_img_bg {
		display: none;
		position: absolute;
		width: 136px;
		height: 146px;
		transform: translate(-99.5px, -40px);
	}
}

.m-head-200 {
	width: 100px;
	height: 100px;
	position: relative;

	.icon_img {
		position: absolute;
		left: 0;
		border: 1px solid #19162b;
		border-radius: 20%;
		width: 100%;
		height: 100%;
	}

	.icon_img_bg {
		position: absolute;
		width: 200px;
		height: 200px;
		transform: translate(-50px, -50px);
	}
}
</style>