import { Component, Vue } from "vue-facing-decorator"
import i18n from "@/lang"
import ShowDialog from "@/components/h5/common/ShowDialog.vue"
import TopTitleBack from "@/components/h5/common/TopTitleBack.vue"
import { useStore } from "vuex"
import { getUserSticker, activateSticker, stickerReward} from "@/network/api/user"
import { getAllStickerRewardRecords} from "@/network/api/activity"
import { GoodImageBgType } from '@/util/util'
import { NotifyF, NotifyS, Success, _isMobile } from "@/util/common"

@Component({
	components : { ShowDialog, TopTitleBack }
})
export default class NewYear extends Vue
{

	public get hasLogin()
	{
		return this.store.getters.hasLogin
	}

	public store = useStore()
	public ruleShow: boolean = false;
	public height: number = 4800
	public scale: number = 1
	public fragmentType: number = 0;
	public winnerItem: any = null;
	// public winnerPrice: any = '';
	public itemData: any = [];
	public queue: any = [];
	public fragmentsJi: number = 0;
	public fragmentsJiBright: number = 0;
	public exchangePrice: number = 0;
	public fragmentsyun: number = 0;
	public fragmentsyunBright: number = 0;
	public fragmentsfu: number = 0;
	public fragmentsfuBright: number = 0;
	public rewardCollection: boolean = true
	public showDialog: boolean = false
	public exchange: boolean = false
	public unlock: boolean = false

	/**
	 * 关闭按钮的坐标
	 */
	public closeBtn = !_isMobile() ? {
		right : 30,
		width: 70,
		height: 80
	} : {
		right : 20,
		width: 45,
		height: 49,
	}	

	public navigation = !_isMobile() ? {
		top : 770,
		right : 430,
		width: 1125,
		height : 100
	} : {
		top : 366,
		right : 141,
		width : 460,
		height : 40
	}	

	public notice = !_isMobile() ? {
		top : 1025,
		right : 430,
		width: 1125,
		height : 60
	} : {
		top : 510,
		right : 30,
		width : 680,
		height : 40
	}	

	public triggerRule = !_isMobile() ? {
		top : 1410,
		right : 152,
		width: 80,
		height : 270
	} : {
		top : 945,
		right : 30,
		width : 180,
		height : 60
	}	

	public puzzle = !_isMobile() ? {
		top : 1103,
		right : 340,
		width: 1320,
		height : 510
	} : {
		top : 568,
		right : 38,
		width : 673,
		height : 264
	}

	public getBtn = !_isMobile() ? {
		top : 1660,
		right : 800,
		width: 398,
		height : 119
	} : {
		top : 845,
		right : 281,
		width : 180,
		height : 55
	}

	public fragments = !_isMobile() ? {
		top : 1660,
		right : 1300,
		width: 400,
		height : 119
	} : {
		top : 947,
		right : 355,
		width : 328,
		height : 50
	}

	public puzzleWelfare = !_isMobile() ? {
		top : 550,
		right : 1300,
		width: 400,
		height : 119
	} : {
		top : 0,
		right : 121,
		width : 128,
		height : 50
	}

	public newYearCheck = !_isMobile() ? {
		top : 1880,
		right : 1300,
		width: 400,
		height : 119
	} : {
		top : 1020,
		right : 121,
		width : 128,
		height : 50
	}

	public rollRoom = !_isMobile() ? {
		top : 3300,
		right : 1300,
		width: 400,
		height : 119
	} : {
		top : 2320,
		right : 121,
		width : 128,
		height : 50
	}

	public mounted()
	{
		this.getAllStickerRewardRecordsItem()
		this.getUserStickers()
		this.store.commit("setFooterView", false);
		this.store.commit("setHeaderView", false);
		window.$dev && console.log( this )
		this.resize()
		addEventListener( 'resize', this.resize.bind( this ) )

		// 设置每隔三十秒调用一次 getAllStickerRewardRecordsItem 方法
		setInterval(() => {
			this.getAllStickerRewardRecordsItem();
		}, 30000);
	}

	public async getAllStickerRewardRecordsItem()
	{
		let params: { limit: number; page: number } = { limit: 20, page: 1 };
		const res = await getAllStickerRewardRecords(params)
		if( res.code === 0 )
		{
			this.winnerItem = res.data.items
			window.$dev && console.log("this.winnerItem ",this.winnerItem )
		}
	}



