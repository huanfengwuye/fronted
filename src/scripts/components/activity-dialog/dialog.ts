import { Component, Vue } from "vue-facing-decorator"
import i18n from "@/lang"
import { useStore } from "vuex"
import { _isMobile } from "@/util/common"

/**
 * 活动页面中间弹窗
 */
@Component
export default class ActivityDialog extends Vue
{
	public t = i18n.global.t
	public store = useStore()

	public get active()
	{
		return 	this.store.state.activityConfig.open &&
				this.store.state.showActivityDialog && 
				this.$route.name != 'p_activity' && 
				this.$route.name != 'm_activity' &&
				this.$route.name != 'm_reserve'
	}

	public close()
	{
		this.store.commit( "setActivityDialogVisible", false )
	}

	public onClickDetail()
	{
		this.store.commit( "setActivityDialogVisible", false )
		this.$router.push( _isMobile() ? '/m/activity' : "/p/activity" )
	}
}