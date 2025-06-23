import { Component, Ref, Vue } from "vue-facing-decorator"
import { useStore } from 'vuex'
import H5ShowDialog from "@/components/h5/common/ShowDialog.vue"
import TopTitleBack from "@/components/h5/common/TopTitleBack.vue"
import { NotifyF, NotifyS, Success,Warn, _isMobile, getGoodsNamePre, getGoodsNameSec } from '@/util/common';
import Price from '@/components/price/price.vue'
import audioProcess from "@/assets/audio/refining.mp3";
import { playAudio } from "@/util/common";
import i18n from "@/lang"
import { getRucksackMaterials } from "@/network/api/user"
import { getRefineWaterList, refineGoods } from "@/network/api/extend";
import { GoodImageBgType } from "@/util/util";

@Component({
	components : {H5ShowDialog, Price, TopTitleBack }
})
export default class Refining extends Vue
{
	public t = i18n.global.t
	public store = useStore()
	public ruleShow = false
	public processAudio = new Audio(audioProcess); //过程声音
// public $GET: any = $_GET
	public reagentShow = false
	public priceList = 0
	public getGoodsNamePre = getGoodsNamePre
	public getGoodsNameSec = getGoodsNameSec
	@Ref
	public originRef!: any

	public total: number = 1
	public animation: boolean = false
	public refiningBegins	 = false

	public timeoutId!: number

	public success: any = null

	public makingsListTo: any = []

	public refineItem: any = []

	///	是否已开奖
	public reward: boolean = false

	public makingsList: any = []
	public iconShow = true

	public goodsPager = {
		pageIndex: 1,
		pageSize: 15,
		sortType: 1,
	}
	public loading = false
	public finished = false


	public reagentImg = ''
	public size1 = ''
	public size2 = ''
	public size3 = ''

	public selectList: any = []
	public reagentList: any = []
	public reagentItem: any = []
	public colorList = ['#4CC5CD','#4A69F9','#9B52F6','#EA37F7','#EB4B4B','#F9B800']

	public mounted()
	{
		this.getRucksackMaterialsList()
		// console.log('makingsList',this.selectList.length)
	}

	public async getRefineWaterLists() {
		let params: any = {};
		params.refineLevel = this.selectList[0].refineLevel;
		const res = await getRefineWaterList(params);
		if (res.code === 0) {
			this.reagentList = res.data.items;
			console.log('this.reagentList',this.reagentList[0])
			
		}
	}

	public async getRucksackMaterialsList() {
		let params: any = {};
		params.limit = this.goodsPager.pageSize;
		params.page = this.goodsPager.pageIndex;

		this.loading = true;
		const res = await getRucksackMaterials(params);
		if (res.code === 0) {
			let items = res.data.items;
			let preGoods = this.makingsList;
			this.makingsListTo = res.data
			if (res.data.page == 1) {
				preGoods = [];
				this.selectList = [];
			}
			if (items) {
				this.makingsList = [...preGoods, ...items];
			} else {
				this.makingsList = preGoods;
			}
			// totalRows = res.data.total;
			// 加载状态结束
			this.loading = false;
	
			// 数据全部加载完成
			if (res.data.items == null || res.data.items.length < res.data.limit) {
				this.finished = true;
			}
		} else {
			this.loading = false;
			this.finished = true;
		}
	}

	public async onRefining()
	{
		if(this.reagentItem.length != 0 && this.priceList != 0){
			let params: any = {
				rucksackGoodsIds: [],
			};
			for (let i = 0; i < this.selectList.length; i++) {
				params.rucksackGoodsIds.push(this.selectList[i].id);
			}
			params.waterId = this.reagentItem.waterId
			const res = await refineGoods(params);
			this.refineItem = res.data;
			if (res.code === 0) {
				this.animation = true
				this.success = 1
				playAudio(this.processAudio);
				this.total = 3
				
				this.timeoutId = setTimeout( () => {
					this.success = this.refineItem.success
					clearTimeout( this.timeoutId )
					this.animation = false
					this.total = 1
					this.refiningBegins = true
					// this.success
				}, 4000 )

			}
		}else if(this.priceList == 0){
			if(_isMobile()){
				NotifyF( '请选择物品' );
			}else{
				Warn( '请选择物品' );
			}
		}else if(this.reagentItem.length == 0){
			if(_isMobile()){
				NotifyF( '请选择强化剂' );
			}else{
				Warn( '请选择强化剂' );
			}
		}

	}

	public onClose(){
		this.makingsList = []
		this.goodsPager.pageIndex = 1
		this.getRucksackMaterialsList()
		this.refiningBegins = false
		this.reagentItem = []
		this.success = null
		this.priceList = 0
		for (let i = 0; i < this.makingsList.length; i++) {
			delete this.makingsList[i].choose;
			this.selectList = [];
		}
	}

	public onReagent(){
		if(this.selectList.length == 0){
			if(_isMobile()){
				NotifyF( '请选择物品' );
			}else{
				Warn( '请选择物品' );
			}		
		}else{
			this.getRefineWaterLists()
			this.reagentShow = true
		}

	}

	public reagentType(item: any){
		this.reagentItem = item
	}

	public onItem(item: any){
		this.reagentItem = []
		this.iconShow = true
		if (item.choose) {
			this.priceList -= Number(item.price);
			delete item.choose;
			let ItemIndex = this.selectList.findIndex((v: { id: any; }) => {
				return v.id == item.id;
			});
			this.selectList.splice(ItemIndex, 1);
		} else {
			if( this.selectList.length == 0 || item.refineLevel == this.selectList[0].refineLevel){
				this.priceList += Number(item.price);
				// console.log('priceList',this.priceList)
				let key = "choose";
				let value = true;
				item[key] = value;
				this.selectList.push(item);
			}else{
				if(_isMobile()){
					NotifyF( '请选择相同等级物品' );
				}else{
					Warn( '请选择相同等级物品' );
				}
			}

		}
	}

	public getImageBg(item: any) {
		let level = item.refineLevel;

		return this.store.getters.getGoodsBgImage(GoodImageBgType.box, level + 1);
	}

	public onClickHelp() {
		let data = {
			show: true,
			html: `<p>材料等级划分：青色蓝色紫色粉色红色金色</p><br><p>炼化剂等级划分   蓝色（大中小）紫色（大中小）粉色（大中小）红色（大中小）金色概率：按用户投入炼化剂的大小获得高等级饰品的价格</p><br><p>玩法规则：材料*N+炼化剂=高等级饰品举例：青色材料*N+蓝色炼化剂=随机蓝色饰品蓝色材料*N+紫色炼化剂=随机紫色饰品紫色材料*N+粉色炼化剂=随机粉色饰品粉色材料*N+红色炼化剂=随机红色饰品红色材料*N+金色炼化剂=随机金色饰品注：不可夸品质强化，不可逆向强化。</p>`
		}
		this.store.commit('setHowPlay', data)
	}

	public onLoad() {
		this.goodsPager.pageIndex += 1;
		this.getRucksackMaterialsList();
	}

	public showHelper()
	{
		this.ruleShow = true
	}

	public show(){
		this.reagentShow = false
		this.iconShow = false
	}

	public a(){

	}

}
