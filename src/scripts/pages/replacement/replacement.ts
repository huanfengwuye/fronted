import { Component, Ref, Vue, Watch } from "vue-facing-decorator"
import i18n from "@/lang"
import ShowDialog from "@/components/h5/common/ShowDialog.vue"
import TopTitleBack from "@/components/h5/common/TopTitleBack.vue"
import { useStore } from "vuex"
import { markRucksackMaterial, recoveryGoods, rucksackGoods, } from "@/network/api/user";
import { GoodImageBgType } from '@/util/util'
import ResultLayer from '@/views/pc/openbox/components/BoxResult.vue'
import { NotifyF, NotifyS, Success, _isMobile, getGoodsNamePre, getGoodsNameSec } from '@/util/common';
import H5ResultLayer from '@/views/h5/openbox/components/Result.vue'
import { getExchangeGoods, exchangeGoods, userRucksackWeaponsExchange } from '@/network/api/extend';

@Component({ components : { ShowDialog, TopTitleBack, ResultLayer, H5ResultLayer } })
export default class Task extends Vue
{
	public t = i18n.global.t
	public store = useStore()
	// public router = useRouter();
	public detailScreenShow: boolean = false
	public goodsList: any =	[]		// 背包列表
	public exchangeList: any = []	// 可兑换列表
	public totalItems : any =[] ;
	public gunItems : any = [];
	public get hasLogin() { return this.store.getters.hasLogin }
	public getGoodsNamePre = getGoodsNamePre
	public getGoodsNameSec = getGoodsNameSec
	public selectAll = false	// 全选
	public sortList = false		// 全选
	public selectList: any = []
	public selectExchange: any = []
	public exchangeItem: any = []
	public totalValue: number = 0
	public totalItemsValue: number = 0
	public receiveShow : boolean = false
	public selectName: string = ""
	public totalRows = 0
	public priceList: number = 0
	public totalPrice = 0
	public loading : any = false;
	public chooseState = false
	public finished = false
	public choosekey = 0

	public goodLoading: boolean = false
	public goodFinished: boolean = false

	@Ref()
	public resultRef: any = null

	public goodsPager: any = {
		pageIndex: 1,
		pageSize: 20,
		sortType: 1,
	}

	public exchangePager: any = {
		pageIndex: 1,
		pageSize: 20,
		sortType: 1,
	}

	// 替换规则
	public rarityMap: any = {
		1: { id: 1, name: '消费级', level: 1 },
		2: { id: 3, name: '工业级', level: 2 },
		3: { id: 2, name: '军规级', level: 3 },
		4: { id: 16, name: '受限', level: 4 },
		5: { id: 15, name: '保密', level: 5 },
		6: { id: 14, name: '隐秘', level: 6 },
		7: { id: 12, name: '违禁', level: 7 },
		8: { id: 8, name: '高级', level: 3 },
		9: { id: 9, name: '非凡', level: 6 },
		10: { id: 10, name: '奇异', level: 5 },
		11: { id: 11, name: '卓越', level: 4 },
		12: { id: 4, name: '受限级', level: 4 },
		13: { id: 13, name: '大师', level: 6 },
		14: { id: 6, name: '隐秘级', level: 6 },
		15: { id: 5, name: '保密级', level: 5 },
		16: { id: 7, name: '普通级', level: 1 }
	};
  

	@Watch('hasLogin') 
	public async mounted() {
			this.getBagGoods();
			// this.exchangeThingS();
	}

	public async getBagGoods() {
		if( !this.hasLogin ) return

		let params: any = {}
			params.limit = this.goodsPager.pageSize;
			params.page = this.goodsPager.pageIndex;
			params.sortType = this.goodsPager.sortType;
		
		this.loading = true;

		const res = await userRucksackWeaponsExchange(params);
		window.$dev && console.log("res》〉》〉》〉》〉》〉》〉》〉》",res)

		if (res.code === 0) {
			let items = res.data.items;
			let preGoods = this.goodsList;
			if (res.data.page == 1) {
				preGoods = [];
				this.selectAll = false;
				this.selectList = [];
			}
			// window.$dev && console.log("preGoods",preGoods)
			if (items) {
				this.goodsList = [...preGoods, ...items];
			} else {
				this.goodsList = preGoods;
			}

			// this.goodsList = this.goodsList.filter((item: { goodsType: number,statusType: number }) => item.goodsType != 2 );
			// this.goodsList = this.goodsList.filter((item: { statusType: number }) => item.statusType == 1);
			// console.log("this.goodsList",this.goodsList);
			this.totalRows = res.data.total;
			this.totalPrice = res.data.sumPrices;
	
			// 数据全部加载完成
			if (res.data.items == null || res.data.items.length < res.data.limit) {
				this.finished = true;
			}
		}
		this.loading = false;
	}

