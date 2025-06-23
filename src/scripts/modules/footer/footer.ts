import { Component, Vue } from 'vue-facing-decorator'
import { useStore } from "vuex"
import i18n from "@/lang"

import { runDeviceType } from "@/config"
import { DeviceType } from "@/util/util"
import { getPlatformStatistics } from '@/network/api/index'
import logoIcon2 from "@/assets/logo.png"
import { boolean, clone } from 'mathjs';

@Component
export default class Footer extends Vue
{
	public t = i18n.global.t
	public store = useStore()

	public companyName: string = '' 	//	版权所属：郴州网创电商服务有限公司
	public filingNo: string = '' 		//	湘ICP备2022022225号-1
	public securityNo: string = '' 		//	湘公网安备 43100202000401号

	public renzhIcon: boolean = false

	public box: number = 0
	public users: number = 0
	public battle: number = 0

	public is681: boolean = false

	public site: string = 'mskins.com'

	public mounted()
	{
		this.is681 = location.hostname == this.site
		this.init()
		
		this.companyName = window.channelInfo.companyName || ''
		this.filingNo = window.channelInfo.filingNo
		this.securityNo = window.channelInfo.securityNo

		if( this.store.state.otherConfig.renzhChannel )
		{
			let channelCode = localStorage.getItem("channelCode");
			let chIndex = this.store.state.otherConfig.renzhChannel.findIndex(( v: string | null ) => {
				return channelCode == v
			})

			if( chIndex != -1 )
			{
				this.renzhIcon = true
			}
		}
	}

	public async init()
	{
		let res = await getPlatformStatistics()
		if( res.code == 0 )
		{
			this.box = res.data.blindBoxOpenTotal
			this.battle = res.data.battleTotal
			this.users = res.data.userTotal
		}
	}

	public go( v: any )
	{
		this.$router.push(v);
	}

	public getLogo()
	{
		return logoIcon2
	}
}