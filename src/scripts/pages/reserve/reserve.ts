import { Component, Vue } from "vue-facing-decorator"
import { useStore } from 'vuex'
import { bindWechatPublic } from '@/network/api/auth'
import { NotifyS, NotifyF, timeCountdown } from '@/util/common'
import { FormatNickname } from "@/util/common"
import BattleRankTopItem from '@/views/pc/battle/components/BattleRankTopItem.vue'
import H5TopTitleBack from "@/components/h5/common/TopTitleBack.vue"
import username_icon from "@/assets/romimg/sign/user-line.png"
import userpassword_icon from "@/assets/romimg/sign/password-lock.png"
import H5ShowDialog from "@/components/h5/common/ShowDialog.vue"
import Price from '@/components/price/price.vue'
import i18n from "@/lang"
import { $_GET } from "@/util/common"

@Component({
	components : { BattleRankTopItem, H5TopTitleBack, H5ShowDialog, Price }
})
export default class Rank extends Vue
{
	public t = i18n.global.t
	public store = useStore()
	// public $GET: any = $_GET

	public username_icon = username_icon
	public userpassword_icon = userpassword_icon

	public accountSign = {
		account : "",
		password : ""
	}

	public appID = 'wx6b2aaf0cd012c4ca'

	public showToast: boolean = false
	public myRank: any = null
	public showrule: boolean = false

	public binded: boolean = false

	public get userInfoBase()
	{
		return this.store.state.userInfoBase
	}
	
	public get userInfoAssets()
	{
		return this.store.state.userInfoAssets
	}

	public get hasLogin()
	{
		return this.store.getters.hasLogin
	}

	public mounted()
	{
		if( typeof ( $_GET as any )['code'] === 'undefined' )
		{
			window.$dev && console.log( 'no code', location.href, encodeURI( location.href ), encodeURIComponent( location.href ) )

			let redirect = encodeURIComponent( location.href )
			let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appID}&redirect_uri=${redirect}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`

			window.open( url, '_self' )
		}
	}

	public scrollToElement() {
		// 获取要滚动到的元素
		var elementToScrollTo: any = document.getElementById("scrollToThisElement");
	
		// 使用 scrollIntoView 方法将元素滚动到可视区域
		elementToScrollTo.scrollIntoView({
			behavior: "smooth", // 可选，添加平滑滚动效果
			alignWithTop: true, // 可选，将元素顶部与可视区域顶部对齐
		});
	}

	public async onAccountLogin(v:any) {
		if( !/^1\d{10}$/.test( v.account ) )
		{
			return NotifyF( '账号格式有误' )
		}

		if( v.password == '' )
		{
			return NotifyF( '请输入密码' )
		}

		let params: any = {}
			params.account = v.account
			params.password = v.password
			params.code = ( $_GET as any )['code'] || ''

		window.$dev && console.log( params )
	
		const res = await bindWechatPublic(params);
		if (res.code === 0) {
			NotifyS( res.message );
			this.binded = true
		}
	}
}
