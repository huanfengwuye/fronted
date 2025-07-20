<script setup>
import { nextTick, onMounted, onUnmounted, provide, ref, watch } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { PcNotify, _isMobile, isPCFunc, inArray, $_GET } from '@/util/common'
import closeImg from '@/assets/pcimg/common/close.png'
import Fire from '@/util/fire'
import wv from '@/util/webview'
import { appShowTabbarRouter } from "./config";

const store = useStore();
const route = useRoute();
const router = useRouter();

const isRouterAlive = ref(true);

///	消息队列
const queue = ref( [] )
///	队列推送状态
const pushing = ref( false )
///	队列计时器
let timer = 0
const fire = ref(null)
provide("reloadView", { reloadView });

onMounted(() => {

	window.$dev && console.log( '$_GET >>>>>>>>>>', $_GET )

	if( $_GET['code'] !== undefined && !localStorage.getItem( 'mskins_fcode' ) )
		localStorage.setItem( 'mskins_fcode', $_GET['code'] )

	initTSSVid();
	initBdVid();
	initWxVid()
	store.commit("initLocalData");
	store.dispatch("refreshToken");
	store.dispatch("initConfigList");
	store.dispatch("initModuleList");
	store.dispatch("initGoodsBgList");
	store.dispatch("getOtherConfig");
	initResizeView();
	window.addEventListener("resize", viewChangeListener);
	window.addEventListener("orientationchange", viewChangeListener);

	addEventListener( 'activity.prize', onMessage )
});

onUnmounted(() => {
	window.removeEventListener("resize", viewChangeListener);
	window.removeEventListener("orientationchange", viewChangeListener);
});

watch( route, ( val, from ) => {
	window.$dev && console.log( 'path >>>>>>>>', val.path )
	// if( val.path == from.path ) return
	wv.postMessage( {
		data : {
			router : val.path,
			tabbar : inArray( val.path, appShowTabbarRouter )
		}
	} )

	if( route.name == 'jump' )
	{
		window.$dev && console.log( $_GET )
		if( $_GET['url'] )
		{
			window.$dev && console.log( 'jump >>>>>>>>', `/m${$_GET['url']}` )
			return _isMobile() || !isPCFunc() ? router.push( `/m${$_GET['url']}` ) : router.push( `/p${$_GET['url']}` )
		}
	}
} )

///	接收到中奖信息
function onMessage( e )
{
	let data = e.detail.data

	///	消息入栈
	queue.value.unshift( data )

	///	如果没有队列
	if( !pushing.value )
	{
		pushMessage()
		timer = setInterval( pushMessage, 6000 )
	}

	pushing.value = true
	// console.log( data )
}

let fireTimeout
const showFire = ref( false )
///	消息推送
async function pushMessage()
{
	if( queue.value.length < 1 )
	{
		pushing.value = false
		return clearInterval( timer )
	}

	let data = queue.value.pop()

	let nickname = data.nickName
	let price = data.recoveryPrice
	let url = ''
	let text = ''

	let avater = data.avater
	switch( data.boxType )
	{
		case 1 :
			if( _isMobile() )
				url = `/#/m/openbox?boxId=${ data.boxId }`
			else
				url = `/#/p/openbox?boxId=${ data.boxId }`
			text = '开箱'
		break

		case 2 :
			// url = `/#/p/battleDetail?id=${ data.battleId }&status=3`
			if( _isMobile() )
				url = `/#/m/battle/list`
			else
				url = `/#/p/battle/list`
			text = '对战'
		break
	}

	PcNotify( 
		`<div class="prize-container">
			<div class="pn-prize-info">
				<div class="user-pic"><img src="${ avater }"></div>
				<div class="prize-info">
					<div class="nickname">恭喜 ${ nickname }</div>
					<div class="content">${text}获得<span>${ price }</span>游戏福袋</div>
				</div>
			</div>
			<div class="pn-go">
				<a href="${url}">去${text} ></a>
			</div>
		</div>` 
	)

	clearTimeout( fireTimeout )
	showFire.value = true
	await nextTick();
	if( !fire.value )
	{
		fire.value = new Fire("#fire-container", {
			left: _isMobile() ? 0 : 300,
			top: 0,
			height: 700,
		});
		fire.value.run()
	}
	fireTimeout = setTimeout( () => {
		showFire.value = false
		// fire.value = null
	}, 5000 )
}

function initResizeView() {
	let isPC = isPCFunc();
	store.commit("setPCClient", isPC);
}

function viewChangeListener() {
	// return
	let isPC = isPCFunc();

	if( store.state.isPCClient == isPC ) return

	window.$dev && console.log( isPC )
	store.commit("setPCClient", isPC);

	let params = isPC && route.path.startsWith("/m/") ? { path : '/p/home' } : { path : 'm/index' }
	if( route.query.code )
		params.query = { code : route.query.code }

	router.replace( params )
	nextTick(() => router.go(0))
	// if (isPC && route.path.startsWith("/m/")) {
	// 	let params = { path: "/p/home" };
	// 	if (route.query.code) {
	// 		params.query = { code: route.query.code };
	// 	}
	// 	router.replace(params);
	// }
	// if (!isPC && route.path.startsWith("/p/")) {
	// 	let params = { path: "/m/home" };

	// 	if (route.query.code) {
	// 		params.query = { code: route.query.code };
	// 	}
	// 	router.replace(params);
	// }
}

