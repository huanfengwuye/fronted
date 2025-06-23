<template>
	<div id="pc-activity-container">
		<van-overlay z-index="300" style="background: rgba( 0, 0, 0, .7 )" :show="showDialog">
			<div class="pc-roll-dialog">
				<div class="close-roll-btn" @click.stop="showDialog = false">
					<Icon name="close"></Icon>
				</div>
			</div>
		</van-overlay>
		<div id="pc-activity-warp" :style="{ height : `${height}px` }">
			<div class="close-btn"
				@click="$router.push( '/p/home' )"
				:style="{
					width : `${closeBtn.width * scale}px`,
					height : `${closeBtn.height * scale}px`,
					right : `${closeBtn.right * scale}px`
				}"
			></div>

			<div class="openbox-btn"
				@click="$router.push( '/p/rank' )"
				:style="{
					width : `${openboxBtn.width * scale}px`,
					height : `${openboxBtn.height * scale}px`,
					left : `${openboxBtn.left * scale}px`,
					top : `${openboxBtn.top * scale}px`
				}"
			></div>

			<!-- <div class="time-btn"
				@click="$router.push( '/p/timebox' )"
				:style="{
					width : `${timeBtn.width * scale}px`,
					height : `${timeBtn.height * scale}px`,
					left : `${timeBtn.left * scale}px`,
					top : `${timeBtn.top * scale}px`
				}"
			></div> -->

			<div class="game-btn"
				@click="$router.push( '/p/battle/list' )"
				:style="{
					width : `${gameBtn.width * scale}px`,
					height : `${gameBtn.height * scale}px`,
					left : `${gameBtn.left * scale}px`,
					top : `${gameBtn.top * scale}px`
				}"
			></div>

			<div class="roll-btn"
				@click="showDialog = true"
				:style="{
					width : `${rollBtn.width * scale}px`,
					height : `${rollBtn.height * scale}px`,
					left : `${rollBtn.left * scale}px`,
					top : `${rollBtn.top * scale}px`
				}"
			></div>

			<div class="group-btn"
				@click="onClickGroup"
				:style="{
					width : `${groupBtn.width * scale}px`,
					height : `${groupBtn.height * scale}px`,
					left : `${groupBtn.left * scale}px`,
					top : `${groupBtn.top * scale}px`
				}"
			></div>
		</div>
	</div>
</template>
<script lang="ts" src="@/scripts/pages/activity/activity.ts"></script>
<style lang="scss" scoped>

$border : none;//1px solid red;
%button
{
	position: absolute;
	border: $border;
	background: rgba( 255, 255, 255, .01 );
	box-sizing: border-box
}
%div
{
	@extend %button;
	width: 113px;
	height: 46px;
	left: 274px;
}

#pc-activity-container
{
	background: #1a2247;
	display: flex;
	justify-content: center;

	.pc-roll-dialog
	{
		max-width: 1200px;
		width: 100%;
		height: 462px;
		position: fixed;
		background: url( @/assets/pcimg/activity/rule.png ) no-repeat;
		background-size: contain;
		left: calc( 50% - 1200px / 2 );
		top: calc( 50% - 462px / 2 );
		z-index: 301;

		.close-roll-btn
		{
			position: absolute;
			border: $border;
			width: 26px;
			height: 26px;
			right: 22px;
			top: 24px;
		}
	}

	#pc-activity-warp
	{
		position: relative;
		max-width: 1920px;
		width: 100%;
		max-height: 2890px;
		background: url( @/assets/pcimg/activity/11.11.png ) no-repeat;
		background-size: contain;

		.close-btn
		{
			@extend %button;
		}

		.openbox-btn,
		.time-btn,
		.game-btn,
		.roll-btn,
		.group-btn
		{
			@extend %div;
		}
	}
}
</style>
