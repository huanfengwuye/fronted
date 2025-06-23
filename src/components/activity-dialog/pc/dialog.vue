<template>
	<div id="pc-activity-dialog-wrap"
		:class="{ active: active }"
	>
		<div class="pc-activity-dialog" @click="onClickDetail">
			<div class="close" @click.stop="close"></div>
		</div>
	</div>
</template>
<script lang="ts" src="@/scripts/components/activity-dialog/dialog.ts"></script>
<style lang="scss" scoped>
#pc-activity-dialog-wrap
{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba($color: #000000, $alpha: 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: -1;
	opacity: 0;
	color: #fff;

	&.active {
		z-index: 202;
		opacity: 1;
	}

	.pc-activity-dialog {
		width: 1100px;
		height: 607px;
		background: url(@/assets/pcimg/activity/bg6.png) no-repeat center;
		background-size: contain;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: flex-end;

		.close {
			position: absolute;
			width: 50px;
			height: 50px;
			right: 58px;
			top: 34px;
			// border: 1px solid red;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.detail {
			margin-bottom: 55px;
			width: 433px;
			height: 100px;
		}
	}
}
</style>