function initTSSVid() {
	let tssquery = {
		qhclickid: "",
	};
	location.search
		.substring(1)
		.split("&")
		.forEach((item) => {
			tssquery[item.split("=")[0]] = item.split("=")[1];
		});
	if (tssquery.qhclickid) {
		let bz = _isMobile() ? 2 : 1;
		let snnid = tssquery.qhclickid + "," + bz;
		localStorage.setItem("bd_vid", snnid);
	}
}

function initBdVid() {
	let query = {
		bd_vid: "",
	};
	location.search
		.substring(1)
		.split("&")
		.forEach((item) => {
			query[item.split("=")[0]] = item.split("=")[1];
		});
	localStorage.setItem("bd_vid", query.bd_vid);
}

function initWxVid()
{
	console.log( $_GET['AppID'], $_GET['OpenID'] )
	localStorage.setItem("wx_vid", `${$_GET['AppID']},${$_GET['OpenID']}`)
}

function reloadView() {
	isRouterAlive.value = false;
	nextTick(() => {
		isRouterAlive.value = true;
	});
	window.$dev && console.log( 'reload' )
}

Date.prototype.format = function (fmt) {
	var o = {
		"M+" : this.getMonth() + 1, //月份
		"d+" : this.getDate(), //日
		"h+" : this.getHours(), //小时
		"m+" : this.getMinutes(), //分
		"s+" : this.getSeconds(), //秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季度
		S : this.getMilliseconds(), //毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(this.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
			);
		}
	}
	return fmt;
};
</script>

<template>
	<div :class="store.state.isPCClient ? 'pc-root' : 'root'" class="main">
		<div id="fire-container" v-show="showFire"></div>
		<router-view v-if="isRouterAlive" />
	</div>
</template>

<style lang="scss">
.main{
	background: url(@/assets/pcimg/activity/bg01.png) no-repeat center center / 100%;
	background-size: cover;
	height: 100vh;
	overflow: auto;
}
.pc-root {
	width: 100%;
	overflow-x: hidden;

	#fire-container
	{
		width: 80%;
		height: 700px;
		// border: 1px solid red;
		position: fixed;
		z-index: 30000;
		left: 10%;
		top: calc( 50% - 350px );
		pointer-events: none;
	}
}

.root
{

	#fire-container
	{
		width: 100%;
		height: 100%;
		// border: 1px solid red;
		position: fixed;
		z-index: 30000;
		left: 0;
		top: 0;
		pointer-events: none;
	}
}

