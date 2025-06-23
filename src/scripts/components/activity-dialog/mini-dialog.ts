import { Component, Vue, Watch } from "vue-facing-decorator"
import { useStore } from 'vuex'
import i18n from "@/lang"
import { _isMobile } from "@/util/common"

/**
 * 页面左下角弹窗
 */
@Component
export default class ActivityMiniDialog extends Vue
{
	public t = i18n.global.t

	public store = useStore()

	public mounted()
	{
		window.$dev && console.log(
			this.store.state.activityConfig.open,
			!this.store.state.showActivityDialog,
			this.hasLogin,
			this.$route.name != 'p_activity',
			this.$route.name != 'm_activity'
		)
	}

	public get hasLogin()
	{
		return this.store.getters.hasLogin
	}

	public get active()
	{
		return 	this.store.state.activityConfig.open &&
				!this.store.state.showActivityDialog &&
				this.hasLogin &&
				( this.$route.name == 'p_home' || this.$route.name == 'm_home' )
	}

	public go()
	{
		this.$router.push( _isMobile() ? '/m/activity' : '/p/activity' )
	}
}