	public sort(){
		this.sortList = !this.sortList
		if(this.sortList)
		// 对goodsList进行排序（按照价格升序）
		this.goodsList.sort((a: { price: any }, b: { price: any }) => parseFloat(a.price) - parseFloat(b.price));
		else
			// 对goodsList进行排序（按照价格降序）
			this.goodsList.sort((a: { price: any }, b: { price: any }) => parseFloat(b.price) - parseFloat(a.price));
	}
	public onLoad() {
		window.$dev && console.log( 'load more' )
		if (this.loading) return;
		this.goodsPager.pageIndex += 1;
		this.getBagGoods();
	}

	public onExLoad() {
		// window.$dev && console.log( 'load more,this.goodLoading',this.goodLoading )
		if (this.goodLoading) return;
		this.exchangePager.pageIndex += 1;
		this.exchangeThingS();
	}

	public getImageBg(item:any) {
		return this.store.getters.getGoodsBgImage(GoodImageBgType.box, item);
	}

	public getImageBg2(item:any) {
		return this.store.getters.getGoodsBgImage(GoodImageBgType.replace, item);
	}
	
	public showHelper()
	{
		this.detailScreenShow = true
	}

	public async confirmExtraction(){
		let params: any = {}
			params.exchangeGoodsId = this.exchangeItem.goodsId;
			params.exchangeGoodsLevel = this.exchangeItem.goodsRarity;
			params.rucksackGoodsIds = this.selectList.map((item: { id: any }) => item.id);
			const res = await exchangeGoods(params);
			if(res.code == 0){
				this.receiveShow = true
			}

	}

	public onSellOne() {
		let params = {
			rucksackGoodsIds: [this.exchangeItem.id]
		}
	
		markRucksackMaterial(params).then(res => {
			if (res.code == 0) {
				if(_isMobile()){
					NotifyS('炼化成功');
				}else{
					// Success( '炼化成功' );
					Success( { offset : 100, message : '炼化成功' } );
				}
			}
		})
		this.receiveShow = false
		this.selectAll = false
		this.exchangeList = []
		this.exchangeItem = []
		this.totalItemsValue = 0
		this.priceList = 0
		for (let i = 0; i < this.goodsList.length; i++) {
			delete this.goodsList[i].choose
			this.selectList = []
		}
		this.goodsList = []
		this.getBagGoods();
	}

	public closure() {

		this.receiveShow = false
		this.selectAll = false
		this.exchangeList = []
		this.exchangeItem = []
		this.totalItemsValue = 0
		this.priceList = 0
		for (let i = 0; i < this.goodsList.length; i++) {
			delete this.goodsList[i].choose
			this.selectList = []
		}
		this.goodsList = []
		this.getBagGoods();
	}

	public async exchangeThing(){
		if(this.priceList > 1 ){
			this.exchangePager.pageSize = 20
			this.exchangePager.pageIndex = 1
			this.exchangeThingS()
			this.chooseState = true
		}
		else
		{
			if(_isMobile()){
				NotifyF('总价值不能低于1');
			}else{
				// Success( '炼化成功' );
				window.Warn( { offset : 100, message : '总价值不能低于1' } );
			}
		}
	}

	public close(){
		this.exchangeItem = []
	}

