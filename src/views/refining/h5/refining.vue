<script lang="ts">
import { Component } from 'vue-facing-decorator'
import Refining from '@/scripts/pages/refining/refining'

@Component
export default class H5Refining extends Refining {}
</script>

<template>
  <div id="refining">
	<TopTitleBack :handler="showHelper" title="饰品炼化"></TopTitleBack>

	<div class="operating effect">
		<div class="option" v-if="selectList.length == 0">
			<img class="crux" src="@/assets/romimg/refining/crux.png" alt="">
			<p>请投入炼化材料</p>
		</div>
		<div v-else :class="{ 'refining-bg glitch' : true, 'glitch--animate' : animation }">
			
			<div   v-if="!refiningBegins && selectList.length != 0" class="on-refining glitch-container" ref="originRef" v-for="item in total" :key="item">
				<div class="refining-title">
					消耗材料
				</div>
				<div class="aaaa">
					<div class="material">
						<div class="selection">
							<img :class="{active: true}" src="@/assets/romimg/refining/pearls.png" alt="">
						</div>
						<p>已投入材料</p>
						<Price
							size="12"
							color="#7EF2AD"
							:currency="priceList.toFixed(2)"
						></Price>
					</div>
					<div class="material">
						<div class="selection" @click=" animation ? a() : onReagent()">
							<Icon v-if="reagentItem.length == 0" name="addType" color="#98A2F6" :size="35"></Icon>
							<img  v-if="reagentItem.length != 0" :src="reagentItem.iconUrl" alt="">
							<p v-if="reagentItem.length != 0">{{ reagentItem.probability * 100 }}%</p>
						</div>
						<p>选择强化剂</p>
						<Price
							v-if="reagentItem.length != 0"
							size="12"
							color="#7EF2AD"
							:currency="reagentItem.price"
						></Price>
						<Price
							v-else
							size="12"
							color="#7EF2AD"
							currency="0"
						></Price>
					</div>
				</div>

			</div>

			<div v-if="success == 1" class="success-container glitch-container" >
				<div class="good-info">
					<div class="pic">
						<img v-if="animation" src="@/assets/romimg/refining/crux.png" alt="">
						<img v-else :src="refineItem.iconUrl" alt="">
					</div>
					<div class="bg" :class="[ `level-${refineItem.goodsRefineLevel + 1}` ]"></div>
					<div class="item-info">
						<p class="item-info1 hide">
							{{ getGoodsNamePre(refineItem.goodsName) }}
						</p>
						<p class="item-info2 hide">
							{{ getGoodsNameSec(refineItem.goodsName) }}
						</p>
					</div>
					<Price
						size="12"
						color="#7EF2AD"
						:currency="refineItem.price"
					></Price>
				</div>
			</div>

			<div v-if=" success == 0" class="fail-container glitch-container">
				<img src="@/assets/romimg/refining/fail-bg.png" alt="">
				<p>炼化失败</p>
			</div>

			<div v-if="!refiningBegins && !animation" class="refining-btn" :class="{active:reagentItem.length != 0 && priceList != 0}" @click="onRefining">
				确认炼化
			</div>
			<div v-if="refiningBegins" class="refining-btn close" :class="{active:reagentItem.length != 0 && priceList != 0}" @click="onClose">
				确认
			</div>
		</div>

	</div>

	<div class="repository">
		<div class="repository-title">
			<Icon name="repository" color="#FFF" :size="15"></Icon>
			我的材料
		</div> 
		<van-list
			v-model:loading="loading"
			:finished="finished"
			:finished-text="t( 'common.noMore' )"
			@load="onLoad"
			:immediate-check="false"
		>
		<div class="repository-bag">
			<div 
				v-for="(item,index) in makingsList"
				class="bag-bg"
				:class="{ active: item.choose }"
				@click="onItem(item)"
			>
				<div class="good-info">
					<img :src="item.iconUrl" alt="">
					<Price
						size="12"
						color="#7EF2AD"
						:currency="item.price"
					></Price>
					<div class="quantities">
						<span :style="{ 'color': colorList[item.refineLevel-1] }" class="icon iconfont">&#xe649;</span>
					</div>
				</div>
			</div>
		</div>
		</van-list>
	</div>

	<div class="reagent-bg" v-if="reagentShow">
		<div class="reagent-body">
			<div class="reagent-title">
				选择强化剂
				<div class="close" @click="reagentShow = false">
					<Icon name="close" size="18" color="#4B4F6D"></Icon>
				</div>
			</div>
			<div class="reagent-info">
				<div @click="reagentType(item)" :class="{active:item.size == reagentItem.size}" class="reagent-item" v-for="(item,index) in reagentList">
					<p>{{ item.probability * 100 }}%</p>
					<img :src="item.iconUrl" alt="">
					<span>{{ item.size }}型强化剂</span>
					<Price
						size="12"
						color="#7EF2AD"
						:currency="item.price"
					></Price>
				</div>
			</div>
			<div class="reagent-btn" @click="show">
				确认
			</div>
		</div>
	</div>

	<H5ShowDialog
	  :btnType="-1"
	  :title="t( 'rank.rule' )"
	  :show="ruleShow"
	  @cancel="ruleShow = false"
	>
	  <div class="dialog-x-content">
		<div class="dialog-row-wrap">* {{ '材料等级划分：青色蓝色紫色粉色红色金色' }}</div>
		<div class="dialog-row-wrap">* {{ '炼化剂等级划分   蓝色（大中小）紫色（大中小）粉色（大中小）红色（大中小）金色概率：按用户投入炼化剂的大小获得高等级饰品的价格' }}</div>
		<div class="dialog-row-wrap">
		  * {{ '玩法规则：材料*N+炼化剂=高等级饰品举例：青色材料*N+蓝色炼化剂=随机蓝色饰品蓝色材料*N+紫色炼化剂=随机紫色饰品紫色材料*N+粉色炼化剂=随机粉色饰品粉色材料*N+红色炼化剂=随机红色饰品红色材料*N+金色炼化剂=随机金色饰品注：不可夸品质强化，不可逆向强化。' }}
		</div>
	  </div>
	</H5ShowDialog>

  </div>
