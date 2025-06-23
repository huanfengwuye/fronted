declare module "*.vue" {
	import Vue from 'vue'
	export default Vue
}

declare interface Window {
	$dev: boolean,
	ws: null | any,
	_hmt: any,
	Success: any,
	Warn: any,
	channelInfo: any,
	NotifyF: any,
	NotifyS: any,
	t: any,
	_AIHECONG: any,
	[property: string]: any
}