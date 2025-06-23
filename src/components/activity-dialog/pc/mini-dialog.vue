<template>
	<div class="pc-mini-dialog-container" v-if="active" @click.stop="go"></div>
</template>
<script lang="ts" src="@/scripts/components/activity-dialog/mini-dialog.ts"></script>
<style lang="scss" scoped>
.pc-mini-dialog-container
{
	position: fixed;
	left: 54px;
	bottom: 54px;
	// border: 1px solid red;
	width: 270px;
	height: 365px;
	background: url( @/assets/pcimg/activity/mini-dialog.png ) no-repeat;
	background-size: cover;
	background-position: center center;
	z-index: 200;
}
</style>