	// ///	接收到中奖信息
	// public onMessage( e )
	// {
	// 	let data = e.detail.data

	// 	///	消息入栈
	// 	this.queue.unshift( data )

	// 	setTimeout(() => {
	// 	// 设置消息出栈（你可以根据需要进行出栈操作）
	// 	this.popMessage();		
	// 	}, 3000);

	// 	// console.log( data )
	// }

	// public popMessage()
	// {
	// 	if (this.queue.length > 0) {
	// 		let data = this.queue.pop();
	// 		// 这里可以根据需要处理出栈的消息
	// 		this.winnerName = data.userNickname
	// 		this.winnerPrice = data.rewardAmount
	// 		console.log('出栈消息:', data);
	// 	}
	// }
	

	public async getUserStickers()
	{
		const res = await getUserSticker()
		if( res.code === 0 )
		{
			this.itemData = res.data.items; // 注意这里使用正确的数据属性名称 'items'

			for (let index = 0; index < this.itemData.length; index++) {
			  const sticker = this.itemData[index];
			
			if (sticker.stickerId === 1) {
			  	this.fragmentsJi = sticker.stickerCount;
				this.fragmentsJiBright = sticker.stickerActivatedCount;
			} else if (sticker.stickerId === 2) {
				this.fragmentsyun = sticker.stickerCount;
				this.fragmentsyunBright = sticker.stickerActivatedCount;
			} else if (sticker.stickerId === 3) {
				this.fragmentsfu = sticker.stickerCount;
				this.fragmentsfuBright = sticker.stickerActivatedCount;
			}
			}		
			
			if (this.fragmentsJiBright >= 6 && this.fragmentsyunBright >= 6 && this.fragmentsfuBright >= 6) {
				this.exchangePrice = 6810;
				this.rewardCollection = true;
				} else if (this.fragmentsJiBright === 6 && this.fragmentsyunBright === 6) {
				this.exchangePrice = 681;
				this.rewardCollection = true;
				} else if (this.fragmentsJiBright >= 6) {
				this.exchangePrice = 68.10;
				this.rewardCollection = true;
				} else {
				this.rewardCollection = false;
			}			  
		}
	}

	public async activateStickers(stickerId:number)
	{
		const res = await activateSticker({stickerId:stickerId});
		if( res.code === 0 )
		{
			this.getUserStickers()
			this.close()	
		}
		if(res.message === "卡片的数量不足"){
			this.close()	
		}
	}

	public async stickerRewards()
	{
		let stickerId = 0;
		if (this.fragmentsJiBright >= 6 && this.fragmentsyunBright >= 6 && this.fragmentsfuBright >= 6) {
		stickerId = 3;
		} else if (this.fragmentsJiBright >= 6 && this.fragmentsyunBright >= 6) {
		stickerId = 2;
		} else if (this.fragmentsJiBright >= 6) {
		stickerId = 1;
		}
		  
		const res = await stickerReward({count:1,rewardId:stickerId});
		if( res.code === 0 )
		{
			this.getUserStickers()
			this.close()	
			if(_isMobile()){
				NotifyS( '恭喜您成功领取价值'+this.exchangePrice +'的福袋' );
			}else{
				Success( '恭喜您成功领取价值'+this.exchangePrice +'的福袋' );
			}
		}
		if(res.message === "集卡兑换的奖品未找到"){
			this.close()	
		}
	}

	public rule() {
		this.showDialog = true;
		this.ruleShow = true;
	}

	public exchangeOn() {
		if(this.rewardCollection){
			this.showDialog = true;
			this.exchange = true;
		}else{
			if(_isMobile()){
				NotifyF('您尚未成功解锁获奖区域');
			}else{
				window.Warn( '您尚未成功解锁获奖区域' );
			}
		}
	}

	public close(){
		this.showDialog = false;
		this.ruleShow = false;
		this.exchange = false;
		this.unlock = false;
	}

	public receiveJi(){
		this.showDialog = true;
		this.unlock = true;
		this.fragmentType = 1;
	}

	public receiveYun(){
		this.showDialog = true;
		this.unlock = true;
		this.fragmentType = 2;
	}

