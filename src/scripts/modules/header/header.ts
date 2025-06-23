import { Component, Inject, Vue, Watch } from 'vue-facing-decorator'
import { useStore } from 'vuex'
import i18n from "@/lang"

import logoIcon from "@/assets/pcimg/common/logo.png"
import Turntable from "@/modules/turntable/pc/turntable.vue"
import { logout } from "@/network/api/login"
// import ResultLayer from "@/views/pc/openbox/components/BoxResult.vue";
import { getSigninAwards, goSignin,getSigninRewardRecords, markRucksackMaterial } from "@/network/api/user"
// import { UserType } from "@/util/util"
import { getShowName, _isMobile, playAudio, NotifyS, NotifyF, Success } from "@/util/common"
import audiorecory from "@/assets/audio/recory.mp3"
import { tokenName } from '@/config'
import store from '@/store'
import wv from '@/util/webview'

@Component({
	components : { Turntable }
})
export default class Header extends Vue
{
	public store = useStore()

	public t = i18n.global.t

	@Inject()
	public readonly reloadView:any = 'reloadView'
	// public { reloadView } = inject("reloadView")
	// const hasLogin = computed( () => store.getters.hasLogin )//获取登陆状态
	public indexActive: boolean = true
	public navShow: boolean = false
	public userShow: boolean = false
	public mouseEnter: boolean = false
	public menuShow: boolean = false
	public checkShow: boolean = false ///是否显示签到页

	public successShow: boolean = false		/// 是否显示签到成功页
	public isHide: boolean = false		/// 是否隐藏菜单
	public isHome: boolean = false		/// 是否是首页
	public is681: boolean = false
	public isSign: boolean = false		/// 今日是否签到
	public popupsShow: boolean = false		/// 是否显示幸运转盘
	public scale = 1					/// 头像缩放比例
	public top = 0						///	上距
	public signTod = 0						///	上距
	public modules: any = []
	public awardsList: any = []			///pc签到数组
	public awardsLists: any = []		///h5签到数组
	public signList: any = []		///h5签到数组
	public gunSkin: any = []		///h5签到获取枪皮
	public goodsResult: any = []		///pc签到获取枪皮
	public qqGroupDialog: boolean = false
	public site: string = '878skins.com'

	// public lastItem ;
	public lastItem : any = [];

	public recoryaudio: HTMLAudioElement = new Audio(audiorecory);

	public needReturn: string[] =
	[
		"m_lucky_details",
	]

	public curModule = ''				///	当前激活的板块

	public  isSignVariety: boolean = false

	public get userInfoBase() { return this.store.state.userInfoBase }
	public get userInfoAssets() { return this.store.state.userInfoAssets }
	public get noReadMessages() { return this.store.state.noReadMessages }
	public get getModules() { return this.store.state.sectionModule }
	public get hasLogin() { return this.store.getters.hasLogin }

	public mounted()
	{
		this.is681 = location.hostname == this.site
		if(this.hasLogin){
			this.getRewardRecords()
			// this.getSigninAward()
		}

		if( this.$route.name == "p_home" )
		{
			this.isHome = true
			addEventListener( "scroll", this.ScrollEvent.bind( this ) )
		}
		// window.$dev && console.log( this.$route.name )
	}

	public ScrollEvent( e?:Event )
	{
		if( this.$route.name != "p_home" ) return
		let offset = this.getTopScroll()

		this.modules.forEach( ( item: any ) => {
			let start = item.top
			let end = item.bottom
			item.active = false

			if( offset >= start && offset < end )
			{
				item.active = true
			}
		})

		this.isHide = offset >= 92
		this.top = offset >= 92 ? 92 : offset
		let cur = 0.27 * this.top
		this.scale = Math.floor(100 - cur) / 100
	}

	///	获得页面向左、向上卷动的距离
	public getTopScroll()
	{
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
	}

	public getLogo()
	{
		if( window.channelInfo.logoUrl1 )
			return window.channelInfo.logoUrl1
		else
			return logoIcon
	}