	public async exchangeThingS(){
		let params: any = {}
		params.limit = this.exchangePager.pageSize;
		params.page = this.exchangePager.pageIndex;
		params.goodsName = this.selectName;
		params.rucksackGoodsIds = this.selectList.map((item: { id: any }) => item.id);
		
		this.goodLoading = true

		const res = await getExchangeGoods(params);
		if (res.code === 0) {

			let preGoods = this.exchangeList;
			let items = res.data.items;

			if (res.data.page == 1) {
				preGoods = [];
				// this.selectAll = false;
				// this.selectList = [];
			}
			if (items) {
				this.exchangeList = [...preGoods, ...items];
			} else {
				this.exchangeList = preGoods;
			}

			if(items == null)
			{
				if(_isMobile()){
					NotifyF('当前价格无匹配库存物品');
				}else{
					// Success( '炼化成功' );
					window.Warn( { offset : 100, message : '当前价格无匹配库存物品' } );
				}
			}

				// // 遍历exchangeList并替换goodsRarity
				// const updatedExchangeList = this.exchangeList.map((item: { goodsRarity: string | number }) => {
				// 	const newRarity = this.rarityMap[item.goodsRarity];
				// 	if (newRarity) {
				// 	return { ...item, goodsRarity: newRarity.level };
				// 	} else {
				// 	return item; // 如果没有找到匹配的规则，则保持不变
				// 	}
				// });
				// this.exchangeList = updatedExchangeList
				// console.log("this.exchangeList",this.exchangeList);
				// 数据全部加载完成
				if (res.data.items == null || res.data.items.length < res.data.limit) {
					this.goodFinished = true;
				}
		}
		this.goodLoading = false
	}

	public chooseItem(item: any)
	{
		if (item.choose) {
			delete item.choose
			let ItemIndex = this.selectList.findIndex((v: { id: any }) => {
				return v.id == item.id
			})
			this.priceList = Number(this.priceList) - Number(item.price)

			this.selectList.splice(ItemIndex, 1)
		} else {
			if(this.selectList.length <= 8){
				this.priceList = Number(this.priceList) + Number(item.price)
				let key = "choose";
				let value = true
				item[key] = value
				this.selectList.push(item)
			}else{
				window.Warn("至多选中九件物品")
			}

		}
		this.exchangeItem = []
		this.exchangeList = []
		this.choosekey += 1
		this.monitorAll()
	}

	public chooseExchange(item: any) {
		if(this.chooseState)
		{
			for (let i = 0; i < this.exchangeList.length; i++) {
				delete this.exchangeList[i].choose
				this.selectExchange = []
			}
	
			let key = "choose";
			let value = true
			item[key] = value
			this.selectExchange.push(item)
	
			this.exchangeItem = item
	
			this.totalItemsValue =  Number(item.tokenPrice) +  Number(item.price)
		}else{
			if(_isMobile()){
				NotifyF('未选择置换物品');
			}else{
				// Success( '炼化成功' );
				window.Warn( { offset : 100, message : '未选择置换物品' } );
			}
		}
	}
	  
	public onAllChooseChange() {
		this.selectAll = !this.selectAll
		this.priceList = 0

		if (this.selectAll) {
			this.selectList = []
			let key = "choose"
			let value = true
			for (let i = 0; i < 9; i++) {
				this.goodsList[i][key] = value
				this.selectList.push(this.goodsList[i])
				this.priceList = Number(this.priceList) + Number(this.goodsList[i].price)
			}
		} else {
			for (let i = 0; i < this.goodsList.length; i++) {
				delete this.goodsList[i].choose
				this.selectList = []
			}
		}
	}

	//全选监听
	public monitorAll() {
		let monitor = this.goodsList.find((item: { choose: any }) => {
			return !item.choose
		})	
		this.selectAll = !monitor;
	}

	public onClickHelp() {
		let data = {
			show: true,
			html: `<p>${ this.t( 'replacement.ruleTile' ) }</p><br><p>${ this.t( 'replacement.rule1' ) }</p><br><p>${ this.t( 'replacement.rule2' ) }</p><br><p>${ this.t( 'replacement.rule3' ) }</p><br><p>${ this.t( 'replacement.rule4' ) }</p><br><p>${ this.t( 'replacement.rule5' ) }</p><br><p>${ this.t( 'replacement.rule6' ) }</p>`
		}
		this.store.commit('setHowPlay', data);
	}
}