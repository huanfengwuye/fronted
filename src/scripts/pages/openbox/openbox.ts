import { Component, Ref, Vue, Watch } from "vue-facing-decorator"
import i18n from "@/lang"
import weaponListCpt from '@/components/pc/weaponListCpt/Index.vue'
import OpenBoxOneAni from '@/views/pc/openbox/components/OpenBoxOneAni.vue'
import OpenBoxMultAni from '@/views/pc/openbox/components/OpenBoxMultAni.vue'
import ResultLayer from '@/views/pc/openbox/components/BoxResult.vue'

import H5WeaponListCpt from '@/components/h5/weaponListCpt/Index.vue'
import H5OpenBoxOnAni from '@/views/h5/openbox/components/OpenBoxOneAni.vue'
import H5OpenBoxMultAni from '@/views/h5/openbox/components/OpenBoxMultAni.vue'
import H5ResultLayer from '@/views/h5/openbox/components/Result.vue'

import ShowDialog from "@/components/h5/common/ShowDialog.vue"
import { getBlindBoxGoods, getBoxDropRecords, getOpenBoxRecords, getBoxDetails, getOpenBox, openAmmonBox } from "@/network/api/blind"
import { useStore } from 'vuex'
import { getInfo } from '@/network/api/user'
import { add, bignumber } from 'mathjs'
import { _isMobile } from "@/util/common"

@Component({
	components : {
		OpenBoxMultAni, OpenBoxOneAni, ResultLayer, weaponListCpt, 
		H5OpenBoxOnAni, H5OpenBoxMultAni, H5ResultLayer, H5WeaponListCpt,
		ShowDialog
	}
})
export default class Openbox extends Vue
{
	public t = i18n.global.t
	public store = useStore()

	public boxId!: number// = Number( this.$route.query.boxId )
	public boxType!: string// = this.$route.query.type || 'general'
	public boxData: any = {}
	public openRule = false

	//装备列表
	public goodsList: any = []

	public boxNum = 1
	public openText =  this.t( 'openbox.open' )
	public openArr = [ 1, 2, 3, 4, 5 ]
	public tabType = 0 //0-goods 1-drop

	public isAnimation = this.store.state.animationSwitch
	// public isAnimation = true
	public isSound: boolean = true
	public doingAnimation: boolean = false//正在放转动动画

	public btnOpenActive: boolean = true//防快速开箱
	public layer: boolean = false
	public animationShow: boolean = true

	public dropTimer!: number | null	//最近掉落定时器
	public dropData: any = []

	public updateDropData = []
	public needUpdateDrop: boolean = false

	public isAchorDrop: boolean = false

	public showDialog: boolean = false
	public isPc: boolean = !_isMobile()

	//爆率数据
	public rarityList = [
		{
			icon: new URL(`../../../assets/${ this.isPc ? 'pcimg' : 'romimg' }/openbox/baolv1.png`, import.meta.url).href,
			color: "#B0C3D8", probability: 0
		},
		{
			icon: new URL(`../../../assets/${ this.isPc ? 'pcimg' : 'romimg' }/openbox/baolv2.png`, import.meta.url).href,
			color: "#6FF0F9", probability: 0
		},
		{
			icon: new URL(`../../../assets/${ this.isPc ? 'pcimg' : 'romimg' }/openbox/baolv3.png`, import.meta.url).href,
			color: "#4A69F9", probability: 0
		},
		{
			icon: new URL(`../../../assets/${ this.isPc ? 'pcimg' : 'romimg' }/openbox/baolv4.png`, import.meta.url).href,
			color: "#9B52F6", probability: 0
		},
		{
			icon: new URL(`../../../assets/${ this.isPc ? 'pcimg' : 'romimg' }/openbox/baolv5.png`, import.meta.url).href,
			color: "#EA37F7", probability: 0
		},
		{
			icon: new URL(`../../../assets/${ this.isPc ? 'pcimg' : 'romimg' }/openbox/baolv6.png`, import.meta.url).href,
			color: "#eb4b4b", probability: 0
		},
		{
			icon: new URL(`../../../assets/${ this.isPc ? 'pcimg' : 'romimg' }/openbox/baolv7.png`, import.meta.url).href,
			color: "#F9B800", probability: 0
		},
	]

	@Ref()
	public animationxRef: any = null
	@Ref()
	public animationyRef: any = null
	@Ref()
	public resultRef: any = null

	public openBoxData = []

	public ensureShow: boolean = false	 /// 公平公正弹窗状态
	public showAnimationArea: boolean = false

	public mounted()
	{
		this.boxId = Number( this.$route.query.boxId )
		this.boxType = this.$route.query.type as string || 'general'

		this.getBoxDetail()
		this.getBoxGoods()
	}

	public unmounted()
	{
		this.stopBoxDropTime()
	}

	public destroyed()
	{
		this.stopBoxDropTime()
	}

	public async getBoxDetail()
	{
		const res = await getBoxDetails({ boxId: this.boxId })
		if( res.code === 0 )
		{
			this.boxData = res.data.item
		}
	}

	public async getBoxGoods()
	{
		const res = await getBlindBoxGoods({ boxId: this.boxId })
		if( res.code === 0 )
		{
			this.goodsList = res.data.items
			// window.$dev && console.log("this.goodsList",this.goodsList)
			for( let index = 0; index < this.rarityList.length; index++ )
			{
				let rarityItem = this.rarityList[index]
				rarityItem.probability = 0
			}
			for( let item of this.goodsList )
			{
				this.rarityList[item.goodsLevel - 1].probability = add(bignumber(this.rarityList[item.goodsLevel - 1].probability),
					bignumber(item.probability))
			}

		}
	}