</template>

<style lang="scss" scoped>
.effect {
	--gap-horizontal: 10px;
	--gap-vertical: 5px;
	--time-anim: 2s;
	--delay-anim: 0s;
	--blend-mode-1: none;
	--blend-mode-2: none;
	--blend-mode-3: none;
	--blend-mode-4: none;
	--blend-mode-5: overlay;
	--blend-color-1: transparent;
	--blend-color-2: transparent;
	--blend-color-3: transparent;
	--blend-color-4: transparent;
	--blend-color-5: #af4949;
}

.glitch {
	overflow: hidden;
	position: relative;
}

.glitch,
.glitch-container {
	background-repeat: no-repeat;
	background-position: 50% 50%;
	background-size: cover;
}


.glitch--animate
{

	.glitch-container {
		position: absolute;
		// top: calc(-1 * var(--gap-vertical));
		// left: calc(-1 * var(--gap-horizontal));
		width: calc(100% + var(--gap-horizontal) * 2);
		height: calc(100% + var(--gap-vertical) * 2);
		background-color: var(--blend-color-1);
		transform: translate3d(0,0,0);
		background-blend-mode: var(--blend-mode-1);
	}

	.glitch-container:nth-child(n+2) {
		opacity: 0;
	}

	.glitch-container:nth-child(n+2)
	{
		animation-duration: var(--time-anim);
		animation-delay: var(--delay-anim);
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-fill-mode: forwards;
	}

	.glitch-container:nth-child(2) {
		background-color: var(--blend-color-2);
		background-blend-mode: var(--blend-mode-2);
		animation-name: glitch-anim-1;
	}

	.glitch-container:nth-child(3) {
		background-color: var(--blend-color-3);
		background-blend-mode: var(--blend-mode-3);
		animation-name: glitch-anim-2;
	}

	.glitch-container:nth-child(4) {
		background-color: var(--blend-color-4);
		background-blend-mode: var(--blend-mode-4);
		animation-name: glitch-anim-3;
	}

	.glitch-container:nth-child(5) {
		background-color: var(--blend-color-5);
		background-blend-mode: var(--blend-mode-5);
		animation-name: glitch-anim-flash;
	}
}

