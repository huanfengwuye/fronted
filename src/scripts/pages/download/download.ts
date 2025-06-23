import { Component, Vue } from "vue-facing-decorator"
import i18n from "@/lang"
import ShowDialog from "@/components/h5/common/ShowDialog.vue"
import goldBig from "@/assets/romimg/turntable/gold.png"
import goldSmall from "@/assets/romimg/turntable/goldSmall.png"
import TopTitleBack from "@/components/h5/common/TopTitleBack.vue"
import { getConfigList} from '@/network/api/index';

@Component({
	components : { ShowDialog, TopTitleBack }
})
export default class TurnTable extends Vue
{
	public detailScreenShow: boolean = false
	public btnActive: boolean = false //按钮动画
	public extractionStatus: boolean = false //提取状态
	public successShow: boolean = true //福利页面倒计时
	public itemUrl: string = '' //app下载URl
	public goldSmall: string = goldSmall //单个金币图标
	public t = i18n.global.t
	public aaa = false

	// 倒计时相关变量
	public countdown: number = 3; // 初始倒计时数字
	private countdownInterval: any; // 保存 setInterval 的引用

	public mounted() {
		this.startCountdown()
		this.initConfigList()
	}
	
	public startCountdown() {
		// 设置倒计时初始值
		this.countdown = 3;

		// 每秒更新倒计时数字
		this.countdownInterval = setInterval(() => {
			this.countdown--;

			// 当倒计时为零时，清除 setInterval
			if (this.countdown <= 0) {
			clearInterval(this.countdownInterval);
			// window.$dev && console.log("倒计时结束");
			this.successShow = false;
			}
		}, 1000);
		}
	
	async initConfigList() {
		const res = await getConfigList();
		if (res.code === 0) {
			let item = res.data.items
			for (let i=0;i< item.length;i++) {
				if (item[i].itemKey === "ApkDownloadUrl") {
					this.itemUrl = item[i].itemValue;
				}
			}
		}
	}

	public redirectToAndroidDownload()
	{
		window.location.href = this.itemUrl;
	}

	public start()
	{
		window.$dev && console.log("点击按钮")
		this.aaa = true
		this.btnActive = true
	}
}