	/// 点击选中提示
	public select( item: { checked: boolean } )
	{
		item.checked = !item.checked
	}

	/// 验证勾选
	public onRecharge()
	{
		this.store.commit( "setRechargeView", true )
	}

	///	导航||返回
	public isback() 
	{
		return this.needReturn.includes( <string>this.$route.name )
	}

	//路由跳转
	public jump( v: any )
	{
		this.$router.push( v )
		this.navShow = false
		this.userShow = false
	}

	//左nav
	public setNavShow()
	{
		this.navShow = !this.navShow
		this.userShow = false
	}

	//返回
	public routerReturn()
	{
		this.$router.go( -1 )
	}

	//右nav
	public setUserShow()
	{
		this.jump( "/p/me" )
	}

	///	h5 右Nav
	public setH5UserShow()
	{
		this.userShow = !this.userShow
		this.navShow = false
	}

	@Watch( 'userShow' )
	public userbarChange( val: boolean )
	{
		wv.postMessage({
			data :
			{
				router : this.$route.path,
				tabbar : val ? false : true
			}
		})
	}

	public onClickSign()
	{
		this.store.commit( "setSignView", true )
	}

	///	h5登陆
	public onH5ClickSign()
	{
		this.$router.push({
			path: "/m/sign",
		});
	}

	public onClickRegister()
	{
		this.store.commit( "setRegisterView", true )
	}

	public onMouseenterMenu()
	{
		this.mouseEnter = true
		this.$nextTick(() => {
			this.menuShow = true
		})
	}

	public onMouseleaveMenu()
	{
		this.mouseEnter = false
		this.$nextTick(() => {
			this.menuShow = false
		})
	}

