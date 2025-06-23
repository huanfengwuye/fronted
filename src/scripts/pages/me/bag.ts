import { Component, Ref, Vue, Watch } from "vue-facing-decorator";
import i18n from "@/lang";
import { ref } from "vue";
import {
	getAssetsImage,
	playAudio,
	FormatNickname,
	getGoodsNamePre,
	getGoodsNameSec,
	_isMobile,
} from "@/util/common";
import { t } from "@/network/axios"
import { useStore } from "vuex";
import {
	rucksackGoods,
	markRucksackMaterial,
	getRucksackMaterials,
	extractGoods,
	cancelExtract,
	openReward
} from "@/network/api/user";
import { GoodImageBgType } from "@/util/util";
import fudaiImage from "@/assets/romimg/common/fudai.png";
import audiorecory from "@/assets/audio/recory.mp3";
import { useRouter } from "vue-router";

@Component({
	components: {  }
})
export default class Bag extends Vue {
	public store = useStore();
	public tabType = "goods"
	public barIndex = 1;
	public recoryaudio: HTMLAudioElement = new Audio(audiorecory);
	public FormatNickname = FormatNickname
	public getGoodsNamePre = getGoodsNamePre
	public getGoodsNameSec = getGoodsNameSec
	public isSearchActive = false;
	public router = useRouter();

	public open = false

	public statusTypeValue = {
		common: 1,
		alreadyRec: 2,
		alreadyExtract: 3,
		alreadyCancel: 4,
		extracting: 5,
	};
	public downactive = false;
	public goodDownList = [
		{
			text: t('common.defaultSort'),
			direction: "desc",
			sortType: 1,
		},
		{
			text: t('common.priceDescSort'),
			direction: "desc",
			sortType: 3,
		},
		{
			text: t('common.priceAscSort'),
			direction: "asc",
			sortType: 2,
		},
	];
	public dropState = {
		text: t('common.defaultSort'),
		direction: "desc",
		sortType: 1,
	};
	public dropStateIndex = 0;
	public goodsPager = {
		pageIndex: 1,
		pageSize: 15,
		sortType: 1,
	};
	public colorList = ['#4CC5CD','#4A69F9','#9B52F6','#EA37F7','#EB4B4B','#F9B800'];
	public keyword = "";
	public totalRows = 0;
	public totalPrice = 0;
	public goodsList: any = [];
	public makingsList: any = [];
	public makingsListTo: any = [];
	public choosekey = 0;
	public selectAll = false;
	public loading = false;
	public customLoading = false;
	public finished = false;
	public selectList: any = [];
	public showIndex = -1;
	public bagType = 0;
	public showSearch = false;

	public mounted(){
		this.keyword = "";
		this.finished = false;
		this.goodsPager.pageIndex = 1;
		this.getBagGoods();
	}

	public async toggleSearch() {
		this.isSearchActive = !this.isSearchActive;
	}

	public async getRucksackMaterialsList() {
		let params: any = {};
		params.limit = this.goodsPager.pageSize;
		params.page = this.goodsPager.pageIndex;
		if (this.keyword) {
			params.goodsName = this.keyword;
		}
		this.customLoading = true;
		const res = await getRucksackMaterials(params);
		if (res.code === 0) {
			let items = res.data.items;
			this.makingsListTo = res.data;
			let preGoods = this.makingsList;
			if (res.data.page == 1) {
				preGoods = [];
				this.selectAll = false;
				this.selectList = [];
			}
			if (items) {
				this.makingsList = [...preGoods, ...items];
			} else {
				this.makingsList = preGoods;
			}
			this.totalRows = res.data.total;
			this.totalPrice = res.data.sumPrices;
			this.loading = false;
			if (res.data.items == null || res.data.items.length < res.data.limit) {
				this.finished = true;
			}
		} else {
			this.loading = false;
			this.finished = true;
		}
		this.customLoading = false;
	}

	public async onExtractOne(item: { id: any; }) {
		let params = {
			ids: [item.id]
		}
	
		extractGoods(params).then((res) => {
			if (res.code == 0) {
				this.goodsPager.pageIndex = 1
				this.finished = false
				this.getBagGoods();
				this.monitorAll()
				this.selectAll = false
				this.selectList = [];
			}
		})
	}
	

	public async getBagGoods() {
		let params: any = {};
		params.limit = this.goodsPager.pageSize;
		params.page = this.goodsPager.pageIndex;
		params.sortType = this.goodsPager.sortType;
		if (this.keyword) {
			params.goodsName = this.keyword;
		}
		this.customLoading = true;
		const res = await rucksackGoods(params);
		if (res.code === 0) {
			let items = res.data.items;
			let preGoods = this.goodsList;
			if (res.data.page == 1) {
				preGoods = [];
				this.selectAll = false;
				this.selectList = [];
			}
			if (items) {
				this.goodsList = [...preGoods, ...items];
			} else {
				this.goodsList = preGoods;
			}
			this.totalRows = res.data.total;
			this.totalPrice = res.data.sumPrices;
			this.loading = false;
			if (res.data.items == null || res.data.items.length < res.data.limit) {
				this.finished = true;
			}
		} else {
			this.loading = false;
			this.finished = true;
		}
		this.customLoading = false;
	}

