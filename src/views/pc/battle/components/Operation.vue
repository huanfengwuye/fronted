<script setup>
import i18n from "@/lang"
const t = i18n.global.t
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import BattleBoxDetail from './BattleBoxDetail.vue'

const props = defineProps(['boxList', 'watchCount', 'start', "joinPrice","winMode"]);
const store = useStore();
const router = useRouter();

function onClickBox(item) {
	let boxData = { boxName: item.name, boxId: item.boxId };
	store.commit('setClickBattleBoxData', boxData);
	// router.push({
	//	 path: '/p/battleBoxDetails',
	// });

	curBox.value = item
	showBoxDetail.value = true
}

function onClickHistory() {
	router.push('/p/battleHistory');
}

function getBoxImageStyle(item) {
	if (item.imageUrl) {
		return 'background-image: url(' + item.imageUrl + ');'
	} else {
		return ''
	}
}

const showBoxDetail = ref( false )
const curBox = ref( {} )
function openBoxDetail( item )
{
	// window.$dev && console.log( item )
	curBox.value = item
	showBoxDetail.value = true
}

function closeBoxDetail( e )
{
	// window.$dev && console.log( e )
	if( e == 'close-btn' ) return showBoxDetail.value = false
	
	if( typeof e.target != 'undefined' && e.target.className == 'van-overlay' )
	return showBoxDetail.value = false
}
</script>
		
<template>
	<div id="pc-battle-operation">
		<van-overlay style="background: rgba( 0, 0, 0, .7 )" z-index="200" :show="showBoxDetail" @click="closeBoxDetail">
		<BattleBoxDetail :item="curBox" @close-box-detail="closeBoxDetail( 'close-btn' )"></BattleBoxDetail>
	</van-overlay>
		<div class="opt-left">
			<div class="opt-box-wrap">
				<div class="opt-box-item" v-for="(item, index) in boxList" :key="index"
					:class="{ 'active': start.round == index }">
					<div class="pic" :style="getBoxImageStyle(item)" @click="onClickBox(item)">
						<img :src="item.weaponImageUrl" alt="">
					</div>
				</div>
			</div>
		</div>
		<div class="opt-right">
			<div class="round">
				<div class="titles">{{ t( 'battle.round' ) }}</div>
				<div class="sub-title">{{ start.round+1 }} / {{ boxList.length }}</div>
			</div>
			<div class="total" :class="{active:winMode == 1}"> 
				<div class="titles">{{ t( 'bag.priceTotal' ) }}</div>
				<div class="sub-title">
					<Price
						:currency="joinPrice"
						size="18"
						color="#7BDCA2"						
					></Price>
				</div>
			</div>
		</div>
		<van-overlay style="background: rgba( 0, 0, 0, .7 )" z-index="200" :show="showBoxDetail" @click="closeBoxDetail">
		<BattleBoxDetail :item="curBox" @close-box-detail="closeBoxDetail( 'close-btn' )"></BattleBoxDetail>
	</van-overlay>
	</div>
</template>
		
<style lang="scss">
#pc-battle-operation {
	width: 1410px;
	height: 138px;
	background: #111324;
	display: flex;
	align-items: center;
	justify-content: space-between;
	// padding: 0 38px;
	padding-left: 16px;
	box-sizing: border-box;

	.opt-left {
		display: flex;
		align-items: center;

		.round {
			color: #FFF;
			font-size: 20px;
			font-weight: 500;
			font-family: MullerS;
		}

		.opt-box-wrap {
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			// margin-left: 45px;


			.opt-box-item {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 98px;
				height: 98px;
				cursor: pointer;
				margin-right: 10px;
				opacity: 0.3;

				.pic {
					display: flex;
					justify-content: center;
					align-items: center;
					background-size: contain;
					background-position: center;
					background-repeat: no-repeat;
					width: 98px;
					height: 98px;

					img {
						max-width: 95%;
						max-height: 95%;
					}
				}

				&.active {
					opacity: 1;
					position: relative;

					&::before
					{
						content: '';
						position: absolute;
						background: url( @/assets/pcimg/battle/handler.png ) no-repeat;
						width: 8px;
						height: 8px;
						z-index: 200;
						bottom: -20px;
					}
				}
			}
		}
	}


	.opt-right {
		color: #FFF;
		font-size: 16px;
		display: flex;
		gap: 1px;
		height: 100%;

		.round,
		.total
		{
			background: #0D0E1A;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 152px;
			height: 100%;

			&.active{
				background: url("@/assets/pcimg/battle/pc-chou.png");
			}

			.titles
			{
				color: #aaa;
				font-size: 20px;
				font-style: normal;
				font-weight: 400;
				display: flex;
				justify-content: center;
				width: 100%;
				line-height: 1.6em;
			}
		}

		.round
		{
			.sub-title
			{
				color: #CF3464;
				font-size: 14px;
			}
		}

		.total
		{
			&.active{
				background: url("@/assets/pcimg/battle/pc-chou.png");
			}
			.sub-title
			{
				color: #7BDCA2;
				font-size: 18px;
				display: flex;
				align-items: center;
			}
		}

		// span {
		//	 color: #75DC9E;
		//	 font-family: MullerM;
		//	 font-size: 14px;
		//	 font-weight: 500;
		//	 letter-spacing: 0.42px;
		// }

		// img{
		//	 margin-bottom: -3px;
		// }
	}

}
</style>