/* Animations */

@keyframes glitch-anim-1 {
	0%, 100% { 
		opacity: 1;
		transform: translate3d(var(--gap-horizontal),0,0) scale3d(-1,-1,1);
		-webkit-clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
		clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
	}
	20% {
		-webkit-clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
		clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
	}
	30% {
		-webkit-clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
		clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
	}
	40% {
		-webkit-clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
		clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
	}
	50% {
		-webkit-clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
		clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
	}
	55% {
		-webkit-clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
		clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
	}
	60% {
		-webkit-clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
		clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
	}
	65% {
		-webkit-clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
		clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
	}
	70% {
		-webkit-clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
		clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
	}
	80% {
		-webkit-clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
		clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
	}
	85% {
		-webkit-clip-path: polygon(0 60%, 100% 60%, 100% 65%, 0 65%);
		clip-path: polygon(0 60%, 100% 60%, 100% 65%, 0 65%);
	}
	95% {
		-webkit-clip-path: polygon(0 72%, 100% 72%, 100% 78%, 0 78%);
		clip-path: polygon(0 72%, 100% 72%, 100% 78%, 0 78%);
	}
}

@keyframes glitch-anim-2 {
	0%, 100% { 
		opacity: 1;
		transform: translate3d(calc(-1 * var(--gap-horizontal)),0,0);
		-webkit-clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
		clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
	}
	10% {
		-webkit-clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
		clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
	}
	15% {
		-webkit-clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
		clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
	}
	17% {
		-webkit-clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
		clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
	}
	19% {
		-webkit-clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
		clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
	}
	33% {
		-webkit-clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
		clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
	}
	35% {
		-webkit-clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
		clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
	}
	40% {
		-webkit-clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
		clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
	}
	45% {
		-webkit-clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
		clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
	}
	49% {
		-webkit-clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
		clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
	}
	50% {
		-webkit-clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
		clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
	}
	55% {
		-webkit-clip-path: polygon(0 15%, 100% 15%, 100% 35%, 0 35%);
		clip-path: polygon(0 15%, 100% 15%, 100% 35%, 0 35%);
	}
	60% {
		-webkit-clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
		clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
	}
	70% {
		-webkit-clip-path: polygon(0 65%, 100% 65%, 100% 60%, 0 60%);
		clip-path: polygon(0 65%, 100% 65%, 100% 60%, 0 60%);
	}
	80% {
		-webkit-clip-path: polygon(0 80%, 100% 80%, 100% 85%, 0 85%);
		clip-path: polygon(0 80%, 100% 80%, 100% 85%, 0 85%);
	}
	90% {
		-webkit-clip-path: polygon(0 55%, 100% 55%, 100% 65%, 0 65%);
		clip-path: polygon(0 55%, 100% 55%, 100% 65%, 0 65%);
	}
}

