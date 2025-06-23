<template>
	<div id="activity-container">
		<van-overlay z-index="300" style="background: rgba( 0, 0, 0, .7 )" :show="showDialog">
			<div class="roll-dialog">
				<div class="close-roll-btn" @click.stop="showDialog = false">
					<Icon name="close" size="16"></Icon>
				</div>
			</div>
		</van-overlay>
		<div id="activity-warp">
			<img src="@/assets/romimg/activity/11.11.png" class="activity-pic">
			<div class="close-btn"
				@click="$router.push( '/m/home' )"
				:style="{
					width : `${closeBtn.width * scale}px`,
					height : `${closeBtn.height * scale}px`,
					right : `${closeBtn.right * scale}px`
				}"
			>
			</div>

			<div class="openbox-btn"
				@click="$router.push( '/m/battle/list' )"
				:style="{
					width : `${openboxBtn.width * scale}px`,
					height : `${openboxBtn.height * scale}px`,
					left : `${openboxBtn.left * scale}px`,
					top : `${openboxBtn.top * scale}px`
				}"
			></div>

			<!-- <div class="time-btn"
				@click="router.push( '/m/timebox' )"
				:style="{
					width : `${timeBtn.width * scale}px`,
					height : `${timeBtn.height * scale}px`,
					left : `${timeBtn.left * scale}px`,
					top : `${timeBtn.top * scale}px`
				}"
			></div> -->

			<div class="game-btn"
				@click="$router.push( '/m/rank' )"
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

#activity-container
{
	background: #321c1f;
	display: flex;
	justify-content: center;

	.roll-dialog
	{
		max-width: 666px;
		width: 100%;
		height: 699px;
		position: fixed;
		background: url( @/assets/romimg/activity/rule.png ) no-repeat;
		background-size: cover;
		left: calc( 50% - 666px / 2 );
		top: calc( 50% - 699px / 2 );
		z-index: 301;

		.close-roll-btn
		{
			position: absolute;
			border: $border;
			width: 26px;
			height: 26px;
			right: 32px;
			top: 32px;

			::v-deep(svg)
			{
				height: 32px;
				width: 32px;
			}
		}
	}

	#activity-warp
	{
		position: relative;
		width: 100%;

		.activity-pic
		{
			width: 100%;
			position: absolute;
		}

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
