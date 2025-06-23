import { Component, Vue } from "vue-facing-decorator"
import { useStore } from 'vuex'
import { tokenName } from '@/config'
// import sidebar from "@/components/pc/sidebar/Index.vue";
import i18n from "@/lang"
import wv from '@/util/webview'

import Notice from "@/components/pc/home/Notice.vue"
import Banner from "@/components/pc/home/Banner.vue"
import HomeList from "@/components/pc/home/HomeList.vue"

import H5Notice from "@/components/h5/home/Notice.vue"
import H5RecordSwiper from "@/components/h5/home/RecordSwiper.vue"
import H5Banner from "@/components/h5/home/Banner.vue"
import H5HomeList from "@/components/h5/home/HomeList.vue"

// import TimeCountDown from "@/views/h5/timebox/TimeCountDown.vue";
// import SpringTimeBox from "@/views/h5/timebox/SpringTimeBox.vue";
// import TimeBoxSwiper from "@/components/h5/home/TimeBoxSwiper.vue";

// const store = useStore()
// const reloadView = inject("reloadView")

@Component({
	components : { Notice, Banner, HomeList, H5Notice, H5RecordSwiper, H5HomeList, H5Banner }
})
export default class Home extends Vue
{
	public t = i18n.global.t
	public store = useStore()

	public indexActive = true
	public navShow = false
	public userShow = false
	// public mouseEnter = false
	// public menuShow = false

	// public isHide = false /// 是否隐藏菜单
	// public isHome = false /// 是否是首页
	// public scale = 1 /// 头像缩放比例
	// public top = 0 /// 上距
	// public modules = []
	public qqGroupDialog = false

	public onClickService()
	{
		this.navShow = false
		this.userShow = false
		if( localStorage.getItem( tokenName ) )
		{
			const channelId = this.store.getters.getConfigItem( "CustomerServiceUrl" ) || "A12fdC" // "C5j3Lu"
	  
			if( !window._AIHECONG )
			{
				( function (d, w, c) {
					if (w[c]) return
					const s = d.createElement("script")
					w[c] = function () {
						(w[c].z = w[c].z || []).push(arguments)
					}
					s.async = true
					s.src = "https://static.ahc.ink/hecong.js"
					if (d.head) d.head.appendChild(s)
				})( document, window, "_AIHECONG" )
		
				window._AIHECONG( "ini", {
					channelId: channelId,
					uniqueId: `mskins${this.store.state.userInfoBase.account}`,
					button: false,
				} )
				window._AIHECONG( "customer", {
					名称: this.store.state.userInfoBase.nickName,
					手机: this.store.state.userInfoBase.mobile,
					终端: "MODILE",
					会员账号: this.store.state.userInfoBase.account,
				} )
				window._AIHECONG( "showChat" )
			}
			else
			{
				window._AIHECONG( "showChat" )
			}

			// wv.postMessage({
			// 	data :
			// 	{
			// 		router : this.$route.path,
			// 		tabbar : false
			// 	}
			// })
		}
		else
		{
			// 使用路由跳转
			this.$router.push( "/m/sign" )
		}
	}
}