@keyframes glitch-anim-3 {
	0%, 100% { 
		opacity: 1;
		transform: translate3d(0, calc(-1 * var(--gap-vertical)), 0) scale3d(-1,-1,1);
		-webkit-clip-path: polygon(0 1%, 100% 1%, 100% 3%, 0 3%);
		clip-path: polygon(0 1%, 100% 1%, 100% 3%, 0 3%);
	}
	5% {
		-webkit-clip-path: polygon(0 10%, 100% 10%, 100% 9%, 0 9%);
		clip-path: polygon(0 10%, 100% 10%, 100% 9%, 0 9%);
	}
	11% {
		-webkit-clip-path: polygon(0 5%, 100% 5%, 100% 6%, 0 6%);
		clip-path: polygon(0 5%, 100% 5%, 100% 6%, 0 6%);
	}
	20% {
		-webkit-clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
		clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
	}
	25% {
		-webkit-clip-path: polygon(0 10%, 100% 10%, 100% 10%, 0 10%);
		clip-path: polygon(0 10%, 100% 10%, 100% 10%, 0 10%);
	}
	35% {
		-webkit-clip-path: polygon(0 30%, 100% 30%, 100% 25%, 0 25%);
		clip-path: polygon(0 30%, 100% 30%, 100% 25%, 0 25%);
	}
	42% {
		-webkit-clip-path: polygon(0 15%, 100% 15%, 100% 16%, 0 16%);
		clip-path: polygon(0 15%, 100% 15%, 100% 16%, 0 16%);
	}
	48% {
		-webkit-clip-path: polygon(0 40%, 100% 40%, 100% 39%, 0 39%);
		clip-path: polygon(0 40%, 100% 40%, 100% 39%, 0 39%);
	}
	50% {
		-webkit-clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
		clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
	}
	56% {
		-webkit-clip-path: polygon(0 60%, 100% 60%, 100% 55%, 0 55%);
		clip-path: polygon(0 60%, 100% 60%, 100% 55%, 0 55%);
	}
	61% {
		-webkit-clip-path: polygon(0 30%, 100% 30%, 100% 31%, 0 31%);
		clip-path: polygon(0 30%, 100% 30%, 100% 31%, 0 31%);
	}
	68% {
		-webkit-clip-path: polygon(0 70%, 100% 70%, 100% 69%, 0 69%);
		clip-path: polygon(0 70%, 100% 70%, 100% 69%, 0 69%);
	}
	72% {
		-webkit-clip-path: polygon(0 40%, 100% 40%, 100% 41%, 0 41%);
		clip-path: polygon(0 40%, 100% 40%, 100% 41%, 0 41%);
	}
	77% {
		-webkit-clip-path: polygon(0 80%, 100% 80%, 100% 75%, 0 75%);
		clip-path: polygon(0 80%, 100% 80%, 100% 75%, 0 75%);
	}
	81% {
		-webkit-clip-path: polygon(0 50%, 100% 50%, 100% 51%, 0 51%);
		clip-path: polygon(0 50%, 100% 50%, 100% 51%, 0 51%);
	}
	86% {
		-webkit-clip-path: polygon(0 90%, 100% 90%, 100% 90%, 0 90%);
		clip-path: polygon(0 90%, 100% 90%, 100% 90%, 0 90%);
	}
	90% {
		-webkit-clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
		clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
	}
	92% {
		-webkit-clip-path: polygon(0 100%, 100% 100%, 100% 99%, 0 99%);
		clip-path: polygon(0 100%, 100% 100%, 100% 99%, 0 99%);
	}
	94% {
		-webkit-clip-path: polygon(0 70%, 100% 70%, 100% 71%, 0 71%);
		clip-path: polygon(0 70%, 100% 70%, 100% 71%, 0 71%);
	}
}

@keyframes glitch-anim-text {
	0%, 100% { 
		transform: translate3d(2px, -2px, 0) scale3d(-1,-1,1);
		-webkit-clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
		clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
	}
	20% {
		-webkit-clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
		clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
	}
	41% {
		-webkit-clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
		clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
	}
	52% {
		-webkit-clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
		clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
	}
	61% {
		-webkit-clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
		clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
	}
	75% {
		-webkit-clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
		clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
	}
	80% {
		-webkit-clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
		clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
	}
	96% {
		-webkit-clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
		clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
	}
}

@keyframes glitch-anim-title {
	0%, 100% { 
		transform: translate3d(2px, -2px, 0);
		-webkit-clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
		clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
	}
	20% {
		-webkit-clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
		clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
	}
	41% {
		-webkit-clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
		clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
	}
	52% {
		-webkit-clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
		clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
	}
	61% {
		-webkit-clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
		clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
	}
	75% {
		-webkit-clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
		clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
	}
	80% {
		-webkit-clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
		clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
	}
	96% {
		-webkit-clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
		clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
	}
}

/* Flash */
@keyframes glitch-anim-flash {
	0%, 5% { 
		opacity: 0.2; 
		transform: translate3d(var(--gap-horizontal), var(--gap-vertical), 0);
	}
	5.5%, 100% {
		opacity: 0;
		transform: translate3d(0, 0, 0);
	}
}