	public async onSelGoodDown() {
		this.dropStateIndex = this.dropStateIndex + 1;
		if (this.dropStateIndex >= this.goodDownList.length) {
			this.dropStateIndex = 0;
		}
		this.dropState = this.goodDownList[this.dropStateIndex];
		this.downactive = false;
		this.keyword = "";
		this.goodsPager.pageIndex = 1;
		this.goodsPager.sortType = this.dropState.sortType;
		this.finished = false;
		this.selectAll = false;
		this.getBagGoods();
	}

	public openRule(){
		this.open = true
	}

	public async openRewardItem(item: any){
		let params: any = {
			goodsId: null
		}

		params.goodsId = item.id

		openReward(params).then((res: { code: number; message: any; }) => {
			if (res.code == 0) {
				playAudio(this.recoryaudio);
				window.Warn(res.message);
				this.store.dispatch("getUserInfo");
				this.finished = false;
				this.goodsPager.pageIndex = 1;
				this.getBagGoods();
			}
		})

	}

	//炼化
	public async sellGoodItem () {
		//筛选出选中的饰品
		let selectArr: any = this.goodsList.filter((item: { choose: any; }) => {
			return item.choose
		})

		if (selectArr.length > 0) {
			//查询选中饰品中是否存在已提取状态
			let againArr = selectArr.filter((item: { statusType: any; }) => {
				return item.statusType == this.statusTypeValue.alreadyExtract || item.statusType == this.statusTypeValue.extracting;
			})

			//不存在执行
			if (againArr.length == 0) {
				let params: any = {
					rucksackGoodsIds: []
				}
				for (let i = 0; i < selectArr.length; i++) {
					params.rucksackGoodsIds.push(selectArr[i].id)
				}

				markRucksackMaterial(params).then((res: { code: number; message: any; }) => {
					if (res.code == 0) {
						playAudio(this.recoryaudio);
						window.Warn(res.message);
						this.store.dispatch("getUserInfo");
						this.finished = false;
						this.goodsPager.pageIndex = 1;
						this.getBagGoods();
						this.selectAll = false;
						this.selectList = [];
					}
				})
			} else {
				window.NotifyF('包含提取中饰品，炼化失败')
			}
		} else {
			window.NotifyF('未选择饰品，炼化失败')
		}
	}



	//炼化
	public async GoodItem (item: any) {
		//筛选出选中的饰品
		let items = item

		console.log('item',item.id)
	
		//查询选中饰品中是否存在已提取状态
		let againArr = items.statusType == this.statusTypeValue.alreadyExtract || items.statusType == this.statusTypeValue.extracting;
		
		//不存在执行
		if (!againArr) {
			let params: any = {
				rucksackGoodsIds: []
			}
			
			params.rucksackGoodsIds[0] = items.id

			markRucksackMaterial(params).then((res: { code: number; message: any; }) => {
				if (res.code == 0) {
					playAudio(this.recoryaudio);
					window.Warn(res.message);
					this.store.dispatch("getUserInfo");
					this.finished = false;
					this.goodsPager.pageIndex = 1;
					this.getBagGoods();
				}
			})
		} else {
			window.NotifyF('包含提取中饰品，炼化失败')
		}
		
	}

	public async toSearch() {
		if (this.showSearch) {
			this.goodsPager.pageIndex = 1;
			this.finished = false;
			this.selectAll = false;
			this.getBagGoods();
		} else {
			this.showSearch = true;
		}
	}

	public async onLoad() {
		if (this.customLoading) return;
		this.goodsPager.pageIndex += 1;
		if (this.bagType == 0) {
			this.getBagGoods();
		} else {
			this.getRucksackMaterialsList();
		}
	}

	public async allChoose() {
		if (this.selectAll) {
			for (let i = 0; i < this.goodsList.length; i++) {
				delete this.goodsList[i].choose;
				this.selectList = [];
			}
			this.selectAll = false;
		} else {
			this.selectList = [];
			let key = "choose";
			let value = true;
			for (let i = 0; i < this.goodsList.length; i++) {
				this.goodsList[i][key] = value;
				this.selectList.push(this.goodsList[i]);
			}
			this.selectAll = true;
		}
	}

	public async chooseItem(item: any, index: number) {
		if (item.choose) {
			delete item.choose;
			let ItemIndex = this.selectList.findIndex((v: { id: any; }) => {
				return v.id == item.id;
			});
			this.selectList.splice(ItemIndex, 1);
		} else {
			if( item.goodsType == 1 ){
				let key = "choose";
				let value = true;
				item[key] = value;
				this.selectList.push(item);
			}
		}
		this.choosekey += 1;
		this.monitorAll();
	}

