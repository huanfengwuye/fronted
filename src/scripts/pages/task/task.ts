import { Component, Ref, Vue, Watch } from "vue-facing-decorator"
import i18n from "@/lang"
import ShowDialog from "@/components/h5/common/ShowDialog.vue"
import TopTitleBack from "@/components/h5/common/TopTitleBack.vue"
import { useStore } from "vuex"
import { getMissionProgress, missionReward } from '@/network/api/activity'
import { GoodImageBgType } from '@/util/util'
import { t } from "@/network/axios"
import ResultLayer from '@/views/pc/openbox/components/BoxResult.vue'
import { NotifyS, Success, _isMobile, getGoodsNamePre, getGoodsNameSec } from '@/util/common';
import H5ResultLayer from '@/views/h5/openbox/components/Result.vue'
import { add } from 'mathjs';
import { markRucksackMaterial, recoveryGoods } from "@/network/api/user"

@Component({
	components : { ShowDialog, TopTitleBack, ResultLayer, H5ResultLayer }
})
export default class Task extends Vue
{
	public store = useStore()
	public detailScreenShow: boolean = false
	public receiveShow: boolean = false
	public totalItems : any =[] ;
	public gunItems : any = null;
	public get hasLogin() { return this.store.getters.hasLogin }
	@Ref()
	public resultRef: any = null

	//aaaaaaaa
	@Watch('hasLogin') 
	public async mounted() {
			this.getMissionProgress();
	}

	public async getMissionProgress()
	{	
		const res = await getMissionProgress();
		if( res.code === 0 )
		{
			this.totalItems = res.data.items;
			this.totalItems.sort((a: { missionId: any }, b: { missionId: any }) => a.missionId - b.missionId);
			window.$dev && console.log("this.totalItems",this.totalItems)
			window.$dev && console.log("this.totalItems.items",this.totalItems[0].items)
			// this.totalItems.sort((a: { isRewarded: any }, b: { isRewarded: any }) => {z
			// 	return b.isRewarded - a.isRewarded;
			//   });			  
			
		}
	}

	public async receiveMissionReward(missionId: number)
	{	
		const res = await missionReward({missionId:missionId});
		if( res.code === 0 )
		{
			this.gunItems = res.data;
			this.gunItems.sticker = 1;
			// this.gunItems.goodsLevel = this.totalItems.rewardGoodsLevel;
			window.$dev && console.log("this.gunItems>>>>>>>>>>>>>>>>>",this.gunItems);
			this.receiveShow = true
			// this.gunItems.add(sticker:null)
			this.getMissionProgress();
		}
	}

	public onSellOne() {
		let params = {
			rucksackGoodsIds: [this.gunItems.rucksackId]
		}
	
		markRucksackMaterial(params).then(res => {
			if (res.code == 0) {
				if(_isMobile()){
					NotifyS('炼化成功');
				}else{
					// Success( '炼化成功' );
					Success( { offset : 100, message : '炼化成功' } );
				}
				this.receiveShow = false
			}
		})
	}

	public getImageBg(item:any) {
		return this.store.getters.getGoodsBgImage(GoodImageBgType.box, item.rewardGoodsLevel);
	}
	public getImageBg2(item:any) {
		return this.store.getters.getGoodsBgImage(GoodImageBgType.replace, item.rewardGoodsLevel);
	}
	public showHelper()
	{
		this.detailScreenShow = true
	}
	public onClickHelp() {
		let data = {
			show: true,
			html: `<p>${ t( 'task.missionCenter' ) }</p><br><p>${ t( 'task.ruleText1' ) }</p><br><p>${ t( 'task.ruleText2' ) }</p><br><p>${ t( 'task.ruleText3' ) }</p><br><p>${ t( 'task.ruleText4' ) }</p><br><p>${ t( 'task.ruleText5' ) }</p>`
		}
		this.store.commit('setHowPlay', data);
	}
}