	public async getBoxDrop()
	{
		const res = await getBoxDropRecords({ boxId: this.boxId, limit: 20, isAnchor: this.isAchorDrop })
		if( res.code === 0 )
		{
			let items = res.data.items
			if( items )
			{
				this.dropData = items
			}
		}
	}

	public startBoxDropTime()
	{
		this.stopBoxDropTime()
		this.getBoxDrop()
		this.dropTimer = setInterval(() => {
			this.getBoxDrop()
		}, 5000)
	}

	public stopBoxDropTime()
	{
		if( this.dropTimer != null )
		{
			clearInterval(this.dropTimer)
			this.dropTimer = null
		}
	}

	public onClickTab(type: number )
	{
		this.tabType = type

		if( type == 1 )
		{
			this.startBoxDropTime()
		} else {
			this.stopBoxDropTime()
		}
	}

	public onClickFilterTab(isAnchor: boolean )
	{
		this.isAchorDrop = isAnchor
		this.dropData = []
		this.startBoxDropTime()
	}

	public setBoxNum(num: any )
	{
		this.boxNum = num
		if( this.showAnimationArea )
		{
			this.animationyRef?.randGoodList(num, false)
		}
	}

	public async onClickOpen()
	{
		if( !this.btnOpenActive) return
		this.btnOpenActive = false

		let params: any = {}
			params.boxId = this.boxId
			params.count = this.boxNum

		if( this.isAnimation )
		{
			this.doingAnimation = true
		}
		this.stopBoxDropTime()

		let res
		if( this.boxType == "ammon" )
		{
			res = await openAmmonBox(params)
		} else {
			res = await getOpenBox(params)
		}

		this.btnOpenActive = true

		if( res.code == 0 )
		{
			let items = res.data.items
			this.openBoxData = items
			if( items && items.length > 0 )
			{
			this.layer = true
			if( this.isAnimation )
			{
				// dijah.value = true
				this.doingAnimation = true
				// if( items.length <= 1 )
				// {
				//	 this.animationxRef?.randGoodList()
				//	 setTimeout(() => {
				//	 startAnimationX()
				//	 }, 100)
				// } else {
				//	 this.animationyRef?.randGoodList(items.length)
				// }
				this.animationyRef?.randGoodList(items.length)
			} else {
				await this.$nextTick()
				this.showResult()
			}

			const infoRes = await getInfo()
			if( infoRes.code === 0 )
			{
				this.store.commit("setUserAmount", infoRes.data.assets.amount)
			}
			} else {
			this.doingAnimation = false
			this.startBoxDropTime()
			}
		} else {
			this.doingAnimation = false
			this.startBoxDropTime()
		}

	}

	public async startAnimationX()
	{
		await this.$nextTick()
		this.animationxRef?.showAward(this.openBoxData[0])
	}

	public async startAnimationY()
	{
		await this.$nextTick()
		this.animationyRef?.showAward(this.openBoxData)
	}

	public onRandEnd()
	{
		this.startAnimationY()
	}

	public onAnimationEnd()
	{
		this.layer = false
		this.doingAnimation = false
		this.showResult()

		if( this.needUpdateDrop )
		{
			this.handleDropList(this.updateDropData)
			this.needUpdateDrop = false
			this.updateDropData = []
		}
	}

	public showResult()
	{
		this.layer = false
		this.resultRef?.showReuslt(this.openBoxData)
		// window.$dev && console.log("this.resultRef+this.openBoxData",this.resultRef,this.openBoxData)
		this.store.dispatch("getUserInfo")
	}

	public onResultClose()
	{
		this.layer = false
		this.startBoxDropTime()
	}

	public handleDropList(arr: string | any[] )
	{
		let list = []
		let cur = this.dropData
		for( let i = 0; i < arr.length; i++ )
		{
			let has = false
			for( let j = 0; j < cur.length; j++ )
			{
				if( arr[i].id == cur[j].id )
				{
					has = true
					break
				}
			}
			if( !has )
			{
				list.push(arr[i])
			}
		}
		let uplist = [...list, ...cur]
		uplist.sort((a, b) => { return b.id - a.id })
		if( uplist.length > 20 )
		{
			uplist = uplist.slice(0, 20)
		}
		this.dropData = uplist

	}

	@Watch( '$route' )
	public changeRoute( newRoute: { path: string; query: { boxId: any } }, oldRoute: { path: string } )
	{
		if( newRoute && newRoute.path == '/p/openbox' && oldRoute.path == '/p/openbox' )
		{
			let queryBoxId = Number(newRoute.query.boxId)
			if( queryBoxId )
			{
				this.boxId = queryBoxId
				this.boxType = 'general'
				this.getBoxDetail()
				this.getBoxGoods()
				this.dropData = []
				if( this.tabType == 1 )
				{
					this.startBoxDropTime()
				}
			}
		}
	}

	public switchSound()
	{
		this.isAnimation = !this.isAnimation
		this.store.commit("setOpenBoxSoundSwitch", this.isAnimation )
		localStorage.setItem("animationSwitch", this.isAnimation)
		this.store.commit("setAnimationSwitch", this.isAnimation)
	}

	public back()
	{
		this.$router.go( -1 )
	}
}