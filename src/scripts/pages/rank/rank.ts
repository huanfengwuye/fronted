import { Component, Vue } from "vue-facing-decorator"
import { useStore } from 'vuex'
import { getPointRank } from '@/network/api/extend'
import { timeCountdown } from '@/util/common'
import { FormatNickname } from "@/util/common"
import BattleRankTopItem from '@/views/pc/battle/components/BattleRankTopItem.vue'
import H5TopTitleBack from "@/components/h5/common/TopTitleBack.vue"
import H5ShowDialog from "@/components/h5/common/ShowDialog.vue"
import Price from '@/components/price/price.vue'
import i18n from "@/lang"


@Component({
	components : { BattleRankTopItem, H5TopTitleBack, H5ShowDialog, Price }
})
export default class Rank extends Vue
{
	public t = i18n.global.t
	public store = useStore()

	public rankData: any = []
	public todayRankData: any = []
	public yesRankData = []

	public frontDayStar = {}

	public topRank: any = []
	public otherRank: any = []
	public selRank: any = {}
	public isDay: boolean = false
	public rankNum: any = {}
	public rewardAmount =0
	public newRank = [] /// 新顺序 2 1 3排序
	public surplusTime =0	/// 倒计时

	public timer =0
	public overtime = {
		days : 0,
		hours : 0,
		min : 0,
		sec : 0
	}

	public ruleShow: boolean = false
	public rankDataTop3: any = []
	public rankDataTop3after: any = []
	public endTime: number = 1697621533141

	public top_name = [
		{ name: "第一名", color: "#FFC164" },
		{ name: "第二名", color: "#DAE3F5" },
		{ name: "第三名", color: "#CE8372" },
	]
	public showToast: boolean = false
	public myRank: any = null
	public showrule: boolean = false


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

	// public myRank =0
	// public myPoint =0
	// public myReward =0

	public mounted()
	{
		// if( this.hasLogin )
		this.getRank()
	}

	public FormatNickname( str: string, len: number )
	{
		return FormatNickname( str, len )
	}

	public unmounted()
	{
		clearInterval( this.timer )
	}

	public destroyed()
	{
		clearInterval( this.timer )
	}

	public switchDay(){
		this.isDay = !this.isDay
		this.getRank()
	}

	public async getRank()
	{
		// const res = await getRankList({ limit: 10 });
		let res:any =[]
		if(!this.isDay){
			res = await getPointRank({ type: 0 })
		}else{
			res = await getPointRank({ type: 1 })
		}
		window.$dev && console.log( res )
		if( res.code === 0 )
		{
			this.todayRankData = res.data.items || [];

			// for( let i = 0; i < 10; i++ )
			// {
			//	 this.todayRankData.push( ...res.data.items )
			// }
			this.rankData = res.data || [];
			console.log("this.rankData",this.rankData)
			this.endTime = this.rankData.surplusTime * 1000
	  
			if( this.rankData.items != null && this.rankData.items.length <= 3 )
			{
				this.rankDataTop3 = this.rankData.items;
			}
			
			if( this.rankData.items != null && this.rankData.items.length > 3 )
			{
				this.rankDataTop3 = this.rankData.items.slice(0, 3)
				this.rankDataTop3after = this.rankData.items.slice(3)
			}

			this.yesRankData = res.data.frontItems || []
			this.frontDayStar = res.data.frontDayStar || {}
			// this.rankData = this.todayRankData;
			this.rewardAmount = res.data.rewardAmount

			this.myRank = res.data.myRankItem
			// window.$dev && console.log( myRank )

			this.rankNum = this.myRank ? this.myRank.rankNum : null
			// myPoint = res.data.myPoint
			// myReward = res.data.rewardAmount

			this.topRank = this.todayRankData.slice(0, 3) || [];
			this.otherRank = this.todayRankData.slice(3) || [];

			this.surplusTime = new Date().getTime() / 1000 + Number( res.data.surplusTime )

			this.timer = setInterval( () => {
				this.overtime = timeCountdown( this.surplusTime )
			}, 1000 )
			// newRank[0] = topRank[1] || {}
			// newRank[1] = topRank[0] || {}
			// newRank[2] = topRank[2] || {}

			// window.$dev && console.log( topRank, otherRank )

			let topRankLength = this.topRank.length
			if( topRankLength < 3 )
			{
				for (let index = 0; index < 3 - topRankLength; index++ )
				{
					this.topRank.push({})
				}
			}

			this.selRank = { rank: this.t( 'rank.notOnList' ), sumScore: "" }
			for (let index = 0; index < this.todayRankData.length; index++ )
			{
				if( this.todayRankData.isSelf )
				{
					this.selRank.rank = index + 1
					this.selRank.sumScore = this.todayRankData.sumScore
				}
			}
		}
	}


	public onClickBack()
	{
		this.$router.back()
	}

	public getNeedToTop()
	{
		// 如果没有其他排名或其他排名为空数组，则返回我的排名奖励数量（如果存在），否则返回0
		if( this.otherRank.length < 1 )
		{
			return this.myRank && this.myRank.point ? this.parseInts(this.myRank.point) : 0
		}

		// 获取最后一名排名的奖励数量和我的排名奖励数量（如果存在）
		let last = this.otherRank ? Number(this.otherRank[this.otherRank.length - 1].point) : 0
		let me = this.myRank && this.myRank.point ? Number(this.myRank.point) : 0

		// 计算需要达到顶部的奖励数量，并确保返回的是整数
		return this.parseInts(last - me + 1);
	}

	public parseInts( num: number )
	{
		return ( Math.floor( num ) ).toLocaleString( 'en-US' )
	}


	public onRule()
	{
		this.showrule = true
	}

	public offRule()
	{
		this.showrule = false
	}

	public finish()
	{
		this.getRank()
	}

	public ToastShow()
	{
		this.showToast = true
		setTimeout( () => {
			this.showToast = false
		}, 2500 )
	}
}