.hide {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.min-wrap-height {
	min-height: calc(100vh - 309px);
}

.van-toast {
	width: 200px !important;
	height: 200px !important;

	.van-loading__spinner {
		width: 100px !important;
		height: 100px !important;
	}

	.van-toast__text {
		font-size: 24px !important;
	}
}

.van-overlay {
	background: none;
	background-color: rgba(#000, 0.8);
	z-index: 198 !important;
}

.pc-price-coin {
	width: 14px;
	height: 14px;
	margin-right: 4px;
	margin-bottom: 1px;
}

.common-nav {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	position: relative;
	width: 100%;
	border-bottom: 4px solid #fbfa02;

	.common-nav-item {
		width: 211px;
		height: 63px;
		text-align: center;
		line-height: 63px;
		color: #fff;
		font-size: 22px;
		font-weight: bold;
		background: url(@/assets/romimg/common/tab_item.png) no-repeat center;
		background-size: 100% 100%;
		margin-bottom: -4px;
		margin-left: -5px;

		&.active {
			background: url(@/assets/romimg/common/tab_item_active.png) no-repeat
				center;
			background-size: 100% 100%;
			color: #141427;
			height: 63px;
		}

		&:first-child {
			margin-left: 0px;
		}
	}

	.introduce {
		height: 48px;
		line-height: 48px;
		font-size: 20px;
		color: #fbfa02;
		position: absolute;
		right: 18px;
		top: 0;
	}
}

.common-tab-wrap {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	position: relative;
	width: 100%;

	.common-tab-item {
		width: 140px;
		height: 51px;
		text-align: center;
		line-height: 51px;
		color: #fff;
		font-size: 20px;
		font-weight: bold;
		background: url(@/assets/romimg/common/tab_item.png) no-repeat center;
		background-size: 100% 100%;
		margin-bottom: -4px;
		margin-left: -3px;

		&.active {
			background: url(@/assets/romimg/common/tab_item_active.png) no-repeat
				center;
			background-size: 100% 100%;
			color: #141427;
			height: 51px;
		}

		&:first-child {
			margin-left: 0px;
		}
	}
}

.common-tab-wrap2 {
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	position: relative;
	width: 100%;

	.common-tab-item {
		text-align: center;
		line-height: 63px;
		color: #f4f4f4;
		font-size: 24px;
		font-weight: bold;
		width: 208px;
		height: 63px;
		background: rgba(69, 69, 69, 0);
		border: 7px solid #fbfa02;

		&.active {
			background: #fbfa02;
			border: 7px solid #fbfa02;
			color: #1f1d2a;
		}
	}
}

.weapon-list {
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
	width: 100%;
	padding: 0 20px;

	.weapon-item {
		position: relative;
		width: 214px;
		height: 331px;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		margin-right: 33px;
		margin-top: 30px;

		&:nth-child(3n) {
			margin-right: 0;
		}

		.weapon-item-pic {
			width: 180px;
			height: 180px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;

			// img {
			// 	max-width: 100%;
			// 	max-height: 100%;
			// }
		}

		.weapon-item-name {
			text-align: center;
			padding: 0 10px;
			box-sizing: border-box;
			color: #fff;
			font-weight: bold;
			font-size: 16px;
		}

		.weapon-all-name {
			left: 0px;
			bottom: -35px;
			width: 100%;
			text-align: center;
			background: #353748;
			position: absolute;
			color: #fff;
			line-height: 40px;
			font-size: 16px;
			padding: 0 20px;
			border-radius: 8px;
			z-index: 9;
			box-sizing: border-box;
			display: none;

			&.active {
				display: block;
			}

			&::after {
				display: block;
				content: "";
				width: 33px;
				height: 27px;
				background: url(@/assets/romimg/common/arrow_top.png) no-repeat center;
				background-size: contain;
				position: absolute;
				left: 50%;
				top: -20px;
				transform: translateX(-50%);
			}
		}

		.weapon-item-price {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			color: #fbfa02;
			font-size: 20px;
			margin-top: 30px;

			.price {
				margin-top: 10px;
			}

			img {
				width: 31px;
				height: 31px;
			}
		}

		.weapon-info {
			display: flex;
			align-items: center;
			justify-content: space-around;
			margin-top: 15px;

			.weapon-item-price {
				margin-top: 0;
			}

			.rate {
				font-size: 18px;
			}
		}

		.join-user-wrap {
			.join-user-price {
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fbfa02;
				font-size: 20px;

				img {
					width: 28px;
					height: 28px;
				}
			}

			.join-user-info {
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				font-size: 20px;

				p {
					max-width: 130px;
				}
			}
		}

		.text {
			position: absolute;
			left: 100px;
			bottom: 60px;
			height: 40px;
			background: #353748;
			color: #fff;
			line-height: 40px;
			font-size: 16px;
			padding: 0 20px;
			border-radius: 8px;
			white-space: nowrap;
			z-index: 2;
			box-sizing: border-box;
			min-width: 100px;
			display: none;

			&::after {
				display: block;
				content: "";
				width: 33px;
				height: 27px;
				background: url(@/assets/romimg/common/arrow_top.png) no-repeat center;
				background-size: contain;
				position: absolute;
				left: 40px;
				top: 30px;
				transform: rotate(180deg);
			}

			&.show {
				display: block;
			}
		}

		&:nth-child(3n) {
			margin-right: 0;

			.text {
				left: auto;
				right: 10px;

				&::after {
					left: auto;
					right: 40px;
				}
			}
		}

		&:nth-child(3n - 1) {
			.text {
				left: 50%;
				transform: translateX(-1%);

				&::after {
					left: 40px;
				}
			}
		}
	}
}

input:-ms-input-placeholder {
	color: #fff;
}

input::-webkit-input-placeholder {
	color: #fff;
}

input::-moz-placeholder {
	color: #fff;
}

input:-moz-placeholder {
	color: #fff;
}

.van-dialog {
  width: 550px !important;
  height: 300px !important;
  border-radius: 7px;
  background: #15172C !important;
  box-shadow: 0px 2px 200px 0px #000;

	.van-dialog__content {
		margin-top: 40px;

		.van-dialog__message {
			img {
				width: 34px;
				transform: translateY(8px);
			}

			color: #fff;
			font-size: 28px;
			line-height: 1.75em;
		}
	}

	.van-hairline--top {
		height: 60px;
		margin-top: 30px;
		display: block !important;
		text-align: center;

		&::after {
			display: none;
		}

		.van-button {
			display: flex;
			width: 120px;
			height: 40px;
			justify-content: center;
			align-items: center;
			color: #fff;
			text-align: center;
			font-size: 17px;
			font-style: normal;
			font-weight: 700;
			line-height: 25.5px;
			cursor: pointer;
			margin-right: 18px;
			border-radius: 4px;
			background: #3a34b0;

			.van-button__content {
				width: 100%;
			}

			&::after {
				display: none;
			}

			&:nth-child(2) {
				background: #7d51df;
			}
		}
	}
}
</style>
