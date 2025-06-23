class WebView
{
	public static WEB_INVOKE_APPSERVICE: string = 'WEB_INVOKE_APPSERVICE'
	public static UNIAPP_SERVICE_NVUE_ID: string = '__uniapp__service'
	public webviewIds: any[] = []

	public postMessage( param: any )
	{
		// const params =
		// {
		// 	options : {
		// 		timestamp : +new Date()
		// 	},
		// 	name : 'postMessage',
		// 	arg : param
		// }

		// window.$dev && console.log( params )
		// return window.parent.postMessage(
			// {
			// 	type : WebView.WEB_INVOKE_APPSERVICE,
			// 	data : params,
			// 	pageId : ''
			// }
		// , '*' )
		try
		{
			if( window.__dcloud_weex_postMessage )
			{
				return window.__dcloud_weex_postMessage( param )
			}
			else
			{
				return window.__dcloud_weex_.postMessage( JSON.stringify( param ) )
			}
		} catch (e) {}
	}
}

export default new WebView