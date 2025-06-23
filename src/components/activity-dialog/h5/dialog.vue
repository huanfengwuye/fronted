<template>
	<div>
		<div class="overlay" 
			:style="{ 
				background: `rgba( 0, 0, 0, ${ active ? '.7' : '0' } )`,
				zIndex : active ? 200 : -1
			}" v-if="active"
		>
			<div class="dialog-container" v-show="active" @click.stop="onClickDetail">
				<img src="@/assets/romimg/activity/dialog.png">
				<div class="close-btn" @click.stop="close"></div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" src="@/scripts/components/activity-dialog/dialog.ts"></script>
<style lang="scss" scoped>
.dialog-container
{
	position: fixed;
	width: 100%;
	left: 50%;
	top: 50%;
	transform: translateX(  -50% ) translateY( -50% );
	z-index: 200;

	img
	{
		width: 100%;
	}

	.close-btn
	{
		height: 60px;
		width: 60px;
		background: rgba( 0, 0, 0, .0 );
		position: absolute;
		// border: 1px solid red;
		right: 20px;
		top: 10px;
	}
}

.overlay
{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 200;
	transition: .3s;
	display: flex;
	align-items: center;
}
</style>
