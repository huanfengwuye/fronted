<template>
	<div>
		<div class="mini-dialog-container" v-if="active" @click.stop="go"></div>
	</div>
</template>
<script lang="ts" src="@/scripts/components/activity-dialog/mini-dialog.ts"></script>
<style lang="scss" scoped>
.mini-dialog-container
{
	position: fixed;
	left: 30px;
	bottom: 50px;
	// border: 1px solid red;
	width: 270px;
	height: 365px;
	background: url( @/assets/pcimg/activity/mini-dialog.png ) no-repeat;
	background-size: contain;
	background-position: center center;
	z-index: 200;
}
</style>