	public async onClickExtract() {
		let screenArr = this.goodsList.filter((item: { choose: any; }) => {
			return item.choose;
		});
		if (screenArr.length > 0) {
			let againArr = screenArr.filter((item: { statusType: number; }) => {
				return (
					item.statusType == this.statusTypeValue.alreadyExtract ||
					item.statusType == this.statusTypeValue.extracting
				);
			});
			if (againArr.length == 0) {
				let params: any = {
					ids: [],
				};
				for (let i = 0; i < screenArr.length; i++) {
					params.ids.push(screenArr[i].id);
				}
				extractGoods(params).then((res) => {
					if (res.code == 0) {
						window.NotifyS(i18n.global.t('bag.extractSuccess'));
						this.goodsPager.pageIndex = 1;
						this.finished = false;
						this.getBagGoods();
						this.monitorAll();
						this.selectAll = false;
						this.selectList = [];
					}
				});
			} else {
				if(_isMobile()){
					window.NotifyF(i18n.global.t('bag.extractFail'));
				}else{
					window.Warn(i18n.global.t('bag.extractFail'));
				}
			}
		} else {
			if(_isMobile()){
				window.NotifyF(i18n.global.t('bag.extractFailByNoChange'));
			}else{
				window.Warn(i18n.global.t('bag.extractFailByNoChange'));
			}
		}
	}

	public async toCancelDraw() {
		let screenArr = this.goodsList.filter((item: { choose: any; }) => {
			return item.choose;
		});
		if (screenArr.length > 0) {
			let againArr = screenArr.filter((item: { statusType: number; }) => {
				return (
					item.statusType == this.statusTypeValue.common ||
					item.statusType == this.statusTypeValue.alreadyCancel
				);
			});
			if (againArr.length == 0) {
				let params: any = {
					ids: [],
				};
				for (let i = 0; i < screenArr.length; i++) {
					params.ids.push(screenArr[i].id);
				}
				cancelExtract(params).then((res) => {
					if (res.code == 0) {
						window.NotifyS(i18n.global.t('bag.cancelExtractSuccess'));
						this.goodsPager.pageIndex = 1;
						this.finished = false;
						this.getBagGoods();
						this.monitorAll();
						this.selectAll = false;
						this.selectList = [];
					}
				});
			} else {
				if(_isMobile()){
					window.NotifyF(i18n.global.t('bag.cancelExtractFail'));
				}else{
					window.Warn(i18n.global.t('bag.cancelExtractFail'));
				}
			}
		} else {
			if(_isMobile()){
				window.NotifyF(i18n.global.t('bag.cancelExtractFailByNil'));
			}else{
				window.Warn(i18n.global.t('bag.cancelExtractFailByNil'));
			}
		}
	}

	public async CancelDraw(item: any) {

		let params: any = {
			ids: [],
		};
		params.ids[0] = item.id
		cancelExtract(params).then((res) => {
			if (res.code == 0) {
				window.NotifyS(i18n.global.t('bag.cancelExtractSuccess'));
				this.goodsPager.pageIndex = 1;
				this.finished = false;
				this.getBagGoods();
				this.monitorAll();
			}
		});
	}


	public switchBag(index: number) {
		this.bagType = index;
		this.goodsPager.pageSize = 15;
		this.goodsPager.pageIndex = 1;
		this.goodsPager.sortType = 1;
		if (index == 0) {
			this.getBagGoods();
		} else {
			this.getRucksackMaterialsList();
		}
	}

	public monitorAll() {
		let monitor = this.goodsList.find((item: { choose: any; }) => {
			return !item.choose;
		});
		this.selectAll = !monitor;
	}

	public onBaseClick() {
		this.showIndex = -1;
	}

	public onClickItemName(index: number) {
		if (index == this.showIndex) {
			this.showIndex = -1;
		} else {
			this.showIndex = index;
		}
	}


	public onAllChooseChange() {
		if (this.selectAll) {
			this.selectList = []
			let key = "choose"
			let value = true
			for (let i = 0; i < this.goodsList.length; i++) {
				this.goodsList[i][key] = value
				this.selectList.push(this.goodsList[i])
			}
		} else {
			for (let i = 0; i < this.goodsList.length; i++) {
				delete this.goodsList[i].choose
				this.selectList = []
			}
		}
	}

	public getImageBg(item: { goodsLevel: any; goodsType: number; }) {
		let level = item.goodsLevel;
		if (item.goodsType == 2) {
			level = 1;
		}
		return this.store.getters.getGoodsBgImage(GoodImageBgType.box, level);
	}

	public getImageBgPc(item: { goodsLevel: any; goodsType: number; }) {
		let level = item.goodsLevel;
		if (item.goodsType == 2) {
			level = 1;
		}
		return this.store.getters.getGoodsBgImage(GoodImageBgType.roll, level);
	}

	public getImageIcon(item: { goodsType: number; iconUrl: any; }) {
		if (item.goodsType == 2) {
			return fudaiImage;
		} else {
			return item.iconUrl;
		}
	}

	public getGoodsName(item: { goodsType: number; goodsName: any; }) {
		if (item.goodsType == 2) {
			return t('bag.luckyBag');
		} else {
			return item.goodsName;
		}
	}

}
