import { createApp } from 'vue'
import App from './App.vue'
import store from "./store"
import router from './router'
import i18n from '@/lang/index.js'
import vant from 'vant'
// import '@vant/touch-emulator'
import countTo from 'vue3-count-to'
import UUID from "vue3-uuid"
import vhCheck from 'vh-check'
import Socket from '@/util/socket'

import { Lazyload } from 'vant'
import { getChannel } from '@/network/api/index'
import { _isMobile, _canScroll, _stopScroll, Success, Warn, NotifyF, NotifyS } from './util/common'
import { defaultChannelCode, defaultPlatformId ,siteUrl, wsurl } from '@/config'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Icon from '@/components/icon/Icon.vue'
import Avatar from '@/components/avatar/pc/avatar.vue'
import H5Avatar from '@/components/avatar/h5/avatar.vue'
import Price from '@/components/price/price.vue'
import List from '@/components/list/list.vue'

import '@/assets/scss'

window.Success = Success
window.Warn = Warn

window.ws = new Socket( wsurl, store )
window._hmt = window._hmt || [];
window.Success = Success
window.Warn = Warn

window.NotifyF = NotifyF
window.NotifyS = NotifyS
window.t = i18n.global.t

window.$dev = import.meta.env.MODE === 'development' || import.meta.env.MODE === 'staging'

///	设置网站标题
function setPageTitle( meta?:any )
{
	if( typeof meta !== 'undefined' && typeof meta.name !== 'undefined' && meta.name !== '' )
		window.document.title = `${i18n.global.t( 'common.siteTitle' )} - ${i18n.global.t( `router.${meta.name}` )}`
	else
		window.document.title = i18n.global.t( 'common.siteTitle' )
}

router.afterEach( ( to, form ) => setPageTitle( to.meta ) )

async function initPlatform()
{
	const res = await getChannel( { siteUrl: siteUrl} )
	let platformId = defaultPlatformId
	let channelCode = defaultChannelCode
	if( res.code === 0 )
	{
		window.$dev && console.log( window.$dev, res )
		platformId = res.data.platformId
		channelCode = res.data.channelCode
		let keyword = res.data.keyWord

		let addHm = () =>
		{
			var hm = document.createElement( 'script' )
			hm.src = `https://hm.baidu.com/hm.js?${ keyword }`
			var s = document.getElementsByTagName( 'script' )[0]
			s.parentNode?.insertBefore( hm, s )
		}
		addHm()

		window.channelInfo = res.data
	}
	localStorage.setItem( 'platformId', platformId.toString() )
	localStorage.setItem( 'channelCode', channelCode )
	initApp( platformId )
}

function initApp( platformId:number | string )
{
	///	@ts-ignore
	const app = createApp( App )

	for( const [key, component] of Object.entries( ElementPlusIconsVue ))
	{
		app.component( key, component )
	}

	app.component( 'Icon', <any>Icon )

	app.component( 'Avatar', <any>Avatar )
	app.component( 'H5Avatar', <any>H5Avatar )
	app.component( 'Price', <any>Price )
	app.component( 'List', <any>List )

	app
		.use( store ).use( router ).use( vant )
		.use( Lazyload, {
			lazyComponent: true,
		})
		.use( countTo ).use( UUID )
		.use( i18n )

	store.commit( "setPlatformId", platformId )

	app.config.globalProperties._isMobile = _isMobile
	app.config.globalProperties._canScroll = _canScroll
	app.config.globalProperties._stopScroll = _stopScroll
	app.config.globalProperties.t = i18n.global.t

	app.config.errorHandler = ( err: any, instance: any, info: any ) =>
	{
		// 向追踪服务报告错误
		window.$dev && console.log( err )
		window.$dev && console.log( 'info:', info )
	}

	setPageTitle()
	app.mount( '#app' )
}

initPlatform()
vhCheck()