<script setup>
import i18n from "@/lang"
const t = i18n.global.t
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { getGeneralList } from "@/network/api/blind";
import { nextTick, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { playAudio, stopAudio, timeCountdown } from "@/util/common";
import audioshoot from "@/assets/audio/shoot.mp3";
import Fire from "@/util/fire";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";

import actImg from "@/assets/pcimg/home/activity.png";
import actImg2 from "@/assets/pcimg/home/activity-2.png";
import actImg3 from "@/assets/pcimg/home/activity-3.png";
import { re } from "mathjs"

const modules = [Autoplay, Pagination];

const store = useStore();
const router = useRouter();

const homoBox = ref([]);
const activeName = ref('')
let animationRandom = ref(Math.floor(Math.random() * 100)); // 随机数
const node = ref(0);
let shootaudio = new Audio(audioshoot);

const sections = ref(0); /// 可用模块长度

/// 活动专属的箱子
const activity = ref([]);
/// 活动结束时间
const overtime = ref(new Date("2023-10-06 23:59:59").getTime() / 1000);
const Days = ref(0);
const Hours = ref(0);
const Min = ref(0);
const Sec = ref(0);

const timerId = ref(0);
const over = ref(false);

const fire = ref(null);

const rewardShow = ref({
	show: false,
	classs: ["reward", "reward2", "reward3"],
	index: 0,
});
const ani = ref(false);

function countdown() {
	over.value =
		Days.value == 0 && Hours.value == 0 && Min.value == 0 && Sec.value == 0;
	if (over.value) {
		clearInterval(timerId.value);
	} else {
		getOverTime();
	}
}

function getOverTime() {
	let d = timeCountdown(overtime.value);

	Days.value = d.days;
	Hours.value = d.hours;
	Min.value = d.min;
	Sec.value = d.sec;
}

function setRandom() {
	animationRandom.value = Math.floor(Math.random() * 100);
}

function openBox(value) {
	router.push({
		path: "/p/openbox",
		query: {
			boxId: value.boxId,
		},
	});
}

async function getBox() {
	const res = await getGeneralList();
	if (res.code === 0) {
		let items = res.data.items;
		// for (let i = 0; i < items.length; i++) {
		//	 let boxItems = items[i].boxItems;
		//	 if (boxItems && boxItems.length > 0) {
		//		 boxItems.sort((a, b) => a.sort - b.sort);
		//	 }
		// }
		homoBox.value = items.filter( item => item.boxItems && item.boxItems.length > 0 );
		activeName.value = homoBox.value[0].name;
		activity.value = items[5];
		// window.$dev && console.log( activity.value )
		store.commit("setSectionModule", items);
	}
}

function enterFun(index) {
	setRandom();
	node.value = index;
	// playAudio(shootaudio);
}
function leaveFun(index) {
	node.value = 0;
}

onMounted(async () => {
	if (overtime.value - new Date().getTime() / 1000 > 0) {
		getOverTime();
		timerId.value = setInterval(countdown, 1000);
	}
	await getBox();
});

onUnmounted(() => {
	clearInterval(timerId.value);
	stopAudio(shootaudio);
});

const banner = ref([
	{
		image: actImg,
		type: "page",
		path: "/p/activity",
	},
	{
		image: actImg2,
		type: "dialog",
		path: null,
	},
]);

async function open(item) {
	switch (item.type) {
		case "dialog":
			rewardShow.value.show = true;
			setTimeout(() => (ani.value = true), 300);

			await nextTick();
			fire.value = new Fire("#fire-container", {
				left: -200,
				top: 0,
				height: 700,
			});
			fire.value.run();
			break;

		case "page":
			router.push(item.path);
			break;
	}
}

function closeRewardDialog() {
	rewardShow.value.show = false;
	ani.value = false;
}
function rewardWindowLeft() {
	rewardShow.value.index = rewardShow.value.index - 1;
}
function rewardWindowRight() {
	rewardShow.value.index = rewardShow.value.index + 1;
}
</script>

<template>
	<div id="pc-home-wrap" v-if="store.state.moduleBlindBox">
		<div class="pc-home-list" id="act" v-if="false">
			<div class="pc-top-active">
				<div class="background">
					<div class="time-countdown-container">
						<div class="countdown-title">{{ t( 'home.limitTimeActivity' ) }}</div>
						<div class="countdown-item">
							<div>{{ Days }}</div>
							<div>Days</div>
						</div>
						<div class="countdown-item">
							<div>{{ Hours }}</div>
							<div>Hours</div>
						</div>
						<div class="countdown-item">
							<div>{{ Min }}</div>
							<div>Min</div>
						</div>
						<div class="countdown-item">
							<div>{{ Sec }}</div>
							<div>Sec</div>
						</div>
					</div>

					<div>
						<div class="act-box-list">
							<div
								class="pc-tab-item"
								v-for="value in activity.boxItems"
								@click="openBox(value)"
								:key="value.boxId"
								@mouseenter="enterFun(value.boxId)"
								@mouseleave="leaveFun(value.boxId)"
							>
								<lazy-component>
									<div
										class="animation-wrap"
										:class="{ active: node == value.boxId }"
									>
										<img src="@/assets/pcimg/home/box_active_bg.png" alt="" />
									</div>
									<div class="pc-hot" v-show="value.labelUrl">
										<img :src="value.labelUrl" alt="" />
									</div>
									<div
										class="pc-item-pic"
										:style="'background-image: url(' + value.imageUrl + ');'"
									>
										<img :src="value.weaponImageUrl" :alt="value.name" />
									</div>
									<div class="pc-item-name">{{ value.name }}</div>
									<div class="pc-item-price">
										{{ node == value.boxId ? "Open for " : "" }} &nbsp;
										<Price :value="value.price" :before-size="28" color="#fff"></Price>
									</div>
								</lazy-component>
							</div>
						</div>
						<div class="active-title">{{ t( 'home.activityContent' ) }}</div>
						<div class="active-title-sub">{{ t( 'home.activityText' ) }}</div>
					</div>
				</div>
				<div class="active-img">
					<!-- <img @click="router.push( '/p/activity' )" src="@/assets/pcimg/home/activity.png"> -->
					<swiper
						:pagination="{ clickable: true }"
						:modules="modules"
						:autoplay="{ delay: 3000 }"
						:loop="true"
					>
						<swiper-slide v-for="(item, index) in banner" :key="index">
							<img :src="item.image" alt="" @click="open(item)" />
						</swiper-slide>
					</swiper>
				</div>
			</div>
		</div>

		<!-- <div class="new-active">
			<div class="active-btn" @click="$router.push( '/p/newyear' )"></div>
		</div> -->
		<div class="pc-home-name-list">
			<div class="pc-home-name-list-item-box" v-for="(item, index) in homoBox">
				<div
				:key="index" class="pc-home-name-item" :class="{active: activeName ==item.name}" :style="`--itemIndex: ${ homoBox.length%2 == 0 ? Math.abs((homoBox.length/2-0.5) - index ): Math.abs(homoBox.length/2 - index )}`" @click="activeName=item.name">
				<span class="item-icon"></span>
				<span> {{ item.name }}</span>
				</div>

			</div>
		</div>
		<div
			class="pc-home-list"
			v-for="(item, index) in homoBox.filter(item=> item.name == activeName)"
			:key="index"
			:id="`section-${index}`"
		>
			<div
				class="bg"
				v-if="item.boxItems && item.boxItems.length > 0 "
			>
				<div class="box-title" v-if="item.boxItems && item.boxItems.length > 0">
					{{ item.name }}
				</div>
			</div>
			<div
				class="pc-tab-list"
				v-if="item.boxItems && item.boxItems.length > 0 && item.subType != 6"
			>
				<div
					class="pc-tab-item"
					v-for="value in item.boxItems"
					@click="openBox(value)"
					:key="value.boxId"
					@mouseenter="enterFun(value.boxId)"
					@mouseleave="leaveFun(value.boxId)"
				>
					<lazy-component>
						<div
							class="animation-wrap"
							:class="{ active: node == value.boxId }"
						>
							<img src="@/assets/pcimg/home/box_active_bg.png" alt="" />
						</div>
						<div v-if="value.openCountItems != null ">
							<div class="ordinal" v-if="value.openCountItems[1].count != 0 || value.openCountItems[0].count != 0">
								<div class="yesterday">
									<p>昨日开箱</p>
									<span>{{ value.openCountItems[1].count }}次</span>
								</div>
								<div class="to-day">
									<p>今日开箱</p>
									<span>{{ value.openCountItems[0].count }}次</span>
								</div>
							</div>
						</div>

						<div class="pc-hot" v-show="value.labelUrl"><img :src="value.labelUrl" alt="" /></div>
						<!-- <div class="pc-hot" v-show="item.subType == 8">
							<img src="@/assets/pcimg/home/hot.png" alt="" />
						</div> -->
						<div
							class="pc-item-pic"
							:style="'background-image: url(' + value.imageUrl + ');'"
						>
							<img :src="value.weaponImageUrl" :alt="value.name" />
						</div>
						<div class="pc-item-name">{{ value.name }}</div>
						<div class="pc-item-price">
							{{ node == value.boxId ? "Open for" : "" }}
							&nbsp;
							<Price :value="value.price" fontWeight="700" color="#fff"></Price>
							<span v-if="Number(value.price) < Number(value.originalPrice)">{{ value.originalPrice }}</span>
						</div>
					</lazy-component>
				</div>
			</div>
		</div>
		<van-overlay
			style="background: rgba(0, 0, 0, 0.7)"
			z-index="200"
			:show="rewardShow.show"
		>
			<div class="pc-flower" :class="{ ani: ani }"></div>
			<div
				:class="{
					reward1: rewardShow.classs[rewardShow.index] == 'reward',
					reward2: rewardShow.classs[rewardShow.index] == 'reward2',
					reward3: rewardShow.classs[rewardShow.index] == 'reward3',
				}"
				class="pc-reward-container"
				id="fire-container"
			>
				<div class="close" @click="closeRewardDialog"></div>
				<div class="left">
					<img
						v-if="rewardShow.index > 0"
						@click="rewardWindowLeft"
						src="@/assets/romimg/activity/10.1/allow_left.png"
						alt=""
						style="cursor: pointer"
					/>
					<img
						style="transform: rotate(180deg)"
						v-else
						src="@/assets/romimg/activity/10.1/allow_right.png"
						alt=""
					/>
				</div>
				<div class="right">
					<img
						v-if="rewardShow.index < rewardShow.classs.length - 1"
						@click="rewardWindowRight"
						style="transform: rotate(180deg); cursor: pointer"
						src="@/assets/romimg/activity/10.1/allow_left.png"
						alt=""
					/>
					<img
						v-else
						src="@/assets/romimg/activity/10.1/allow_right.png"
						alt=""
					/>
				</div>
			</div>
		</van-overlay>
	</div>