#refining {
	width: 750px;
	min-height: calc(100vh - 500px);

	.reagent-bg{
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;//创建弹窗背景
		width: 100%;
		height: 100%;
		background: rgba( 0, 0, 0, .7 );
		left: 0;
		top: 0;
		z-index: 200;
		.reagent-body{
			width: 710px;
			height: 710px;
			background: #191C34;
			padding: 50px 0 60px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			position: relative;
			// justify-content: center;
			align-items: center;
			.reagent-title{
				color: #FFF;
				text-align: center;
				font-size: 36px;
				font-style: normal;
				font-weight: 400;
				// line-height: 24px; /* 133.333% */
				text-transform: capitalize;
				.close{
					position: absolute;
					top: 30px;
					right: 30px;
					background-size: 100% 100%;
				}
			}
			.reagent-btn{
				width: 320px;
				border-radius: 8px;
				background: #4B58C9;
				height: 72px;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #FFF;
				text-align: center;
				font-size: 28px;
				font-weight: 700;
			}
			.reagent-info{
				margin: 80px 0 80px;
				display: flex;
				justify-content: center;
				gap: 20px;
				.reagent-item{
					width: 210px;
					height: 290px;
					background: #121528;
					display: flex;
					flex-direction: column;
					box-sizing: border-box;
					position: relative;
					justify-content: center;
					border-radius: 8px;
					background: #121528;
					align-items: center;
					&.active{
						border: 2px solid #2D2D67;
					}
					span{
						color: #E3E3E7;
						font-size: 24px;
						font-weight: 400;
					}
					p{
						top: 10px;
						right: 15px;
						position: absolute;
						color: #FFF;
						text-align: center;
						font-size: 24px;
						font-weight: 700;
					}
					img{
						width: 150px;
						height: 150px;
					}
				}
			}
		}
	}

	.operating{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 750px;
		height: 600px;
		background: url('@/assets/romimg/refining/operating.png');
		background-size: 100% 100%; 
		.refining-bg{
			display: flex;
			align-items: center;
			// justify-content: center;
			flex-direction: column;
			padding-bottom: 70px;
			box-sizing: border-box;
			gap: 40px;
			position: relative;
			width: 100%;
			height: 100%;

			.on-refining{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 620px;
				gap: 30px;
				height: 400px;
				background: url('@/assets/romimg/refining/operating-bg.png');
				background-size: 100% 100%;
				position: absolute;

				.refining-title{
					// padding-top: 50px;
					display: flex;
					justify-content: center;
					font-size: 36px;
					background: linear-gradient(180deg, #86CCFF 0%, #1E9BF5 43%, #86CCFF 100%);
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
				.aaaa{
					display: flex;
					gap: 40px;
					.material{
						display: flex;
						justify-content: center;
						flex-direction: column;
						align-items: center;
						// gap: 40px;
						.selection{
							display: flex;
							align-items: center;
							justify-content: center;
							width: 160px;
							position: relative;
							height: 160px;
							border-radius: 8px;
							background: linear-gradient(180deg, #4752A1 0%, #1C203C 7.5%, #343D7A 49%, #6088D4 81.25%);	
							p{
								position: absolute;
								right: 3px;
								bottom: 4px;
								color: #FFF;
								-webkit-text-stroke-width: 1;
								-webkit-text-stroke-color: #2C2C89;
								font-family: "Microsoft YaHei";
								font-size: 24px;
								font-style: normal;
								font-weight: 700;
								line-height: normal;
							}
							img{
								width: 110px;
								height: 110px;
								// filter: grayscale(50%);
								&.active{
									filter: grayscale(0%);
								}
							}
						}
						p{
							margin-top: 10px;
							color: #E3E3E7;
							font-family: "Microsoft YaHei";
							font-size: 24px;
							font-style: normal;
							font-weight: 400;
							line-height: normal;
						}

					}
				}

			}
			.fail-container{
				// display: flex;
				flex-direction: column;
				p{
					color: #EFF0F5;
					text-align: center;
					font-size: 28px;
					font-style: normal;
					font-weight: 700;
				}
				img{	
					width: 480px;
					height: 400px;
				}
			}
			.success-container{
				flex-direction: column;
				align-items: center;
				position: relative;
				width: 440px;
				height: 450px;
				.good-info{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding-top: 40px;
					.pic{
						img{
							// width: 440px;
							position: relative;
							z-index: 5;
							height: 330px;
						}
					}
					.item-info {
						display: flex;
						flex-direction: column;
						// position: absolute;
						bottom: 32px;
						// left: 40px;
						align-items: center;
						.item-info1 {
							font-size: 24px;
							font-weight: bold;
							color: #cbccd6;
						}

						.item-info2 {
							font-size: 24px;
							color: #cbccd6;
							width: 100%;
							overflow: hidden;
							word-break: break-all;
							white-space: nowrap;
						}
					}
					.bg {
						position: absolute;
						top: -70px;
						right: -40px;
						animation: ani-rotate 14s linear infinite;
						width: 500px;
						height: 500px;
						// background: url(@/assets/pcimg/openbox/result_bg.png) no-repeat center;
						background-size: contain;

						&.level-1
						{
							background: url(@/assets/pcimg/openbox/result_bg_1.png) no-repeat center;
							background-size: 100% 100%;

						}

						&.level-2
						{
							background: url(@/assets/pcimg/openbox/result_bg_2.png) no-repeat center;
							background-size: 100% 100%;
						}

						&.level-3
						{
							background: url(@/assets/pcimg/openbox/result_bg_3.png) no-repeat center;
							background-size: 100% 100%;
						}

						&.level-4
						{
							background: url(@/assets/pcimg/openbox/result_bg_4.png) no-repeat center;
							background-size: 100% 100%;
						}

						&.level-5
						{
							background: url(@/assets/pcimg/openbox/result_bg_5.png) no-repeat center;
							background-size: 100% 100%;
						}

						&.level-6
						{
							background: url(@/assets/pcimg/openbox/result_bg_6.png) no-repeat center;
							background-size: 100% 100%;
						}

						&.level-7
						{
							background: url(@/assets/pcimg/openbox/result_bg_7.png) no-repeat center;
							background-size: 100% 100%;
						}
					}
				}
			}
			.refining-btn{
				position: absolute;
				bottom: 80px;
				width: 320px;
				height: 76px;
				border-radius: 8px;
				background: #4B58C9;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #8692F5;
				font-size: 28px;
				font-weight: 700;
				&.close{
					bottom: 30px;
				}
				&.active{
					color: #FFF;
				}
			}
		}

		.option{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			.crux{
				width: 320px;
				height: 320px;
				animation: floatUpDown 4s ease-in-out infinite; /* 应用上下悬浮动画，3s表示动画时长，可以根据需要调整 */
			}
			p{
				color: #FFF;
				font-size: 32px;
				font-weight: 700;
			}
		}
	}
	.repository{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 750px;
		border-radius: 12px 12px 8px 8px;
		border: 2px solid #2D2D67;
		background: #15172C;
		flex-direction: column;
		// gap: 30px;
		// padding: 0 40px;
		.repository-title{
			display: flex;
			align-items: center;
			padding-left: 40px;
			box-sizing: border-box;
			font-size: 28px;
			height: 80px;
			gap: 20px;
			width: 100%;
			color: #FBFFFE;
			background: linear-gradient(180deg, #15172C 0%, #0D0E1C 100%);
		}
		.repository-bag{
			display: flex;
			padding: 30px 40px;
			width: 100%;
			box-sizing: border-box;
			gap: 10px;
			flex-wrap: wrap;
			.bag-bg{
				width: 160px;
				height: 160px;
				border-radius: 4px;
				background: #1C203C;
				box-sizing: border-box;
				&.active{
					border: 2px solid #38417F;
				}
				.good-info{
					width: 100%;
					height: 100%;
					gap: 10px;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					flex-direction: column;
					img{
						width: 120px;
					}
					.quantities{
						display: flex;
						justify-content: center;
						align-items: center;
						top: 10px;
						right: 10px;
						padding: 0 10px;
						box-sizing: border-box;
						height: 32px;
						border-radius: 20px;
						color: #FFF;
						span{
							font-size: 30px;
						}
						font-size: 24px;
						position: absolute;
						// background: #4CC5CD;
					}

				}
			}
		}
	}
}
/* 定义上下悬浮动画 */
@keyframes floatUpDown {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px); /* 控制上下浮动的幅度 */
  }
}
</style>