	public receiveFu(){
		this.showDialog = true;
		this.unlock = true;
		this.fragmentType = 3;
	}

	public puzzleType(){
		if(this.fragmentType == 1){
			return new URL( '@/assets/pcimg/newYear/card-ji.png', import.meta.url).href
		}else if( this.fragmentType == 2){
			return new URL( '@/assets/pcimg/newYear/card-yun.png', import.meta.url).href
		}else if( this.fragmentType == 3){
			return new URL( '@/assets/pcimg/newYear/card-fu.png', import.meta.url).href
		}
	}

	public lightPuzzle(){
		if(this.fragmentType == 1){
			if(this.fragmentsJiBright < 6){
				this.activateStickers(this.fragmentType);
			}else{
				if(_isMobile()){
					NotifyF('您已成功点亮该区域');
					this.close()	
				}else{
					window.Warn( '您已成功点亮该区域' );
					this.close()	
				}
			}
		}
		if(this.fragmentType == 2){
			if(this.fragmentsyunBright < 6){
				this.activateStickers(this.fragmentType);
			}else{
				if(_isMobile()){
					NotifyF('您已成功点亮该区域');
					this.close()	
				}else{
					window.Warn( '您已成功点亮该区域' );
					this.close()	
				}
			}
		}
		if(this.fragmentType == 3){
			if(this.fragmentsfuBright < 6){
				this.activateStickers(this.fragmentType);
			}else{
				if(_isMobile()){
					NotifyF('您已成功点亮该区域');
					this.close()	
				}else{
					window.Warn( '您已成功点亮该区域' );
					this.close()	
				}
			}
		}
	}

	public destroyed()
	{
		removeEventListener( 'resize', this.resize.bind( this ) )
	}

	public resize()
	{
		if( !_isMobile() )
		{
			let width = ( <HTMLElement>document.querySelector( '#pc-body-back' ) )?.offsetWidth
			this.scale = width / 1990
			this.height = 4800 * this.scale
		}
		else
		{
			let width = ( <HTMLElement>document.querySelector( '#h5-body-back' ) )?.offsetWidth
			this.scale = width / 750
		}
	}

	public scrollTo( id:string )
	{
		let section = <HTMLElement>document.querySelector( `#${id}` )

		window.scrollTo({
			top: section?.offsetTop,
			behavior: "smooth",
		})
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

	public getJiImg( index: number )
	{
		let img = []
		let puzzle = [
			new URL( '@/assets/pcimg/newYear/puzzle/1.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/2.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/7.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/8.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/13.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/14.png', import.meta.url).href,
		]
		let puzzleAc = [
			new URL( '@/assets/pcimg/newYear/puzzle-ac/1-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/2-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/7-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/8-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/13-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/14-ac.png', import.meta.url).href,
		]
		if(index + 1 <= this.fragmentsJiBright){
			img = puzzleAc
		}else{
			img = puzzle
		}
		return img[index]
	}

	public getYunImg( index: number )
	{
		let img = []
		let puzzle = [
			new URL( '@/assets/pcimg/newYear/puzzle/3.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/4.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/9.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/10.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/15.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/16.png', import.meta.url).href,
		]
		let puzzleAc = [
			new URL( '@/assets/pcimg/newYear/puzzle-ac/3-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/4-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/9-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/10-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/15-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/16-ac.png', import.meta.url).href,
		]

		if(index + 1 <= this.fragmentsyunBright){
			img = puzzleAc
		}else{
			img = puzzle
		}
		return img[index]
	}

	public getFuImg( index: number )
	{
		let img = []
		let puzzle = [
			new URL( '@/assets/pcimg/newYear/puzzle/5.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/6.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/11.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/12.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/17.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle/18.png', import.meta.url).href,
		]
		let puzzleAc = [
			new URL( '@/assets/pcimg/newYear/puzzle-ac/5-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/6-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/11-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/12-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/17-ac.png', import.meta.url).href,
			new URL( '@/assets/pcimg/newYear/puzzle-ac/18-ac.png', import.meta.url).href,
		]

		if(index + 1 <= this.fragmentsfuBright){
			img = puzzleAc
		}else{
			img = puzzle
		}
		return img[index]
	}

}