</template>
<style lang="scss">
.pc-flower {
	width: 430px;
	height: 400px;
	position: absolute;
	top: calc(50% - 650px / 2);
	left: calc(50% - 430px / 2);
	z-index: 199;
	background: url(@/assets/pcimg/activity/flower.png) no-repeat;
	background-position: center top;
	background-size: contain;

	&.ani {
		transition: 1s;
		transform: scale(1.4);
	}
}

.pc-reward-container {
	&.reward1 {
		background: url(@/assets/pcimg/activity/reward.png) no-repeat;
		background-size: contain;
	}

	&.reward2 {
		background: url(@/assets/pcimg/activity/reward2.png) no-repeat;
		background-size: contain;
	}
	&.reward3 {
		background: url(@/assets/pcimg/activity/reward3.png) no-repeat;
		background-size: contain;
	}

	// background: url(@/assets/pcimg/activity/reward.png) no-repeat;
	// background-size: contain;
	width: 430px;
	height: 700px;
	position: fixed;
	top: calc(50% - 700px / 2);
	left: calc(50% - 430px / 2);
	z-index: 300;

	.close {
		// border: 1px solid red;
		height: 34px;
		width: 34px;
		right: 0px;
		top: 0;
		position: absolute;
		cursor: pointer;
	}
	.left {
		width: 60px;
		height: 60px;
		// border: 1px solid red;
		left: -70px;
		top: 320px;
		position: absolute;
		img {
			width: 60px;
			height: 60px;
		}
		// background-color: #78081d;
	}
	.right {
		width: 60px;
		height: 60px;
		// border: 1px solid red;
		// background-color: #78081d;
		right: -70px;
		top: 320px;
		position: absolute;
		img {
			width: 60px;
			height: 60px;
		}
	}
}

