import { Component, Vue } from "vue-facing-decorator"
import { useStore } from 'vuex'
import { tokenName } from "@/config";
import { _isMobile } from "@/util/common";

@Component
export default class Activity extends Vue
{
	public store = useStore()

	public get hasLogin()
	{
		return this.store.getters.hasLogin
	}

	public height: number = 2890
	public scale: number = 1
	public showDialog: boolean = false

	/**
	 * 关闭按钮的坐标
	 */
	public closeBtn = !_isMobile() ? {
		right : 42,
		width: 102,
		height: 66
	} : {
		right : 30,
		width: 68,
		height: 76,
	}	

	public openboxBtn = !_isMobile() ? {
		top : 2194,
		left : 360,
		width : 150,
		height : 60
	} : {
		top : 1068,
		left : 104,
		width : 148,
		height : 62
	}	

	public timeBtn = !_isMobile() ? {
		top : 2396,
		left : 352,
		width : 142,
		height : 60
	} : {
		top : 1930,
		left : 300,
		width : 152,
		height : 60
	}	

	public gameBtn = !_isMobile() ? {
		top : 1254,
		left : 360,
		width : 148,
		height : 60
	} : {
		top : 2070,
		left : 280,
		width : 190,
		height : 60
	}	

	public rollBtn = !_isMobile() ? {
		top : 2592,
		left : 308,
		width : 128,
		height : 52
	} : {
		top : 2444,
		left : 82,
		width : 132,
		height : 52
	}	

	public groupBtn = !_isMobile() ? {
		top : 2620,
		left : 1021,
		width : 128,
		height : 50
	} : {
		top : 2828,
		left : 72,
		width : 132,
		height : 54
	}	

	public mounted()
	{
		window.$dev && console.log( this )
		this.resize()
		addEventListener( 'resize', this.resize.bind( this ) )
	}

	public destroyed()
	{
		removeEventListener( 'resize', this.resize.bind( this ) )
	}

	public resize()
	{
		if( !_isMobile() )
		{
			let width = ( <HTMLElement>document.querySelector( '#pc-activity-warp' ) )?.offsetWidth
			this.scale = width / 1920
			this.height = 2890 * this.scale
		}
		else
		{
			let width = ( <HTMLElement>document.querySelector( '#activity-warp' ) )?.offsetWidth
			this.scale = width / 750
		}
	}

	public onClickGroup()
	{
		///	如果用户未登录直接弹窗登录
		if( !this.hasLogin )
			return this.store.commit( "setSignView", true )

		if( navigator.userAgent.indexOf("UCBrowser") > -1 )
		{
			alert("UC浏览器暂不支持跳转,请更换浏览器");
		}
		else
		{
			let item = this.store.state.otherConfig.qqGroup[0]
			let qqGroupLink = item || this.store.getters.getConfigItem( "GroupChatUrl" )
			window.open( qqGroupLink )
		}
	}
}