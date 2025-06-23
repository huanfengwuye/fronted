<template>
	<div class="price-container">
		<!-- <img v-if="showIcon" src="@/assets/pcimg/common/coin.png" :style="{ width : `${ iconSize }`, height : `${ iconSize }` }"> -->
		<Icon v-if="showIcon" name="goldj" color="#FFB97A" :size="iconSize"></Icon>
		<div class="prices">
			<div :style="{ 
				color : beforeColor ? beforeColor : color,
				fontWeight : fontWeight, 
				fontSize : beforeSize ? beforeFontSize : fontSize
			}">
				{{ price && price.split( '.' )[0] }}
				<slot name="brefor"></slot>
			</div>
			<div
				v-show="!hidePoint"
				:style="{ 
				color : afterColor ? afterColor : color, 
				fontWeight : fontWeight, 
				fontSize : afterSize ? afterFontSize : fontSize
			}">
				{{ price && price.split('.')[1] ? '.' : '.00' }}{{ price && price.split('.')[1] }}
				<slot name="after"></slot>
			</div>
		</div>
	</div>
</template>
<script lang="ts" src="@/scripts/components/price/price.ts"></script>
<style lang="scss" scoped>
.price-container
{
	display: flex;
	align-items: center;
	justify-content: center; /* 水平居中 */
	gap: 6px;
	z-index: 10;

	img
	{
		margin: 0 !important;
	}

	.prices
	{
		display: flex;
		align-items: baseline;
		// gap: 2px;

		div
		{
			display: flex;
			align-items: baseline;
			font-family: Flama,'微软雅黑','Microsoft Yahei','Microsoft Yahei UI';
		}
	}
}
</style>