.swiper-pagination {
	bottom: -20px !important;

	.swiper-pagination-bullet {
		width: 8px !important;
		height: 8px !important;
		background-color: transparent;
		border: 1px solid #cccccc;

		&.swiper-pagination-bullet-active {
			background: #fff;
		}
	}
}
</style>
<style lang="scss" scoped>
#pc-home-wrap {
	box-sizing: border-box;
	// max-width: 1410px;
	width: 100%;
	min-height: 500px;
	// background-color: #15172c;
	position: relative;
	
	.pc-home-name-list{
		position: absolute;
		left: -400px;
		z-index: 98;
		width: 560px;
		height: 526px;
		background: url(@/assets/pcimg/activity/boxnameList_bg.webp) center center / 100% 100% no-repeat;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-around;
		padding: 30px 0;
		.pc-home-name-list-item-box{
			height: 47px;
			width: 100%;
			position: relative;
		}
		.pc-home-name-item{
			
			position: absolute;
			top: 0;
			right: calc( -130px - var( --itemIndex )  * -45px);
			width: 169px;
			height: 47px;
			border-radius:20px;
			background: url(@/assets/pcimg/activity/name_item_bg.png) center center / 100% 100% no-repeat;
			display: flex;
			align-items: center;
			padding-left: 9px;
			font-size: 16px;
			gap: 20px;
			color: white;
			&.active{
				background: url(@/assets/pcimg/activity/name_item_active.png) center center / 100% 100% no-repeat;
			}
			.item-icon{
				width: 33px;
				height: 27px;
				background: url(@/assets/pcimg/activity/nametitle_bg.png) center center / 100% 100% no-repeat;
			}
		}
	}
	.pc-home-list {
		max-width: 1410px;
		margin: 0 auto;
		&:first-child {
			margin-top: 0 !important;

			.pc-tab-list {
				// margin-top: 32px;
			}
		}

		&#section-0 {
			.pc-tab-list {
				// margin-top: -100px !important;
			}
		}

		.pc-top-active {
			width: 100%;
			height: calc(653px + 200px);
			margin-top: -84px;

			.active-img {
				width: 1320px;
				margin: auto;
				.swiper {
					overflow-y: visible !important;
				}
			}

			.background {
				width: 100%;
				height: 653px;
				background: url(@/assets/pcimg/activity/top-bg.png) no-repeat;
				display: flex;
				// flex-direction: column;
				padding: 100px 43px 64px 43px;
				box-sizing: border-box;
				justify-content: space-between;
				margin-bottom: 15px;

				.time-countdown-container {
					display: flex;
					gap: 6px;
					padding-top: 70px;
					.countdown-title {
						display: flex;
						width: 188px;
						height: 88px;
						background: #e52a2a;
						border-radius: 13px;
						color: #fff;
						align-items: center;
						justify-content: center;
						font-size: 28px;
						font-family: Kanit;
						font-weight: 700;
					}

					.countdown-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						background: rgba(42, 42, 45, 0.6);
						border-radius: 13px;
						width: 88px;
						height: 88px;
						// gap: ;

						div {
							&:first-child {
								font-size: 38px;
								font-weight: 700;
								color: #fff;
								font-family: Kanit;
								font-weight: 500;
								line-height: 45px;
							}
							&:last-child {
								font-size: 18px;
								font-weight: 400;
								color: #fff;
							}
						}
					}
				}

				.act-box-list {
					display: flex;
					.pc-tab-item {
						width: 260px;
						height: 318px;
						position: relative;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;
						cursor: pointer;

						// margin: 11px 11px 50px 11px;

						.animation-wrap {
							position: absolute;
							bottom: 0px;
							left: 50%;
							bottom: -40px;
							transform: translateX(-50%);

							img {
								width: 94px;
								height: 115px;
								z-index: 0;
								// opacity: 0;
								scale: ( 1 );
								transition: all 0.3s;
							}

							span{
								opacity: 0;//透明度设置
							}
						}

						.pc-hot {
							position: absolute;
							top: 36px;
							right: 16px;
							width: 76px;
							height: 32px;
							transform: translateY(-10px);
							z-index: 100;

							img {
								height:100%;
								// width: 100%;
							}
						}

						.pc-item-pic {
							width: 260px;
							height: 260px;
							display: flex;
							justify-content: center;
							align-items: center;
							background-position: center;
							background-size: contain;
							background-repeat: no-repeat;
							z-index: 3 !important;
							position: relative;
							transition: 0.5s;

							&:hover {
								transform: scale(1.1);
								transition: all 0.3s ease-in-out;
							}

							img {
								max-width: 80%;
								margin-top: -30px;
								transition: all 0.3s;
							}
						}



						.pc-item-name {
							color: #b4b6c8;
							font-size: 16px;
							font-weight: 500;
							line-height: 16px;
							text-align: center;
							position: relative;
							font-family: Kanit-Medium, Kanit;
							margin-top: 13px;
						}

						&:hover {
							.animation-wrap.active {
								img {
									opacity: scale( 1 );
									transition: all 0.3s;
								}
							}

							.pc-item-pic {
								img {
									transform-origin: left;
									transform: rotate(-5deg);
								}
							}
						}
					}
				}
				.active-title {
					color: #fff152;
					text-align: center;
					font-size: 76px;
					font-style: normal;
					font-weight: 700;
					line-height: normal;
					margin-top: 40px;
				}
				.active-title-sub {
					color: #fff;
					text-align: center;
					margin-top: 10px;
					font-size: 40px;
					font-style: normal;
					font-weight: 700;
					line-height: normal;
				}
			}
		}

		.bg {
			height: 100px;
			max-width: 1440px;
			margin-top: 40px;
			margin-bottom: 40px;
			display: flex;
			justify-content: center;
			// background: url("@/assets/pcimg/common/new-year-bg.png") no-repeat;
			// background: linear-gradient(180deg, #101120 0%, #121323 100%);
			.box-title {
				height: 88px;
				line-height: 88px;
				font-size: 28px;
				font-weight: 500;
				text-align: center;
				// padding-left: 45px;
				// padding-left: 175px;
				// padding-left: 125px;
				width: 280px;
				margin: 0;
				color: #fef1b3;
				text-transform: capitalize;
				box-sizing: border-box;
				background: url(@/assets/pcimg/activity/name_bg.png) no-repeat center center/ 100% 100%;
				// background: url("@/assets/pcimg/common/title-bg-active.png") no-repeat
				// 	left top;
				//
				// background-position: 27px 0;
			}
		}

		.pc-tab-list {
			margin-top: -70px;
			max-width: 1410px;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			position: relative;
			.ordinal{
				top: 0px;
				right: 0px;
				position: absolute;
				height: 50px;
				padding: 6px 8px;
				box-sizing: border-box;
				align-items: center;
				justify-content: center;
				display: flex;
				flex-direction: column;
				border-radius: 4px;
				border: 1px solid #5F4DE5;
				background: #15172C;
				text-align: center;
				font-family: Inter;
				font-size: 12px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				z-index: 10;

				p{
					color: #B4B6C8;
				}
				span{
					color: #FFF;

				}

				.to-day{
					display: flex;
					gap: 5px;
				}
				.yesterday{
					display: flex;
					gap: 5px;
				}
			}
			.pc-tab-item {
				width: 260px;
				height: 318px;
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				cursor: pointer;

				margin: 11px 0px 50px 0px;

				.animation-wrap {
					position: absolute;
					bottom: 0px;
					left: 50%;
					bottom: -40px;
					transform: translateX(-50%);

					img {
						scale: ( 0 );
						width: 94px;
						height: 115px;
						z-index: 0;
						// opacity: 0;
						transition: all 0.3s;
					}
				}

				.pc-hot {
					position: absolute;
					top: 48px;
					right: 16px;
					width: 68px;
					height: 32px;
					transform: translateY(-10px);
					z-index: 10;

					img {
						// width: 100%;
						height:100%;
					}
				}

				.pc-item-pic {
					width: 260px;
					height: 260px;
					display: flex;
					justify-content: center;
					align-items: center;
					background-position: center;
					background-size: contain;
					background-repeat: no-repeat;
					z-index: 3 !important;
					position: relative;
					transition: 0.5s;
					img {
						max-width: 80%;
						margin-top: -30px;
						transition: all 0.3s;
					}
				}

				.pc-item-price {
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					font-size: 16px;
					font-weight: 500;
					line-height: 20px;
					color: #fff;
					font-family: MullerM;
					margin-top: 15px;

					span
					{
						color: #5E5E5E;
						font-family: MullerM;
						font-size: 16px;
						font-style: normal;
						font-weight: 500;
						line-height: 14px;
						text-decoration-line: strikethrough;
						text-transform: uppercase;
						text-decoration: line-through solid;
						padding: 0 8px;
					}

					img {
						width: 16px;
						height: 16px;
						margin-right: 3px;
						margin-left: 7px;
					}
				}

				.pc-item-name {
					color: #b4b6c8;
					font-size: 16px;
					font-weight: 500;
					line-height: 16px;
					text-align: center;
					position: relative;
					font-family: Kanit-Medium, Kanit;
					margin-top: 13px;
				}

				&:hover {
					.animation-wrap.active {
						img {
							// opacity: 1;
							scale: ( 1 );
							transition: all 0.3s;
						}
					}

					.pc-item-pic {
						&:hover {
							transform: scale(1.1);
							transition: all 0.3s;
						}
						img {
							transition: all 0.3s;
							transform-origin: left;
							transform: rotate(-5deg);
						}
					}

					.pc-item-price{
						span{
							position: absolute; /* 使用绝对定位 */
							opacity: 0;//透明度设置
						}
					}
				}
			}
		}
	}

	.new-active{
		width: 100%;
		height: 520px;
		background: url("@/assets/pcimg/home/newActive.png");
		background-size: 100% 100%;
		// border: 1px solid red;
		position: relative;
		.active-btn{
			position: absolute;
			width: 350px;
			top: 195px;
			right: 530px;
			height: 230px;
			// border: 1px solid #fff;
			cursor: pointer;
		}
	}

	.pc-home-list:first-child {
		margin-top: 60px;
	}

}
</style>