	public toTop()
	{
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	public scrollTo( index:number )
	{
		let section = <HTMLElement>document.querySelector( `#section-${index}` )

		window.scrollTo({
			top: section?.offsetTop,
			behavior: "smooth",
		})
	}
	
	public async onClickExitLogin()
	{
		const res = await logout()
		if( res.code === 0 )
		{
			this.userShow = false
			window.Success({ offset: 100, message: this.t( 'menu.loggedOut' ) })
			this.store.commit( "logout" )
			this.$nextTick(() => {
				window.$dev && console.log( this.reloadView )
				this.reloadView.reloadView()
			})
		}
	}

	public async onH5ClickExitLogin()
	{
		const res = await logout()
		if( res.code === 0 )
		{
			window.NotifyS( this.t( 'menu.loggedOut' ) )
			this.store.commit( "logout" )
			this.$nextTick(() => {
				this.reloadView.reloadView()
			})
		}
	}

	// @Watch( 'hasLogin' )
	// public async getSigninAward()
	// {
	// 	if( !this.hasLogin ) return

	// 	let res = await getSigninAwards()
	// 	// console.log("res",res)
	// 	if( res.code == 0 )
	// 	{
	// 		this.awardsList = res.data.items;
	// 		this.lastItem = this.awardsList[this.awardsList.length - 1]
	// 		// window.$dev && console.log("this.awardsList", this.awardsList, '>>>>>>>>>>', this.lastItem)
	// 	}
	// }

	public async onClickOpen()
	{
		let res = await goSignin()
			if (res.code == 0) {
			//   console.log('签到成功');
			  this.isSignVariety = true
			  this.gunSkin = res.data.reward || []
			  setTimeout(() => {
				this.successShow = true;
			  }, 500);
			  this.goodsResult = res.data.reward;
			  setTimeout(() => {
				this.isSignVariety = false;
			  }, 1000);
			  window.$dev && console.log('this.goodsResult',this.goodsResult);
			  // 这里可以处理签到成功后的逻辑
			} else {
			//   console.error('签到失败', response.data.message);
			  // 这里可以处理签到失败后的逻辑
			}
	}

	public close(){
		this.successShow = false;
		this.getRewardRecords()
	}
	@Watch( 'hasLogin' )
	public async getRewardRecords()
	{
		if( this.hasLogin ) {

		let res = await getSigninRewardRecords()
			if (res.code == 0) {
			//   console.log('签到成功');
			  this.signList = res.data.items || []
			//   console.log("this.signList =",this.signList)
			  this.isSign = res.data.hasSigninToday
			  this.signTod = this.signList.length
			//   console.log("this.signList.length",this.signList.length)
			  //   console.log('this.signList',this.signList,this.signTod);
			  // 这里可以处理签到成功后的逻辑
			} else {
			//   console.error('签到失败', response.data.message);
			  // 这里可以处理签到失败后的逻辑
			}
		}
	}

	@Watch( '$route' )
	public scroll( val:any )
	{
		// window.$dev && console.log( val.name )
		if( val.name != "p_home" )
		{
			this.isHome = false
			this.isHide = false
			removeEventListener( "scroll", this.ScrollEvent )
		}
		else
		{
			this.isHome = true
			addEventListener( "scroll", this.ScrollEvent )
		}
	}

	@Watch( 'getModules' )
	public async getModulesChange( val:any )
	{
		if( _isMobile() ) return

		this.modules = await val
		this.modules.forEach(( item: any, index: number ) => {
			if( item.boxItems && item.boxItems.length > 0 )
			{
				let el = <HTMLElement>document.querySelector(`#section-${index}`)
				item.top = el.offsetTop
				item.bottom = el.offsetTop + el.offsetHeight
			}
		})
	}

	public destroyed()
	{
		removeEventListener( "scroll", this.ScrollEvent )
	}

	public formatName( str: string )
	{
		if( typeof str == "undefined" || str == null || typeof str != "string" )
			return ""

		let bytesLen = str.replace( /[^\x00-\xff]/g, "xx" ).length
		if( bytesLen > 6 )
		{
			let index = 0
			let byteLen = 0
			for( var i = 0; i < str.length; i++ )
			{
				if( str.charCodeAt(i) > 255 )
				{
					byteLen += 2
				} else {
					byteLen += 1
				}
				if( byteLen >= 6 )
				{
					index = i
					break
				}
			}
			str = str.substr( 0, index + 1 )
			str = str + "..."
		}
		return str
	}

	public getAssetURL( image:string )
	{
		return new URL(`../../../assets/romimg/header/${image}.png`, import.meta.url).href
	}

	/**
	 * h5左侧菜单
	 */
	public get leftMemuData()
	{
		let menuData =  [
			{
				active: this.$route.name == "m_home",
				show: true,
				icon: "home",
				text: this.t( 'menu.home' ),
				hot: false,
				clickHandler: () => { this.jump( "/" ) }
			},
			{
				active: this.$route.name == "m_rank",
				show: true,
				icon: "rank",
				text: '积分排行榜',
				hot: false,
				clickHandler: () => { this.jump( "/m/rank" ) }
			},
			{
				active: this.$route.name == "m_roll" || this.$route.name == "roll_details",
				show: !this.store.state.beiAnExamine && this.store.state.moduleRoll,
				icon: "roll",
				text: this.t( 'menu.rollRoom' ),
				hot: false,
				clickHandler: () => { this.jump( "/m/roll" ) }
			},
			{
				active: this.$route.name == "m_lucky",
				show: this.store.state.moduleLucky,
				icon: "lucky",
				text: this.t( 'menu.lucky' ),
				hot: false,
				clickHandler: () => { this.jump( "/m/lucky" ) }
			},
			{
				active: this.$route.name == "m_replacement",
				icon: "replacement",
				text: "置换合约",
				hot: false,
				clickHandler: () => { this.jump( "/m/replacement" ) }
			},

			{
				active: this.$route.name == "m_grade",
				// show: this.store.state.moduleGrade,
				icon: "gradeBox",
				text: this.t( 'menu.gradeBox' ),
				hot: false,
				clickHandler: () => { this.jump( "/m/grade" ) }
			},
			{
				active: this.$route.name == "m_timebox",
				show: this.store.state.moduleTiming,
				icon: "time",
				text: this.t( 'menu.timeBox' ),
				hot: false,
				clickHandler: () => { this.jump( "/m/timebox" ) }
			},
			// {
			// 	active: this.$route.name == "m_mall",
			// 	show: this.store.state.moduleRecharge,
			// 	icon: "mall",
			// 	text: this.t( 'menu.goldMall' ),
			// 	hot: false,
			// 	clickHandler: () => { this.jump( "/m/mall" ) }
			// },
			// {
			// 	active: this.$route.name == "m_download",
			// 	show: this.is681,
			// 	icon: "download",
			// 	text: 'App下载',//this.t( 'menu.goldMall' ),
			// 	hot: false,
			// 	clickHandler: () => { this.jump( "/m/download" ) }
			// }
		]

		// 如果 this.is681 为 false，则过滤掉最后一个元素
		if (!this.is681) {
			//  menuData = menuData.slice(0, -1);
		}

		return menuData;

	}

	public shouldHighlight(index:number) {
		return index + 1 <= this.signTod || (index === 0 && this.signTod === 0 && this.isSign);
	}
	public shouldShowStamp(index:number) {
		return index + 1 <= this.signTod || (index === 0 && this.signTod === 0 && this.isSign);
	}
	public shouldShowActiveStamp(index:number) {
		return index + 1 === this.signTod;
	}
	public shouldShowPrice(item: { id: any }, itemss: { signinAwardId: any }, index:number) {
		return itemss.signinAwardId === item.id && (index + 1 <= this.signTod || (index === this.signTod && this.isSign));
	}
	public shouldShowRandomAmount(index:number) {
		return index + 1 > this.signTod;
	}

	/**
	 * h5右侧菜单
	 */
	public get rightMemuData(): any
	{
		return [
			// {
			//	 active: this.$route.name == "m_mall",
			//	 show: this.store.state.moduleRecharge,
			//	 icon: "menu_mall",
			//	 text: "金币商城",
			//	 clickHandler: () => {
			//		 this.jump( "/m/mall" )
			//	 },
			// },
			{
				active: this.$route.name == "m_personal",
				show: true,
				icon: "user",
				text: this.t( 'menu.userCenter' ),
				clickHandler: () => {
					this.jump( "/m/personal" )
				},
			},
			// {
			// 	active: this.$route.name == "m_refining",
			// 	show: true,
			// 	icon: "menu_refining",
			// 	text: '饰品炼化',
			// 	clickHandler: () => {
			// 		this.jump( "/m/refining" )
			// 	},
			// },
			// {
			// 	active: this.checkShow,
			// 	show: true,
			// 	icon: "m_check",
			// 	text: '每日签到',
			// 	clickHandler: () => {
			// 		this.userShow = !this.userShow
			// 		this.checkShow = !this.checkShow;
			// 	},
			// },
			// {
			// 	active: this.checkShow,
			// 	show: true,
			// 	icon: "menu_task",
			// 	text: '任务中心',
			// 	clickHandler: () => {
			// 		this.jump( "/m/task" )
			// 	},
			// },
			// {
			// 	active: this.$route.name == "m_turntable",
			// 	show: true,
			// 	icon: "menu_turntable",
			// 	text: '幸运转盘',
			// 	clickHandler: () => {
			// 		this.jump( "/m/turntable" )
			// 	},
			// },
			{
				active: this.$route.name == "m_recharge",
				show: this.store.state.moduleRecharge,
				icon: "mall",
				text: this.t( 'menu.rechargeCenter' ),
				clickHandler: () => {
					this.jump( "/m/recharge" )
				},
			},
	
			// {
			//	 active: this.$route.name == "m_record",
			//	 show: true,
			//	 icon: "&#xe630;",
			//	 text: "个人明细",
			//	 clickHandler: () => {
			//		 this.jump( "/m/record" )
			//	 },
			// },
			// {
			//	 active: this.$route.name == "m_spreadUser",
			//	 show: this.store.state.userInfoBase.userType == UserType.anchor,
			//	 icon: "&#xe624;",
			//	 text: "推广分红",
			//	 clickHandler: () => {
			//		 this.jump( "/m/spreadUser" )
			//	 },
			// },
			// {
			//	 active: this.$route.name == "m_information",
			//	 show: true,
			//	 icon: "&#xe631;",
			//	 text: "站内信息",
			//	 clickHandler: () => {
			//		 this.jump( "/m/information" )
			//	 },
			// },
			{
				active:
					this.$route.name == "m_contact" ||
					this.$route.name == "m_problem" ||
					this.$route.name == "m_privacy" ||
					this.$route.name == "m_regulations",
				show: true,
				icon: "help",
				text: this.t( 'menu.supportCenter' ),
				clickHandler: () => {
					this.jump( "/m/help" )
				},
			},
			// {
			//	 active: false,
			//	 show: true,
			//	 icon: "&#xe629;",
			//	 text: "退出登录",
			//	 clickHandler: onClickExitLogin,
			// },
		]
	}

	public updateOverallShow(){
		this.popupsShow = false;
	}

	public getTitle()
	{
		if( this.$route.name == "m_home" || this.$route.name == "m_openbox" ) 
			this.$route.meta.name = getShowName()
		return this.$route.meta.name
	}

	public onClickRed() {
		this.store.commit("setPassRed", true);
		this.navShow = false;
		this.userShow = false;
	}

	public onClickService() {
		this.navShow = false;
		this.userShow = false;
		if (localStorage.getItem(tokenName))
		{
			let channelId =
				this.store.getters.getConfigItem("CustomerServiceUrl") || "Oz67Tg"//"C5j3Lu";

			if (!window._AIHECONG) {
				(function (d, w:Window, c) {
					if (w[c]) return;
					var s = d.createElement("script");
					w[c] = function () {
						(w[c].z = w[c].z || []).push(arguments);
					};
					s.async = true;
					s.src = "https://static.ahc.ink/hecong.js"
					if (d.head) d.head.appendChild(s)
				})(document, window, "_AIHECONG")

				window._AIHECONG("ini", {
					channelId: channelId,
					uniqueId: `878skins${this.store.state.userInfoBase.account}`,
					button: false,
				});
				window._AIHECONG("customer", {
					名称 : this.store.state.userInfoBase.nickName,
					手机 : this.store.state.userInfoBase.mobile,
					终端 : "MODILE",
					会员账号 : this.store.state.userInfoBase.account,
				});
				window._AIHECONG("showChat")
			} else {
				window._AIHECONG("showChat")
			}
			// wv.postMessage({
			// 	data :
			// 	{
			// 		router : this.$route.path,
			// 		tabbar : false
			// 	}
			// })
		} else {
			this.$router.push("/m/sign")
		}
	}

	public onClickGroup()
	{
		this.navShow = false;
		this.userShow = false;
		if (navigator.userAgent.indexOf("UCBrowser") > -1) {
			alert( this.t( 'menu.browserNotSupport' ) );
		} else {
			if (
				this.store.state.otherConfig.qqGroup &&
				this.store.state.otherConfig.qqGroup.length > 0
			) {
				this.qqGroupDialog = true
				return;
			}
			let qqGroupLink =
				this.store.getters.getConfigItem("GroupChatUrl") ||
				"https://jq.qq.com/?_wv=1027&k=e1Zb57os";
			window.open(qqGroupLink);
		}
	}

	public onClickGroupItem(item: any)
	{
		window.$dev && console.log(item);
		let qqGroupLink =
			item ||
			this.store.getters.getConfigItem("GroupChatUrl") ||
			"https://jq.qq.com/?_wv=1027&k=e1Zb57os";
		window.open(qqGroupLink);
	}
}